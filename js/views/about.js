/**
 * NEXUS REALM - About Us View
 */

const AboutView = {
  render() {
    return `
      <div class="about-page" style="padding: 3rem 0 6rem;">
        <div class="container">
          <!-- Page Header -->
          <div class="section-header" style="text-align: center; max-width: 800px; margin: 0 auto 4rem;">
            <span class="section-tag tag-cyan">The Nexus Mission</span>
            <h1 class="section-title">Built by Hardcore Gamers, For the Next Generation</h1>
            <p class="section-subtitle" style="margin: 0 auto;">We were founded on a singular conviction: competitive gaming deserves uncompromising technological fidelity, sub-tick precision, and an arena where pure skill reigns supreme.</p>
          </div>

          <!-- Mission & Vision 2-Column Showcase -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; margin-bottom: 5rem;" id="about-mission-grid">
            <div class="glass-panel" style="padding: 3rem; border-color: var(--border-purple);">
              <span class="section-tag tag-purple">Our Genesis</span>
              <h2 style="font-size: 2rem; margin-bottom: 1.25rem;">From Lan Centers to Global Arenas</h2>
              <p style="color: var(--text-secondary); line-height: 1.8; margin-bottom: 1.5rem; font-size: 1.05rem;">
                Starting in 2021 as a distributed collective of engine programmers and former championship players, Nexus Realm was created to solve the fundamental bottlenecks plaguing online esports: tickrate latency, invasive anti-cheat opacity, and fragmented communities.
              </p>
              <p style="color: var(--text-secondary); line-height: 1.8; font-size: 1.05rem;">
                Today, Nexus powers millions of simultaneous competitive matches across 64 global points of presence, backing tournament organizers and independent game developers with enterprise-tier infrastructure.
              </p>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
              <div class="glass-panel" style="padding: 2rem; border-color: var(--border-cyan);">
                <i data-lucide="zap" style="width: 36px; height: 36px; color: var(--cyan-primary); margin-bottom: 1rem;"></i>
                <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem; color: #fff;">128-Tick Architecture</h3>
                <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">Dedicated bare-metal servers engineered with sub-millisecond network frame loops.</p>
              </div>

              <div class="glass-panel" style="padding: 2rem; border-color: var(--border-purple);">
                <i data-lucide="shield-check" style="width: 36px; height: 36px; color: var(--purple-primary); margin-bottom: 1rem;"></i>
                <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem; color: #fff;">Sentinel Anti-Cheat</h3>
                <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">Kernel-level heuristic monitoring that preserves player privacy while guaranteeing fair play.</p>
              </div>

              <div class="glass-panel" style="padding: 2rem; border-color: var(--border-red);">
                <i data-lucide="trophy" style="width: 36px; height: 36px; color: var(--red-cyber); margin-bottom: 1rem;"></i>
                <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem; color: #fff;">Instant Payouts</h3>
                <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">Automated escrow distribution ensuring champions receive purse payouts within 48 hours.</p>
              </div>

              <div class="glass-panel" style="padding: 2rem; border-color: var(--gold-accent);">
                <i data-lucide="sparkles" style="width: 36px; height: 36px; color: var(--gold-accent); margin-bottom: 1rem;"></i>
                <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem; color: #fff;">Creator First</h3>
                <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">Zero-fee tournament hosting APIs for gaming clans, universities, and boutique streamers.</p>
              </div>
            </div>
          </div>

          <!-- Milestones Timeline -->
          <div style="margin-bottom: 5rem;">
            <div class="section-header" style="text-align: center; margin-bottom: 3rem;">
              <span class="section-tag tag-cyan">Roadmap History</span>
              <h2 class="section-title">The Evolution of Nexus</h2>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5rem;">
              <div class="glass-panel" style="padding: 2rem;">
                <div style="font-family: var(--font-display); font-size: 1.6rem; color: var(--cyan-primary); font-weight: 800; margin-bottom: 0.5rem;">2022</div>
                <h3 style="font-size: 1.15rem; margin-bottom: 0.5rem; color: #fff;">Nexus Core Alpha</h3>
                <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6;">First 10,000 players stress-test low-latency netcode in closed tactical beta matches.</p>
              </div>

              <div class="glass-panel" style="padding: 2rem;">
                <div style="font-family: var(--font-display); font-size: 1.6rem; color: var(--purple-primary); font-weight: 800; margin-bottom: 0.5rem;">2024</div>
                <h3 style="font-size: 1.15rem; margin-bottom: 0.5rem; color: #fff;">Global Esports Rollout</h3>
                <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6;">Launched Cyber Masters Invitational across 3 continents with $1M inaugural purse.</p>
              </div>

              <div class="glass-panel" style="padding: 2rem;">
                <div style="font-family: var(--font-display); font-size: 1.6rem; color: var(--gold-accent); font-weight: 800; margin-bottom: 0.5rem;">2025</div>
                <h3 style="font-size: 1.15rem; margin-bottom: 0.5rem; color: #fff;">Unreal 5.5 Integration</h3>
                <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6;">Onboarded over 15 partner studios with instant cloud shaders and ray tracing support.</p>
              </div>

              <div class="glass-panel" style="padding: 2rem; border-color: var(--cyan-primary); box-shadow: 0 0 25px var(--cyan-glow);">
                <div style="font-family: var(--font-display); font-size: 1.6rem; color: var(--cyan-primary); font-weight: 800; margin-bottom: 0.5rem;">2026+</div>
                <h3 style="font-size: 1.15rem; margin-bottom: 0.5rem; color: #fff;">The Next Level</h3>
                <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6;">Expanding to 2.5M+ daily operatives, collegiate scholarship leagues, and neural audio tech.</p>
              </div>
            </div>
          </div>

          <!-- Executive Leadership Team -->
          <div style="margin-bottom: 5rem;">
            <div class="section-header" style="text-align: center; margin-bottom: 3rem;">
              <span class="section-tag tag-purple">Leadership</span>
              <h2 class="section-title">Command Officers</h2>
              <p class="section-subtitle" style="margin: 0 auto;">Pioneering engineers, creative visionaries, and competitive gaming veterans.</p>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 2rem;">
              ${NEXUS_DATA.team.map(member => `
                <div class="glass-panel" style="overflow: hidden; display: flex; flex-direction: column;">
                  <div style="aspect-ratio: 1 / 1; overflow: hidden;">
                    <img src="${member.image}" alt="${member.name}" style="width: 100%; height: 100%; object-fit: cover;" />
                  </div>
                  <div style="padding: 1.5rem; display: flex; flex-direction: column; flex: 1;">
                    <h3 style="font-size: 1.25rem; color: var(--text-white); margin-bottom: 0.25rem;">${member.name}</h3>
                    <div style="font-family: var(--font-tech); font-weight: 700; color: var(--cyan-primary); font-size: 0.9rem; margin-bottom: 0.75rem; text-transform: uppercase;">${member.role}</div>
                    <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.25rem; flex: 1;">${member.bio}</p>
                    <div style="display: flex; gap: 0.6rem; border-top: 1px solid var(--border-subtle); padding-top: 1rem;">
                      <a href="#" class="social-link" style="width: 32px; height: 32px;" title="Twitter"><i data-lucide="twitter" style="width: 16px; height: 16px;"></i></a>
                      <a href="#" class="social-link" style="width: 32px; height: 32px;" title="LinkedIn"><i data-lucide="linkedin" style="width: 16px; height: 16px;"></i></a>
                      <a href="#" class="social-link" style="width: 32px; height: 32px;" title="GitHub"><i data-lucide="github" style="width: 16px; height: 16px;"></i></a>
                    </div>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>

          <!-- Industry Technology Partners Strip -->
          <div class="glass-panel" style="padding: 2.5rem; text-align: center;">
            <span style="font-family: var(--font-tech); text-transform: uppercase; letter-spacing: 0.15em; color: var(--text-muted); font-size: 0.85rem; display: block; margin-bottom: 1.5rem;">Powered By Premier Gaming Technology Partners</span>
            <div style="display: flex; justify-content: space-around; align-items: center; flex-wrap: wrap; gap: 2rem; filter: grayscale(1) opacity(0.75);">
              <span style="font-family: var(--font-display); font-size: 1.4rem; font-weight: 800; color: #76B900;">NVIDIA GEFORCE</span>
              <span style="font-family: var(--font-display); font-size: 1.4rem; font-weight: 800; color: #ED1C24;">AMD RADEON</span>
              <span style="font-family: var(--font-display); font-size: 1.4rem; font-weight: 800; color: #ffffff;">UNREAL ENGINE 5</span>
              <span style="font-family: var(--font-display); font-size: 1.4rem; font-weight: 800; color: #00FF00;">RAZER CHROMA</span>
              <span style="font-family: var(--font-display); font-size: 1.4rem; font-weight: 800; color: #9146FF;">TWITCH ESPORTS</span>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  attachEvents() {}
};

window.AboutView = AboutView;
