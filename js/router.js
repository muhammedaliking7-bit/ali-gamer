/**
 * NEXUS REALM - Client-Side Hash Router
 */

class NexusRouter {
  constructor() {
    this.routes = {
      'home': window.HomeView,
      'games': window.GamesView,
      'game-detail': window.GameDetailsView,
      'game': window.GameDetailsView,
      'news': window.NewsView,
      'news-article': window.NewsArticleView,
      'article': window.NewsArticleView,
      'tournaments': window.TournamentsView,
      'community': window.CommunityView,
      'about': window.AboutView,
      'contact': window.ContactView,
      'auth': window.AuthView,
      'profile': window.ProfileView
    };

    this.defaultRoute = 'home';
    this.contentEl = null;
  }

  init() {
    this.contentEl = document.getElementById("main-content");

    window.addEventListener("hashchange", () => {
      this.handleRoute();
    });

    // Re-render when authenticated user state changes
    if (window.nexusState) {
      window.nexusState.on("user_updated", () => {
        const { path } = this.getRouteInfo();
        // If on profile or auth page, refresh view
        if (path === "profile" || path === "auth") {
          this.handleRoute();
        } else {
          // Otherwise update navbar
          const navContainer = document.getElementById("nav-root");
          if (navContainer && window.NexusNavbar) {
            navContainer.innerHTML = window.NexusNavbar.render();
            window.NexusNavbar.attachEvents();
            window.NexusNavbar.updateActiveRoute(this.normalizeRouteName(path));
            if (window.lucide) window.lucide.createIcons({ root: navContainer });
          }
        }
      });

      window.nexusState.on("auth_ready", () => {
        this.handleRoute();
      });
    }

    // Handle initial route
    this.handleRoute();
  }

  getRouteInfo() {
    let hash = window.location.hash.slice(1) || this.defaultRoute;

    // Detect Supabase Auth recovery redirect (e.g. #access_token=...&type=recovery)
    if (hash.includes("type=recovery") || hash.includes("type=invite")) {
      return { path: "auth", params: { mode: "reset" } };
    }

    let [path, queryString] = hash.split("?");
    path = path.toLowerCase().trim();

    const params = {};
    if (queryString) {
      const searchParams = new URLSearchParams(queryString);
      for (const [key, value] of searchParams.entries()) {
        params[key] = value;
      }
    }

    return { path, params };
  }

  getParams() {
    return this.getRouteInfo().params;
  }

  handleRoute() {
    if (!this.contentEl) this.contentEl = document.getElementById("main-content");
    const { path, params } = this.getRouteInfo();

    const view = this.routes[path] || this.routes[this.defaultRoute];
    const normalizedRouteName = this.normalizeRouteName(path);

    // Update Navbar active link
    if (window.NexusNavbar) {
      window.NexusNavbar.updateActiveRoute(normalizedRouteName);
    }

    // Scroll smoothly to top
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Render View with transition
    if (this.contentEl && view) {
      this.contentEl.style.opacity = '0';
      this.contentEl.style.transform = 'translateY(8px)';
      this.contentEl.style.transition = 'opacity 0.2s ease, transform 0.2s ease';

      setTimeout(() => {
        this.contentEl.innerHTML = view.render(params);
        if (view.attachEvents) view.attachEvents(params);

        // Re-initialize Lucide Icons
        if (window.lucide) {
          window.lucide.createIcons({ root: this.contentEl });
        }

        // Re-render Navbar to reflect state changes (like wishlist counter or profile avatar)
        const navContainer = document.getElementById("nav-root");
        if (navContainer && window.NexusNavbar) {
          navContainer.innerHTML = window.NexusNavbar.render();
          window.NexusNavbar.attachEvents();
          window.NexusNavbar.updateActiveRoute(normalizedRouteName);
          if (window.lucide) window.lucide.createIcons({ root: navContainer });
        }

        this.contentEl.style.opacity = '1';
        this.contentEl.style.transform = 'translateY(0)';
      }, 50);
    }
  }

  normalizeRouteName(path) {
    if (path.startsWith('game')) return 'games';
    if (path.startsWith('news') || path.startsWith('article')) return 'news';
    return path;
  }
}

window.nexusRouter = new NexusRouter();
