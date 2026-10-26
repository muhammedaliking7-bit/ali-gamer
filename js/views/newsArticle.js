/**
 * NEXUS REALM - News Article Reader View
 */

const NewsArticleView = {
  liked: false,

  render(params = {}) {
    const articleId = params.id || NEXUS_DATA.news[0].id;
    const article = NEXUS_DATA.news.find(n => n.id === articleId) || NEXUS_DATA.news[0];
    const relatedArticles = NEXUS_DATA.news.filter(n => n.id !== article.id).slice(0, 2);

    return `
      <div class="article-reader-page">
        <!-- Reading Progress Bar -->
        <div class="reading-progress-bar" id="article-progress-bar"></div>

        <div class="container-narrow article-reader-container">
          <!-- Back Link -->
          <div style="margin-bottom: 2rem;">
            <a href="#news" class="btn btn-secondary btn-sm" style="display: inline-flex; align-items: center; gap: 0.5rem;">
              <i data-lucide="arrow-left"></i>
              <span>Back to Dispatch Hub</span>
            </a>
          </div>

          <!-- Article Header -->
          <header style="margin-bottom: 2.5rem;">
            <div style="display: flex; gap: 0.75rem; align-items: center; margin-bottom: 1rem; flex-wrap: wrap;">
              <span class="badge badge-${article.categoryBadge || 'cyan'}">${article.category}</span>
              <span style="font-size: 0.85rem; color: var(--text-muted);">${article.publishedAt}</span>
              <span style="color: var(--border-subtle);">&bull;</span>
              <span style="font-size: 0.85rem; color: var(--text-secondary); display: flex; align-items: center; gap: 0.3rem;">
                <i data-lucide="clock" style="width: 14px; height: 14px;"></i>
                <span>${article.readTime}</span>
              </span>
            </div>

            <h1 style="font-size: clamp(2rem, 3.8vw, 3rem); line-height: 1.2; margin-bottom: 1.5rem; color: var(--text-white);">
              ${article.title}
            </h1>

            <!-- Author Card -->
            <div class="glass-panel" style="padding: 1rem 1.5rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
              <div style="display: flex; align-items: center; gap: 0.85rem;">
                <img src="${article.authorAvatar}" alt="${article.author}" style="width: 44px; height: 44px; border-radius: 50%; object-fit: cover; border: 2px solid var(--cyan-primary);" />
                <div>
                  <div style="font-family: var(--font-tech); font-weight: 700; font-size: 1.05rem; color: var(--text-white);">${article.author}</div>
                  <div style="font-size: 0.8rem; color: var(--text-muted);">${article.authorRole}</div>
                </div>
              </div>

              <!-- Share & Like Buttons -->
              <div style="display: flex; gap: 0.5rem;">
                <button class="btn btn-secondary btn-sm" id="article-like-btn" title="Like this article">
                  <i data-lucide="thumbs-up" style="${this.liked ? 'color: var(--cyan-primary); fill: var(--cyan-primary);' : ''}"></i>
                  <span id="article-like-count">${this.liked ? 'Liked' : 'Like'}</span>
                </button>
                <button class="btn btn-secondary btn-sm" id="article-share-btn" title="Copy Article Link">
                  <i data-lucide="share-2"></i>
                  <span>Share</span>
                </button>
              </div>
            </div>
          </header>

          <!-- Hero Media -->
          <div class="glass-panel" style="border-radius: var(--radius-xl); overflow: hidden; margin-bottom: 3rem; aspect-ratio: 16 / 9;">
            <img src="${article.heroImage}" alt="${article.title}" style="width: 100%; height: 100%; object-fit: cover;" />
          </div>

          <!-- Editorial Article Body -->
          <article class="article-body-content">
            ${article.content}
          </article>

          <!-- Divider -->
          <div style="border-top: 1px solid var(--border-subtle); margin: 4rem 0 3rem;"></div>

          <!-- Comments Section -->
          <section id="article-comments-section" style="margin-bottom: 4rem;">
            <h3 style="font-size: 1.5rem; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.6rem;">
              <i data-lucide="message-square" style="color: var(--cyan-primary);"></i>
              <span>Discussion (${article.comments.length})</span>
            </h3>

            <!-- Comment Form -->
            <div class="glass-panel" style="padding: 1.5rem; margin-bottom: 2rem;">
              <form id="comment-form">
                <div class="form-group">
                  <textarea id="comment-input" class="form-control" rows="3" placeholder="Leave your strategic thoughts or debrief feedback..." required></textarea>
                </div>
                <div style="text-align: right;">
                  <button type="submit" class="btn btn-cyan btn-sm">Post Comment</button>
                </div>
              </form>
            </div>

            <!-- Comments List -->
            <div style="display: flex; flex-direction: column; gap: 1rem;" id="article-comments-list">
              ${article.comments.map(c => `
                <div class="glass-panel" style="padding: 1.25rem;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem;">
                    <div style="display: flex; align-items: center; gap: 0.6rem;">
                      <img src="${c.avatar}" style="width: 30px; height: 30px; border-radius: 50%; object-fit: cover;" alt="${c.author}" />
                      <strong style="color: var(--text-white); font-family: var(--font-tech);">${c.author}</strong>
                    </div>
                    <span style="font-size: 0.8rem; color: var(--text-muted);">${c.date}</span>
                  </div>
                  <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6;">${c.text}</p>
                </div>
              `).join("")}
            </div>
          </section>

          <!-- Related Intel -->
          <section>
            <h3 style="font-size: 1.4rem; margin-bottom: 1.5rem;">Related Intel</h3>
            <div class="news-grid" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));">
              ${relatedArticles.map(rel => `
                <div class="news-card">
                  <div class="news-thumb-wrapper">
                    <img src="${rel.heroImage}" alt="${rel.title}" />
                  </div>
                  <div class="news-body">
                    <span class="news-category-badge badge-${rel.categoryBadge || 'cyan'}" style="width: fit-content; margin-bottom: 0.5rem;">${rel.category}</span>
                    <h4 class="news-title">
                      <a href="#news-article?id=${rel.id}">${rel.title}</a>
                    </h4>
                    <a href="#news-article?id=${rel.id}" class="news-read-more" style="margin-top: auto;">
                      <span>Read More</span>
                      <i data-lucide="arrow-right"></i>
                    </a>
                  </div>
                </div>
              `).join("")}
            </div>
          </section>
        </div>
      </div>
    `;
  },

  attachEvents(params = {}) {
    const articleId = params.id || NEXUS_DATA.news[0].id;
    const article = NEXUS_DATA.news.find(n => n.id === articleId) || NEXUS_DATA.news[0];

    // Scroll reading progress bar
    const progressBar = document.getElementById("article-progress-bar");
    if (progressBar) {
      window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
      });
    }

    // Like button
    const likeBtn = document.getElementById("article-like-btn");
    if (likeBtn) {
      likeBtn.addEventListener("click", () => {
        this.liked = !this.liked;
        window.nexusState.playSound("favorite");
        window.nexusState.showToast(this.liked ? "Article Liked!" : "Like removed", "info", "thumbs-up");
        window.nexusRouter.handleRoute();
      });
    }

    // Share button
    const shareBtn = document.getElementById("article-share-btn");
    if (shareBtn) {
      shareBtn.addEventListener("click", () => {
        navigator.clipboard?.writeText(window.location.href);
        window.nexusState.playSound("success");
        window.nexusState.showToast("Article dispatch link copied to clipboard!", "success", "check");
      });
    }

    // Comment submission
    const commentForm = document.getElementById("comment-form");
    if (commentForm) {
      commentForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const input = document.getElementById("comment-input");
        const text = input.value.trim();
        if (text) {
          article.comments.unshift({
            id: "c_" + Date.now(),
            author: window.nexusState.currentUser.gamertag,
            avatar: window.nexusState.currentUser.avatar,
            date: "Just now",
            text: text
          });
          input.value = "";
          window.nexusState.playSound("success");
          window.nexusState.showToast("Comment published to dispatch!", "success", "message-square");
          window.nexusRouter.handleRoute();
        }
      });
    }
  }
};

window.NewsArticleView = NewsArticleView;
