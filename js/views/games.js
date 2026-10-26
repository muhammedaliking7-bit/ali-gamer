/**
 * NEXUS REALM - Games Catalog View (Search, Sort, Multi-Filter)
 */

const GamesView = {
  selectedCategory: 'all',
  selectedPlatform: 'all',
  selectedPricing: 'all',
  sortBy: 'popularity',
  searchQuery: '',
  viewMode: 'grid',

  render(params = {}) {
    if (params.category) this.selectedCategory = params.category;
    if (params.filter === 'free') this.selectedPricing = 'free';

    return `
      <div class="games-catalog-page" style="padding: 3rem 0 6rem;">
        <div class="container">
          <!-- Page Header -->
          <div class="section-header" style="margin-bottom: 2rem;">
            <span class="section-tag">Game Library</span>
            <h1 class="section-title">Explore Next-Gen Titles</h1>
            <p class="section-subtitle">Browse through world-class experiences engineered with cutting-edge visual tech and competitive integrity.</p>
          </div>

          <!-- Controls & Filters Toolbar -->
          <div class="glass-panel" style="padding: 1.5rem; margin-bottom: 2.5rem;">
            <div style="display: grid; grid-template-columns: 1.4fr 1fr 1fr 1fr auto; gap: 1rem; align-items: center;" id="catalog-controls-grid">
              
              <!-- Search Bar -->
              <div class="filter-search-box" style="width: 100%;">
                <i data-lucide="search" style="width: 18px; height: 18px;"></i>
                <input type="text" id="catalog-search-input" value="${this.searchQuery}" placeholder="Search title, genre, developer, tags..." />
              </div>

              <!-- Genre Selector -->
              <div>
                <select id="catalog-genre-select" class="form-control" style="padding: 0.65rem 0.85rem;">
                  <option value="all" ${this.selectedCategory === 'all' ? 'selected' : ''}>All Genres</option>
                  <option value="rpg" ${this.selectedCategory === 'rpg' ? 'selected' : ''}>Action RPG</option>
                  <option value="fps" ${this.selectedCategory === 'fps' ? 'selected' : ''}>Tactical FPS</option>
                  <option value="scifi" ${this.selectedCategory === 'scifi' ? 'selected' : ''}>Sci-Fi Space Sim</option>
                  <option value="action" ${this.selectedCategory === 'action' ? 'selected' : ''}>Dark Fantasy & Action</option>
                  <option value="racing" ${this.selectedCategory === 'racing' ? 'selected' : ''}>Hyper Racing</option>
                  <option value="survival" ${this.selectedCategory === 'survival' ? 'selected' : ''}>Survival Sandbox</option>
                </select>
              </div>

              <!-- Platform Selector -->
              <div>
                <select id="catalog-platform-select" class="form-control" style="padding: 0.65rem 0.85rem;">
                  <option value="all" ${this.selectedPlatform === 'all' ? 'selected' : ''}>All Platforms</option>
                  <option value="PC" ${this.selectedPlatform === 'PC' ? 'selected' : ''}>PC (DirectX 12)</option>
                  <option value="PS5" ${this.selectedPlatform === 'PS5' ? 'selected' : ''}>PlayStation 5</option>
                  <option value="Xbox Series X" ${this.selectedPlatform === 'Xbox Series X' ? 'selected' : ''}>Xbox Series X</option>
                  <option value="Switch" ${this.selectedPlatform === 'Switch' ? 'selected' : ''}>Nintendo Switch</option>
                </select>
              </div>

              <!-- Sort Order -->
              <div>
                <select id="catalog-sort-select" class="form-control" style="padding: 0.65rem 0.85rem;">
                  <option value="popularity" ${this.sortBy === 'popularity' ? 'selected' : ''}>Sort by: Popularity</option>
                  <option value="rating" ${this.sortBy === 'rating' ? 'selected' : ''}>Sort by: Metascore Rating</option>
                  <option value="newest" ${this.sortBy === 'newest' ? 'selected' : ''}>Sort by: Release Date</option>
                  <option value="name" ${this.sortBy === 'name' ? 'selected' : ''}>Sort by: Title (A-Z)</option>
                </select>
              </div>

              <!-- Reset Button -->
              <button class="btn btn-secondary btn-sm" id="catalog-reset-btn" title="Reset Filters">
                <i data-lucide="rotate-ccw"></i>
                <span class="desktop-only">Reset</span>
              </button>
            </div>

            <!-- Second Row Quick Filter Pills -->
            <div style="display: flex; gap: 0.6rem; margin-top: 1.25rem; flex-wrap: wrap; align-items: center; justify-content: space-between; border-top: 1px solid var(--border-subtle); padding-top: 1rem;">
              <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
                <span style="font-family: var(--font-tech); font-size: 0.85rem; color: var(--text-muted); text-transform: uppercase;">Quick Filter:</span>
                <button class="filter-chip ${this.selectedPricing === 'all' ? 'active' : ''}" data-price="all">All Models</button>
                <button class="filter-chip ${this.selectedPricing === 'free' ? 'active' : ''}" data-price="free">Free to Play</button>
                <button class="filter-chip ${this.selectedPricing === 'paid' ? 'active' : ''}" data-price="paid">Premium Titles</button>
              </div>

              <div id="catalog-results-count" style="font-family: var(--font-tech); font-size: 0.9rem; color: var(--text-secondary);">
                <!-- Dynamic count populated in attachEvents -->
              </div>
            </div>
          </div>

          <!-- Catalog Grid Container -->
          <div class="games-grid" id="catalog-games-grid">
            ${this.renderFilteredList()}
          </div>
        </div>
      </div>
    `;
  },

  getFilteredGames() {
    return NEXUS_DATA.games.filter(game => {
      // Search
      const matchesSearch = !this.searchQuery ||
        game.title.toLowerCase().includes(this.searchQuery) ||
        game.genre.toLowerCase().includes(this.searchQuery) ||
        game.developer.toLowerCase().includes(this.searchQuery) ||
        game.tags.some(t => t.toLowerCase().includes(this.searchQuery));

      // Category
      const matchesCategory = this.selectedCategory === 'all' || game.category === this.selectedCategory;

      // Platform
      const matchesPlatform = this.selectedPlatform === 'all' || game.platforms.includes(this.selectedPlatform);

      // Pricing
      const matchesPricing = this.selectedPricing === 'all' ||
        (this.selectedPricing === 'free' && game.isFree) ||
        (this.selectedPricing === 'paid' && !game.isFree);

      return matchesSearch && matchesCategory && matchesPlatform && matchesPricing;
    }).sort((a, b) => {
      if (this.sortBy === 'rating') return b.metacritic - a.metacritic;
      if (this.sortBy === 'newest') return new Date(b.releaseDate) - new Date(a.releaseDate);
      if (this.sortBy === 'name') return a.title.localeCompare(b.title);
      // Popularity default
      return b.rating - a.rating;
    });
  },

  renderFilteredList() {
    const list = this.getFilteredGames();

    if (list.length === 0) {
      return `
        <div style="grid-column: 1 / -1; padding: 5rem 2rem; text-align: center; background: var(--bg-card); border-radius: var(--radius-xl); border: 1px dashed var(--border-subtle);">
          <i data-lucide="gamepad" style="width: 48px; height: 48px; color: var(--text-muted); margin-bottom: 1rem;"></i>
          <h3 style="font-size: 1.4rem; margin-bottom: 0.5rem; color: var(--text-white);">No Games Match Your Filters</h3>
          <p style="color: var(--text-secondary); max-width: 450px; margin: 0 auto 1.5rem;">Try relaxing your search terms or clearing specific category / platform restrictions.</p>
          <button class="btn btn-cyan btn-sm" onclick="GamesView.resetFilters()">Clear All Filters</button>
        </div>
      `;
    }

    return list.map(game => {
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
                <span>${game.rating} (${game.metacritic} Metascore)</span>
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
                <a href="#game-detail?id=${game.id}" class="btn btn-secondary btn-sm">
                  <span>Learn More</span>
                </a>
                <a href="#game-detail?id=${game.id}" class="btn btn-cyan btn-sm">
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

  updateList() {
    const grid = document.getElementById("catalog-games-grid");
    const countEl = document.getElementById("catalog-results-count");
    if (grid) {
      grid.innerHTML = this.renderFilteredList();
      if (window.lucide) window.lucide.createIcons({ root: grid });
    }
    if (countEl) {
      const filtered = this.getFilteredGames();
      countEl.innerHTML = `Showing <strong style="color: var(--cyan-primary);">${filtered.length}</strong> of ${NEXUS_DATA.games.length} Games`;
    }
  },

  resetFilters() {
    this.selectedCategory = 'all';
    this.selectedPlatform = 'all';
    this.selectedPricing = 'all';
    this.searchQuery = '';
    this.sortBy = 'popularity';
    window.nexusRouter.handleRoute();
  },

  attachEvents() {
    const searchInput = document.getElementById("catalog-search-input");
    const genreSelect = document.getElementById("catalog-genre-select");
    const platformSelect = document.getElementById("catalog-platform-select");
    const sortSelect = document.getElementById("catalog-sort-select");
    const resetBtn = document.getElementById("catalog-reset-btn");

    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.updateList();
      });
    }

    if (genreSelect) {
      genreSelect.addEventListener("change", (e) => {
        this.selectedCategory = e.target.value;
        this.updateList();
        window.nexusState.playSound("click");
      });
    }

    if (platformSelect) {
      platformSelect.addEventListener("change", (e) => {
        this.selectedPlatform = e.target.value;
        this.updateList();
        window.nexusState.playSound("click");
      });
    }

    if (sortSelect) {
      sortSelect.addEventListener("change", (e) => {
        this.sortBy = e.target.value;
        this.updateList();
        window.nexusState.playSound("click");
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        this.resetFilters();
        window.nexusState.playSound("click");
      });
    }

    // Price chips
    document.querySelectorAll("[data-price]").forEach(chip => {
      chip.addEventListener("click", () => {
        document.querySelectorAll("[data-price]").forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        this.selectedPricing = chip.getAttribute("data-price");
        this.updateList();
        window.nexusState.playSound("click");
      });
    });

    this.updateList();
  }
};

window.GamesView = GamesView;
