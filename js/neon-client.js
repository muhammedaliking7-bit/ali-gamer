/**
 * NEXUS REALM - Neon Database & API Client
 *
 * Secure client-side bridge that communicates with the backend
 * API connecting directly to Neon PostgreSQL.
 */
(function() {
  class NexusNeonClient {
    constructor() {
      this.baseUrl = window.location.origin;
    }

    async getHealth() {
      try {
        const res = await fetch(`${this.baseUrl}/api/health`);
        return await res.json();
      } catch (e) {
        return { status: "offline", error: e.message };
      }
    }

    async getProfile(userId) {
      if (!userId) return null;
      try {
        const res = await fetch(`${this.baseUrl}/api/profiles/${encodeURIComponent(userId)}`);
        if (!res.ok) return null;
        const data = await res.json();
        return data.profile || null;
      } catch (e) {
        console.warn("[NeonClient] getProfile error:", e.message);
        return null;
      }
    }

    async saveProfile(payload) {
      try {
        const res = await fetch(`${this.baseUrl}/api/profiles`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Profile save failed");
        return data.profile;
      } catch (e) {
        console.warn("[NeonClient] saveProfile error:", e.message);
        throw e;
      }
    }

    async getFavorites(userId) {
      if (!userId) return [];
      try {
        const res = await fetch(`${this.baseUrl}/api/favorites/${encodeURIComponent(userId)}`);
        if (!res.ok) return [];
        const data = await res.json();
        return data.favorites || [];
      } catch (e) {
        console.warn("[NeonClient] getFavorites error:", e.message);
        return [];
      }
    }

    async addFavorite(userId, gameId) {
      if (!userId || !gameId) return false;
      try {
        const res = await fetch(`${this.baseUrl}/api/favorites`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, gameId })
        });
        return res.ok;
      } catch (e) {
        console.warn("[NeonClient] addFavorite error:", e.message);
        return false;
      }
    }

    async removeFavorite(userId, gameId) {
      if (!userId || !gameId) return false;
      try {
        const res = await fetch(`${this.baseUrl}/api/favorites`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, gameId })
        });
        return res.ok;
      } catch (e) {
        console.warn("[NeonClient] removeFavorite error:", e.message);
        return false;
      }
    }

    async getRegistrations(userId) {
      if (!userId) return [];
      try {
        const res = await fetch(`${this.baseUrl}/api/tournaments/registrations/${encodeURIComponent(userId)}`);
        if (!res.ok) return [];
        const data = await res.json();
        return data.registrations ? data.registrations.map(r => r.tournament_id) : [];
      } catch (e) {
        console.warn("[NeonClient] getRegistrations error:", e.message);
        return [];
      }
    }

    async registerTournament(userId, tournamentId, squadName) {
      if (!userId || !tournamentId) return false;
      try {
        const res = await fetch(`${this.baseUrl}/api/tournaments/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, tournamentId, squadName })
        });
        return res.ok;
      } catch (e) {
        console.warn("[NeonClient] registerTournament error:", e.message);
        return false;
      }
    }

    async getReviews(gameId) {
      try {
        const res = await fetch(`${this.baseUrl}/api/reviews/${encodeURIComponent(gameId)}`);
        if (!res.ok) return [];
        const data = await res.json();
        return data.reviews || [];
      } catch (e) {
        console.warn("[NeonClient] getReviews error:", e.message);
        return [];
      }
    }

    async submitReview(review) {
      try {
        const res = await fetch(`${this.baseUrl}/api/reviews`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(review)
        });
        return await res.json();
      } catch (e) {
        console.warn("[NeonClient] submitReview error:", e.message);
        return null;
      }
    }

    async submitContact(contact) {
      try {
        const res = await fetch(`${this.baseUrl}/api/contact`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(contact)
        });
        return await res.json();
      } catch (e) {
        console.warn("[NeonClient] submitContact error:", e.message);
        return null;
      }
    }
  }

  window.nexusNeonClient = new NexusNeonClient();
})();
