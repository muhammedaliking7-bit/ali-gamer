/**
 * NEXUS REALM - Real Authenticated User Gaming Profile View
 */

const ProfileView = {
  activeTab: 'overview',

  render(params = {}) {
    if (params.tab) this.activeTab = params.tab;

    // 1. Loading state while session resolves
    if (!window.nexusState.isAuthReady) {
      return `
        <div class="container" style="padding: 8rem 1.5rem; text-align: center;">
          <div style="display: inline-block; width: 48px; height: 48px; border: 3px solid rgba(0, 240, 255, 0.2); border-radius: 50%; border-top-color: var(--cyan-primary); animation: cyberSpin 0.8s linear infinite; margin-bottom: 1.5rem;"></div>
          <h2 style="font-size: 1.4rem; color: #fff; font-family: var(--font-display);">Authenticating Clearance Matrix...</h2>
          <p style="color: var(--text-secondary); font-size: 0.9rem;">Connecting to Supabase databank and restoring security credentials</p>
        </div>
      `;
    }

    const user = window.nexusState.currentUser;

    // 2. Protected Route enforcement when not authenticated
    if (!user || !user.isLoggedIn) {
      return `
        <div class="container" style="padding: 6rem 1.5rem; text-align: center;">
          <div class="glass-panel" style="max-width: 520px; margin: 0 auto; padding: 3rem; border-color: var(--border-purple); box-shadow: var(--shadow-lg), 0 0 50px rgba(168, 85, 247, 0.2);">
            <div style="width: 64px; height: 64px; border-radius: 50%; background: rgba(168, 85, 247, 0.15); border: 2px solid var(--purple-primary); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; box-shadow: 0 0 25px var(--purple-glow);">
              <i data-lucide="lock" style="width: 32px; height: 32px; color: var(--purple-primary);"></i>
            </div>
            <h2 style="font-size: 1.8rem; margin-bottom: 0.75rem; color: #fff;">Terminal Access Restricted</h2>
            <p style="color: var(--text-secondary); margin-bottom: 2rem; font-size: 0.95rem; line-height: 1.6;">
              Operative dossier and tournament metrics are protected by Sentinel Row Level Security. Please authenticate your credentials to access your dashboard.
            </p>
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
              <a href="#auth?mode=login" class="btn btn-cyan btn-lg">
                <i data-lucide="log-in"></i>
                <span>Log In</span>
              </a>
              <a href="#auth?mode=register" class="btn btn-secondary btn-lg">
                <i data-lucide="user-plus"></i>
                <span>Enlist (Sign Up)</span>
              </a>
            </div>
          </div>
        </div>
      `;
    }

    const xpPercent = Math.round((user.xp / user.xpNext) * 100);
    const wishlistGames = NEXUS_DATA.games.filter(g => window.nexusState.isFavorite(g.id));
    const registeredTourneys = NEXUS_DATA.tournaments.filter(t => window.nexusState.isRegisteredForTournament(t.id));
    
    // Format join date
    let formattedDate = "Recent Enlistment";
    if (user.createdAt) {
      try {
        const d = new Date(user.createdAt);
        formattedDate = d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
      } catch (e) {}
    }

    return `
      <div class="profile-page" style="padding: 2rem 0 6rem;">
        <div class="container">
          
          <!-- Profile Cover & Identity Hero -->
          <div class="profile-hero glass-panel">
            <div class="profile-cover"></div>

            <div class="profile-bar">
              <div style="display: flex; align-items: flex-end; gap: 1.5rem; flex-wrap: wrap;">
                <div class="profile-avatar-wrap">
                  <img src="${user.avatar}" alt="${user.gamertag}" id="profile-display-avatar" />
                </div>

                <div>
                  <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.35rem; flex-wrap: wrap;">
                    <h1 style="font-size: 2.1rem; margin-bottom: 0; color: #fff;">${user.gamertag}</h1>
                    <span class="badge badge-goty">★ ${user.tier}</span>
                    <span class="badge badge-popular">LVL ${user.level}</span>
                    ${user.emailConfirmed ? `
                      <span class="badge" style="background: rgba(16, 185, 129, 0.15); color: var(--emerald-accent); border: 1px solid var(--emerald-accent);">
                        <i data-lucide="check" style="width: 12px; height: 12px; margin-right: 2px;"></i> Verified
                      </span>
                    ` : `
                      <span class="badge" style="background: rgba(251, 191, 36, 0.15); color: var(--gold-accent); border: 1px solid var(--gold-accent);">
                        Unconfirmed Comms
                      </span>
                    `}
                  </div>
                  <div style="font-size: 0.9rem; color: var(--text-muted); display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
                    <span><strong>Operative:</strong> ${user.fullName || user.gamertag}</span>
                    <span>&bull;</span>
                    <span><strong>Comms:</strong> ${user.email}</span>
                    <span>&bull;</span>
                    <span><strong>Enlisted:</strong> ${formattedDate}</span>
                  </div>
                </div>
              </div>

              <!-- Profile Quick Actions -->
              <div style="display: flex; gap: 0.75rem; align-items: center;">
                <button class="btn btn-secondary btn-sm" onclick="window.nexusModals.openEditProfile()">
                  <i data-lucide="edit-3"></i>
                  <span>Edit Identity</span>
                </button>
                <button class="btn btn-red btn-sm" id="profile-logout-btn">
                  <i data-lucide="log-out"></i>
                  <span>Log Out</span>
                </button>
              </div>
            </div>

            <!-- XP Progression Strip -->
            <div style="padding: 1.25rem 2.5rem; background: rgba(0,0,0,0.3); border-top: 1px solid var(--border-subtle);">
              <div style="display: flex; justify-content: space-between; font-family: var(--font-tech); font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.4rem;">
                <span>Progression to Level ${user.level + 1}</span>
                <span style="font-weight: 700; color: var(--cyan-primary);">${user.xp.toLocaleString()} / ${user.xpNext.toLocaleString()} XP (${xpPercent}%)</span>
              </div>
              <div class="slots-track" style="height: 8px;">
                <div class="slots-fill" style="width: ${xpPercent}%;"></div>
              </div>
            </div>
          </div>

          <!-- Profile Navigation Tabs -->
          <div class="filter-bar" style="margin-bottom: 2.5rem;">
            <div class="filter-chips">
              <button class="filter-chip ${this.activeTab === 'overview' ? 'active' : ''}" data-ptab="overview">
                <i data-lucide="activity" style="width: 14px; height: 14px; margin-right: 4px;"></i>
                Career Overview
              </button>
              <button class="filter-chip ${this.activeTab === 'wishlist' ? 'active' : ''}" data-ptab="wishlist">
                <i data-lucide="heart" style="width: 14px; height: 14px; margin-right: 4px;"></i>
                Wishlist (${wishlistGames.length})
              </button>
              <button class="filter-chip ${this.activeTab === 'tournaments' ? 'active' : ''}" data-ptab="tournaments">
                <i data-lucide="trophy" style="width: 14px; height: 14px; margin-right: 4px;"></i>
                Tournaments Enlisted (${registeredTourneys.length})
              </button>
              <button class="filter-chip ${this.activeTab === 'accounts' ? 'active' : ''}" data-ptab="accounts">
                <i data-lucide="link-2" style="width: 14px; height: 14px; margin-right: 4px;"></i>
                Linked Ecosystems
              </button>
            </div>
          </div>

          <!-- Dynamic Tab Pane Content -->
          <div id="profile-tab-content">
            ${this.renderTabContent(user, wishlistGames, registeredTourneys)}
          </div>

        </div>
      </div>
    `;
  },

  renderTabContent(user, wishlistGames, registeredTourneys) {
    if (this.activeTab === 'wishlist') {
      if (wishlistGames.length === 0) {
        return `
          <div class="glass-panel" style="padding: 4rem; text-align: center; color: var(--text-muted);">
            <i data-lucide="heart-off" style="width: 48px; height: 48px; margin-bottom: 1rem; color: var(--text-muted);"></i>
            <h3 style="color: #fff; margin-bottom: 0.5rem;">Your Wishlist is Empty</h3>
            <p style="margin-bottom: 1.5rem;">Browse our game catalog and bookmark titles for instant access and price alerts.</p>
            <a href="#games" class="btn btn-cyan btn-sm">Explore Games Library</a>
          </div>
        `;
      }

      return `
        <div class="games-grid">
          ${wishlistGames.map(game => `
            <div class="game-card">
              <div class="game-thumb-wrapper">
                <img src="${game.coverImage}" alt="${game.title}" class="game-thumb" />
                <button class="game-wishlist-btn active" onclick="window.nexusState.toggleFavorite('${game.id}'); window.nexusRouter.handleRoute();" title="Remove from Wishlist">
                  <i data-lucide="heart" style="fill: currentColor;"></i>
                </button>
              </div>
              <div class="game-card-body">
                <div class="game-card-meta">
                  <span class="game-genre">${game.genre}</span>
                  <div class="game-rating"><i data-lucide="star"></i> ${game.rating}</div>
                </div>
                <h3 class="game-title"><a href="#game-detail?id=${game.id}">${game.title}</a></h3>
                <div class="game-card-footer" style="margin-top: auto;">
                  <span class="game-price ${game.isFree ? 'is-free' : ''}">${game.price}</span>
                  <a href="#game-detail?id=${game.id}" class="btn btn-cyan btn-sm">Launch Game</a>
                </div>
              </div>
            </div>
          `).join("")}
        </div>
      `;
    }

    if (this.activeTab === 'tournaments') {
      if (registeredTourneys.length === 0) {
        return `
          <div class="glass-panel" style="padding: 4rem; text-align: center; color: var(--text-muted);">
            <i data-lucide="shield-alert" style="width: 48px; height: 48px; margin-bottom: 1rem; color: var(--text-muted);"></i>
            <h3 style="color: #fff; margin-bottom: 0.5rem;">No Active Tournament Registrations</h3>
            <p style="margin-bottom: 1.5rem;">Join upcoming competitive brackets to test your squad against the best in the world.</p>
            <a href="#tournaments" class="btn btn-cyan btn-sm">Browse Tournaments</a>
          </div>
        `;
      }

      return `
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          ${registeredTourneys.map(t => `
            <div class="glass-panel" style="display: flex; align-items: center; justify-content: space-between; padding: 1.5rem 2rem; gap: 2rem; flex-wrap: wrap; border-color: var(--border-cyan);">
              <div style="display: flex; align-items: center; gap: 1.5rem;">
                <img src="${t.banner}" alt="${t.name}" style="width: 90px; height: 60px; object-fit: cover; border-radius: var(--radius-sm);" />
                <div>
                  <div style="font-family: var(--font-tech); color: var(--cyan-primary); font-size: 0.85rem; text-transform: uppercase;">${t.gameTitle} &bull; ${t.format}</div>
                  <h3 style="font-size: 1.25rem; color: var(--text-white); margin-bottom: 0.25rem;">${t.name}</h3>
                  <div style="font-size: 0.85rem; color: var(--text-muted);">Match Check-in Starts: <strong>${t.startDate}</strong></div>
                </div>
              </div>

              <div style="display: flex; align-items: center; gap: 1.5rem;">
                <div style="text-align: right;">
                  <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Prize Pool</span>
                  <div style="font-family: var(--font-display); font-size: 1.3rem; font-weight: 800; color: var(--gold-accent);">${t.prizePool}</div>
                </div>
                <button class="btn btn-primary btn-sm" onclick="window.nexusState.showToast('Squad Lobby Netcode pinged. Sentinel TPM verified.', 'success', 'check-circle')">
                  <i data-lucide="radio"></i>
                  <span>Lobby Ready</span>
                </button>
              </div>
            </div>
          `).join("")}
        </div>
      `;
    }

    if (this.activeTab === 'accounts') {
      return `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
          <div class="glass-panel" style="padding: 1.75rem;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
              <div style="display: flex; align-items: center; gap: 0.75rem;">
                <i data-lucide="disc" style="width: 28px; height: 28px; color: #5865F2;"></i>
                <h3 style="font-size: 1.2rem; color: #fff;">Discord Comms</h3>
              </div>
              <span class="badge ${user.linkedAccounts.discord.connected ? 'badge-new' : 'badge-popular'}">
                ${user.linkedAccounts.discord.connected ? 'LINKED (OAUTH)' : 'UNLINKED'}
              </span>
            </div>
            <p style="color: var(--text-secondary); font-size: 0.88rem; margin-bottom: 1.25rem;">Display your live status, match results, and join team voice lobbies via Supabase OAuth.</p>
            <button class="btn ${user.linkedAccounts.discord.connected ? 'btn-secondary' : 'btn-cyan'} btn-sm" style="width: 100%;" onclick="ProfileView.toggleAccount('discord')">
              ${user.linkedAccounts.discord.connected ? 'Disconnect Discord' : 'Authenticate Discord'}
            </button>
          </div>

          <div class="glass-panel" style="padding: 1.75rem;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
              <div style="display: flex; align-items: center; gap: 0.75rem;">
                <i data-lucide="gamepad-2" style="width: 28px; height: 28px; color: var(--cyan-primary);"></i>
                <h3 style="font-size: 1.2rem; color: #fff;">Steam Account</h3>
              </div>
              <span class="badge badge-popular">OPENID BRIDGE</span>
            </div>
            <p style="color: var(--text-secondary); font-size: 0.88rem; margin-bottom: 1.25rem;">Requires OpenID 2.0 developer relay bridge in production Supabase Edge Functions.</p>
            <button class="btn btn-secondary btn-sm" style="width: 100%;" onclick="window.nexusState.showToast('Steam integration requires dedicated OpenID 2.0 relay endpoint.', 'info', 'info')">
              Bridge Info
            </button>
          </div>

          <div class="glass-panel" style="padding: 1.75rem;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
              <div style="display: flex; align-items: center; gap: 0.75rem;">
                <i data-lucide="tv" style="width: 28px; height: 28px; color: #107C10;"></i>
                <h3 style="font-size: 1.2rem; color: #fff;">Xbox Network</h3>
              </div>
              <span class="badge badge-popular">PARTNER PORTAL</span>
            </div>
            <p style="color: var(--text-secondary); font-size: 0.88rem; margin-bottom: 1.25rem;">Cross-platform progression requiring Microsoft Azure Active Directory game developer client.</p>
            <button class="btn btn-secondary btn-sm" style="width: 100%;" onclick="window.nexusState.showToast('Xbox Live integration requires Azure AD Game Dev credentials.', 'info', 'info')">
              Partner Info
            </button>
          </div>
        </div>
      `;
    }

    // Default: Overview & Stats
    return `
      <div style="display: grid; grid-template-columns: 1.3fr 0.7fr; gap: 2rem;" id="profile-overview-grid">
        
        <!-- Left Stats Overview -->
        <div>
          <!-- Competitive Stats Matrix -->
          <div class="glass-panel" style="padding: 2rem; margin-bottom: 2rem;">
            <h3 style="font-size: 1.25rem; margin-bottom: 1.25rem; color: #fff; display: flex; align-items: center; gap: 0.5rem;">
              <i data-lucide="bar-chart-2" style="color: var(--cyan-primary);"></i>
              <span>Competitive Performance Matrix</span>
            </h3>

            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; text-align: center;">
              <div style="background: rgba(0,0,0,0.3); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
                <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Win Ratio</div>
                <div style="font-family: var(--font-display); font-size: 1.8rem; font-weight: 800; color: var(--emerald-accent); margin-top: 0.25rem;">${user.winRate}</div>
              </div>
              <div style="background: rgba(0,0,0,0.3); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
                <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">K/D Ratio</div>
                <div style="font-family: var(--font-display); font-size: 1.8rem; font-weight: 800; color: var(--cyan-primary); margin-top: 0.25rem;">${user.kdRatio}</div>
              </div>
              <div style="background: rgba(0,0,0,0.3); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
                <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Matches Won</div>
                <div style="font-family: var(--font-display); font-size: 1.8rem; font-weight: 800; color: var(--purple-primary); margin-top: 0.25rem;">${user.matchesPlayed}</div>
              </div>
            </div>
          </div>

          <!-- Operative Bio & Strategy Directives -->
          <div class="glass-panel" style="padding: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
              <h3 style="font-size: 1.25rem; color: #fff; margin-bottom: 0;">Operative Dossier</h3>
              <button class="btn btn-secondary btn-sm" onclick="window.nexusModals.openEditProfile()">Edit Dossier</button>
            </div>
            <p style="color: var(--text-secondary); line-height: 1.7; font-size: 0.95rem;">${user.bio || 'Tactical operative enlisted in the Nexus Realm.'}</p>
          </div>
        </div>

        <!-- Right Trophy & Badge Cabinet -->
        <div>
          <div class="glass-panel" style="padding: 2rem; border-color: var(--border-purple);">
            <h3 style="font-size: 1.25rem; margin-bottom: 1.25rem; color: #fff; display: flex; align-items: center; gap: 0.5rem;">
              <i data-lucide="award" style="color: var(--gold-accent);"></i>
              <span>Trophy &amp; Honors Cabinet</span>
            </h3>

            <div style="display: flex; flex-direction: column; gap: 1rem;">
              ${user.badges.map(b => `
                <div style="display: flex; align-items: center; gap: 1rem; background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); padding: 0.85rem 1rem; border-radius: var(--radius-md);">
                  <div style="width: 36px; height: 36px; border-radius: 50%; background: rgba(168, 85, 247, 0.2); border: 1px solid var(--purple-primary); display: flex; align-items: center; justify-content: center; color: var(--purple-primary); flex-shrink: 0;">
                    <i data-lucide="${b.icon}"></i>
                  </div>
                  <div>
                    <strong style="color: #fff; font-size: 0.95rem; font-family: var(--font-tech);">${b.name}</strong>
                    <div style="font-size: 0.75rem; color: var(--text-muted);">Verified Security Citation</div>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        </div>

      </div>
    `;
  },

  async toggleAccount(account) {
    if (account === "discord") {
      if (window.nexusAuthService) {
        await window.nexusAuthService.signInWithDiscord();
      }
    }
  },

  attachEvents() {
    const logoutBtn = document.getElementById("profile-logout-btn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", async () => {
        await window.nexusState.logout();
        window.location.hash = "#home";
      });
    }

    document.querySelectorAll("[data-ptab]").forEach(tabBtn => {
      tabBtn.addEventListener("click", () => {
        document.querySelectorAll("[data-ptab]").forEach(b => b.classList.remove("active"));
        tabBtn.classList.add("active");
        this.activeTab = tabBtn.getAttribute("data-ptab");
        window.nexusRouter.handleRoute();
        window.nexusState.playSound("click");
      });
    });
  }
};

window.ProfileView = ProfileView;
