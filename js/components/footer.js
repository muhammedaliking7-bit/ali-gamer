/**
 * NEXUS REALM - Footer Component
 */

const NexusFooter = {
  render() {
    return `
      <footer id="footer">
        <div class="container">
          <div class="footer-top-grid">
            <!-- Brand Column -->
            <div class="footer-brand-col">
              <div class="brand-logo" style="margin-bottom: 0.5rem;">
                <div class="brand-icon">
                  <svg viewBox="0 0 24 24">
                    <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round" />
                    <polygon points="12,6 18,9.5 18,14.5 12,18 6,14.5 6,9.5" fill="currentColor" />
                  </svg>
                </div>
                <div class="brand-name">
                  <span>NEXUS</span><span>REALM</span>
                </div>
              </div>
              <p>The definitive competitive gaming sanctuary. Discover next-generation titles, battle in high-stakes esports tournaments, and forge your legacy.</p>
              <div class="footer-social-links">
                <a href="https://discord.com" target="_blank" rel="noreferrer" class="social-link" title="Discord Community">
                  <i data-lucide="disc"></i>
                </a>
                <a href="https://twitch.tv" target="_blank" rel="noreferrer" class="social-link" title="Twitch Live Streams">
                  <i data-lucide="tv"></i>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" class="social-link" title="YouTube Channel">
                  <i data-lucide="youtube"></i>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" class="social-link" title="Twitter / X">
                  <i data-lucide="twitter"></i>
                </a>
                <a href="https://store.steampowered.com" target="_blank" rel="noreferrer" class="social-link" title="Steam Hub">
                  <i data-lucide="gamepad-2"></i>
                </a>
              </div>
            </div>

            <!-- Platform Links -->
            <div class="footer-col">
              <h4>Platform</h4>
              <ul>
                <li><a href="#home">Home Base</a></li>
                <li><a href="#games">All Games</a></li>
                <li><a href="#tournaments">Tournament Hub</a></li>
                <li><a href="#news">Patch Notes & News</a></li>
                <li><a href="#community">Community Lounge</a></li>
              </ul>
            </div>

            <!-- Discover Links -->
            <div class="footer-col">
              <h4>Discover</h4>
              <ul>
                <li><a href="#games?category=rpg">Cyberpunk RPGs</a></li>
                <li><a href="#games?category=fps">Tactical Shooters</a></li>
                <li><a href="#games?category=scifi">Space Simulators</a></li>
                <li><a href="#games?category=action">Dark Fantasy</a></li>
                <li><a href="#games?filter=free">Free to Play</a></li>
              </ul>
            </div>

            <!-- Esports Hub -->
            <div class="footer-col">
              <h4>Esports</h4>
              <ul>
                <li><a href="#tournaments?status=Live">Live Broadcasts</a></li>
                <li><a href="#community?tab=leaderboard">Global Leaderboard</a></li>
                <li><a href="#about#rules">Sentinel Anti-Cheat</a></li>
                <li><a href="#about#payouts">Prize Payouts</a></li>
                <li><a href="#contact">Host a Tournament</a></li>
              </ul>
            </div>

            <!-- Newsletter Signup -->
            <div class="footer-col">
              <h4>Intel Dispatch</h4>
              <p style="color: var(--text-secondary); font-size: 0.88rem; margin-bottom: 1rem;">Receive closed alpha invites, tournament registrations, and exclusive in-game drops directly to your comms link.</p>
              <form class="newsletter-form" id="newsletter-form">
                <div class="newsletter-input-group">
                  <input type="email" id="newsletter-email" placeholder="Enter your email address" required />
                  <button type="submit" class="btn btn-cyan btn-sm" style="border-radius: 0;">Join</button>
                </div>
                <span id="newsletter-status" style="font-size: 0.8rem; min-height: 1.2rem;"></span>
              </form>
            </div>
          </div>

          <!-- Footer Bottom -->
          <div class="footer-bottom">
            <div style="display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap;">
              <span>&copy; 2026 NEXUS REALM ENTERTAINMENT INC. ALL RIGHTS RESERVED.</span>
              <div class="system-status-indicator">
                <span class="status-dot"></span>
                <span>NEXUS SENTINEL: ALL SYSTEMS OPERATIONAL (99.98% UPTIME)</span>
              </div>
            </div>
            <div class="footer-legal-links">
              <a href="#about">Privacy Policy</a>
              <a href="#about">Terms of Service</a>
              <a href="#about">Cookie Policy</a>
              <a href="#about">Security Verification</a>
              <button id="back-to-top-btn" class="btn-icon-only" style="width: 34px; height: 34px; margin-left: 0.5rem;" title="Back to Top">
                <i data-lucide="arrow-up" style="width: 16px; height: 16px;"></i>
              </button>
            </div>
          </div>
        </div>
      </footer>
    `;
  },

  attachEvents() {
    // Newsletter Submit
    const form = document.getElementById("newsletter-form");
    const emailInput = document.getElementById("newsletter-email");
    const statusMsg = document.getElementById("newsletter-status");

    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = emailInput.value.trim();
        if (email) {
          window.nexusState.playSound("success");
          window.nexusState.showToast(`Subscribed! Dispatch link sent to ${email}`, "success", "mail-check");
          statusMsg.style.color = "var(--emerald-accent)";
          statusMsg.textContent = "✓ Clearance granted! Check your inbox.";
          emailInput.value = "";
          setTimeout(() => {
            statusMsg.textContent = "";
          }, 6000);
        }
      });
    }

    // Back to top button
    const backBtn = document.getElementById("back-to-top-btn");
    if (backBtn) {
      backBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        window.nexusState.playSound("click");
      });
    }
  }
};

window.NexusFooter = NexusFooter;
