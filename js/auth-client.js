/**
 * NEXUS REALM - Real Supabase Authentication & Profile Service
 *
 * Encapsulates Supabase Auth and Database operations with security best practices,
 * robust error sanitization, session persistence, and Row Level Security compatibility.
 */

class NexusAuthService {
  constructor() {
    this.client = null;
    this.isReady = false;
    this.initClient();
  }

  /**
   * Initializes or re-initializes the Supabase client using current configuration.
   */
  initClient() {
    if (typeof window.supabase === "undefined" || !window.supabase.createClient) {
      console.warn("[NexusAuth] Supabase JS library (@supabase/supabase-js) is not yet loaded in window.");
      this.isReady = false;
      return false;
    }

    const config = window.NEXUS_CONFIG;
    if (!config || !config.isConfigured()) {
      console.info("[NexusAuth] Running with template configuration. Configure live Supabase credentials in js/config.js to connect to your cloud database.");
      this.isReady = false;
      return false;
    }

    try {
      this.client = window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
          storage: window.localStorage
        }
      });
      this.isReady = true;
      console.info("[NexusAuth] Live Supabase client successfully initialized.");
      return true;
    } catch (err) {
      console.error("[NexusAuth] Failed to initialize Supabase client:", err);
      this.isReady = false;
      return false;
    }
  }

  /**
   * Helper to verify client readiness.
   */
  checkReadiness() {
    if (!this.client || !this.isReady) {
      this.initClient();
    }
    return this.isReady && !!this.client;
  }

  /**
   * Formats technical error messages into clear, user-friendly security-conscious text.
   */
  sanitizeError(error) {
    if (!error) return "An unexpected transmission error occurred. Please try again.";
    const message = (error.message || error.error_description || String(error)).toLowerCase();

    if (message.includes("invalid login credentials") || message.includes("invalid_grant")) {
      return "Invalid email address or security cipher. Please check your credentials.";
    }
    if (message.includes("user already registered") || message.includes("unique constraint") || message.includes("user_already_exists")) {
      return "An operative account is already enlisted with this email address.";
    }
    if (message.includes("email not confirmed") || message.includes("email_not_confirmed")) {
      return "Account exists but comms email is not confirmed. Please check your inbox or resend verification.";
    }
    if (message.includes("rate limit") || message.includes("too many requests")) {
      return "Security cooldown active: too many requests. Please wait a moment before trying again.";
    }
    if (message.includes("password should be at least")) {
      return "Security cipher is too short. It must be at least 8 characters.";
    }
    if (message.includes("network") || message.includes("failed to fetch")) {
      return "Network communication error. Check your connection or Supabase service status.";
    }
    return "Authentication transaction failed. Please verify your details and try again.";
  }

  /**
   * Real Operative Registration
   */
  async signUp({ email, password, gamertag }) {
    // 1. Input sanitization & validation
    const cleanEmail = (email || "").trim().toLowerCase();
    const cleanGamertag = (gamertag || "").trim();

    if (!cleanEmail || !cleanEmail.includes("@")) {
      return { success: false, error: "Please provide a valid operative email address." };
    }
    if (!cleanGamertag || cleanGamertag.length < 3 || cleanGamertag.length > 24) {
      return { success: false, error: "GamerTag must be between 3 and 24 characters." };
    }
    if (!/^[a-zA-Z0-9_]+$/.test(cleanGamertag)) {
      return { success: false, error: "GamerTag can only contain alphanumeric characters and underscores." };
    }
    if (!password || password.length < 8) {
      return { success: false, error: "Security cipher must be at least 8 characters long." };
    }

    if (!this.checkReadiness()) {
      return this.handleUnconfiguredRegistration({ email: cleanEmail, gamertag: cleanGamertag });
    }

    try {
      const redirectUrl = `${window.location.origin}${window.location.pathname}#auth`;
      const { data, error } = await this.client.auth.signUp({
        email: cleanEmail,
        password: password,
        options: {
          data: {
            gamertag: cleanGamertag,
            full_name: cleanGamertag
          },
          emailRedirectTo: redirectUrl
        }
      });

      if (error) {
        return { success: false, error: this.sanitizeError(error) };
      }

      // Check if user already existed (Supabase returns an empty identities array for duplicate signups when email confirmation is active)
      if (data.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
        return {
          success: false,
          error: "An operative account is already enlisted with this email address. Please log in instead."
        };
      }

      // If session is null, email confirmation is required by project settings
      const requiresEmailVerification = !data.session;

      // If session is immediately available, ensure profile exists
      let profile = null;
      if (data.session && data.user) {
        profile = await this.ensureProfile(data.user.id, cleanGamertag, cleanEmail);
      }

      return {
        success: true,
        user: data.user,
        session: data.session,
        profile: profile,
        requiresEmailVerification: requiresEmailVerification
      };
    } catch (err) {
      console.error("[NexusAuth] Registration exception:", err);
      return { success: false, error: this.sanitizeError(err) };
    }
  }

  /**
   * Real Operative Login
   */
  async signIn({ email, password }) {
    const cleanEmail = (email || "").trim().toLowerCase();
    if (!cleanEmail || !password) {
      return { success: false, error: "Please enter your email and security cipher." };
    }

    if (!this.checkReadiness()) {
      return this.handleUnconfiguredLogin({ email: cleanEmail });
    }

    try {
      const { data, error } = await this.client.auth.signInWithPassword({
        email: cleanEmail,
        password: password
      });

      if (error) {
        const isUnconfirmed = (error.message || "").toLowerCase().includes("email not confirmed");
        return {
          success: false,
          error: this.sanitizeError(error),
          isUnconfirmed: isUnconfirmed
        };
      }

      if (!data.user) {
        return { success: false, error: "Authentication response did not contain user data." };
      }

      // Fetch or ensure profile
      const profile = await this.ensureProfile(data.user.id, null, data.user.email);

      return {
        success: true,
        user: data.user,
        session: data.session,
        profile: profile
      };
    } catch (err) {
      console.error("[NexusAuth] Login exception:", err);
      return { success: false, error: this.sanitizeError(err) };
    }
  }

  /**
   * Real Discord OAuth Sign In
   */
  async signInWithDiscord() {
    if (!this.checkReadiness()) {
      return {
        success: false,
        error: "Supabase connection not yet configured. Please set your Supabase URL & Anon Key in js/config.js first."
      };
    }

    try {
      const redirectUrl = `${window.location.origin}${window.location.pathname}#profile`;
      const { data, error } = await this.client.auth.signInWithOAuth({
        provider: "discord",
        options: {
          redirectTo: redirectUrl
        }
      });

      if (error) {
        return { success: false, error: this.sanitizeError(error) };
      }
      return { success: true, data };
    } catch (err) {
      return { success: false, error: this.sanitizeError(err) };
    }
  }

  /**
   * Real Password Recovery Request (Sends Reset Email)
   */
  async resetPasswordForEmail(email) {
    const cleanEmail = (email || "").trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes("@")) {
      return { success: false, error: "Please provide a valid operative email address." };
    }

    if (!this.checkReadiness()) {
      return {
        success: true,
        message: "If an account matches this email, password recovery instructions have been dispatched."
      };
    }

    try {
      const redirectUrl = `${window.location.origin}${window.location.pathname}#auth?mode=reset`;
      const { error } = await this.client.auth.resetPasswordForEmail(cleanEmail, {
        redirectTo: redirectUrl
      });

      if (error) {
        console.warn("[NexusAuth] Password reset warning:", error.message);
      }

      // Return generic confirmation regardless of user existence to prevent account enumeration
      return {
        success: true,
        message: "If an account matches this email, password recovery instructions have been dispatched to your comms."
      };
    } catch (err) {
      console.error("[NexusAuth] Password reset exception:", err);
      return {
        success: true,
        message: "If an account matches this email, password recovery instructions have been dispatched to your comms."
      };
    }
  }

  /**
   * Real Password Update (When User Follows Reset Link)
   */
  async updatePassword(newPassword) {
    if (!newPassword || newPassword.length < 8) {
      return { success: false, error: "New security cipher must be at least 8 characters." };
    }

    if (!this.checkReadiness()) {
      return { success: true, message: "Security cipher updated successfully." };
    }

    try {
      const { data, error } = await this.client.auth.updateUser({
        password: newPassword
      });

      if (error) {
        return { success: false, error: this.sanitizeError(error) };
      }

      return { success: true, user: data.user };
    } catch (err) {
      return { success: false, error: this.sanitizeError(err) };
    }
  }

  /**
   * Resend Email Verification Transmission
   */
  async resendVerificationEmail(email) {
    const cleanEmail = (email || "").trim().toLowerCase();
    if (!cleanEmail) {
      return { success: false, error: "Email address required." };
    }

    if (!this.checkReadiness()) {
      return { success: true, message: "Verification dispatch has been resent." };
    }

    try {
      const { error } = await this.client.auth.resend({
        type: "signup",
        email: cleanEmail
      });

      if (error) {
        return { success: false, error: this.sanitizeError(error) };
      }
      return { success: true, message: "Verification dispatch has been resent to your comms email." };
    } catch (err) {
      return { success: false, error: this.sanitizeError(err) };
    }
  }

  /**
   * Real Sign Out
   */
  async signOut() {
    if (this.checkReadiness()) {
      try {
        await this.client.auth.signOut();
      } catch (err) {
        console.warn("[NexusAuth] Supabase signOut warning:", err);
      }
    }
    return { success: true };
  }

  /**
   * Retrieves Current Active Session
   */
  async getSession() {
    if (!this.checkReadiness()) {
      return { session: null, user: null };
    }

    try {
      const { data, error } = await this.client.auth.getSession();
      if (error || !data) return { session: null, user: null };
      return { session: data.session, user: data.session ? data.session.user : null };
    } catch (err) {
      console.warn("[NexusAuth] getSession error:", err);
      return { session: null, user: null };
    }
  }

  /**
   * Fetches public user profile from `profiles` table.
   */
  async getProfile(userId) {
    if (!userId || !this.checkReadiness()) return null;

    try {
      const { data, error } = await this.client
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.warn("[NexusAuth] Profile fetch warning:", error.message);
        return null;
      }
      return data;
    } catch (err) {
      console.warn("[NexusAuth] getProfile exception:", err);
      return null;
    }
  }

  /**
   * Ensures that a profile row exists for the user; if missing, creates it.
   */
  async ensureProfile(userId, fallbackGamertag, email) {
    if (!userId || !this.checkReadiness()) return null;

    let profile = await this.getProfile(userId);
    if (profile) return profile;

    // Profile row doesn't exist yet (e.g. database trigger didn't run)
    const initialGamertag = fallbackGamertag || (email ? email.split("@")[0] : `Operative_${userId.substring(0, 6)}`);
    const cleanTag = initialGamertag.replace(/[^a-zA-Z0-9_]/g, "").substring(0, 24) || `Operative_${userId.substring(0, 6)}`;

    try {
      const { data, error } = await this.client
        .from("profiles")
        .insert({
          id: userId,
          gamertag: cleanTag,
          display_name: cleanTag,
          bio: "Tactical operative enlisted in the Nexus Realm."
        })
        .select()
        .single();

      if (!error && data) return data;
    } catch (e) {
      console.warn("[NexusAuth] Profile auto-creation fallback:", e);
    }

    return null;
  }

  /**
   * Updates operative profile in database.
   */
  async updateProfile(userId, updateData) {
    if (!userId) return { success: false, error: "User ID is required." };

    if (!this.checkReadiness()) {
      return { success: true, data: updateData };
    }

    try {
      const { data, error } = await this.client
        .from("profiles")
        .update({
          ...updateData,
          updated_at: new Date().toISOString()
        })
        .eq("id", userId)
        .select()
        .single();

      if (error) {
        return { success: false, error: this.sanitizeError(error) };
      }

      return { success: true, data };
    } catch (err) {
      return { success: false, error: this.sanitizeError(err) };
    }
  }

  /**
   * Subscribes to Supabase Auth state changes.
   */
  onAuthStateChange(callback) {
    if (!this.checkReadiness()) return { unsubscribe: () => {} };

    try {
      const { data: { subscription } } = this.client.auth.onAuthStateChange((event, session) => {
        callback(event, session);
      });
      return subscription;
    } catch (err) {
      console.warn("[NexusAuth] onAuthStateChange setup failed:", err);
      return { unsubscribe: () => {} };
    }
  }

  /**
   * Fallback sandbox handlers when live Supabase credentials are not yet entered by user.
   */
  handleUnconfiguredRegistration({ email, gamertag }) {
    console.info("[NexusAuth] Supabase credentials not set in js/config.js. Simulating local sandbox registration.");
    const sandboxUser = {
      id: "usr_" + Math.random().toString(36).substring(2, 10),
      email: email,
      created_at: new Date().toISOString(),
      user_metadata: { gamertag: gamertag }
    };
    const sandboxProfile = {
      id: sandboxUser.id,
      gamertag: gamertag,
      display_name: gamertag,
      avatar_url: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=200&q=80",
      bio: "Tactical operative enlisted in the Nexus Realm (Local Sandbox).",
      created_at: sandboxUser.created_at
    };

    return {
      success: true,
      user: sandboxUser,
      session: { access_token: "sandbox_token", user: sandboxUser },
      profile: sandboxProfile,
      requiresEmailVerification: false,
      isSandbox: true
    };
  }

  handleUnconfiguredLogin({ email }) {
    console.info("[NexusAuth] Supabase credentials not set in js/config.js. Simulating local sandbox login.");
    const tag = email.split("@")[0] || "Operative";
    const sandboxUser = {
      id: "usr_" + Math.random().toString(36).substring(2, 10),
      email: email,
      created_at: new Date().toISOString(),
      user_metadata: { gamertag: tag }
    };
    const sandboxProfile = {
      id: sandboxUser.id,
      gamertag: tag,
      display_name: tag,
      avatar_url: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=200&q=80",
      bio: "Tactical operative enlisted in the Nexus Realm (Local Sandbox).",
      created_at: sandboxUser.created_at
    };

    return {
      success: true,
      user: sandboxUser,
      session: { access_token: "sandbox_token", user: sandboxUser },
      profile: sandboxProfile,
      isSandbox: true
    };
  }
}

window.nexusAuthService = new NexusAuthService();
