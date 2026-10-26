/**
 * NEXUS REALM - Master Environment & Supabase Configuration
 *
 * Configure your Supabase project credentials here or dynamically via
 * the in-app Configuration Terminal modal.
 *
 * NEVER put your service_role secret key here! Only the public anon key.
 */

(function () {
  const STORAGE_KEY_URL = "nexus_supabase_url";
  const STORAGE_KEY_KEY = "nexus_supabase_anon_key";

  // Default placeholders - replace with your live Supabase project credentials
  // or set them dynamically in the app interface.
  const DEFAULT_SUPABASE_URL = "https://your-project-id.supabase.co";
  const DEFAULT_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your-anon-public-key";

  const savedUrl = localStorage.getItem(STORAGE_KEY_URL);
  const savedKey = localStorage.getItem(STORAGE_KEY_KEY);

  const activeUrl = savedUrl && savedUrl.trim() !== "" ? savedUrl.trim() : DEFAULT_SUPABASE_URL;
  const activeKey = savedKey && savedKey.trim() !== "" ? savedKey.trim() : DEFAULT_SUPABASE_ANON_KEY;

  window.NEXUS_CONFIG = {
    supabaseUrl: activeUrl,
    supabaseAnonKey: activeKey,

    /**
     * Checks if Supabase credentials have been configured with a non-placeholder value.
     */
    isConfigured() {
      const url = this.supabaseUrl || "";
      const key = this.supabaseAnonKey || "";

      const isPlaceholderUrl =
        !url ||
        url.includes("your-project-id") ||
        url.includes("YOUR_SUPABASE") ||
        !url.startsWith("https://");

      const isPlaceholderKey =
        !key ||
        key.includes("your-anon-public-key") ||
        key.includes("YOUR_SUPABASE") ||
        key.length < 20;

      return !isPlaceholderUrl && !isPlaceholderKey;
    },

    /**
     * Allows updating the credentials at runtime (saved to localStorage).
     */
    updateCredentials(url, key) {
      if (url && url.trim()) {
        this.supabaseUrl = url.trim();
        localStorage.setItem(STORAGE_KEY_URL, url.trim());
      }
      if (key && key.trim()) {
        this.supabaseAnonKey = key.trim();
        localStorage.setItem(STORAGE_KEY_KEY, key.trim());
      }

      if (window.nexusAuthService) {
        window.nexusAuthService.initClient();
      }

      window.dispatchEvent(new CustomEvent("nexus_config_updated", {
        detail: { configured: this.isConfigured() }
      }));
    },

    /**
     * Resets custom credentials back to default.
     */
    resetCredentials() {
      localStorage.removeItem(STORAGE_KEY_URL);
      localStorage.removeItem(STORAGE_KEY_KEY);
      this.supabaseUrl = DEFAULT_SUPABASE_URL;
      this.supabaseAnonKey = DEFAULT_SUPABASE_ANON_KEY;

      if (window.nexusAuthService) {
        window.nexusAuthService.initClient();
      }

      window.dispatchEvent(new CustomEvent("nexus_config_updated", {
        detail: { configured: false }
      }));
    }
  };
})();
