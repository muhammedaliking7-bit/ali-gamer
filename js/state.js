/**
 * NEXUS REALM - Global State Store & Event Bus
 *
 * Integrated with NexusAuthService for real session persistence,
 * user profile synchronization, and secure per-user storage.
 */

class NexusStateStore {
  constructor() {
    this.storageKeyPrefix = "nexus_gaming_";
    this.soundEnabled = localStorage.getItem(this.storageKeyPrefix + "sound") !== "false";
    
    // Auth Readiness flag
    this.isAuthReady = false;

    // Current User (default guest state until session resolves)
    this.currentUser = this.createGuestUser();

    // Custom Reviews submitted in this session
    this.reviews = this.loadReviews();

    // Audio synthesizer context
    this.audioCtx = null;
    this.initAudio();

    // Event listeners
    this.listeners = {};

    // Wishlists & Tournament Registrations per user
    this.favorites = [];
    this.registeredTournaments = [];

    // Initialize Auth Session Check
    this.initSession();
  }

  // Event bus
  on(event, callback) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(callback);
  }

  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(cb => cb(data));
    }
  }

  createGuestUser() {
    return {
      id: null,
      isLoggedIn: false,
      gamertag: "Guest",
      fullName: "Guest Operative",
      email: "",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
      level: 1,
      xp: 0,
      xpNext: 1000,
      tier: "Recruit",
      rankPoints: 0,
      globalRank: "--",
      winRate: "0%",
      kdRatio: "0.0",
      matchesPlayed: 0,
      bio: "Guest player exploring Nexus Realm.",
      badges: [],
      createdAt: null,
      emailConfirmed: false,
      linkedAccounts: {
        steam: { connected: false },
        discord: { connected: false },
        xbox: { connected: false },
        playstation: { connected: false }
      }
    };
  }

  /**
   * Initializes session from real backend provider.
   */
  async initSession() {
    if (window.nexusAuthService) {
      try {
        const { session, user } = await window.nexusAuthService.getSession();
        if (session && user) {
          const profile = await window.nexusAuthService.getProfile(user.id);
          this.applyAuthenticatedUser(user, profile);
        } else {
          // Check if there was a saved demo/guest session in localStorage
          const savedLocal = localStorage.getItem(this.storageKeyPrefix + "user");
          if (savedLocal) {
            try {
              const parsed = JSON.parse(savedLocal);
              // Only restore if user explicitly requested demo session in offline mode
              if (parsed && parsed.isLoggedIn && !window.NEXUS_CONFIG.isConfigured()) {
                this.currentUser = parsed;
              }
            } catch (e) {}
          }
        }

        // Setup real-time auth state listener
        window.nexusAuthService.onAuthStateChange(async (event, session) => {
          console.info("[NexusState] Auth State Change:", event);
          if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED" || event === "USER_UPDATED") {
            if (session && session.user) {
              const profile = await window.nexusAuthService.getProfile(session.user.id);
              this.applyAuthenticatedUser(session.user, profile);
            }
          } else if (event === "SIGNED_OUT") {
            this.handleLocalLogout();
          }
        });
      } catch (err) {
        console.warn("[NexusState] Session check error:", err);
      }
    }

    this.loadUserScopedData();
    this.isAuthReady = true;
    this.emit("auth_ready", this.currentUser);
  }

  /**
   * Updates state from authenticated Supabase user and profile.
   */
  applyAuthenticatedUser(user, profile) {
    const gamertag = (profile && profile.gamertag) || (user.user_metadata && user.user_metadata.gamertag) || user.email.split("@")[0];
    const displayName = (profile && profile.display_name) || (user.user_metadata && user.user_metadata.full_name) || gamertag;
    const avatar = (profile && profile.avatar_url) || (user.user_metadata && user.user_metadata.avatar_url) || "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=200&q=80";
    const bio = (profile && profile.bio) || "Tactical operative enlisted in the Nexus Realm.";
    const createdAt = (profile && profile.created_at) || user.created_at;

    this.currentUser = {
      id: user.id,
      isLoggedIn: true,
      gamertag: gamertag,
      fullName: displayName,
      email: user.email,
      avatar: avatar,
      bio: bio,
      level: 48,
      xp: 8450,
      xpNext: 10000,
      tier: "Grandmaster",
      rankPoints: 14890,
      globalRank: 1,
      winRate: "78.4%",
      kdRatio: "4.82",
      matchesPlayed: 1240,
      badges: [
        { name: "Verified Operative", icon: "shield-check", color: "cyan" },
        { name: "Championship Circuit", icon: "trophy", color: "purple" },
        { name: "Alpha Sentinel", icon: "cpu", color: "red" }
      ],
      createdAt: createdAt,
      emailConfirmed: !!user.email_confirmed_at,
      linkedAccounts: {
        steam: { connected: false },
        discord: { connected: !!(user.app_metadata && user.app_metadata.provider === "discord") },
        xbox: { connected: false },
        playstation: { connected: false }
      }
    };

    this.loadUserScopedData();
    this.emit("user_updated", this.currentUser);
  }

  /**
   * Loads Wishlist & Tournaments scoped to current authenticated user ID
   * to guarantee data isolation between different accounts, synced with Neon PostgreSQL.
   */
  async loadUserScopedData() {
    const userScope = this.currentUser && this.currentUser.id ? `_${this.currentUser.id}` : "_guest";
    
    // Favorites
    const savedFavs = localStorage.getItem(this.storageKeyPrefix + "favorites" + userScope);
    this.favorites = savedFavs ? JSON.parse(savedFavs) : ["cyber-odyssey-2099", "valkyrie-protocol"];

    // Tournament Registrations
    const savedRegs = localStorage.getItem(this.storageKeyPrefix + "registrations" + userScope);
    this.registeredTournaments = savedRegs ? JSON.parse(savedRegs) : ["cyber-masters-invitational-2026"];

    // Async sync with Neon PostgreSQL backend
    if (this.currentUser && this.currentUser.id && window.nexusNeonClient) {
      try {
        const [dbFavs, dbRegs] = await Promise.all([
          window.nexusNeonClient.getFavorites(this.currentUser.id),
          window.nexusNeonClient.getRegistrations(this.currentUser.id)
        ]);
        if (Array.isArray(dbFavs) && dbFavs.length > 0) {
          this.favorites = Array.from(new Set([...this.favorites, ...dbFavs]));
          this.saveUserScopedData();
          this.emit("favorites_updated", this.favorites);
        }
        if (Array.isArray(dbRegs) && dbRegs.length > 0) {
          this.registeredTournaments = Array.from(new Set([...this.registeredTournaments, ...dbRegs]));
          this.saveUserScopedData();
          this.emit("registrations_updated", this.registeredTournaments);
        }
      } catch (err) {
        console.warn("[NexusState] Neon sync error:", err);
      }
    }
  }

  saveUserScopedData() {
    const userScope = this.currentUser && this.currentUser.id ? `_${this.currentUser.id}` : "_guest";
    localStorage.setItem(this.storageKeyPrefix + "favorites" + userScope, JSON.stringify(this.favorites));
    localStorage.setItem(this.storageKeyPrefix + "registrations" + userScope, JSON.stringify(this.registeredTournaments));
  }

  /**
   * Called upon successful login or registration.
   */
  async login(session, user, profile) {
    if (user) {
      this.applyAuthenticatedUser(user, profile);
      this.playSound("login");
      this.showToast(`Terminal Clearance Granted. Welcome, Commander ${this.currentUser.gamertag}!`, "success", "check-circle");

      // Sync profile to Neon PostgreSQL
      if (window.nexusNeonClient && user.id) {
        try {
          await window.nexusNeonClient.saveProfile({
            id: user.id,
            email: user.email,
            gamertag: this.currentUser.gamertag,
            displayName: this.currentUser.fullName,
            avatarUrl: this.currentUser.avatar,
            bio: this.currentUser.bio
          });
        } catch (e) {
          console.warn("[NexusState] Neon profile sync on login:", e.message);
        }
      }
    }
  }

  /**
   * Real Logout flow.
   */
  async logout() {
    this.playSound("logout");
    if (window.nexusAuthService) {
      await window.nexusAuthService.signOut();
    }
    this.handleLocalLogout();
    this.showToast("Operative logged out. Terminal session terminated.", "info", "log-out");
  }

  handleLocalLogout() {
    this.currentUser = this.createGuestUser();
    localStorage.removeItem(this.storageKeyPrefix + "user");
    this.loadUserScopedData();
    this.emit("user_updated", this.currentUser);
    this.emit("auth_state_changed", { isLoggedIn: false });
  }

  /**
   * Update Profile in state and database (Supabase + Neon PostgreSQL).
   */
  async updateProfile(data) {
    const updated = { ...this.currentUser, ...data };
    this.currentUser = updated;

    const dbPayload = {};
    if (data.gamertag) dbPayload.gamertag = data.gamertag;
    if (data.fullName) dbPayload.displayName = data.fullName;
    if (data.avatar) dbPayload.avatarUrl = data.avatar;
    if (data.bio) dbPayload.bio = data.bio;

    // Sync to Supabase Auth profile if present
    if (window.nexusAuthService && this.currentUser.id) {
      const supaPayload = {};
      if (data.gamertag) supaPayload.gamertag = data.gamertag;
      if (data.fullName) supaPayload.display_name = data.fullName;
      if (data.avatar) supaPayload.avatar_url = data.avatar;
      if (data.bio) supaPayload.bio = data.bio;
      try {
        await window.nexusAuthService.updateProfile(this.currentUser.id, supaPayload);
      } catch (e) {}
    }

    // Sync to Neon PostgreSQL
    if (window.nexusNeonClient && this.currentUser.id) {
      try {
        await window.nexusNeonClient.saveProfile({
          id: this.currentUser.id,
          email: this.currentUser.email,
          ...dbPayload
        });
      } catch (err) {
        console.warn("[NexusState] Neon updateProfile error:", err);
      }
    }

    this.saveUserScopedData();
    this.playSound("success");
    this.showToast("Gamer Profile updated successfully!", "success", "check");
    this.emit("user_updated", this.currentUser);
  }

  // Wishlist / Favorites
  toggleFavorite(gameId) {
    const index = this.favorites.indexOf(gameId);
    let isAdded = false;
    if (index > -1) {
      this.favorites.splice(index, 1);
      this.playSound("click");
      this.showToast("Removed from Wishlist", "info", "bookmark-minus");
      if (window.nexusNeonClient && this.currentUser.id) {
        window.nexusNeonClient.removeFavorite(this.currentUser.id, gameId);
      }
    } else {
      this.favorites.push(gameId);
      isAdded = true;
      this.playSound("favorite");
      this.showToast("Added to your Wishlist!", "success", "heart");
      if (window.nexusNeonClient && this.currentUser.id) {
        window.nexusNeonClient.addFavorite(this.currentUser.id, gameId);
      }
    }
    this.saveUserScopedData();
    this.emit("favorites_updated", this.favorites);
    return isAdded;
  }

  isFavorite(gameId) {
    return this.favorites.includes(gameId);
  }

  // Tournaments Registration
  registerForTournament(tournamentId, squadName) {
    if (!this.registeredTournaments.includes(tournamentId)) {
      this.registeredTournaments.push(tournamentId);
      this.saveUserScopedData();
      this.playSound("tournament");
      this.showToast(`Successfully registered ${squadName || "Squad"}! Check your email for tournament briefing.`, "success", "trophy");
      this.emit("registrations_updated", this.registeredTournaments);

      if (window.nexusNeonClient && this.currentUser.id) {
        window.nexusNeonClient.registerTournament(this.currentUser.id, tournamentId, squadName || "Alpha Squad");
      }
      return true;
    }
    this.showToast("You are already registered for this tournament.", "warning", "alert-circle");
    return false;
  }

  isRegisteredForTournament(tournamentId) {
    return this.registeredTournaments.includes(tournamentId);
  }

  // User reviews
  loadReviews() {
    const saved = localStorage.getItem(this.storageKeyPrefix + "reviews");
    return saved ? JSON.parse(saved) : {};
  }

  addReview(gameId, review) {
    if (!this.reviews[gameId]) this.reviews[gameId] = [];
    const newRev = {
      ...review,
      id: "rev_" + Date.now(),
      author: this.currentUser.gamertag,
      avatar: this.currentUser.avatar,
      date: "Just now"
    };
    this.reviews[gameId].unshift(newRev);
    localStorage.setItem(this.storageKeyPrefix + "reviews", JSON.stringify(this.reviews));

    // Sync to Neon PostgreSQL
    if (window.nexusNeonClient) {
      window.nexusNeonClient.submitReview({
        gameId,
        authorId: this.currentUser.id || null,
        authorName: this.currentUser.gamertag,
        authorAvatar: this.currentUser.avatar,
        rating: review.rating || 5,
        content: review.content || ""
      });
    }

    this.playSound("success");
    this.showToast("Review submitted successfully! Thank you for your feedback.", "success", "message-square");
    this.emit("reviews_updated", { gameId, reviews: this.reviews[gameId] });
  }

  getReviews(gameId) {
    return this.reviews[gameId] || [];
  }

  // Audio Synthesizer (Zero-dependency Web Audio API)
  initAudio() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.audioCtx = new AudioCtx();
      }
    } catch (e) {
      console.warn("AudioContext not supported or blocked");
    }
  }

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    localStorage.setItem(this.storageKeyPrefix + "sound", this.soundEnabled);
    this.emit("sound_toggled", this.soundEnabled);
    if (this.soundEnabled) {
      this.playSound("click");
      this.showToast("Cyber Audio: ENABLED", "info", "volume-2");
    } else {
      this.showToast("Cyber Audio: MUTED", "info", "volume-x");
    }
    return this.soundEnabled;
  }

  playSound(type) {
    if (!this.soundEnabled || !this.audioCtx) return;
    try {
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      if (type === "click") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.05);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === "hover") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(540, now);
        osc.frequency.exponentialRampToValueAtTime(620, now + 0.04);
        gain.gain.setValueAtTime(0.02, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.start(now);
        osc.stop(now + 0.04);
      } else if (type === "favorite") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.15);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (type === "tournament" || type === "success" || type === "login") {
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
          const o = this.audioCtx.createOscillator();
          const g = this.audioCtx.createGain();
          o.connect(g);
          g.connect(this.audioCtx.destination);
          o.type = "sine";
          o.frequency.setValueAtTime(freq, now + idx * 0.06);
          g.gain.setValueAtTime(0.06, now + idx * 0.06);
          g.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 0.25);
          o.start(now + idx * 0.06);
          o.stop(now + idx * 0.06 + 0.26);
        });
      } else if (type === "logout") {
        [659.25, 523.25, 392].forEach((freq, idx) => {
          const o = this.audioCtx.createOscillator();
          const g = this.audioCtx.createGain();
          o.connect(g);
          g.connect(this.audioCtx.destination);
          o.type = "sine";
          o.frequency.setValueAtTime(freq, now + idx * 0.08);
          g.gain.setValueAtTime(0.05, now + idx * 0.08);
          g.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.2);
          o.start(now + idx * 0.08);
          o.stop(now + idx * 0.08 + 0.21);
        });
      }
    } catch (e) {
      // Audio autoplay policy or error
    }
  }

  // Toast System
  showToast(message, type = "info", iconName = "info") {
    let container = document.getElementById("toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "toast-container";
      container.className = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `cyber-toast toast-${type}`;
    toast.innerHTML = `
      <div class="toast-indicator"></div>
      <div class="toast-content">
        <i data-lucide="${iconName}" class="toast-icon"></i>
        <div class="toast-message">${message}</div>
      </div>
      <button class="toast-close" aria-label="Close notification">&times;</button>
    `;

    container.appendChild(toast);
    if (window.lucide) window.lucide.createIcons({ root: toast });

    const removeToast = () => {
      toast.classList.add("toast-hiding");
      setTimeout(() => toast.remove(), 300);
    };

    toast.querySelector(".toast-close").addEventListener("click", removeToast);
    setTimeout(removeToast, 4500);
  }
}

// Global instance
window.nexusState = new NexusStateStore();
