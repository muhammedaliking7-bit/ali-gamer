/**
 * End-to-end test of NEXUS REALM API routes against live server and Neon PostgreSQL
 */

const http = require("http");

async function request(options, postData = null) {
  return new Promise((resolve, reject) => {
    const opts = { ...options };
    opts.headers = { ...(options.headers || {}) };

    let payload = null;
    if (postData) {
      payload = typeof postData === "string" ? postData : JSON.stringify(postData);
      opts.headers["Content-Length"] = Buffer.byteLength(payload);
    }

    const req = http.request(opts, (res) => {
      let data = "";
      res.on("data", chunk => data += chunk);
      res.on("end", () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, body: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });

    req.on("error", reject);

    if (payload) {
      req.write(payload);
    }
    req.end();
  });
}

async function testAllRoutes() {
  console.log("=======================================================");
  console.log("⚡ Testing Live API Routes & Neon DB End-to-End");
  console.log("=======================================================");

  const testUserId = "11111111-2222-4333-8444-555555555555";
  let passed = 0;
  let failed = 0;

  function assert(cond, msg) {
    if (cond) {
      console.log(`  ✓ ${msg}`);
      passed++;
    } else {
      console.error(`  ✗ FAIL: ${msg}`);
      failed++;
    }
  }

  try {
    // 1. Health check
    const health = await request({
      hostname: "localhost",
      port: 8080,
      path: "/api/health",
      method: "GET"
    });
    assert(health.status === 200 && health.body.database.status === "connected", "GET /api/health reports database connected to Neon");

    // 2. Create Profile
    const createProf = await request({
      hostname: "localhost",
      port: 8080,
      path: "/api/profiles",
      method: "POST",
      headers: { "Content-Type": "application/json" }
    }, {
      id: testUserId,
      email: "api_operative@nexusrealm.gg",
      gamertag: "CyberPhantom_X",
      displayName: "Cyber Phantom",
      bio: "Master of covert net-ops."
    });
    assert(createProf.status === 201 && createProf.body.profile.gamertag === "CyberPhantom_X", "POST /api/profiles creates profile in Neon DB");

    // 3. Get Profile
    const getProf = await request({
      hostname: "localhost",
      port: 8080,
      path: `/api/profiles/${testUserId}`,
      method: "GET"
    });
    assert(getProf.status === 200 && getProf.body.profile.gamertag === "CyberPhantom_X", "GET /api/profiles/:id retrieves profile accurately");

    // 4. Update Profile
    const updateProf = await request({
      hostname: "localhost",
      port: 8080,
      path: `/api/profiles/${testUserId}`,
      method: "PUT",
      headers: { "Content-Type": "application/json" }
    }, {
      displayName: "Phantom Overlord",
      bio: "Ascended commander of net-ops."
    });
    assert(updateProf.status === 200 && updateProf.body.profile.display_name === "Phantom Overlord", "PUT /api/profiles/:id updates profile fields");

    // 5. Add Favorite
    const addFav = await request({
      hostname: "localhost",
      port: 8080,
      path: "/api/favorites",
      method: "POST",
      headers: { "Content-Type": "application/json" }
    }, {
      userId: testUserId,
      gameId: "valkyrie-protocol"
    });
    assert(addFav.status === 201 && addFav.body.success === true, "POST /api/favorites stores game in wishlist");

    // 6. Get Favorites
    const getFavs = await request({
      hostname: "localhost",
      port: 8080,
      path: `/api/favorites/${testUserId}`,
      method: "GET"
    });
    assert(getFavs.status === 200 && getFavs.body.favorites.includes("valkyrie-protocol"), "GET /api/favorites/:userId returns saved favorites");

    // 7. Remove Favorite
    const delFav = await request({
      hostname: "localhost",
      port: 8080,
      path: "/api/favorites",
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    }, {
      userId: testUserId,
      gameId: "valkyrie-protocol"
    });
    assert(delFav.status === 200 && delFav.body.success === true, "DELETE /api/favorites removes game from wishlist");

    // 8. Register Tournament
    const regTourn = await request({
      hostname: "localhost",
      port: 8080,
      path: "/api/tournaments/register",
      method: "POST",
      headers: { "Content-Type": "application/json" }
    }, {
      userId: testUserId,
      tournamentId: "apex-cyber-cup-2026",
      squadName: "Ghost Infiltrators"
    });
    assert(regTourn.status === 201 && regTourn.body.success === true, "POST /api/tournaments/register registers squad");

    // 9. Get Tournament Registrations
    const getTourns = await request({
      hostname: "localhost",
      port: 8080,
      path: `/api/tournaments/registrations/${testUserId}`,
      method: "GET"
    });
    assert(getTourns.status === 200 && getTourns.body.registrations.some(r => r.tournament_id === "apex-cyber-cup-2026"), "GET /api/tournaments/registrations/:userId returns registered tournaments");

    // 10. Post Review
    const postRev = await request({
      hostname: "localhost",
      port: 8080,
      path: "/api/reviews",
      method: "POST",
      headers: { "Content-Type": "application/json" }
    }, {
      gameId: "cyber-odyssey-2099",
      authorId: testUserId,
      authorName: "CyberPhantom_X",
      rating: 5,
      content: "Revolutionary graphics and sublime combat mechanics. 10/10."
    });
    assert(postRev.status === 201 && postRev.body.review.rating == 5, "POST /api/reviews saves review to Neon DB");

    // 11. Get Reviews
    const getRevs = await request({
      hostname: "localhost",
      port: 8080,
      path: "/api/reviews/cyber-odyssey-2099",
      method: "GET"
    });
    assert(getRevs.status === 200 && getRevs.body.reviews.length > 0, "GET /api/reviews/:gameId retrieves submitted reviews");

    // Cleanup test record
    const { pool } = require("../server/db");
    await pool.query("DELETE FROM public.profiles WHERE id = $1", [testUserId]);
    await pool.end();
    console.log("  ✓ Test operative cleaned up from Neon DB");

    console.log("\n=======================================================");
    console.log(`API Route Test Results: ${passed} passed, ${failed} failed.`);
    console.log("=======================================================");

    if (failed > 0) process.exit(1);
    process.exit(0);
  } catch (err) {
    console.error("API route testing failed:", err);
    process.exit(1);
  }
}

testAllRoutes();
