/**
 * NEXUS REALM - Game Details View
 */

const GameDetailsView = {
  activeScreenshotIndex: 0,
  activeSpecTab: 'minimum',

  render(params = {}) {
    const gameId = params.id || NEXUS_DATA.games[0].id;
    const game = NEXUS_DATA.games.find(g => g.id === gameId) || NEXUS_DATA.games[0];
    const isFav = window.nexusState.isFavorite(game.id);
    const customReviews = window.nexusState.getReviews(game.id);
    const similarGames = NEXUS_DATA.games.filter(g => g.id !== game.id && (g.category === game.category || g.genre === game.genre)).slice(0, 3);

    return `
      <div class="game-details-page">
        <!-- Hero Banner Header -->
        <div class="game-detail-hero" style="background-image: url('${game.heroBanner}');">
          <div class="game-detail-hero-overlay"></div>
          
          <div class="container">
            <div class="game-detail-header-grid">
              <!-- Poster -->
              <img src="${game.coverImage}" alt="${game.title}" class="game-detail-poster" />

              <!-- Metadata & Title -->
              <div>
                <div style="display: flex; gap: 0.5rem; margin-bottom: 0.75rem; flex-wrap: wrap;">
                  <span class="section-tag">${game.genre}</span>
                  <span class="badge badge-trending">${game.badge}</span>
                  <span class="badge" style="background: rgba(251, 191, 36, 0.2); color: var(--gold-accent); border: 1px solid var(--gold-accent);">
                    ★ ${game.metacritic} METASCORE
                  </span>
                </div>

                <h1 style="font-size: clamp(2rem, 4vw, 3.2rem); margin-bottom: 0.5rem; line-height: 1.15;">${game.title}</h1>
                <p style="font-family: var(--font-tech); font-size: 1.15rem; color: var(--cyan-primary); margin-bottom: 1.25rem;">${game.subtitle}</p>

                <div style="display: flex; gap: 1.5rem; color: var(--text-secondary); font-size: 0.9rem; flex-wrap: wrap;">
                  <div><strong style="color: var(--text-white);">Developer:</strong> ${game.developer}</div>
                  <div><strong style="color: var(--text-white);">Publisher:</strong> ${game.publisher}</div>
                  <div><strong style="color: var(--text-white);">Release Date:</strong> ${game.releaseDate}</div>
                </div>
              </div>

              <!-- Action CTAs -->
              <div style="display: flex; flex-direction: column; gap: 0.75rem; min-width: 200px;">
                <div style="font-family: var(--font-display); font-size: 1.8rem; font-weight: 800; color: var(--text-white); text-align: right;">
                  ${game.price}
                </div>

                <button class="btn btn-cyan btn-lg" onclick="window.nexusState.showToast('Launching Game Launcher... Verified Sentinel License', 'success', 'download')">
                  <i data-lucide="play"></i>
                  <span>${game.isFree ? 'Play For Free' : 'Get Game'}</span>
                </button>

                <button class="btn btn-secondary ${isFav ? 'active' : ''}" id="detail-wishlist-toggle-btn" onclick="window.nexusState.toggleFavorite('${game.id}'); window.nexusRouter.handleRoute();">
                  <i data-lucide="heart" style="${isFav ? 'color: var(--red-cyber); fill: var(--red-cyber);' : ''}"></i>
                  <span>${isFav ? 'In Wishlist' : 'Add to Wishlist'}</span>
                </button>

                <button class="btn btn-outline-purple" onclick="window.nexusModals.openTrailer('${game.title}', '${game.trailerYoutubeId}')">
                  <i data-lucide="play-circle"></i>
                  <span>Watch Trailer</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Details Content Body -->
        <div class="container" style="padding: 4rem 1.5rem 6rem;">
          <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 3rem;" id="game-detail-body-grid">
            
            <!-- Left Main Column -->
            <div>
              <!-- Screenshots Gallery -->
              <div style="margin-bottom: 3.5rem;">
                <h3 style="font-size: 1.5rem; margin-bottom: 1.25rem; display: flex; align-items: center; gap: 0.6rem;">
                  <i data-lucide="image" style="color: var(--cyan-primary);"></i>
                  <span>Screenshots & Gameplay Media</span>
                </h3>

                <div class="glass-panel" style="margin-bottom: 1rem; border-radius: var(--radius-xl); overflow: hidden; aspect-ratio: 16 / 9; cursor: pointer;" onclick="window.nexusModals.openTrailer('${game.title}', '${game.trailerYoutubeId}')">
                  <img src="${game.screenshots[this.activeScreenshotIndex] || game.coverImage}" id="active-screenshot-img" alt="${game.title} gameplay" style="width: 100%; height: 100%; object-fit: cover;" />
                </div>

                <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.75rem;">
                  ${game.screenshots.map((s, idx) => `
                    <div class="glass-panel" style="aspect-ratio: 16 / 9; cursor: pointer; border-color: ${idx === this.activeScreenshotIndex ? 'var(--cyan-primary)' : 'var(--border-subtle)'};" onclick="GameDetailsView.switchScreenshot(${idx})">
                      <img src="${s}" alt="Thumbnail ${idx}" style="width: 100%; height: 100%; object-fit: cover;" />
                    </div>
                  `).join("")}
                </div>
              </div>

              <!-- Synopsis & Key Features -->
              <div style="margin-bottom: 3.5rem;">
                <h3 style="font-size: 1.5rem; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.6rem;">
                  <i data-lucide="book-open" style="color: var(--purple-primary);"></i>
                  <span>About The Game</span>
                </h3>
                <p style="font-size: 1.1rem; line-height: 1.8; color: var(--text-secondary); margin-bottom: 2rem;">
                  ${game.synopsis}
                </p>

                <h4 style="font-size: 1.2rem; margin-bottom: 1rem; color: var(--text-white);">Signature Engine Features:</h4>
                <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                  ${game.features.map(f => `
                    <div style="display: flex; align-items: flex-start; gap: 0.75rem; background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-subtle); padding: 0.85rem 1.25rem; border-radius: var(--radius-md);">
                      <i data-lucide="check-circle-2" style="color: var(--cyan-primary); width: 20px; height: 20px; flex-shrink: 0; margin-top: 2px;"></i>
                      <span style="font-size: 0.95rem; color: var(--text-primary);">${f}</span>
                    </div>
                  `).join("")}
                </div>
              </div>

              <!-- System Requirements Hardware Specs -->
              <div style="margin-bottom: 3.5rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 1rem;">
                  <h3 style="font-size: 1.5rem; display: flex; align-items: center; gap: 0.6rem;">
                    <i data-lucide="cpu" style="color: var(--gold-accent);"></i>
                    <span>Hardware Specifications</span>
                  </h3>
                  <div class="filter-chips">
                    <button class="filter-chip ${this.activeSpecTab === 'minimum' ? 'active' : ''}" onclick="GameDetailsView.switchSpecTab('minimum')">Minimum Specs</button>
                    <button class="filter-chip ${this.activeSpecTab === 'recommended' ? 'active' : ''}" onclick="GameDetailsView.switchSpecTab('recommended')">Recommended (Ultra 120 FPS)</button>
                  </div>
                </div>

                <div class="glass-panel" style="padding: 1rem;">
                  <table class="specs-table">
                    <tbody>
                      <tr>
                        <th>Operating System</th>
                        <td>${this.activeSpecTab === 'minimum' ? game.systemRequirements.minimum.os : game.systemRequirements.recommended.os}</td>
                      </tr>
                      <tr>
                        <th>Processor (CPU)</th>
                        <td>${this.activeSpecTab === 'minimum' ? game.systemRequirements.minimum.processor : game.systemRequirements.recommended.processor}</td>
                      </tr>
                      <tr>
                        <th>System Memory</th>
                        <td>${this.activeSpecTab === 'minimum' ? game.systemRequirements.minimum.memory : game.systemRequirements.recommended.memory}</td>
                      </tr>
                      <tr>
                        <th>Graphics (GPU)</th>
                        <td>${this.activeSpecTab === 'minimum' ? game.systemRequirements.minimum.graphics : game.systemRequirements.recommended.graphics}</td>
                      </tr>
                      <tr>
                        <th>DirectX Version</th>
                        <td>${this.activeSpecTab === 'minimum' ? game.systemRequirements.minimum.directX : game.systemRequirements.recommended.directX}</td>
                      </tr>
                      <tr>
                        <th>Fast Storage</th>
                        <td>${this.activeSpecTab === 'minimum' ? game.systemRequirements.minimum.storage : game.systemRequirements.recommended.storage}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Community Reviews & Ratings -->
              <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                  <h3 style="font-size: 1.5rem; display: flex; align-items: center; gap: 0.6rem;">
                    <i data-lucide="message-square" style="color: var(--emerald-accent);"></i>
                    <span>Community Reviews & Intel</span>
                  </h3>
                  <span style="font-family: var(--font-tech); color: var(--gold-accent); font-size: 1.1rem; font-weight: 700;">
                    Overall: ★ ${game.rating} / 5.0
                  </span>
                </div>

                <!-- Review Submission Card -->
                <div class="glass-panel" style="padding: 1.75rem; margin-bottom: 2rem;">
                  <h4 style="font-size: 1.1rem; margin-bottom: 0.75rem;">Post Your Operative Review</h4>
                  <form id="review-submission-form">
                    <div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 1rem;">
                      <span class="form-label" style="margin-bottom: 0;">Rating:</span>
                      <select id="review-rating-select" class="form-control" style="width: auto; padding: 0.4rem 1rem;">
                        <option value="5">★★★★★ (5/5) Masterpiece</option>
                        <option value="4">★★★★☆ (4/5) Great Experience</option>
                        <option value="3">★★★☆☆ (3/5) Decent / Average</option>
                        <option value="2">★★☆☆☆ (2/5) Needs Work</option>
                        <option value="1">★☆☆☆☆ (1/5) Severe Issues</option>
                      </select>
                    </div>

                    <div class="form-group">
                      <textarea id="review-text-input" class="form-control" rows="3" placeholder="Share your gameplay impressions, performance benchmarks, or tactical feedback..." required></textarea>
                    </div>

                    <div style="text-align: right;">
                      <button type="submit" class="btn btn-cyan btn-sm">Submit Review</button>
                    </div>
                  </form>
                </div>

                <!-- User Reviews List -->
                <div style="display: flex; flex-direction: column; gap: 1rem;" id="reviews-list-container">
                  ${customReviews.map(rev => `
                    <div class="glass-panel" style="padding: 1.25rem;">
                      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                        <div style="display: flex; align-items: center; gap: 0.6rem;">
                          <img src="${rev.avatar}" style="width: 28px; height: 28px; border-radius: 50%; object-fit: cover;" alt="${rev.author}" />
                          <strong style="color: var(--text-white); font-family: var(--font-tech);">${rev.author}</strong>
                        </div>
                        <div style="color: var(--gold-accent); font-size: 0.9rem;">★ ${rev.rating}/5 &bull; <span style="color: var(--text-muted); font-size: 0.8rem;">${rev.date}</span></div>
                      </div>
                      <p style="color: var(--text-secondary); font-size: 0.92rem; line-height: 1.6;">${rev.text}</p>
                    </div>
                  `).join("")}

                  <!-- Sample default review -->
                  <div class="glass-panel" style="padding: 1.25rem;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                      <div style="display: flex; align-items: center; gap: 0.6rem;">
                        <img src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&q=80" style="width: 28px; height: 28px; border-radius: 50%; object-fit: cover;" alt="Operative" />
                        <strong style="color: var(--text-white); font-family: var(--font-tech);">Kurogane_Tactics</strong>
                      </div>
                      <div style="color: var(--gold-accent); font-size: 0.9rem;">★ 5/5 &bull; <span style="color: var(--text-muted); font-size: 0.8rem;">3 days ago</span></div>
                    </div>
                    <p style="color: var(--text-secondary); font-size: 0.92rem; line-height: 1.6;">Sensational visual fidelity and buttery responsive controls on 144Hz. The gunplay and movement physics are some of the best I've experienced all year.</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Sidebar Column -->
            <div>
              <!-- Game Meta Summary Card -->
              <div class="glass-panel" style="padding: 1.75rem; margin-bottom: 2rem;">
                <h4 style="font-size: 1.1rem; margin-bottom: 1.25rem; color: var(--text-white);">Game Information</h4>
                
                <div style="display: flex; flex-direction: column; gap: 1rem; font-size: 0.9rem;">
                  <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.5rem;">
                    <span style="color: var(--text-muted);">Genre:</span>
                    <span style="color: var(--cyan-primary); font-weight: 600;">${game.genre}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.5rem;">
                    <span style="color: var(--text-muted);">Platforms:</span>
                    <span style="color: var(--text-white);">${game.platforms.join(", ")}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.5rem;">
                    <span style="color: var(--text-muted);">Metascore:</span>
                    <span style="color: var(--gold-accent); font-weight: 700;">${game.metacritic} / 100</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.5rem;">
                    <span style="color: var(--text-muted);">Anti-Cheat:</span>
                    <span style="color: var(--emerald-accent); font-weight: 600;">Nexus Sentinel Active</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; padding-bottom: 0.5rem;">
                    <span style="color: var(--text-muted);">Online Netcode:</span>
                    <span style="color: var(--text-white);">128-Tick Dedicated</span>
                  </div>
                </div>

                <div style="margin-top: 1.5rem;">
                  <span style="display: block; font-size: 0.8rem; font-family: var(--font-tech); color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.5rem;">Popular Tags:</span>
                  <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
                    ${game.tags.map(t => `<span class="badge" style="background: rgba(255,255,255,0.05); color: var(--text-secondary); border: 1px solid var(--border-subtle);">${t}</span>`).join("")}
                  </div>
                </div>
              </div>

              <!-- Similar Games Recommendations -->
              <div>
                <h4 style="font-size: 1.1rem; margin-bottom: 1.25rem; color: var(--text-white);">You May Also Like</h4>
                <div style="display: flex; flex-direction: column; gap: 1rem;">
                  ${similarGames.map(sim => `
                    <a href="#game-detail?id=${sim.id}" class="glass-panel" style="display: flex; gap: 1rem; padding: 0.75rem; text-decoration: none;">
                      <img src="${sim.coverImage}" alt="${sim.title}" style="width: 72px; height: 72px; object-fit: cover; border-radius: var(--radius-sm);" />
                      <div style="flex: 1;">
                        <div style="font-family: var(--font-display); font-size: 0.95rem; color: var(--text-white); margin-bottom: 0.25rem;">${sim.title}</div>
                        <div style="font-size: 0.8rem; color: var(--cyan-primary);">${sim.genre}</div>
                        <div style="font-size: 0.8rem; color: var(--gold-accent);">★ ${sim.rating} &bull; ${sim.price}</div>
                      </div>
                    </a>
                  `).join("")}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    `;
  },

  switchScreenshot(index) {
    this.activeScreenshotIndex = index;
    const img = document.getElementById("active-screenshot-img");
    const gameId = window.nexusRouter.getParams().id || NEXUS_DATA.games[0].id;
    const game = NEXUS_DATA.games.find(g => g.id === gameId);
    if (img && game && game.screenshots[index]) {
      img.src = game.screenshots[index];
    }
    // Re-render thumbnail borders
    document.querySelectorAll(".game-details-page .glass-panel").forEach((el, idx) => {
      // Refresh styling
    });
    window.nexusRouter.handleRoute();
  },

  switchSpecTab(tab) {
    this.activeSpecTab = tab;
    window.nexusRouter.handleRoute();
  },

  attachEvents(params = {}) {
    const gameId = params.id || NEXUS_DATA.games[0].id;
    const form = document.getElementById("review-submission-form");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const rating = parseInt(document.getElementById("review-rating-select").value, 10);
        const text = document.getElementById("review-text-input").value.trim();
        if (text) {
          window.nexusState.addReview(gameId, { rating, text });
          document.getElementById("review-text-input").value = "";
          window.nexusRouter.handleRoute();
        }
      });
    }
  }
};

window.GameDetailsView = GameDetailsView;
