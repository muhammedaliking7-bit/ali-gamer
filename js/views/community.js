/**
 * NEXUS REALM - Community Hub & Forum View
 */

const CommunityView = {
  activeSection: 'discussions',

  render(params = {}) {
    if (params.tab) this.activeSection = params.tab;

    return `
      <div class="community-hub-page" style="padding: 3rem 0 6rem;">
        <div class="container">
          <!-- Page Header -->
          <div class="section-header">
            <span class="section-tag tag-purple">Player Network</span>
            <h1 class="section-title">Nexus Gaming Community</h1>
            <p class="section-subtitle">Collaborate with fellow operatives, recruit for competitive clans, analyze high-elo meta tactics, and climb global leaderboards.</p>
          </div>

          <!-- Discord Integration Widget Card -->
          <div class="glass-panel" style="padding: 2.5rem; margin-bottom: 3.5rem; background: linear-gradient(135deg, rgba(88, 101, 242, 0.15) 0%, rgba(14, 17, 34, 0.9) 100%); border-color: rgba(88, 101, 242, 0.4);">
            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 2rem;">
              <div style="display: flex; align-items: center; gap: 1.5rem;">
                <div style="width: 68px; height: 68px; border-radius: var(--radius-lg); background: #5865F2; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 30px rgba(88, 101, 242, 0.5);">
                  <i data-lucide="disc" style="width: 38px; height: 38px; color: #fff;"></i>
                </div>
                <div>
                  <h3 style="font-size: 1.5rem; margin-bottom: 0.35rem; color: #fff;">Official Nexus Comms Server</h3>
                  <div style="display: flex; align-items: center; gap: 1rem; font-size: 0.9rem; color: var(--text-secondary);">
                    <span><strong style="color: var(--emerald-accent);">● ${NEXUS_DATA.community.discordOnline}</strong> In Voice & Channels</span>
                    <span>&bull;</span>
                    <span><strong>${NEXUS_DATA.community.discordMembers}</strong> Enlisted Operatives</span>
                  </div>
                </div>
              </div>

              <a href="https://discord.com" target="_blank" rel="noreferrer" class="btn btn-primary btn-lg" style="background: #5865F2; border-color: #7983f5; box-shadow: 0 0 25px rgba(88, 101, 242, 0.5);">
                <i data-lucide="message-circle"></i>
                <span>Connect Discord Server</span>
              </a>
            </div>
          </div>

          <!-- Section Switcher Tabs -->
          <div class="filter-bar" style="margin-bottom: 2.5rem;">
            <div class="filter-chips">
              <button class="filter-chip ${this.activeSection === 'discussions' ? 'active' : ''}" data-tab="discussions">
                <i data-lucide="message-square" style="width: 14px; height: 14px; margin-right: 4px;"></i>
                Tactical Discussions
              </button>
              <button class="filter-chip ${this.activeSection === 'leaderboard' ? 'active' : ''}" data-tab="leaderboard">
                <i data-lucide="trophy" style="width: 14px; height: 14px; margin-right: 4px;"></i>
                Global Leaderboard
              </button>
              <button class="filter-chip ${this.activeSection === 'clans' ? 'active' : ''}" data-tab="clans">
                <i data-lucide="shield" style="width: 14px; height: 14px; margin-right: 4px;"></i>
                Elite Clans & Guilds
              </button>
            </div>

            <button class="btn btn-cyan btn-sm" id="new-thread-btn">
              <i data-lucide="plus"></i>
              <span>Start New Discussion</span>
            </button>
          </div>

          <!-- Main Content Area -->
          <div id="community-tab-content">
            ${this.renderTabContent()}
          </div>
        </div>
      </div>
    `;
  },

  renderTabContent() {
    if (this.activeSection === 'leaderboard') {
      return `
        <div class="glass-panel" style="padding: 1.5rem; overflow-x: auto;">
          <table class="specs-table" style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="text-align: left; border-bottom: 2px solid var(--border-medium); font-family: var(--font-tech); text-transform: uppercase; color: var(--cyan-primary);">
                <th style="padding: 1rem;">Rank</th>
                <th style="padding: 1rem;">Operative</th>
                <th style="padding: 1rem;">Tier Rating</th>
                <th style="padding: 1rem;">Primary Game</th>
                <th style="padding: 1rem;">Win Rate</th>
                <th style="padding: 1rem;">K/D Ratio</th>
                <th style="padding: 1rem; text-align: right;">Circuit Points</th>
              </tr>
            </thead>
            <tbody>
              ${NEXUS_DATA.leaderboard.map(p => `
                <tr style="border-bottom: 1px solid var(--border-subtle); transition: background var(--transition-fast);">
                  <td style="padding: 1rem; font-family: var(--font-display); font-size: 1.2rem; font-weight: 800; color: ${p.rank === 1 ? 'var(--gold-accent)' : p.rank === 2 ? '#e2e8f0' : p.rank === 3 ? '#cd7f32' : 'var(--text-muted)'};">
                    #${p.rank}
                  </td>
                  <td style="padding: 1rem;">
                    <div style="display: flex; align-items: center; gap: 0.75rem;">
                      <img src="${p.avatar}" alt="${p.gamertag}" style="width: 36px; height: 36px; border-radius: 50%; object-fit: cover; border: 1.5px solid var(--purple-primary);" />
                      <div>
                        <div style="font-family: var(--font-tech); font-weight: 700; font-size: 1.05rem; color: var(--text-white);">${p.gamertag}</div>
                      </div>
                    </div>
                  </td>
                  <td style="padding: 1rem;">
                    <span class="badge ${p.tier.includes('Grandmaster') ? 'badge-goty' : p.tier.includes('Apex') ? 'badge-trending' : 'badge-new'}">${p.tier}</span>
                  </td>
                  <td style="padding: 1rem; color: var(--text-secondary);">${p.mainGame}</td>
                  <td style="padding: 1rem; color: var(--emerald-accent); font-weight: 700;">${p.winRate}</td>
                  <td style="padding: 1rem; color: var(--cyan-primary); font-weight: 700;">${p.kd}</td>
                  <td style="padding: 1rem; text-align: right; font-family: var(--font-tech); font-size: 1.1rem; font-weight: 800; color: var(--text-white);">${p.points}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      `;
    }

    if (this.activeSection === 'clans') {
      return `
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem;">
          ${NEXUS_DATA.community.topGuilds.map(guild => `
            <div class="glass-panel" style="padding: 1.75rem; border-color: ${guild.emblemColor}40;">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                  <div style="width: 44px; height: 44px; border-radius: var(--radius-md); background: ${guild.emblemColor}20; border: 1.5px solid ${guild.emblemColor}; display: flex; align-items: center; justify-content: center; font-family: var(--font-display); font-weight: 800; color: ${guild.emblemColor};">
                    ${guild.tag}
                  </div>
                  <div>
                    <h3 style="font-size: 1.15rem; color: var(--text-white);">${guild.name}</h3>
                    <span style="font-size: 0.8rem; color: var(--text-muted);">Rank #${guild.rank} Global</span>
                  </div>
                </div>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; background: rgba(0,0,0,0.3); border-radius: var(--radius-md); padding: 0.85rem; margin-bottom: 1.25rem;">
                <div>
                  <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Roster Size</span>
                  <div style="font-weight: 700; color: var(--text-white); font-family: var(--font-tech); font-size: 1.05rem;">${guild.members} / 64</div>
                </div>
                <div>
                  <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Match Victories</span>
                  <div style="font-weight: 700; color: var(--emerald-accent); font-family: var(--font-tech); font-size: 1.05rem;">${guild.wins} Wins</div>
                </div>
              </div>

              <button class="btn btn-secondary btn-sm" style="width: 100%;" onclick="window.nexusState.showToast('Recruitment requisition sent to clan warlord.', 'info', 'send')">
                <i data-lucide="user-plus"></i>
                <span>Apply to Enlist</span>
              </button>
            </div>
          `).join("")}
        </div>
      `;
    }

    // Default: discussions
    return `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        ${NEXUS_DATA.community.threads.map(thread => `
          <div class="glass-panel" style="padding: 1.5rem; display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; flex-wrap: wrap;">
            <div style="display: flex; align-items: center; gap: 1rem; flex: 1; min-width: 280px;">
              <img src="${thread.avatar}" alt="${thread.author}" style="width: 44px; height: 44px; border-radius: 50%; object-fit: cover; border: 1.5px solid var(--purple-primary);" />
              <div>
                <span class="badge badge-popular" style="margin-bottom: 0.35rem;">${thread.category}</span>
                <h3 style="font-size: 1.15rem; margin-bottom: 0.35rem; color: var(--text-white); cursor: pointer;" onclick="window.nexusState.showToast('Opening thread briefing...', 'info', 'message-circle')">
                  ${thread.title}
                </h3>
                <div style="font-size: 0.82rem; color: var(--text-muted);">
                  By <strong style="color: var(--text-secondary);">${thread.author}</strong> &bull; ${thread.timeAgo}
                </div>
              </div>
            </div>

            <div style="display: flex; align-items: center; gap: 1.5rem;">
              <div style="display: flex; align-items: center; gap: 0.4rem; color: var(--cyan-primary); font-family: var(--font-tech); font-size: 0.95rem; font-weight: 700;">
                <i data-lucide="message-square" style="width: 18px; height: 18px;"></i>
                <span>${thread.replies} Replies</span>
              </div>
              <button class="btn btn-secondary btn-sm" onclick="window.nexusState.playSound('favorite'); window.nexusState.showToast('Upvoted discussion thread!', 'success', 'thumbs-up');">
                <i data-lucide="thumbs-up"></i>
                <span>${thread.likes}</span>
              </button>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  },

  attachEvents() {
    document.querySelectorAll("[data-tab]").forEach(tabBtn => {
      tabBtn.addEventListener("click", () => {
        document.querySelectorAll("[data-tab]").forEach(b => b.classList.remove("active"));
        tabBtn.classList.add("active");
        this.activeSection = tabBtn.getAttribute("data-tab");
        const container = document.getElementById("community-tab-content");
        if (container) {
          container.innerHTML = this.renderTabContent();
          if (window.lucide) window.lucide.createIcons({ root: container });
        }
        window.nexusState.playSound("click");
      });
    });

    const newThreadBtn = document.getElementById("new-thread-btn");
    if (newThreadBtn) {
      newThreadBtn.addEventListener("click", () => {
        const title = prompt("Enter Discussion Topic Headline:");
        if (title && title.trim()) {
          NEXUS_DATA.community.threads.unshift({
            id: "t_" + Date.now(),
            title: title.trim(),
            author: window.nexusState.currentUser.gamertag,
            avatar: window.nexusState.currentUser.avatar,
            replies: 0,
            likes: 1,
            category: "General",
            timeAgo: "Just now"
          });
          window.nexusState.playSound("success");
          window.nexusState.showToast("Discussion thread posted to community!", "success", "check");
          const container = document.getElementById("community-tab-content");
          if (container) {
            container.innerHTML = this.renderTabContent();
            if (window.lucide) window.lucide.createIcons({ root: container });
          }
        }
      });
    }
  }
};

window.CommunityView = CommunityView;
