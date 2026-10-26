require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./server/db");

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json({ limit: "1mb" }));

// Security & Header configuration
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});

// ==============================================================================
// API ROUTES
// ==============================================================================

// 1. Health check & Neon PostgreSQL connection status
app.get("/api/health", async (req, res) => {
  try {
    const dbHealth = await db.healthCheck();
    res.json({
      service: "NEXUS REALM Backend",
      environment: process.env.NODE_ENV || "development",
      timestamp: new Date().toISOString(),
      database: dbHealth
    });
  } catch (err) {
    res.status(500).json({
      service: "NEXUS REALM Backend",
      error: "Health check error",
      details: err.message
    });
  }
});

// 2. User Profiles
app.get("/api/profiles/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(
      "SELECT id, email, gamertag, display_name, avatar_url, bio, created_at, updated_at FROM public.profiles WHERE id = $1",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Profile not found" });
    }
    res.json({ profile: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch profile", message: err.message });
  }
});

app.post("/api/profiles", async (req, res) => {
  const { id, email, gamertag, displayName, avatarUrl, bio } = req.body;

  if (!gamertag || gamertag.trim().length < 3) {
    return res.status(400).json({ error: "GamerTag must be at least 3 characters long." });
  }

  // Clean gamertag: alphanumeric and underscores only, max 24 chars
  const cleanGamertag = gamertag.replace(/[^a-zA-Z0-9_]/g, "").slice(0, 24);
  if (cleanGamertag.length < 3) {
    return res.status(400).json({ error: "GamerTag can only contain letters, numbers, and underscores." });
  }

  try {
    let result;
    if (id) {
      // Upsert by user ID
      result = await db.query(
        `INSERT INTO public.profiles (id, email, gamertag, display_name, avatar_url, bio)
         VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT (id) DO UPDATE SET
           gamertag = EXCLUDED.gamertag,
           display_name = COALESCE(EXCLUDED.display_name, public.profiles.display_name),
           avatar_url = COALESCE(EXCLUDED.avatar_url, public.profiles.avatar_url),
           bio = COALESCE(EXCLUDED.bio, public.profiles.bio),
           updated_at = timezone('utc'::text, now())
         RETURNING id, email, gamertag, display_name, avatar_url, bio, created_at, updated_at;`,
        [id, email || null, cleanGamertag, displayName || cleanGamertag, avatarUrl || null, bio || null]
      );
    } else {
      // Insert with generated UUID
      result = await db.query(
        `INSERT INTO public.profiles (email, gamertag, display_name, avatar_url, bio)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id, email, gamertag, display_name, avatar_url, bio, created_at, updated_at;`,
        [email || null, cleanGamertag, displayName || cleanGamertag, avatarUrl || null, bio || null]
      );
    }

    res.status(201).json({ profile: result.rows[0] });
  } catch (err) {
    if (err.code === "23505") { // Unique violation
      return res.status(409).json({ error: "GamerTag or email is already registered." });
    }
    res.status(500).json({ error: "Failed to create/update profile", message: err.message });
  }
});

app.put("/api/profiles/:id", async (req, res) => {
  const { id } = req.params;
  const { gamertag, displayName, avatarUrl, bio } = req.body;

  try {
    const updates = [];
    const values = [id];
    let idx = 2;

    if (gamertag !== undefined) {
      const cleanGamertag = gamertag.replace(/[^a-zA-Z0-9_]/g, "").slice(0, 24);
      if (cleanGamertag.length < 3) {
        return res.status(400).json({ error: "GamerTag must be between 3 and 24 characters (alphanumeric & underscore)." });
      }
      updates.push(`gamertag = $${idx++}`);
      values.push(cleanGamertag);
    }

    if (displayName !== undefined) {
      updates.push(`display_name = $${idx++}`);
      values.push(displayName);
    }

    if (avatarUrl !== undefined) {
      updates.push(`avatar_url = $${idx++}`);
      values.push(avatarUrl);
    }

    if (bio !== undefined) {
      updates.push(`bio = $${idx++}`);
      values.push(bio);
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: "No fields provided to update." });
    }

    const queryText = `
      UPDATE public.profiles
      SET ${updates.join(", ")}, updated_at = timezone('utc'::text, now())
      WHERE id = $1
      RETURNING id, email, gamertag, display_name, avatar_url, bio, created_at, updated_at;
    `;

    const result = await db.query(queryText, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.json({ profile: result.rows[0] });
  } catch (err) {
    if (err.code === "23505") {
      return res.status(409).json({ error: "GamerTag is already taken." });
    }
    res.status(500).json({ error: "Failed to update profile", message: err.message });
  }
});

// 3. User Favorites (Wishlist)
app.get("/api/favorites/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await db.query(
      "SELECT game_id FROM public.user_favorites WHERE user_id = $1 ORDER BY created_at DESC",
      [userId]
    );
    const gameIds = result.rows.map(r => r.game_id);
    res.json({ favorites: gameIds });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch favorites", message: err.message });
  }
});

app.post("/api/favorites", async (req, res) => {
  const { userId, gameId } = req.body;
  if (!userId || !gameId) {
    return res.status(400).json({ error: "userId and gameId are required." });
  }

  try {
    // Ensure profile row exists for this userId to satisfy foreign key
    await db.query(
      `INSERT INTO public.profiles (id, gamertag)
       VALUES ($1, $2)
       ON CONFLICT (id) DO NOTHING;`,
      [userId, `Operative_${userId.slice(0, 8)}`]
    );

    await db.query(
      `INSERT INTO public.user_favorites (user_id, game_id)
       VALUES ($1, $2)
       ON CONFLICT (user_id, game_id) DO NOTHING;`,
      [userId, gameId]
    );
    res.status(201).json({ success: true, gameId });
  } catch (err) {
    res.status(500).json({ error: "Failed to add favorite", message: err.message });
  }
});

app.delete("/api/favorites", async (req, res) => {
  const userId = req.body?.userId || req.query?.userId;
  const gameId = req.body?.gameId || req.query?.gameId;
  if (!userId || !gameId) {
    return res.status(400).json({ error: "userId and gameId are required." });
  }

  try {
    await db.query(
      "DELETE FROM public.user_favorites WHERE user_id = $1 AND game_id = $2",
      [userId, gameId]
    );
    res.json({ success: true, gameId });
  } catch (err) {
    res.status(500).json({ error: "Failed to remove favorite", message: err.message });
  }
});

// 4. Tournament Registrations
app.get("/api/tournaments/registrations/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await db.query(
      "SELECT tournament_id, squad_name, created_at FROM public.user_tournament_registrations WHERE user_id = $1 ORDER BY created_at DESC",
      [userId]
    );
    res.json({ registrations: result.rows });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch registrations", message: err.message });
  }
});

app.post("/api/tournaments/register", async (req, res) => {
  const { userId, tournamentId, squadName } = req.body;
  if (!userId || !tournamentId) {
    return res.status(400).json({ error: "userId and tournamentId are required." });
  }

  const cleanSquadName = (squadName || "Alpha Squad").trim().slice(0, 60);

  try {
    // Ensure profile row exists for this userId
    await db.query(
      `INSERT INTO public.profiles (id, gamertag)
       VALUES ($1, $2)
       ON CONFLICT (id) DO NOTHING;`,
      [userId, `Operative_${userId.slice(0, 8)}`]
    );

    const result = await db.query(
      `INSERT INTO public.user_tournament_registrations (user_id, tournament_id, squad_name)
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id, tournament_id) DO NOTHING
       RETURNING *;`,
      [userId, tournamentId, cleanSquadName]
    );

    if (result.rows.length === 0) {
      return res.status(409).json({ error: "Operative already registered for this tournament." });
    }

    res.status(201).json({ success: true, registration: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: "Failed to register tournament", message: err.message });
  }
});

// 5. Game Reviews
app.get("/api/reviews/:gameId", async (req, res) => {
  const { gameId } = req.params;
  try {
    const result = await db.query(
      "SELECT id, game_id, author_id, author_name, author_avatar, rating, content, created_at FROM public.game_reviews WHERE game_id = $1 ORDER BY created_at DESC LIMIT 50",
      [gameId]
    );
    res.json({ reviews: result.rows });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reviews", message: err.message });
  }
});

app.post("/api/reviews", async (req, res) => {
  const { gameId, authorId, authorName, authorAvatar, rating, content } = req.body;
  if (!gameId || !authorName || !content) {
    return res.status(400).json({ error: "gameId, authorName, and content are required." });
  }

  const numRating = Math.max(1, Math.min(5, parseFloat(rating) || 5));

  try {
    const result = await db.query(
      `INSERT INTO public.game_reviews (game_id, author_id, author_name, author_avatar, rating, content)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, game_id, author_id, author_name, author_avatar, rating, content, created_at;`,
      [gameId, authorId || null, authorName, authorAvatar || null, numRating, content]
    );
    res.status(201).json({ review: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: "Failed to save review", message: err.message });
  }
});

// 6. Contact and Support Tickets
app.post("/api/contact", async (req, res) => {
  const { name, email, category, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required." });
  }

  try {
    const result = await db.query(
      `INSERT INTO public.contact_messages (name, email, category, message)
       VALUES ($1, $2, $3, $4)
       RETURNING id, created_at;`,
      [name.slice(0, 100), email.slice(0, 150), (category || "general").slice(0, 50), message.slice(0, 2000)]
    );
    res.status(201).json({ success: true, ticketId: result.rows[0].id });
  } catch (err) {
    res.status(500).json({ error: "Failed to submit contact ticket", message: err.message });
  }
});

// ==============================================================================
// STATIC FILE SERVING FOR CLIENT-SIDE SPA
// ==============================================================================
app.use(express.static(path.join(__dirname)));

// SPA fallback: any route without file extension serves index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Start server
if (require.main === module) {
  const server = app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`🎮 NEXUS REALM Server running on http://localhost:${PORT}`);
    console.log(`⚡ Connected to Neon PostgreSQL`);
    console.log(`=======================================================`);
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.error(`Port ${PORT} is currently in use. Please terminate existing server or choose another PORT.`);
    } else {
      console.error("Server error:", err);
    }
  });
}

module.exports = app;
