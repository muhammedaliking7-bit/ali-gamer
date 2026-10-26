/**
 * NEXUS REALM - Gaming News Hub View
 */

const NewsView = {
  activeCategory: 'All',
  searchQuery: '',

  render(params = {}) {
    if (params.category) this.activeCategory = params.category;
    const featuredStory = NEXUS_DATA.news.find(n => n.featured) || NEXUS_DATA.news[0];

    return `
      <div class="news-hub-page" style="padding: 3rem 0 6rem;">
        <div class="container">
          <!-- Page Header -->
          <div class="section-header">
            <span class="section-tag tag-cyan">The Dispatch</span>
            <h1 class="section-title">Gaming Intel & Announcements</h1>
            <p class="section-subtitle">Official patch notes, competitive esports recaps, and deep-dive technical features from the frontier of gaming.</p>
          </div>

          <!-- Featured Headline Story Banner -->
          <div class="glass-panel" style="margin-bottom: 3.5rem; overflow: hidden; border-color: var(--border-cyan);">
            <div style="display: grid; grid-template-columns: 1.25fr 1fr; align-items: center;" id="news-featured-grid">
              <div style="position: relative; aspect-ratio: 16 / 10; overflow: hidden;">
                <img src="${featuredStory.heroImage}" alt="${featuredStory.title}" style="width: 100%; height: 100%; object-fit: cover;" />
                <div style="position: absolute; top: 1.25rem; left: 1.25rem;">
                  <span class="badge badge-trending">🔥 FEATURED INTEL</span>
                </div>
              </div>

              <div style="padding: 2.5rem;">
                <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
                  <span class="badge badge-${featuredStory.categoryBadge}">${featuredStory.category}</span>
                  <span style="font-size: 0.85rem; color: var(--text-muted);">${featuredStory.publishedAt} &bull; ${featuredStory.readTime}</span>
                </div>

                <h2 style="font-size: clamp(1.4rem, 2.5vw, 2rem); margin-bottom: 1rem; line-height: 1.25;">
                  <a href="#news-article?id=${featuredStory.id}">${featuredStory.title}</a>
                </h2>

                <p style="color: var(--text-secondary); line-height: 1.7; margin-bottom: 1.5rem; font-size: 0.95rem;">
                  ${featuredStory.summary}
                </p>

                <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
                  <div style="display: flex; align-items: center; gap: 0.6rem;">
                    <img src="${featuredStory.authorAvatar}" style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover;" alt="${featuredStory.author}" />
                    <div>
                      <div style="font-size: 0.85rem; font-weight: 700; color: var(--text-white);">${featuredStory.author}</div>
                      <div style="font-size: 0.75rem; color: var(--text-muted);">${featuredStory.authorRole}</div>
                    </div>
                  </div>

                  <a href="#news-article?id=${featuredStory.id}" class="btn btn-cyan btn-sm">
                    <span>Read Full Article</span>
                    <i data-lucide="arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- News Filtering & Search Toolbar -->
          <div class="filter-bar">
            <div class="filter-chips">
              <button class="filter-chip ${this.activeCategory === 'All' ? 'active' : ''}" data-cat="All">All Stories</button>
              <button class="filter-chip ${this.activeCategory === 'Patch Notes' ? 'active' : ''}" data-cat="Patch Notes">Patch Notes</button>
              <button class="filter-chip ${this.activeCategory === 'Esports' ? 'active' : ''}" data-cat="Esports">Esports</button>
              <button class="filter-chip ${this.activeCategory === 'Hardware' ? 'active' : ''}" data-cat="Hardware">Hardware</button>
              <button class="filter-chip ${this.activeCategory === 'Industry' ? 'active' : ''}" data-cat="Industry">Industry</button>
            </div>

            <div class="filter-search-box">
              <i data-lucide="search" style="width: 16px; height: 16px;"></i>
              <input type="text" id="news-search-input" value="${this.searchQuery}" placeholder="Search news articles, topics..." />
            </div>
          </div>

          <!-- Articles Grid -->
          <div class="news-grid" id="news-grid-container">
            ${this.renderArticles()}
          </div>
        </div>
      </div>
    `;
  },

  renderArticles() {
    const filtered = NEXUS_DATA.news.filter(article => {
      const matchCat = this.activeCategory === 'All' || article.category === this.activeCategory;
      const matchSearch = !this.searchQuery ||
        article.title.toLowerCase().includes(this.searchQuery) ||
        article.summary.toLowerCase().includes(this.searchQuery) ||
        article.author.toLowerCase().includes(this.searchQuery);
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      return `
        <div style="grid-column: 1 / -1; padding: 4rem; text-align: center; color: var(--text-muted);">
          <i data-lucide="newspaper" style="width: 48px; height: 48px; margin-bottom: 1rem; color: var(--text-muted);"></i>
          <h3>No Articles Found</h3>
          <p>Try clearing your category filter or search query.</p>
        </div>
      `;
    }

    return filtered.map(article => `
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
              <span>Read</span>
              <i data-lucide="arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    `).join("");
  },

  attachEvents() {
    const searchInput = document.getElementById("news-search-input");
    const container = document.getElementById("news-grid-container");

    if (searchInput && container) {
      searchInput.addEventListener("input", (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        container.innerHTML = this.renderArticles();
        if (window.lucide) window.lucide.createIcons({ root: container });
      });
    }

    document.querySelectorAll("[data-cat]").forEach(chip => {
      chip.addEventListener("click", () => {
        document.querySelectorAll("[data-cat]").forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        this.activeCategory = chip.getAttribute("data-cat");
        if (container) {
          container.innerHTML = this.renderArticles();
          if (window.lucide) window.lucide.createIcons({ root: container });
        }
        window.nexusState.playSound("click");
      });
    });
  }
};

window.NewsView = NewsView;
