/**
 * NEXUS REALM - Tournaments Hub View
 */

const TournamentsView = {
  activeTab: 'all',
  searchQuery: '',

  render(params = {}) {
    if (params.status) this.activeTab = params.status.toLowerCase();

    return `
      <div class="tournaments-page" style="padding: 3rem 0 6rem;">
        <div class="container">
          <!-- Page Header -->
          <div class="section-header">
            <span class="section-tag tag-red">Competitive Circuit</span>
            <h1 class="section-title">Esports Tournament Hub</h1>
            <p class="section-subtitle">Compete on official 128-tick sub-tick servers, secure global circuit points, and take home life-changing prize pools.</p>
          </div>

          <!-- Prize Pool Stat Banner -->
          <div class="glass-panel" style="padding: 2rem 2.5rem; margin-bottom: 3rem; background: linear-gradient(135deg, rgba(20, 15, 38, 0.9) 0%, rgba(10, 15, 30, 0.9) 100%); border-color: var(--border-purple);">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 2rem; align-items: center;">
              <div>
                <span style="font-family: var(--font-tech); color: var(--gold-accent); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.1em; display: block; margin-bottom: 0.35rem;">Total 2026 Circuit Purses</span>
                <div style="font-family: var(--font-display); font-size: 2.2rem; font-weight: 800; color: var(--text-white); line-height: 1.1;">${NEXUS_DATA.brand.stats.totalPrizePool}</div>
              </div>
              <div>
                <span style="font-family: var(--font-tech); color: var(--cyan-primary); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.1em; display: block; margin-bottom: 0.35rem;">Sentinel Anti-Cheat Net</span>
                <div style="font-family: var(--font-display); font-size: 2.2rem; font-weight: 800; color: var(--emerald-accent); line-height: 1.1;">100% SECURE</div>
              </div>
              <div>
                <span style="font-family: var(--font-tech); color: var(--purple-primary); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.1em; display: block; margin-bottom: 0.35rem;">Active Competitors</span>
                <div style="font-family: var(--font-display); font-size: 2.2rem; font-weight: 800; color: var(--text-white); line-height: 1.1;">48,920 Teams</div>
              </div>
              <div>
                <button class="btn btn-cyan btn-lg" onclick="window.nexusModals.openRegisterTournament('cyber-masters-invitational-2026')">
                  <i data-lucide="flag"></i>
                  <span>Register Squad</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Filter & Search Toolbar -->
          <div class="filter-bar">
            <div class="filter-chips">
              <button class="filter-chip ${this.activeTab === 'all' ? 'active' : ''}" data-status="all">All Brackets</button>
              <button class="filter-chip ${this.activeTab === 'live' ? 'active' : ''}" data-status="live">Live Now 🔴</button>
              <button class="filter-chip ${this.activeTab === 'upcoming' ? 'active' : ''}" data-status="upcoming">Upcoming ⚡</button>
              <button class="filter-chip ${this.activeTab === 'completed' ? 'active' : ''}" data-status="completed">Completed 🏆</button>
            </div>

            <div class="filter-search-box">
              <i data-lucide="search" style="width: 16px; height: 16px;"></i>
              <input type="text" id="tournament-search-input" value="${this.searchQuery}" placeholder="Search tournaments or games..." />
            </div>
          </div>

          <!-- Tournaments Grid -->
          <div class="games-grid" style="grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); margin-bottom: 4rem;" id="tournaments-grid-container">
            ${this.renderTournaments()}
          </div>

          <!-- Anti-Cheat & Fair Play Certification Banner -->
          <div class="glass-panel" style="padding: 2.5rem; border-color: var(--border-cyan);">
            <div style="display: flex; gap: 2rem; align-items: center; flex-wrap: wrap;">
              <div style="width: 64px; height: 64px; border-radius: var(--radius-lg); background: rgba(0, 240, 255, 0.15); border: 2px solid var(--cyan-primary); display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 0 25px var(--cyan-glow);">
                <i data-lucide="shield-check" style="width: 36px; height: 36px; color: var(--cyan-primary);"></i>
              </div>
              <div style="flex: 1; min-width: 280px;">
                <h3 style="font-size: 1.35rem; margin-bottom: 0.5rem; color: var(--text-white);">Nexus Sentinel Tournament Integrity Guarantee</h3>
                <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6;">Every tournament is governed by strict kernel-level anti-cheat telemetry, hardware ID validation, and sub-tick server replay forensics to ensure 100% fair competitive play.</p>
              </div>
              <a href="#about" class="btn btn-secondary">Read Full Rulebook</a>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  renderTournaments() {
    const list = NEXUS_DATA.tournaments.filter(t => {
      const matchTab = this.activeTab === 'all' || t.status.toLowerCase() === this.activeTab;
      const matchSearch = !this.searchQuery ||
        t.name.toLowerCase().includes(this.searchQuery) ||
        t.gameTitle.toLowerCase().includes(this.searchQuery);
      return matchTab && matchSearch;
    });

    if (list.length === 0) {
      return `
        <div style="grid-column: 1 / -1; padding: 4rem; text-align: center; color: var(--text-muted);">
          <i data-lucide="trophy" style="width: 48px; height: 48px; margin-bottom: 1rem; color: var(--text-muted);"></i>
          <h3>No Tournaments Match Your Selection</h3>
          <p>Switch to "All Brackets" to view other competitive opportunities.</p>
        </div>
      `;
    }

    return list.map(t => {
      const isRegistered = window.nexusState.isRegisteredForTournament(t.id);
      const progressPercent = Math.round((t.registeredTeams / t.maxTeams) * 100);

      return `
        <div class="tournament-card">
          <div class="tournament-banner-wrapper">
            <img src="${t.banner}" alt="${t.name}" loading="lazy" />
            <div class="tournament-prize-badge">
              <span class="prize-title">Prize Pool:</span>
              <span class="prize-amount">${t.prizePool}</span>
            </div>
            <div style="position: absolute; top: 1rem; right: 1rem;">
              <span class="badge ${t.status === 'Live' ? 'badge-live' : 'badge-new'}">${t.status}</span>
            </div>
          </div>

          <div class="tournament-body">
            <div class="tournament-game">${t.gameTitle}</div>
            <h3 class="tournament-title">${t.name}</h3>
            <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 1rem; line-height: 1.5;">${t.description}</p>

            <div class="tournament-meta-grid">
              <div class="meta-box">
                <span class="meta-box-label">Format</span>
                <span class="meta-box-value">${t.format}</span>
              </div>
              <div class="meta-box">
                <span class="meta-box-label">Entry Fee</span>
                <span class="meta-box-value">${t.entryFee}</span>
              </div>
              <div class="meta-box">
                <span class="meta-box-label">Start Date</span>
                <span class="meta-box-value">${t.startDate}</span>
              </div>
              <div class="meta-box">
                <span class="meta-box-label">Region</span>
                <span class="meta-box-value">${t.region}</span>
              </div>
            </div>

            <div class="tournament-slots-bar">
              <div class="slots-label-row">
                <span>Registration Capacity</span>
                <span style="font-weight: 700; color: var(--text-white);">${t.registeredTeams} / ${t.maxTeams} Teams</span>
              </div>
              <div class="slots-track">
                <div class="slots-fill" style="width: ${progressPercent}%;"></div>
              </div>
            </div>

            <!-- Rules accordion toggle preview -->
            <details style="margin-bottom: 1.25rem; font-size: 0.85rem; color: var(--text-secondary); background: rgba(0,0,0,0.25); border-radius: var(--radius-md); padding: 0.65rem 0.85rem; border: 1px solid var(--border-subtle);">
              <summary style="cursor: pointer; color: var(--cyan-primary); font-family: var(--font-tech); font-weight: 700; text-transform: uppercase;">View Bracket Schedule & Rules</summary>
              <div style="margin-top: 0.75rem;">
                <strong style="color: var(--text-white); display: block; margin-bottom: 0.35rem;">Schedule:</strong>
                <ul style="margin-bottom: 0.75rem; padding-left: 1rem; list-style: disc;">
                  ${t.schedule.map(s => `<li>${s.phase} (${s.date}): ${s.info}</li>`).join("")}
                </ul>
                <strong style="color: var(--text-white); display: block; margin-bottom: 0.35rem;">Rules:</strong>
                <ul style="padding-left: 1rem; list-style: disc;">
                  ${t.rules.map(r => `<li>${r}</li>`).join("")}
                </ul>
              </div>
            </details>

            <div class="tournament-actions">
              ${isRegistered ? `
                <button class="btn btn-primary" style="flex: 1; background: rgba(16, 185, 129, 0.2); border-color: var(--emerald-accent); color: var(--emerald-accent);" disabled>
                  <i data-lucide="check-circle"></i>
                  <span>Squad Registered</span>
                </button>
              ` : `
                <button class="btn btn-cyan" style="flex: 1;" onclick="window.nexusModals.openRegisterTournament('${t.id}')">
                  <i data-lucide="flag"></i>
                  <span>Register Squad</span>
                </button>
              `}
            </div>
          </div>
        </div>
      `;
    }).join("");
  },

  attachEvents() {
    const searchInput = document.getElementById("tournament-search-input");
    const container = document.getElementById("tournaments-grid-container");

    if (searchInput && container) {
      searchInput.addEventListener("input", (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        container.innerHTML = this.renderTournaments();
        if (window.lucide) window.lucide.createIcons({ root: container });
      });
    }

    document.querySelectorAll("[data-status]").forEach(chip => {
      chip.addEventListener("click", () => {
        document.querySelectorAll("[data-status]").forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        this.activeTab = chip.getAttribute("data-status");
        if (container) {
          container.innerHTML = this.renderTournaments();
          if (window.lucide) window.lucide.createIcons({ root: container });
        }
        window.nexusState.playSound("click");
      });
    });
  }
};

window.TournamentsView = TournamentsView;
