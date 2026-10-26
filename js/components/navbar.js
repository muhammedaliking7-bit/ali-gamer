/**
 * NEXUS REALM - Real Auth-Aware Navigation Bar Component
 */

const NexusNavbar = {
  render() {
    const user = window.nexusState.currentUser || { isLoggedIn: false };
    const soundEnabled = window.nexusState.soundEnabled;
    const wishlistCount = (window.nexusState.favorites && window.nexusState.favorites.length) || 0;

    return `
      <nav id="navbar">
        <div class="container nav-container">
          <!-- Brand Logo -->
          <a href="#home" class="brand-logo" id="nav-brand">
            <div class="brand-icon">
              <svg viewBox="0 0 24 24">
                <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round" />
                <polygon points="12,6 18,9.5 18,14.5 12,18 6,14.5 6,9.5" fill="currentColor" />
              </svg>
            </div>
            <div class="brand-name">
              <span>NEXUS</span><span>REALM</span>
            </div>
          </a>

          <!-- Desktop Navigation Links -->
          <ul class="nav-menu">
            <li><a href="#home" class="nav-link" data-route="home">Home</a></li>
            <li><a href="#games" class="nav-link" data-route="games">Games</a></li>
            <li><a href="#news" class="nav-link" data-route="news">News</a></li>
            <li><a href="#tournaments" class="nav-link" data-route="tournaments">Tournaments</a></li>
            <li><a href="#community" class="nav-link" data-route="community">Community</a></li>
            <li><a href="#about" class="nav-link" data-route="about">About Us</a></li>
            <li><a href="#contact" class="nav-link" data-route="contact">Contact</a></li>
          </ul>

          <!-- Nav Actions -->
          <div class="nav-actions">
            <!-- Quick Search Palette Trigger -->
            <button class="nav-search-btn" id="search-modal-trigger" title="Quick Search (Ctrl + K)">
              <i data-lucide="search" style="width: 16px; height: 16px;"></i>
              <span class="desktop-only" style="font-family: var(--font-tech); font-weight: 600;">Search</span>
              <kbd>Ctrl K</kbd>
            </button>

            <!-- Audio Synthesizer SFX Toggle -->
            <button class="btn-icon-only ${soundEnabled ? 'active' : ''}" id="sound-toggle-btn" title="Toggle Cyber Audio FX">
              <i data-lucide="${soundEnabled ? 'volume-2' : 'volume-x'}"></i>
            </button>

            <!-- Wishlist Shortcut -->
            <a href="#profile?tab=wishlist" class="btn-icon-only" title="Your Wishlist" id="nav-wishlist-btn" style="position: relative;">
              <i data-lucide="heart"></i>
              ${wishlistCount > 0 ? `<span style="position: absolute; top: -4px; right: -4px; background: var(--red-cyber); color: white; font-size: 0.65rem; font-weight: 800; border-radius: 50%; width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 8px var(--red-glow);">${wishlistCount}</span>` : ''}
            </a>

            <!-- User Auth State -->
            ${user.isLoggedIn ? `
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <div class="user-menu-pill" id="nav-profile-pill" title="View Dossier">
                  <img src="${user.avatar}" alt="${user.gamertag}" class="user-avatar-sm" />
                  <span class="user-pill-tag">${user.gamertag}</span>
                  <span class="user-pill-lvl">LVL ${user.level}</span>
                </div>
                <button class="btn btn-secondary btn-sm desktop-only" id="nav-logout-btn" title="Sign Out" style="padding: 0.4rem 0.75rem;">
                  <i data-lucide="log-out" style="width: 14px; height: 14px;"></i>
                  <span>Exit</span>
                </button>
              </div>
            ` : `
              <div style="display: flex; gap: 0.5rem;">
                <a href="#auth?mode=login" class="btn btn-secondary btn-sm">Log In</a>
                <a href="#auth?mode=register" class="btn btn-cyan btn-sm">Sign Up</a>
              </div>
            `}

            <!-- Mobile Hamburger -->
            <button class="mobile-nav-toggle" id="mobile-menu-toggle" aria-label="Toggle Navigation">
              <i data-lucide="menu"></i>
            </button>
          </div>
        </div>

        <!-- Mobile Drawer Menu -->
        <div class="mobile-drawer" id="mobile-nav-drawer">
          <a href="#home" class="nav-link mobile-link" data-route="home">Home</a>
          <a href="#games" class="nav-link mobile-link" data-route="games">Games</a>
          <a href="#news" class="nav-link mobile-link" data-route="news">News</a>
          <a href="#tournaments" class="nav-link mobile-link" data-route="tournaments">Tournaments</a>
          <a href="#community" class="nav-link mobile-link" data-route="community">Community</a>
          <a href="#about" class="nav-link mobile-link" data-route="about">About Us</a>
          <a href="#contact" class="nav-link mobile-link" data-route="contact">Contact</a>
          ${user.isLoggedIn ? `
            <a href="#profile" class="nav-link mobile-link" data-route="profile">Operative Dossier (${user.gamertag})</a>
            <button id="mobile-logout-btn" class="btn btn-red btn-sm" style="margin-top: 1.5rem;">Log Out</button>
          ` : `
            <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-top: 1.5rem;">
              <a href="#auth?mode=login" class="btn btn-secondary btn-sm mobile-link">Log In</a>
              <a href="#auth?mode=register" class="btn btn-cyan btn-sm mobile-link">Enlist (Sign Up)</a>
            </div>
          `}
        </div>
      </nav>
    `;
  },

  attachEvents() {
    // Sound Toggle
    const soundBtn = document.getElementById("sound-toggle-btn");
    if (soundBtn) {
      soundBtn.onclick = () => {
        const isEnabled = window.nexusState.toggleSound();
        soundBtn.classList.toggle("active", isEnabled);
        soundBtn.innerHTML = `<i data-lucide="${isEnabled ? 'volume-2' : 'volume-x'}"></i>`;
        if (window.lucide) window.lucide.createIcons({ root: soundBtn });
      };
    }

    // Profile Pill Click -> Go to profile
    const profilePill = document.getElementById("nav-profile-pill");
    if (profilePill) {
      profilePill.onclick = () => {
        window.location.hash = "#profile";
      };
    }

    // Desktop Logout Button
    const desktopLogout = document.getElementById("nav-logout-btn");
    if (desktopLogout) {
      desktopLogout.onclick = async () => {
        await window.nexusState.logout();
        window.location.hash = "#home";
      };
    }

    // Mobile menu toggle
    const mobileToggle = document.getElementById("mobile-menu-toggle");
    const mobileDrawer = document.getElementById("mobile-nav-drawer");
    if (mobileToggle && mobileDrawer) {
      mobileToggle.onclick = () => {
        mobileDrawer.classList.toggle("open");
        const isOpen = mobileDrawer.classList.contains("open");
        mobileToggle.innerHTML = `<i data-lucide="${isOpen ? 'x' : 'menu'}"></i>`;
        if (window.lucide) window.lucide.createIcons({ root: mobileToggle });
      };

      // Close drawer when any mobile link is clicked
      document.querySelectorAll(".mobile-link").forEach(link => {
        link.onclick = () => {
          mobileDrawer.classList.remove("open");
          mobileToggle.innerHTML = `<i data-lucide="menu"></i>`;
          if (window.lucide) window.lucide.createIcons({ root: mobileToggle });
        };
      });
    }

    // Mobile logout button
    const mobileLogout = document.getElementById("mobile-logout-btn");
    if (mobileLogout) {
      mobileLogout.onclick = async () => {
        await window.nexusState.logout();
        mobileDrawer.classList.remove("open");
        window.location.hash = "#home";
      };
    }

    // Search Modal Trigger
    const searchTrigger = document.getElementById("search-modal-trigger");
    if (searchTrigger) {
      searchTrigger.onclick = () => {
        window.nexusModals.openSearch();
      };
    }

    // Keyboard shortcut Ctrl/Cmd + K
    window.onkeydown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        window.nexusModals.openSearch();
      }
    };

    // Scroll styling effect
    window.onscroll = () => {
      const nav = document.getElementById("navbar");
      if (nav) {
        if (window.scrollY > 30) {
          nav.classList.add("scrolled");
        } else {
          nav.classList.remove("scrolled");
        }
      }
    };
  },

  updateActiveRoute(route) {
    document.querySelectorAll(".nav-link").forEach(link => {
      const linkRoute = link.getAttribute("data-route");
      if (linkRoute === route) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }
};

window.NexusNavbar = NexusNavbar;
