/**
 * NEXUS REALM - Home Page View
 */

const HomeView = {
  activeCategory: 'all',

  render() {
    const featuredGames = NEXUS_DATA.games.filter(g => g.featured);
    const trendingGames = NEXUS_DATA.games.filter(g => g.trending);
    const upcomingTournaments = NEXUS_DATA.tournaments.slice(0, 3);
    const latestNews = NEXUS_DATA.news.slice(0, 3);
    const heroGame = NEXUS_DATA.games[0]; // Cyber Odyssey

    return `
      <div class="home-page-view">
        <!-- HERO SECTION -->
        <section class="hero-section">
          <div class="hero-bg-overlay" style="background-image: url('${heroGame.heroBanner}');"></div>
          <div class="hero-gradient-overlay"></div>

          <div class="container hero-grid">
            <!-- Left Hero Content -->
            <div class="hero-content">
              <div class="hero-badge-live">
                <span class="pulse-dot"></span>
                <span>NEXUS REALM &bull; SEASON 4 LIVE</span>
              </div>
              
              <h1 class="hero-headline">
                ENTER THE <br />
                <span class="gradient-text-purple">NEXT LEVEL</span>
              </h1>

              <p class="hero-description">
                ${NEXUS_DATA.brand.subtitle}
              </p>

              <div class="hero-actions">
                <a href="#games" class="btn btn-primary btn-lg">
                  <i data-lucide="gamepad-2"></i>
                  <span>Explore Games</span>
                </a>
                <a href="#community" class="btn btn-secondary btn-lg">
                  <i data-lucide="users"></i>
                  <span>Join Community</span>
                </a>
                <button class="btn btn-outline-purple btn-lg" onclick="window.nexusModals.openTrailer('${heroGame.title}', '${heroGame.trailerYoutubeId}')">
                  <i data-lucide="play-circle"></i>
                  <span>Watch Trailer</span>
                </button>
              </div>

              <!-- Live Platform Stats -->
              <div class="hero-stats">
                <div class="stat-item">
                  <span class="stat-value gradient-text-cyan">${NEXUS_DATA.brand.stats.activePlayers}</span>
                  <span class="stat-label">Active Gamers</span>
                </div>
                <div class="stat-item">
                  <span class="stat-value gradient-text-purple">${NEXUS_DATA.brand.stats.activeTournaments}</span>
                  <span class="stat-label">Tournaments</span>
                </div>
                <div class="stat-item">
                  <span class="stat-value gradient-text-fire">${NEXUS_DATA.brand.stats.totalPrizePool}</span>
                  <span class="stat-label">Season Purses</span>
                </div>
                <div class="stat-item">
                  <span class="stat-value" style="color: var(--emerald-accent);">${NEXUS_DATA.brand.stats.globalUptime}</span>
                  <span class="stat-label">Netcode Uptime</span>
                </div>
              </div>
            </div>

            <!-- Right Hero 3D Showcase -->
            <div class="hero-showcase">
              <!-- Floating Top Badge -->
              <div class="floating-pill pill-top-left">
                <i data-lucide="zap" style="color: var(--cyan-primary);"></i>
                <span>RAY TRACING OVERHAUL LIVE</span>
              </div>

              <div class="showcase-card">
                <div class="showcase-media">
                  <img src="${heroGame.coverImage}" alt="${heroGame.title}" />
                  <button class="showcase-play-btn" onclick="window.nexusModals.openTrailer('${heroGame.title}', '${heroGame.trailerYoutubeId}')" title="Play Cinematic Trailer">
                    <i data-lucide="play" style="width: 28px; height: 28px;"></i>
                  </button>
                </div>
                <div class="showcase-details">
                  <div class="showcase-meta">
                    <span class="badge badge-trending">🔥 Top Ranked RPG</span>
                    <div class="game-rating">
                      <i data-lucide="star"></i>
                      <span>${heroGame.rating} / 5.0</span>
                    </div>
                  </div>
                  <h3 class="showcase-title">${heroGame.title}</h3>
                  <p class="showcase-desc">${heroGame.synopsis}</p>
                  <div style="display: flex; gap: 0.75rem; margin-top: 1.25rem;">
                    <a href="#game-detail?id=${heroGame.id}" class="btn btn-cyan btn-sm" style="flex: 1;">
                      <span>View Game</span>
                      <i data-lucide="arrow-right"></i>
                    </a>
                    <button class="btn btn-secondary btn-sm" onclick="window.nexusState.toggleFavorite('${heroGame.id}')" title="Add to Wishlist">
                      <i data-lucide="${window.nexusState.isFavorite(heroGame.id) ? 'heart' : 'heart'}" style="${window.nexusState.isFavorite(heroGame.id) ? 'color: var(--red-cyber); fill: var(--red-cyber);' : ''}"></i>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Floating Bottom Badge -->
              <div class="floating-pill pill-bottom-right">
                <i data-lucide="award" style="color: var(--gold-accent);"></i>
                <span>GOTY NOMINEE 2026</span>
              </div>
            </div>
          </div>
        </section>

        <!-- FEATURED GAMES SECTION -->
        <section style="padding: 5rem 0;" id="featured-games-section">
          <div class="container">
            <div class="section-header" style="display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 1rem;">
              <div>
                <span class="section-tag">Curated Highlights</span>
                <h2 class="section-title">Featured Games</h2>
                <p class="section-subtitle">Handpicked AAA spectacles and breakthrough indie marvels optimized for ultra-performance.</p>
              </div>
              <a href="#games" class="btn btn-secondary btn-sm">
                <span>View Full Catalog</span>
                <i data-lucide="arrow-right"></i>
              </a>
            </div>

            <!-- Category Filter Bar -->
            <div class="filter-bar">
              <div class="filter-chips">
                <button class="filter-chip active" data-filter="all">All Genres</button>
                <button class="filter-chip" data-filter="rpg">Action RPG</button>
                <button class="filter-chip" data-filter="fps">Tactical FPS</button>
                <button class="filter-chip" data-filter="scifi">Sci-Fi Sim</button>
                <button class="filter-chip" data-filter="action">Dark Fantasy</button>
                <button class="filter-chip" data-filter="racing">Racing</button>
              </div>

              <div class="filter-search-box">
                <i data-lucide="search" style="width: 16px; height: 16px;"></i>
                <input type="text" id="home-game-search" placeholder="Filter games by title or tag..." />
              </div>
            </div>

            <!-- Games Grid -->
            <div class="games-grid" id="home-featured-games-grid">
              ${this.renderGameCards(featuredGames)}
            </div>
          </div>
        </section>

        <!-- TRENDING GAMES SECTION -->
        <section style="padding: 5rem 0; background: rgba(0, 0, 0, 0.25); border-top: 1px solid var(--border-subtle); border-bottom: 1px solid var(--border-subtle);">
          <div class="container">
            <div class="section-header">
              <span class="section-tag tag-purple">Real-Time Heatmap</span>
              <h2 class="section-title">Trending Now</h2>
              <p class="section-subtitle">What the global gaming community is playing, streaming, and competing in right now.</p>
            </div>

            <div class="games-grid">
              ${this.renderGameCards(trendingGames)}
            </div>
          </div>
        </section>

        <!-- TOURNAMENTS SECTION -->
        <section style="padding: 5rem 0;" id="tournaments-section">
          <div class="container">
            <div class="section-header" style="display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 1rem;">
              <div>
                <span class="section-tag tag-red">Competitive Esports</span>
                <h2 class="section-title">Upcoming Tournaments</h2>
                <p class="section-subtitle">Compete on ultra-responsive 128-tick servers for cash prizes, global rankings, and sponsor contracts.</p>
              </div>
              <a href="#tournaments" class="btn btn-secondary btn-sm">
                <span>All Tournaments</span>
                <i data-lucide="arrow-right"></i>
              </a>
            </div>

            <div class="games-grid" style="grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));">
              ${upcomingTournaments.map(t => this.renderTournamentCard(t)).join("")}
            </div>
          </div>
        </section>

        <!-- GAMING NEWS SECTION -->
        <section style="padding: 5rem 0; background: rgba(0, 0, 0, 0.2); border-top: 1px solid var(--border-subtle);">
          <div class="container">
            <div class="section-header" style="display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 1rem;">
              <div>
                <span class="section-tag">Direct From The Studio</span>
                <h2 class="section-title">Gaming Intel & Updates</h2>
                <p class="section-subtitle">Patch notes, developer deep dives, esports results, and next-generation hardware benchmarks.</p>
              </div>
              <a href="#news" class="btn btn-secondary btn-sm">
                <span>Read All Intel</span>
                <i data-lucide="arrow-right"></i>
              </a>
            </div>

            <div class="news-grid">
              ${latestNews.map(n => this.renderNewsCard(n)).join("")}
            </div>
          </div>
        </section>

        <!-- COMMUNITY SECTION -->
        <section style="padding: 5rem 0;">
          <div class="container">
            <div class="community-banner-card">
              <div class="community-banner-grid">
                <div>
                  <span class="section-tag tag-purple">Join The Vanguard</span>
                  <h2 style="font-size: clamp(2rem, 3.5vw, 2.8rem); margin-bottom: 1rem;">
                    FORGE YOUR LEGACY WITH <br />
                    <span class="gradient-text-cyan">THE NEXUS COMMUNITY</span>
                  </h2>
                  <p style="color: var(--text-secondary); font-size: 1.05rem; line-height: 1.7; margin-bottom: 2rem; max-width: 580px;">
                    Connect with over 180,000 competitive gamers, share strategy clips, find squad members for ranked tournaments, and engage directly with developers.
                  </p>
                  <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                    <a href="https://discord.com" target="_blank" rel="noreferrer" class="btn btn-primary btn-lg">
                      <i data-lucide="disc"></i>
                      <span>Join Official Discord</span>
                    </a>
                    <a href="#community" class="btn btn-secondary btn-lg">
                      <i data-lucide="message-square"></i>
                      <span>Explore Forums</span>
                    </a>
                  </div>
                </div>

                <div class="community-stats-grid">
                  <div class="community-stat-box">
                    <i data-lucide="users" style="width: 28px; height: 28px;"></i>
                    <span class="stat-value gradient-text-purple">${NEXUS_DATA.community.discordMembers}</span>
                    <span class="stat-label">Community Members</span>
                  </div>
                  <div class="community-stat-box">
                    <i data-lucide="radio" style="width: 28px; height: 28px; color: var(--emerald-accent);"></i>
                    <span class="stat-value" style="color: var(--emerald-accent);">${NEXUS_DATA.community.discordOnline}</span>
                    <span class="stat-label">Online In Comms</span>
                  </div>
                  <div class="community-stat-box">
                    <i data-lucide="shield" style="width: 28px; height: 28px; color: var(--gold-accent);"></i>
                    <span class="stat-value gradient-text-fire">840+</span>
                    <span class="stat-label">Verified Clans</span>
                  </div>
                  <div class="community-stat-box">
                    <i data-lucide="trophy" style="width: 28px; height: 28px; color: var(--cyan-primary);"></i>
                    <span class="stat-value gradient-text-cyan">$6.8M</span>
                    <span class="stat-label">Prizes Awarded</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    `;
  },

  renderGameCards(gamesList) {
    if (gamesList.length === 0) {
      return `<div style="grid-column: 1 / -1; padding: 3rem; text-align: center; color: var(--text-muted);">No games match your selected criteria.</div>`;
    }

    return gamesList.map(game => {
      const isFav = window.nexusState.isFavorite(game.id);
      let badgeClass = "badge-popular";
      if (game.badge === "Trending") badgeClass = "badge-trending";
      if (game.badge === "New") badgeClass = "badge-new";
      if (game.badge === "GOTY Nominee") badgeClass = "badge-goty";

      return `
        <div class="game-card">
          <div class="game-thumb-wrapper">
            <img src="${game.coverImage}" alt="${game.title}" class="game-thumb" loading="lazy" />
            <div class="game-badge-overlay">
              <span class="badge ${badgeClass}">${game.badge}</span>
            </div>
            <button class="game-wishlist-btn ${isFav ? 'active' : ''}" onclick="window.nexusState.toggleFavorite('${game.id}'); window.nexusRouter.handleRoute();" title="Wishlist">
              <i data-lucide="heart" style="${isFav ? 'fill: currentColor;' : ''}"></i>
            </button>
          </div>

          <div class="game-card-body">
            <div class="game-card-meta">
              <span class="game-genre">${game.genre}</span>
              <div class="game-rating">
                <i data-lucide="star"></i>
                <span>${game.rating}</span>
              </div>
            </div>

            <h3 class="game-title">
              <a href="#game-detail?id=${game.id}">${game.title}</a>
            </h3>

            <p class="game-description">${game.synopsis}</p>

            <div class="game-platforms">
              ${game.platforms.map(p => `<span class="platform-pill">${p}</span>`).join("")}
            </div>

            <div class="game-card-footer">
              <span class="game-price ${game.isFree ? 'is-free' : ''}">${game.price}</span>
              <div style="display: flex; gap: 0.5rem;">
                <a href="#game-detail?id=${game.id}" class="btn btn-secondary btn-sm" title="View Details">
                  <span>Learn More</span>
                </a>
                <a href="#game-detail?id=${game.id}" class="btn btn-cyan btn-sm" title="Play Game">
                  <span>View Game</span>
                  <i data-lucide="chevron-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join("");
  },

  renderTournamentCard(tournament) {
    const isRegistered = window.nexusState.isRegisteredForTournament(tournament.id);
    const progressPercent = Math.round((tournament.registeredTeams / tournament.maxTeams) * 100);

    return `
      <div class="tournament-card">
        <div class="tournament-banner-wrapper">
          <img src="${tournament.banner}" alt="${tournament.name}" loading="lazy" />
          <div class="tournament-prize-badge">
            <span class="prize-title">Prize Pool:</span>
            <span class="prize-amount">${tournament.prizePool}</span>
          </div>
          <div style="position: absolute; top: 1rem; right: 1rem;">
            <span class="badge ${tournament.status === 'Live' ? 'badge-live' : 'badge-new'}">${tournament.status}</span>
          </div>
        </div>

        <div class="tournament-body">
          <div class="tournament-game">${tournament.gameTitle}</div>
          <h3 class="tournament-title">${tournament.name}</h3>

          <div class="tournament-meta-grid">
            <div class="meta-box">
              <span class="meta-box-label">Tournament Format</span>
              <span class="meta-box-value">${tournament.format}</span>
            </div>
            <div class="meta-box">
              <span class="meta-box-label">Starts On</span>
              <span class="meta-box-value">${tournament.startDate}</span>
            </div>
          </div>

          <div class="tournament-slots-bar">
            <div class="slots-label-row">
              <span>Teams Registered</span>
              <span style="font-weight: 700; color: var(--text-white);">${tournament.registeredTeams} / ${tournament.maxTeams}</span>
            </div>
            <div class="slots-track">
              <div class="slots-fill" style="width: ${progressPercent}%;"></div>
            </div>
          </div>

          <div class="tournament-actions">
            <a href="#tournaments?id=${tournament.id}" class="btn btn-secondary btn-sm" style="flex: 1;">
              <span>View Rules</span>
            </a>
            ${isRegistered ? `
              <button class="btn btn-primary btn-sm" style="flex: 1.2; background: rgba(16, 185, 129, 0.2); border-color: var(--emerald-accent); color: var(--emerald-accent);" disabled>
                <i data-lucide="check-circle"></i>
                <span>Registered</span>
              </button>
            ` : `
              <button class="btn btn-cyan btn-sm" style="flex: 1.2;" onclick="window.nexusModals.openRegisterTournament('${tournament.id}')">
                <i data-lucide="flag"></i>
                <span>Register Squad</span>
              </button>
            `}
          </div>
        </div>
      </div>
    `;
  },

  renderNewsCard(article) {
    return `
      <div class="news-card">
        <div class="news-thumb-wrapper">
          <img src="${article.heroImage}" alt="${article.title}" loading="lazy" />
        </div>
        <div class="news-body">
          <div class="news-meta-row">
            <span class="news-category-badge badge-${article.categoryBadge || 'cyan'}">${article.category}</span>
            <span class="news-date">${article.publishedAt}</span>
          </div>
          <h3 class="news-title">
            <a href="#news-article?id=${article.id}">${article.title}</a>
          </h3>
          <p class="news-summary">${article.summary}</p>
          <div class="news-footer">
            <div class="news-author-inline">
              <img src="${article.authorAvatar}" class="news-author-avatar" alt="${article.author}" />
              <span class="news-author-name">${article.author}</span>
            </div>
            <a href="#news-article?id=${article.id}" class="news-read-more">
              <span>Read More</span>
              <i data-lucide="arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    `;
  },

  attachEvents() {
    // Filter chips
    const chips = document.querySelectorAll(".filter-chip");
    const grid = document.getElementById("home-featured-games-grid");

    chips.forEach(chip => {
      chip.addEventListener("click", () => {
        chips.forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        const category = chip.getAttribute("data-filter");
        this.activeCategory = category;

        const filtered = category === "all"
          ? NEXUS_DATA.games
          : NEXUS_DATA.games.filter(g => g.category === category);

        if (grid) {
          grid.innerHTML = this.renderGameCards(filtered);
          if (window.lucide) window.lucide.createIcons({ root: grid });
          window.nexusState.playSound("click");
        }
      });
    });

    // Home games search input
    const searchInput = document.getElementById("home-game-search");
    if (searchInput && grid) {
      searchInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase().trim();
        const base = this.activeCategory === "all"
          ? NEXUS_DATA.games
          : NEXUS_DATA.games.filter(g => g.category === this.activeCategory);

        const filtered = base.filter(g =>
          g.title.toLowerCase().includes(query) ||
          g.genre.toLowerCase().includes(query) ||
          g.tags.some(t => t.toLowerCase().includes(query))
        );

        grid.innerHTML = this.renderGameCards(filtered);
        if (window.lucide) window.lucide.createIcons({ root: grid });
      });
    }
  }
};

window.HomeView = HomeView;
