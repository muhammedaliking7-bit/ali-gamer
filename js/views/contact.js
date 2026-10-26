/**
 * NEXUS REALM - Contact & Support View
 */

const ContactView = {
  render() {
    return `
      <div class="contact-page" style="padding: 3rem 0 6rem;">
        <div class="container">
          <!-- Page Header -->
          <div class="section-header">
            <span class="section-tag tag-cyan">Comms Channel</span>
            <h1 class="section-title">Contact Command & Support</h1>
            <p class="section-subtitle">Need tournament arbitration, technical netcode debugging, or partnership discussions? Our support division is online 24/7.</p>
          </div>

          <div style="display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 3rem; margin-bottom: 5rem;" id="contact-main-grid">
            
            <!-- Contact Form -->
            <div class="glass-panel" style="padding: 2.5rem; border-color: var(--border-purple);">
              <h2 style="font-size: 1.6rem; margin-bottom: 0.5rem; color: #fff;">Transmit Priority Dispatch</h2>
              <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 2rem;">Fill out the transmission form below. All high-priority tickets receive an operative response in under 2 hours.</p>

              <form id="contact-support-form">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem;">
                  <div class="form-group">
                    <label class="form-label">Operative Name *</label>
                    <input type="text" id="contact-name" class="form-control" value="${window.nexusState.currentUser.fullName || window.nexusState.currentUser.gamertag}" placeholder="e.g. Commander Vance" required />
                  </div>
                  <div class="form-group">
                    <label class="form-label">Comms Email Address *</label>
                    <input type="email" id="contact-email" class="form-control" value="${window.nexusState.currentUser.email || ''}" placeholder="operative@nexusrealm.gg" required />
                  </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem;">
                  <div class="form-group">
                    <label class="form-label">Department / Inquiry Type</label>
                    <select id="contact-category" class="form-control">
                      <option value="Tournament Disputes">Tournament Arbitration & Rules</option>
                      <option value="Technical Support">Technical & Netcode Latency</option>
                      <option value="Sentinel Bug">Sentinel Anti-Cheat Report</option>
                      <option value="Brand Partnership">Sponsorship & Brand Relations</option>
                      <option value="Billing & Payouts">Prize Payouts & Escrow</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Priority Level</label>
                    <select id="contact-priority" class="form-control">
                      <option value="Standard">Standard Routine</option>
                      <option value="Urgent">Urgent (Active Match Issue)</option>
                      <option value="Emergency">Critical System Fault</option>
                    </select>
                  </div>
                </div>

                <div class="form-group">
                  <label class="form-label">Subject Headline *</label>
                  <input type="text" id="contact-subject" class="form-control" placeholder="Brief synopsis of transmission..." required />
                </div>

                <div class="form-group">
                  <label class="form-label">Transmission Briefing *</label>
                  <textarea id="contact-message" class="form-control" rows="5" placeholder="Provide detailed telemetry, match IDs, or proposal context..." required></textarea>
                </div>

                <button type="submit" class="btn btn-cyan btn-lg" style="width: 100%;">
                  <i data-lucide="send"></i>
                  <span>Transmit Dispatch to Support</span>
                </button>
              </form>
            </div>

            <!-- Support Channels & Server Status Info -->
            <div>
              <!-- Direct Channels Card -->
              <div class="glass-panel" style="padding: 2rem; margin-bottom: 2rem;">
                <h3 style="font-size: 1.25rem; margin-bottom: 1.25rem; color: #fff;">Direct Communication Links</h3>
                
                <div style="display: flex; flex-direction: column; gap: 1.25rem;">
                  <div style="display: flex; align-items: flex-start; gap: 1rem;">
                    <div style="width: 40px; height: 40px; border-radius: var(--radius-md); background: rgba(0, 240, 255, 0.1); border: 1px solid var(--border-cyan); display: flex; align-items: center; justify-content: center; color: var(--cyan-primary); flex-shrink: 0;">
                      <i data-lucide="mail"></i>
                    </div>
                    <div>
                      <strong style="color: #fff; font-family: var(--font-tech); font-size: 1.05rem;">Esports Command Desk</strong>
                      <div style="color: var(--cyan-primary); font-size: 0.9rem;">tournaments@nexusrealm.gg</div>
                      <span style="font-size: 0.75rem; color: var(--text-muted);">Active during live bracket operations</span>
                    </div>
                  </div>

                  <div style="display: flex; align-items: flex-start; gap: 1rem;">
                    <div style="width: 40px; height: 40px; border-radius: var(--radius-md); background: rgba(168, 85, 247, 0.1); border: 1px solid var(--border-purple); display: flex; align-items: center; justify-content: center; color: var(--purple-primary); flex-shrink: 0;">
                      <i data-lucide="disc"></i>
                    </div>
                    <div>
                      <strong style="color: #fff; font-family: var(--font-tech); font-size: 1.05rem;">Discord Live Support</strong>
                      <div style="color: var(--purple-primary); font-size: 0.9rem;">#help-and-tickets (Average response: 4 mins)</div>
                      <span style="font-size: 0.75rem; color: var(--text-muted);">24/7 volunteer & staff moderators</span>
                    </div>
                  </div>

                  <div style="display: flex; align-items: flex-start; gap: 1rem;">
                    <div style="width: 40px; height: 40px; border-radius: var(--radius-md); background: rgba(255, 0, 85, 0.1); border: 1px solid var(--border-red); display: flex; align-items: center; justify-content: center; color: var(--red-cyber); flex-shrink: 0;">
                      <i data-lucide="shield-alert"></i>
                    </div>
                    <div>
                      <strong style="color: #fff; font-family: var(--font-tech); font-size: 1.05rem;">Sentinel Security Lab</strong>
                      <div style="color: var(--red-cyber); font-size: 0.9rem;">security@nexusrealm.gg</div>
                      <span style="font-size: 0.75rem; color: var(--text-muted);">Zero-day vulnerability & anti-cheat reports</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Live Netcode Regional Latency Card -->
              <div class="glass-panel" style="padding: 2rem; border-color: var(--border-cyan);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem;">
                  <h3 style="font-size: 1.2rem; color: #fff;">Real-Time Server Relays</h3>
                  <div class="system-status-indicator">
                    <span class="status-dot"></span>
                    <span>ONLINE</span>
                  </div>
                </div>

                <div style="display: flex; flex-direction: column; gap: 0.75rem; font-size: 0.88rem;">
                  <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.4rem;">
                    <span>NA-East (Virginia)</span>
                    <strong style="color: var(--emerald-accent);">12 ms &bull; 128Hz</strong>
                  </div>
                  <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.4rem;">
                    <span>NA-West (San Jose)</span>
                    <strong style="color: var(--emerald-accent);">24 ms &bull; 128Hz</strong>
                  </div>
                  <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.4rem;">
                    <span>EU-Central (Frankfurt)</span>
                    <strong style="color: var(--emerald-accent);">18 ms &bull; 128Hz</strong>
                  </div>
                  <div style="display: flex; justify-content: space-between; padding-bottom: 0.4rem;">
                    <span>AP-East (Tokyo)</span>
                    <strong style="color: var(--emerald-accent);">28 ms &bull; 128Hz</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Frequently Asked Questions Accordion -->
          <div style="max-width: 900px; margin: 0 auto;">
            <div class="section-header" style="text-align: center; margin-bottom: 2.5rem;">
              <span class="section-tag tag-purple">Knowledge Matrix</span>
              <h2 class="section-title">Frequently Asked Questions</h2>
            </div>

            <div style="display: flex; flex-direction: column; gap: 1rem;" id="faq-accordion-container">
              ${NEXUS_DATA.faqs.map((faq, index) => `
                <div class="glass-panel faq-item" style="padding: 1.25rem 1.75rem; cursor: pointer;">
                  <div class="faq-question-row" style="display: flex; justify-content: space-between; align-items: center;">
                    <h3 style="font-size: 1.1rem; color: var(--text-white); font-weight: 600;">${faq.q}</h3>
                    <i data-lucide="chevron-down" class="faq-chevron" style="color: var(--cyan-primary); transition: transform 0.3s ease; flex-shrink: 0; margin-left: 1rem;"></i>
                  </div>
                  <div class="faq-answer-content" style="max-height: 0; overflow: hidden; transition: max-height 0.4s ease; color: var(--text-secondary); font-size: 0.95rem; line-height: 1.7;">
                    <div style="padding-top: 1rem; border-top: 1px solid var(--border-subtle); margin-top: 0.75rem;">
                      ${faq.a}
                    </div>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </div>
    `;
  },

  attachEvents() {
    // Contact Form Submission
    const form = document.getElementById("contact-support-form");
    if (form) {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const ticketNum = "NX-" + Math.floor(10000 + Math.random() * 90000);
        const name = document.getElementById("contact-name").value;
        const email = document.getElementById("contact-email").value;
        const category = document.getElementById("contact-category").value;
        const subject = document.getElementById("contact-subject").value;
        const message = document.getElementById("contact-message").value;

        // Persist dispatch ticket to Neon PostgreSQL
        if (window.nexusNeonClient) {
          window.nexusNeonClient.submitContact({
            name,
            email,
            category,
            message: `[${subject}] ${message}`
          });
        }

        window.nexusState.playSound("success");
        window.nexusState.showToast(`Ticket #${ticketNum} Transmitted! Dispatch received from ${name}.`, "success", "ticket");
        
        // Clear message & subject
        document.getElementById("contact-subject").value = "";
        document.getElementById("contact-message").value = "";
      });
    }

    // FAQ Accordion Toggle
    document.querySelectorAll(".faq-item").forEach(item => {
      const qRow = item.querySelector(".faq-question-row");
      const answer = item.querySelector(".faq-answer-content");
      const chevron = item.querySelector(".faq-chevron");

      if (qRow && answer) {
        qRow.addEventListener("click", () => {
          const isOpen = item.classList.contains("open");
          
          // Close others
          document.querySelectorAll(".faq-item").forEach(other => {
            other.classList.remove("open");
            const otherAns = other.querySelector(".faq-answer-content");
            const otherChev = other.querySelector(".faq-chevron");
            if (otherAns) otherAns.style.maxHeight = null;
            if (otherChev) otherChev.style.transform = "rotate(0deg)";
          });

          if (!isOpen) {
            item.classList.add("open");
            answer.style.maxHeight = answer.scrollHeight + 50 + "px";
            if (chevron) chevron.style.transform = "rotate(180deg)";
            window.nexusState.playSound("click");
          }
        });
      }
    });
  }
};

window.ContactView = ContactView;
