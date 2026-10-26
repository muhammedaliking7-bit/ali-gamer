/**
 * NEXUS REALM - Master Modals & Lightbox Manager
 */

const NexusModals = {
  activeTournamentId: null,

  render() {
    return `
      <!-- Quick Search Modal (Ctrl + K) -->
      <div class="modal-backdrop" id="search-modal">
        <div class="modal-content search-modal-content">
          <div class="search-modal-input-row">
            <i data-lucide="search" style="color: var(--cyan-primary); width: 22px; height: 22px;"></i>
            <input type="text" id="quick-search-input" placeholder="Search games, tournaments, news, guides... (Press ESC to exit)" autocomplete="off" />
            <kbd style="font-size: 0.75rem; color: var(--text-muted); background: rgba(0,0,0,0.5); padding: 0.2rem 0.5rem; border-radius: 4px; border: 1px solid var(--border-subtle);">ESC</kbd>
          </div>
          <div class="search-results-list" id="search-results-container">
            <!-- Dynamic search results render here -->
          </div>
        </div>
      </div>

      <!-- Video Trailer Modal -->
      <div class="modal-backdrop" id="trailer-modal">
        <div class="modal-content video-modal-content">
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.5rem; background: rgba(8,10,20,0.95); border-bottom: 1px solid var(--border-subtle);">
            <div style="font-family: var(--font-display); font-size: 1.1rem; color: var(--cyan-primary);" id="trailer-title">Game Cinematic Trailer</div>
            <button class="modal-close-btn" id="close-trailer-btn">&times;</button>
          </div>
          <div class="video-frame-container" id="trailer-frame-box">
            <!-- Dynamic video / iframe embed -->
          </div>
        </div>
      </div>

      <!-- Tournament Registration Modal -->
      <div class="modal-backdrop" id="tournament-register-modal">
        <div class="modal-content">
          <div class="modal-header">
            <div>
              <span class="section-tag tag-purple">Squad Registration</span>
              <h3 class="modal-title" id="reg-tournament-title">Cyber Masters Invitational</h3>
            </div>
            <button class="modal-close-btn" id="close-register-btn">&times;</button>
          </div>
          <div class="modal-body">
            <form id="tournament-registration-form">
              <div class="form-group">
                <label class="form-label">Squad / Clan Name *</label>
                <input type="text" id="reg-squad-name" class="form-control" placeholder="e.g. Phantom Cyber Vanguard" required />
              </div>

              <div class="form-group" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <div>
                  <label class="form-label">Captain GamerTag *</label>
                  <input type="text" id="reg-captain-tag" class="form-control" value="${window.nexusState.currentUser.gamertag}" required />
                </div>
                <div>
                  <label class="form-label">Captain Discord Handle *</label>
                  <input type="text" id="reg-discord" class="form-control" placeholder="Captain#1234" required />
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Server Region</label>
                <select id="reg-region" class="form-control">
                  <option value="NA-East">North America (NA-East / Chicago)</option>
                  <option value="EU-Central">Europe (EU-Central / Frankfurt)</option>
                  <option value="AP-East">Asia Pacific (AP-East / Tokyo)</option>
                  <option value="SA-East">South America (SA-East / São Paulo)</option>
                </select>
              </div>

              <div class="form-group" style="background: rgba(0,0,0,0.3); border: 1px solid var(--border-subtle); padding: 1rem; border-radius: var(--radius-md);">
                <label style="display: flex; gap: 0.75rem; align-items: flex-start; cursor: pointer; font-size: 0.85rem; color: var(--text-secondary);">
                  <input type="checkbox" id="reg-rules-check" required style="margin-top: 3px;" />
                  <span>I agree to the tournament official rulebook, Sentinel anti-cheat verification, and acknowledge that all players must be check-in 30 minutes prior to match launch.</span>
                </label>
              </div>

              <div style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 1.5rem;">
                <button type="button" class="btn btn-secondary" id="cancel-register-btn">Cancel</button>
                <button type="submit" class="btn btn-cyan">Confirm Registration</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Edit Profile Modal -->
      <div class="modal-backdrop" id="edit-profile-modal">
        <div class="modal-content">
          <div class="modal-header">
            <div>
              <span class="section-tag">Identity Configuration</span>
              <h3 class="modal-title">Edit Gamer Profile</h3>
            </div>
            <button class="modal-close-btn" id="close-profile-modal-btn">&times;</button>
          </div>
          <div class="modal-body">
            <form id="edit-profile-form">
              <div class="form-group">
                <label class="form-label">GamerTag</label>
                <input type="text" id="edit-gamertag" class="form-control" value="${window.nexusState.currentUser.gamertag}" required />
              </div>
              <div class="form-group">
                <label class="form-label">Full Name</label>
                <input type="text" id="edit-fullname" class="form-control" value="${window.nexusState.currentUser.fullName}" />
              </div>
              <div class="form-group">
                <label class="form-label">Avatar Image URL</label>
                <input type="url" id="edit-avatar" class="form-control" value="${window.nexusState.currentUser.avatar}" />
              </div>
              <div class="form-group">
                <label class="form-label">Player Bio & Tactical Specialization</label>
                <textarea id="edit-bio" class="form-control" rows="3">${window.nexusState.currentUser.bio}</textarea>
              </div>
              <div style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 1.5rem;">
                <button type="button" class="btn btn-secondary" id="cancel-profile-btn">Cancel</button>
                <button type="submit" class="btn btn-primary">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
  },

  attachEvents() {
    // Search Modal Listeners
    const searchModal = document.getElementById("search-modal");
    const searchInput = document.getElementById("quick-search-input");
    const searchResults = document.getElementById("search-results-container");

    if (searchModal && searchInput) {
      searchModal.addEventListener("click", (e) => {
        if (e.target === searchModal) this.closeSearch();
      });

      searchInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase().trim();
        this.renderSearchResults(query, searchResults);
      });
    }

    // Trailer Modal Close
    const trailerModal = document.getElementById("trailer-modal");
    const closeTrailerBtn = document.getElementById("close-trailer-btn");
    if (trailerModal && closeTrailerBtn) {
      trailerModal.addEventListener("click", (e) => {
        if (e.target === trailerModal) this.closeTrailer();
      });
      closeTrailerBtn.addEventListener("click", () => this.closeTrailer());
    }

    // Tournament Register Modal Events
    const regModal = document.getElementById("tournament-register-modal");
    const closeRegBtn = document.getElementById("close-register-btn");
    const cancelRegBtn = document.getElementById("cancel-register-btn");
    const regForm = document.getElementById("tournament-registration-form");

    if (regModal) {
      const closeReg = () => {
        regModal.classList.remove("open");
        this.activeTournamentId = null;
      };
      if (closeRegBtn) closeRegBtn.addEventListener("click", closeReg);
      if (cancelRegBtn) cancelRegBtn.addEventListener("click", closeReg);
      regModal.addEventListener("click", (e) => {
        if (e.target === regModal) closeReg();
      });

      if (regForm) {
        regForm.addEventListener("submit", (e) => {
          e.preventDefault();
          const squadName = document.getElementById("reg-squad-name").value.trim();
          if (this.activeTournamentId) {
            window.nexusState.registerForTournament(this.activeTournamentId, squadName);
            closeReg();
            // Refresh view if on tournaments page
            if (window.location.hash.startsWith("#tournaments")) {
              window.nexusRouter.handleRoute();
            }
          }
        });
      }
    }

    // Profile Edit Modal Events
    const profileModal = document.getElementById("edit-profile-modal");
    const closeProfileBtn = document.getElementById("close-profile-modal-btn");
    const cancelProfileBtn = document.getElementById("cancel-profile-btn");
    const profileForm = document.getElementById("edit-profile-form");

    if (profileModal) {
      const closeProf = () => profileModal.classList.remove("open");
      if (closeProfileBtn) closeProfileBtn.addEventListener("click", closeProf);
      if (cancelProfileBtn) cancelProfileBtn.addEventListener("click", closeProf);
      profileModal.addEventListener("click", (e) => {
        if (e.target === profileModal) closeProf();
      });

      if (profileForm) {
        profileForm.addEventListener("submit", async (e) => {
          e.preventDefault();
          const gamertag = document.getElementById("edit-gamertag").value.trim();
          const fullName = document.getElementById("edit-fullname").value.trim();
          const avatar = document.getElementById("edit-avatar").value.trim();
          const bio = document.getElementById("edit-bio").value.trim();

          const saveBtn = profileForm.querySelector("button[type='submit']");
          if (saveBtn) {
            saveBtn.disabled = true;
            saveBtn.textContent = "Saving...";
          }

          await window.nexusState.updateProfile({ gamertag, fullName, avatar, bio });
          if (saveBtn) {
            saveBtn.disabled = false;
            saveBtn.textContent = "Save Changes";
          }
          closeProf();
          // Re-render current page
          window.nexusRouter.handleRoute();
        });
      }
    }

    // Global ESC key to close any modal
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeSearch();
        this.closeTrailer();
        if (regModal) regModal.classList.remove("open");
        if (profileModal) profileModal.classList.remove("open");
      }
    });
  },

  // Modal open helpers
  openSearch() {
    const modal = document.getElementById("search-modal");
    const input = document.getElementById("quick-search-input");
    const results = document.getElementById("search-results-container");
    if (modal && input) {
      modal.classList.add("open");
      input.value = "";
      input.focus();
      this.renderSearchResults("", results);
      window.nexusState.playSound("click");
    }
  },

  closeSearch() {
    const modal = document.getElementById("search-modal");
    if (modal) modal.classList.remove("open");
  },

  renderSearchResults(query, container) {
    if (!container) return;

    if (!query) {
      container.innerHTML = `
        <div style="padding: 1.5rem; text-align: center; color: var(--text-muted); font-size: 0.9rem;">
          <p style="margin-bottom: 0.5rem; color: var(--text-secondary); font-family: var(--font-tech); text-transform: uppercase;">⚡ Quick Search Directory</p>
          <span>Type any game title, category, tournament name, or news topic.</span>
        </div>
      `;
      return;
    }

    const matchedGames = NEXUS_DATA.games.filter(g =>
      g.title.toLowerCase().includes(query) ||
      g.genre.toLowerCase().includes(query) ||
      g.tags.some(t => t.toLowerCase().includes(query))
    );

    const matchedTournaments = NEXUS_DATA.tournaments.filter(t =>
      t.name.toLowerCase().includes(query) ||
      t.gameTitle.toLowerCase().includes(query)
    );

    const matchedNews = NEXUS_DATA.news.filter(n =>
      n.title.toLowerCase().includes(query) ||
      n.category.toLowerCase().includes(query)
    );

    if (matchedGames.length === 0 && matchedTournaments.length === 0 && matchedNews.length === 0) {
      container.innerHTML = `
        <div style="padding: 2.5rem; text-align: center; color: var(--text-muted);">
          <i data-lucide="alert-triangle" style="width: 32px; height: 32px; margin-bottom: 0.75rem; color: var(--gold-accent);"></i>
          <p style="font-size: 1.05rem; color: var(--text-white);">No matches found for "${query}"</p>
          <span style="font-size: 0.85rem;">Try searching for 'Cyber', 'Valkyrie', 'Tournament', or 'Patch'</span>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons({ root: container });
      return;
    }

    let html = '';

    if (matchedGames.length > 0) {
      html += `<div style="padding: 0.5rem 1rem; font-size: 0.75rem; font-family: var(--font-tech); text-transform: uppercase; color: var(--cyan-primary); letter-spacing: 0.1em; border-bottom: 1px solid var(--border-subtle);">Games (${matchedGames.length})</div>`;
      matchedGames.forEach(g => {
        html += `
          <div class="search-result-item" onclick="window.nexusModals.navigateTo('#game-detail?id=${g.id}')">
            <img src="${g.coverImage}" class="search-result-thumb" alt="${g.title}" />
            <div style="flex: 1;">
              <div style="font-family: var(--font-display); font-size: 0.95rem; color: var(--text-white);">${g.title}</div>
              <div style="font-size: 0.8rem; color: var(--text-secondary);">${g.genre} &bull; ${g.platforms.join(", ")}</div>
            </div>
            <span class="badge badge-popular">${g.price}</span>
          </div>
        `;
      });
    }

    if (matchedTournaments.length > 0) {
      html += `<div style="padding: 0.5rem 1rem; font-size: 0.75rem; font-family: var(--font-tech); text-transform: uppercase; color: var(--purple-primary); letter-spacing: 0.1em; border-bottom: 1px solid var(--border-subtle); margin-top: 0.5rem;">Tournaments (${matchedTournaments.length})</div>`;
      matchedTournaments.forEach(t => {
        html += `
          <div class="search-result-item" onclick="window.nexusModals.navigateTo('#tournaments?id=${t.id}')">
            <img src="${t.banner}" class="search-result-thumb" alt="${t.name}" />
            <div style="flex: 1;">
              <div style="font-family: var(--font-display); font-size: 0.95rem; color: var(--text-white);">${t.name}</div>
              <div style="font-size: 0.8rem; color: var(--text-secondary);">${t.gameTitle} &bull; ${t.format}</div>
            </div>
            <span class="badge" style="background: rgba(251, 191, 36, 0.2); color: var(--gold-accent);">${t.prizePool}</span>
          </div>
        `;
      });
    }

    if (matchedNews.length > 0) {
      html += `<div style="padding: 0.5rem 1rem; font-size: 0.75rem; font-family: var(--font-tech); text-transform: uppercase; color: var(--red-cyber); letter-spacing: 0.1em; border-bottom: 1px solid var(--border-subtle); margin-top: 0.5rem;">News & Updates (${matchedNews.length})</div>`;
      matchedNews.forEach(n => {
        html += `
          <div class="search-result-item" onclick="window.nexusModals.navigateTo('#news-article?id=${n.id}')">
            <img src="${n.heroImage}" class="search-result-thumb" alt="${n.title}" />
            <div style="flex: 1;">
              <div style="font-size: 0.9rem; font-weight: 600; color: var(--text-white); display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">${n.title}</div>
              <div style="font-size: 0.8rem; color: var(--text-secondary);">${n.category} &bull; ${n.publishedAt}</div>
            </div>
          </div>
        `;
      });
    }

    container.innerHTML = html;
  },

  navigateTo(hash) {
    this.closeSearch();
    window.location.hash = hash;
  },

  openTrailer(title, videoUrl) {
    const modal = document.getElementById("trailer-modal");
    const frameBox = document.getElementById("trailer-frame-box");
    const titleEl = document.getElementById("trailer-title");

    if (modal && frameBox) {
      titleEl.textContent = title || "Cinematic Showcase";
      frameBox.innerHTML = `
        <div style="width: 100%; height: 100%; background: #000; display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; overflow: hidden;">
          <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.4; filter: blur(4px);" />
          <div style="position: relative; z-index: 2; text-align: center; padding: 2rem;">
            <div style="width: 80px; height: 80px; border-radius: 50%; background: rgba(0,240,255,0.25); border: 2px solid var(--cyan-primary); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; box-shadow: 0 0 35px var(--cyan-glow);">
              <i data-lucide="play" style="width: 36px; height: 36px; color: var(--cyan-primary); margin-left: 4px;"></i>
            </div>
            <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem; color: #fff;">${title} — Official 4K Ultra Cinematic</h3>
            <p style="color: var(--text-secondary); max-width: 500px; margin: 0 auto 1.5rem; font-size: 0.95rem;">Experience high-fidelity ray tracing in Unreal Engine 5.5 at 120 FPS.</p>
            <div style="display: flex; gap: 1rem; justify-content: center;">
              <button class="btn btn-cyan" onclick="window.nexusState.showToast('Cinematic Stream Connected at 4K 120 FPS', 'info', 'tv')">Stream 4K Preview</button>
              <button class="btn btn-secondary" onclick="window.nexusModals.closeTrailer()">Return to Hub</button>
            </div>
          </div>
        </div>
      `;
      modal.classList.add("open");
      if (window.lucide) window.lucide.createIcons({ root: frameBox });
      window.nexusState.playSound("tournament");
    }
  },

  closeTrailer() {
    const modal = document.getElementById("trailer-modal");
    const frameBox = document.getElementById("trailer-frame-box");
    if (modal) modal.classList.remove("open");
    if (frameBox) frameBox.innerHTML = "";
  },

  openRegisterTournament(tournamentId) {
    const tournament = NEXUS_DATA.tournaments.find(t => t.id === tournamentId);
    if (!tournament) return;

    this.activeTournamentId = tournamentId;
    const modal = document.getElementById("tournament-register-modal");
    const title = document.getElementById("reg-tournament-title");

    if (modal && title) {
      title.textContent = tournament.name;
      document.getElementById("reg-captain-tag").value = window.nexusState.currentUser.gamertag;
      modal.classList.add("open");
      window.nexusState.playSound("click");
    }
  },

  openEditProfile() {
    const modal = document.getElementById("edit-profile-modal");
    if (modal) {
      const user = window.nexusState.currentUser;
      document.getElementById("edit-gamertag").value = user.gamertag;
      document.getElementById("edit-fullname").value = user.fullName;
      document.getElementById("edit-avatar").value = user.avatar;
      document.getElementById("edit-bio").value = user.bio;
      modal.classList.add("open");
      window.nexusState.playSound("click");
    }
  }
};

window.nexusModals = NexusModals;
