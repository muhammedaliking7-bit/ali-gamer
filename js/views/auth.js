/**
 * NEXUS REALM - Real Supabase Authentication (Login, Sign Up, Recovery, Reset) View
 */

const AuthView = {
  mode: 'login', // 'login', 'register', 'forgot', 'reset', 'verify'
  pendingEmail: '',
  isSubmitting: false,

  render(params = {}) {
    // Detect mode from route params or URL hash recovery state
    if (params.mode) {
      this.mode = params.mode;
    } else if (window.location.hash.includes("type=recovery") || window.location.hash.includes("access_token=")) {
      this.mode = 'reset';
    }

    const isSupabaseConfigured = window.NEXUS_CONFIG && window.NEXUS_CONFIG.isConfigured();

    return `
      <div class="auth-page" style="padding: 4rem 1.5rem 6rem; min-height: 80vh; display: flex; align-items: center; justify-content: center;">
        <div class="glass-panel" style="width: 100%; max-width: 540px; padding: 2.5rem; border-color: var(--border-purple); box-shadow: var(--shadow-lg), 0 0 50px rgba(168, 85, 247, 0.25);">
          
          <!-- Brand Badge -->
          <div style="text-align: center; margin-bottom: 1.75rem;">
            <div class="brand-icon" style="margin: 0 auto 0.75rem; width: 44px; height: 44px;">
              <svg viewBox="0 0 24 24">
                <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round" />
                <polygon points="12,6 18,9.5 18,14.5 12,18 6,14.5 6,9.5" fill="currentColor" />
              </svg>
            </div>
            <h2 style="font-size: 1.6rem; color: #fff; margin-bottom: 0.35rem;">Nexus Terminal Clearance</h2>
            <p style="color: var(--text-secondary); font-size: 0.9rem;">
              ${this.mode === 'register' ? 'Enlist your operative credentials in the Nexus database' :
                this.mode === 'forgot' ? 'Transmit security cipher recovery instructions' :
                this.mode === 'reset' ? 'Establish your new operative security cipher' :
                this.mode === 'verify' ? 'Comms Verification Required' :
                'Authenticate your operative credentials to enter'}
            </p>
          </div>

          <!-- Supabase Live Connection Status Banner -->
          ${!isSupabaseConfigured ? `
            <div class="config-status-banner">
              <div style="display: flex; align-items: center; gap: 0.5rem; color: var(--gold-accent);">
                <i data-lucide="info" style="width: 16px; height: 16px; flex-shrink: 0;"></i>
                <span>Supabase live database awaiting project keys in <code>js/config.js</code>.</span>
              </div>
              <button type="button" class="btn btn-sm btn-secondary" id="open-config-modal-btn" style="padding: 0.25rem 0.65rem; font-size: 0.75rem;">
                <i data-lucide="settings" style="width: 12px; height: 12px;"></i>
                <span>Configure Keys</span>
              </button>
            </div>
          ` : `
            <div class="config-status-banner" style="background: rgba(16, 185, 129, 0.08); border-color: rgba(16, 185, 129, 0.3);">
              <div style="display: flex; align-items: center; gap: 0.5rem; color: var(--emerald-accent);">
                <i data-lucide="shield-check" style="width: 16px; height: 16px; flex-shrink: 0;"></i>
                <span>Supabase Cloud Authentication Active (RLS Protected)</span>
              </div>
            </div>
          `}

          <!-- Alert Feedback Container -->
          <div id="auth-alert-container"></div>

          <!-- Mode-Specific Form Container -->
          ${this.renderActiveMode()}

        </div>
      </div>

      <!-- Supabase In-Browser Setup Modal -->
      <div class="modal-backdrop" id="supabase-config-modal">
        <div class="modal-content" style="max-width: 520px;">
          <div class="modal-header">
            <div>
              <span class="section-tag tag-cyan">Cloud Database</span>
              <h3 class="modal-title">Supabase Credentials</h3>
            </div>
            <button class="modal-close-btn" id="close-config-modal-btn">&times;</button>
          </div>
          <div class="modal-body">
            <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6; margin-bottom: 1.5rem;">
              Enter your Supabase Project URL and public Anonymous API Key (from Project Settings &gt; API in your Supabase Dashboard).
            </p>
            <form id="supabase-config-form">
              <div class="form-group">
                <label class="form-label">Project URL (HTTPS)</label>
                <input type="url" id="cfg-supabase-url" class="form-control" placeholder="https://your-project-id.supabase.co" value="${window.NEXUS_CONFIG.supabaseUrl.includes('your-project-id') ? '' : window.NEXUS_CONFIG.supabaseUrl}" required />
              </div>
              <div class="form-group">
                <label class="form-label">Anon Public Key</label>
                <input type="text" id="cfg-supabase-key" class="form-control" placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." value="${window.NEXUS_CONFIG.supabaseAnonKey.includes('your-anon-public-key') ? '' : window.NEXUS_CONFIG.supabaseAnonKey}" required />
              </div>
              <div style="display: flex; gap: 0.75rem; justify-content: flex-end; margin-top: 1.5rem;">
                <button type="button" class="btn btn-secondary btn-sm" id="reset-config-btn">Reset</button>
                <button type="submit" class="btn btn-cyan btn-sm">Connect Database</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
  },

  renderActiveMode() {
    if (this.mode === 'verify') {
      return this.renderVerificationScreen();
    }
    if (this.mode === 'forgot') {
      return this.renderForgotPasswordForm();
    }
    if (this.mode === 'reset') {
      return this.renderResetPasswordForm();
    }
    return this.renderLoginAndRegisterTabs();
  },

  renderLoginAndRegisterTabs() {
    return `
      <!-- Mode Tabs (Login vs Register) -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; background: rgba(0,0,0,0.4); padding: 0.4rem; border-radius: var(--radius-md); margin-bottom: 2rem; border: 1px solid var(--border-subtle);">
        <button class="btn btn-sm ${this.mode === 'login' ? 'btn-cyan' : 'btn-secondary'}" id="tab-auth-login" style="border: none;">
          <span>Access Terminal (Log In)</span>
        </button>
        <button class="btn btn-sm ${this.mode === 'register' ? 'btn-cyan' : 'btn-secondary'}" id="tab-auth-register" style="border: none;">
          <span>Enlist Operative (Sign Up)</span>
        </button>
      </div>

      ${this.mode === 'register' ? this.renderRegisterForm() : this.renderLoginForm()}
    `;
  },

  renderLoginForm() {
    return `
      <form id="auth-login-form" novalidate>
        <div class="form-group">
          <label class="form-label" for="login-email">Operative Comms Email *</label>
          <div style="position: relative;">
            <input type="email" id="login-email" class="form-control" placeholder="operative@nexusrealm.gg" required autocomplete="email" />
            <i data-lucide="mail" style="position: absolute; right: 12px; top: 12px; color: var(--text-dim); width: 18px; height: 18px;"></i>
          </div>
          <div class="validation-msg error" id="login-email-error" style="display: none;"></div>
        </div>

        <div class="form-group">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
            <label class="form-label" for="login-password" style="margin-bottom: 0;">Security Cipher (Password) *</label>
            <a href="javascript:void(0)" id="link-forgot-password" style="font-size: 0.8rem; color: var(--cyan-primary); font-family: var(--font-tech); text-transform: uppercase;">Forgot Cipher?</a>
          </div>
          <div style="position: relative;">
            <input type="password" id="login-password" class="form-control" placeholder="••••••••••••" required autocomplete="current-password" />
            <button type="button" class="btn-toggle-pw" data-target="login-password" style="position: absolute; right: 12px; top: 12px; background: transparent; color: var(--text-dim); cursor: pointer;" title="Show/Hide Password">
              <i data-lucide="eye" style="width: 18px; height: 18px;"></i>
            </button>
          </div>
          <div class="validation-msg error" id="login-password-error" style="display: none;"></div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; font-size: 0.85rem;">
          <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer; color: var(--text-secondary);">
            <input type="checkbox" id="login-remember-me" checked />
            <span>Keep Terminal Session Active</span>
          </label>
        </div>

        <button type="submit" class="btn btn-primary btn-lg" id="btn-login-submit" style="width: 100%; margin-bottom: 1.5rem;">
          <i data-lucide="log-in"></i>
          <span>Authenticate &amp; Enter</span>
        </button>

        <!-- Switch Link -->
        <p style="text-align: center; font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 1.75rem;">
          New Operative? <a href="javascript:void(0)" id="switch-to-register" style="color: var(--cyan-primary); font-weight: 700;">Enlist in the Realm</a>
        </p>

        ${this.renderSocialLogins()}
      </form>
    `;
  },

  renderRegisterForm() {
    return `
      <form id="auth-register-form" novalidate>
        <div class="form-group">
          <label class="form-label" for="reg-gamertag">Operative GamerTag *</label>
          <div style="position: relative;">
            <input type="text" id="reg-gamertag" class="form-control" placeholder="e.g. CyberVanguard" minlength="3" maxlength="24" required autocomplete="username" />
            <i data-lucide="crosshair" style="position: absolute; right: 12px; top: 12px; color: var(--text-dim); width: 18px; height: 18px;"></i>
          </div>
          <div class="validation-msg error" id="reg-gamertag-error" style="display: none;"></div>
          <span style="font-size: 0.75rem; color: var(--text-muted); display: block; margin-top: 0.25rem;">3-24 characters, letters, numbers, and underscores only.</span>
        </div>

        <div class="form-group">
          <label class="form-label" for="reg-email">Operative Comms Email *</label>
          <div style="position: relative;">
            <input type="email" id="reg-email" class="form-control" placeholder="operative@nexusrealm.gg" required autocomplete="email" />
            <i data-lucide="mail" style="position: absolute; right: 12px; top: 12px; color: var(--text-dim); width: 18px; height: 18px;"></i>
          </div>
          <div class="validation-msg error" id="reg-email-error" style="display: none;"></div>
        </div>

        <div class="form-group">
          <label class="form-label" for="reg-password">Security Cipher (Password) *</label>
          <div style="position: relative;">
            <input type="password" id="reg-password" class="form-control" placeholder="••••••••••••" minlength="8" required autocomplete="new-password" />
            <button type="button" class="btn-toggle-pw" data-target="reg-password" style="position: absolute; right: 12px; top: 12px; background: transparent; color: var(--text-dim); cursor: pointer;" title="Show/Hide Password">
              <i data-lucide="eye" style="width: 18px; height: 18px;"></i>
            </button>
          </div>
          <div class="validation-msg error" id="reg-password-error" style="display: none;"></div>

          <!-- Live Password Strength Meter -->
          <div class="password-strength-container">
            <div class="strength-header">
              <span>Cipher Defense:</span>
              <span id="strength-label" style="font-weight: 700; color: var(--text-muted);">Enter Password</span>
            </div>
            <div class="strength-meter-bar">
              <div class="strength-segment" id="seg-1"></div>
              <div class="strength-segment" id="seg-2"></div>
              <div class="strength-segment" id="seg-3"></div>
              <div class="strength-segment" id="seg-4"></div>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label" for="reg-confirm-password">Confirm Security Cipher *</label>
          <div style="position: relative;">
            <input type="password" id="reg-confirm-password" class="form-control" placeholder="••••••••••••" required autocomplete="new-password" />
            <button type="button" class="btn-toggle-pw" data-target="reg-confirm-password" style="position: absolute; right: 12px; top: 12px; background: transparent; color: var(--text-dim); cursor: pointer;" title="Show/Hide Password">
              <i data-lucide="eye" style="width: 18px; height: 18px;"></i>
            </button>
          </div>
          <div class="validation-msg error" id="reg-confirm-error" style="display: none;"></div>
        </div>

        <!-- Terms & Privacy Agreement -->
        <div class="form-group" style="margin-bottom: 1.5rem;">
          <label style="display: flex; gap: 0.6rem; align-items: flex-start; cursor: pointer; font-size: 0.85rem; color: var(--text-secondary);">
            <input type="checkbox" id="reg-terms-check" required style="margin-top: 3px;" />
            <span>I agree to the <a href="#about" target="_blank" style="color: var(--cyan-primary); text-decoration: underline;">Terms of Service</a> and <a href="#about" target="_blank" style="color: var(--cyan-primary); text-decoration: underline;">Privacy Policy</a>, and consent to Sentinel anti-cheat telemetry.</span>
          </label>
          <div class="validation-msg error" id="reg-terms-error" style="display: none;">You must accept the Terms of Service to enlist.</div>
        </div>

        <button type="submit" class="btn btn-primary btn-lg" id="btn-register-submit" style="width: 100%; margin-bottom: 1.5rem;">
          <i data-lucide="user-plus"></i>
          <span>Complete Enlistment</span>
        </button>

        <!-- Switch Link -->
        <p style="text-align: center; font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 1.75rem;">
          Already have credentials? <a href="javascript:void(0)" id="switch-to-login" style="color: var(--cyan-primary); font-weight: 700;">Access Terminal</a>
        </p>

        ${this.renderSocialLogins()}
      </form>
    `;
  },

  renderForgotPasswordForm() {
    return `
      <form id="auth-forgot-form" novalidate>
        <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem;">
          Enter your registered comms email address. We will dispatch secure instructions to reset your security cipher.
        </p>

        <div class="form-group">
          <label class="form-label" for="forgot-email">Comms Email Address *</label>
          <div style="position: relative;">
            <input type="email" id="forgot-email" class="form-control" placeholder="operative@nexusrealm.gg" required />
            <i data-lucide="mail" style="position: absolute; right: 12px; top: 12px; color: var(--text-dim); width: 18px; height: 18px;"></i>
          </div>
          <div class="validation-msg error" id="forgot-email-error" style="display: none;"></div>
        </div>

        <button type="submit" class="btn btn-cyan btn-lg" id="btn-forgot-submit" style="width: 100%; margin-bottom: 1.25rem;">
          <i data-lucide="send"></i>
          <span>Transmit Recovery Dispatch</span>
        </button>

        <div style="text-align: center;">
          <a href="javascript:void(0)" id="back-to-login-from-forgot" style="font-size: 0.9rem; color: var(--text-secondary); display: inline-flex; align-items: center; gap: 0.4rem;">
            <i data-lucide="arrow-left" style="width: 16px; height: 16px;"></i>
            <span>Return to Terminal Login</span>
          </a>
        </div>
      </form>
    `;
  },

  renderResetPasswordForm() {
    return `
      <form id="auth-reset-form" novalidate>
        <div class="cyber-alert cyber-alert-info">
          <i data-lucide="key"></i>
          <span>Security recovery session detected. Please enter your new security cipher below.</span>
        </div>

        <div class="form-group">
          <label class="form-label" for="reset-new-password">New Security Cipher (Password) *</label>
          <div style="position: relative;">
            <input type="password" id="reset-new-password" class="form-control" placeholder="••••••••••••" minlength="8" required />
            <button type="button" class="btn-toggle-pw" data-target="reset-new-password" style="position: absolute; right: 12px; top: 12px; background: transparent; color: var(--text-dim); cursor: pointer;">
              <i data-lucide="eye" style="width: 18px; height: 18px;"></i>
            </button>
          </div>
          <div class="validation-msg error" id="reset-new-error" style="display: none;"></div>
        </div>

        <div class="form-group">
          <label class="form-label" for="reset-confirm-password">Confirm New Cipher *</label>
          <div style="position: relative;">
            <input type="password" id="reset-confirm-password" class="form-control" placeholder="••••••••••••" required />
            <button type="button" class="btn-toggle-pw" data-target="reset-confirm-password" style="position: absolute; right: 12px; top: 12px; background: transparent; color: var(--text-dim); cursor: pointer;">
              <i data-lucide="eye" style="width: 18px; height: 18px;"></i>
            </button>
          </div>
          <div class="validation-msg error" id="reset-confirm-error" style="display: none;"></div>
        </div>

        <button type="submit" class="btn btn-primary btn-lg" id="btn-reset-submit" style="width: 100%; margin-bottom: 1.25rem;">
          <i data-lucide="check-shield"></i>
          <span>Update Security Cipher</span>
        </button>
      </form>
    `;
  },

  renderVerificationScreen() {
    return `
      <div class="verification-card">
        <div class="verification-icon-wrap">
          <i data-lucide="mail-check" style="width: 36px; height: 36px;"></i>
        </div>

        <h3 style="font-size: 1.4rem; color: #fff; margin-bottom: 0.75rem;">Verification Dispatch Sent</h3>
        
        <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6; max-width: 440px; margin: 0 auto;">
          An encrypted verification transmission has been dispatched to your comms email:
        </p>

        <div class="verification-email-chip">${this.pendingEmail || 'your operative email'}</div>

        <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.6; max-width: 420px; margin: 0 auto 1.75rem;">
          Open the confirmation link in your email to authenticate your identity and unlock full terminal clearance.
        </p>

        <div style="display: flex; flex-direction: column; gap: 0.75rem; max-width: 300px; margin: 0 auto;">
          <button type="button" class="btn btn-secondary btn-sm" id="btn-resend-verification">
            <i data-lucide="refresh-cw"></i>
            <span>Resend Verification Dispatch</span>
          </button>
          <button type="button" class="btn btn-cyan btn-sm" id="btn-return-login-from-verify">
            <i data-lucide="arrow-left"></i>
            <span>Return to Terminal Login</span>
          </button>
        </div>
      </div>
    `;
  },

  renderSocialLogins() {
    return `
      <div style="text-align: center; position: relative; margin-bottom: 1.5rem;">
        <div style="position: absolute; inset: 0; display: flex; align-items: center;">
          <div style="width: 100%; border-top: 1px solid var(--border-subtle);"></div>
        </div>
        <span style="position: relative; background: var(--bg-surface); padding: 0 1rem; font-family: var(--font-tech); font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase;">Authenticated Gaming Ecosystems</span>
      </div>

      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.75rem; margin-bottom: 0.5rem;">
        <!-- Real Discord OAuth -->
        <button type="button" class="social-link" style="width: 100%; border-radius: var(--radius-md);" title="Authenticate with Discord OAuth" id="btn-oauth-discord">
          <i data-lucide="disc" style="color: #5865F2;"></i>
        </button>

        <!-- Steam OpenID Bridge Notice -->
        <button type="button" class="social-link" style="width: 100%; border-radius: var(--radius-md);" title="Steam OpenID 2.0" onclick="AuthView.showEcosystemNotice('Steam', 'OpenID 2.0 relay endpoint required. Standard Supabase Auth uses OAuth2/OIDC.')">
          <i data-lucide="gamepad-2"></i>
        </button>

        <!-- Xbox Live Notice -->
        <button type="button" class="social-link" style="width: 100%; border-radius: var(--radius-md);" title="Xbox Network" onclick="AuthView.showEcosystemNotice('Xbox Live', 'Requires Microsoft Azure AD Game Developer partner client configuration.')">
          <i data-lucide="tv"></i>
        </button>

        <!-- PlayStation Network Notice -->
        <button type="button" class="social-link" style="width: 100%; border-radius: var(--radius-md);" title="PlayStation Network" onclick="AuthView.showEcosystemNotice('PlayStation Network', 'Requires Sony Interactive Entertainment partner portal OAuth registration.')">
          <i data-lucide="play"></i>
        </button>
      </div>
      <span style="display: block; text-align: center; font-size: 0.72rem; color: var(--text-dim); font-family: var(--font-tech); text-transform: uppercase;">Discord OAuth configured natively. Console ecosystems require partner credentials.</span>
    `;
  },

  showEcosystemNotice(provider, details) {
    window.nexusState.playSound("click");
    this.showAlert(`<strong>${provider} Authentication:</strong> ${details}`, "warning");
  },

  showAlert(message, type = "danger") {
    const container = document.getElementById("auth-alert-container");
    if (!container) return;

    const iconName = type === "success" ? "check-circle" : type === "warning" ? "alert-triangle" : type === "info" ? "info" : "alert-circle";
    container.innerHTML = `
      <div class="cyber-alert cyber-alert-${type}">
        <i data-lucide="${iconName}"></i>
        <div>${message}</div>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons({ root: container });
  },

  clearAlert() {
    const container = document.getElementById("auth-alert-container");
    if (container) container.innerHTML = "";
  },

  calculatePasswordStrength(password) {
    if (!password) return { score: 0, label: "Enter Password" };
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) score++;

    let label = "Weak";
    if (score === 2) label = "Fair";
    if (score === 3) label = "Good";
    if (score >= 4) label = "Cyber-Secure";

    return { score, label };
  },

  attachEvents() {
    // Mode Toggles
    const tabLogin = document.getElementById("tab-auth-login");
    const tabRegister = document.getElementById("tab-auth-register");
    const switchToRegister = document.getElementById("switch-to-register");
    const switchToLogin = document.getElementById("switch-to-login");
    const linkForgot = document.getElementById("link-forgot-password");
    const backFromForgot = document.getElementById("back-to-login-from-forgot");
    const returnFromVerify = document.getElementById("btn-return-login-from-verify");

    const setMode = (newMode) => {
      this.mode = newMode;
      window.nexusState.playSound("click");
      window.nexusRouter.handleRoute();
    };

    if (tabLogin) tabLogin.addEventListener("click", () => setMode('login'));
    if (tabRegister) tabRegister.addEventListener("click", () => setMode('register'));
    if (switchToRegister) switchToRegister.addEventListener("click", () => setMode('register'));
    if (switchToLogin) switchToLogin.addEventListener("click", () => setMode('login'));
    if (linkForgot) linkForgot.addEventListener("click", () => setMode('forgot'));
    if (backFromForgot) backFromForgot.addEventListener("click", () => setMode('login'));
    if (returnFromVerify) returnFromVerify.addEventListener("click", () => setMode('login'));

    // Toggle Show/Hide Password buttons
    document.querySelectorAll(".btn-toggle-pw").forEach(btn => {
      btn.addEventListener("click", () => {
        const targetId = btn.getAttribute("data-target");
        const input = document.getElementById(targetId);
        if (input) {
          const isPw = input.type === "password";
          input.type = isPw ? "text" : "password";
          btn.innerHTML = `<i data-lucide="${isPw ? 'eye-off' : 'eye'}" style="width: 18px; height: 18px;"></i>`;
          if (window.lucide) window.lucide.createIcons({ root: btn });
        }
      });
    });

    // Password Strength Meter listener on registration form
    const regPwInput = document.getElementById("reg-password");
    if (regPwInput) {
      regPwInput.addEventListener("input", (e) => {
        const val = e.target.value;
        const { score, label } = this.calculatePasswordStrength(val);
        const labelEl = document.getElementById("strength-label");
        if (labelEl) labelEl.textContent = label;

        [1, 2, 3, 4].forEach(i => {
          const seg = document.getElementById(`seg-${i}`);
          if (seg) {
            seg.className = "strength-segment";
            if (i <= score) {
              if (score === 1) seg.classList.add("active-weak");
              else if (score === 2) seg.classList.add("active-fair");
              else if (score === 3) seg.classList.add("active-good");
              else seg.classList.add("active-strong");
            }
          }
        });
      });
    }

    // Real Discord OAuth trigger
    const discordBtn = document.getElementById("btn-oauth-discord");
    if (discordBtn) {
      discordBtn.addEventListener("click", async () => {
        window.nexusState.playSound("click");
        const result = await window.nexusAuthService.signInWithDiscord();
        if (!result.success) {
          this.showAlert(result.error, "danger");
        }
      });
    }

    // Login Form Submit
    const loginForm = document.getElementById("auth-login-form");
    if (loginForm) {
      loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        this.clearAlert();

        const emailInput = document.getElementById("login-email");
        const passwordInput = document.getElementById("login-password");
        const email = emailInput.value.trim();
        const password = passwordInput.value;

        // Validation
        let hasError = false;
        const emailErr = document.getElementById("login-email-error");
        const pwErr = document.getElementById("login-password-error");

        if (!email || !email.includes("@")) {
          emailInput.classList.add("is-invalid");
          emailErr.textContent = "Please enter a valid operative email address.";
          emailErr.style.display = "block";
          hasError = true;
        } else {
          emailInput.classList.remove("is-invalid");
          emailErr.style.display = "none";
        }

        if (!password) {
          passwordInput.classList.add("is-invalid");
          pwErr.textContent = "Please enter your security cipher.";
          pwErr.style.display = "block";
          hasError = true;
        } else {
          passwordInput.classList.remove("is-invalid");
          pwErr.style.display = "none";
        }

        if (hasError) return;

        // Loading state
        const submitBtn = document.getElementById("btn-login-submit");
        submitBtn.classList.add("is-loading");
        submitBtn.disabled = true;

        const result = await window.nexusAuthService.signIn({ email, password });
        submitBtn.classList.remove("is-loading");
        submitBtn.disabled = false;

        if (result.success) {
          window.nexusState.login(result.session, result.user, result.profile);
          window.location.hash = "#profile";
        } else {
          window.nexusState.playSound("logout");
          if (result.isUnconfirmed) {
            this.pendingEmail = email;
            this.showAlert(
              `${result.error} <br/><button type="button" class="btn btn-sm btn-secondary" id="btn-inline-resend" style="margin-top: 0.5rem;">Resend Verification Dispatch</button>`,
              "warning"
            );
            const resendBtn = document.getElementById("btn-inline-resend");
            if (resendBtn) {
              resendBtn.addEventListener("click", () => this.handleResend(email));
            }
          } else {
            this.showAlert(result.error, "danger");
          }
        }
      });
    }

    // Register Form Submit
    const registerForm = document.getElementById("auth-register-form");
    if (registerForm) {
      registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        this.clearAlert();

        const gamertagInput = document.getElementById("reg-gamertag");
        const emailInput = document.getElementById("reg-email");
        const passwordInput = document.getElementById("reg-password");
        const confirmInput = document.getElementById("reg-confirm-password");
        const termsCheck = document.getElementById("reg-terms-check");

        const gamertag = gamertagInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const confirm = confirmInput.value;

        let hasError = false;

        // GamerTag Validation
        const tagErr = document.getElementById("reg-gamertag-error");
        if (!gamertag || gamertag.length < 3 || gamertag.length > 24) {
          gamertagInput.classList.add("is-invalid");
          tagErr.textContent = "GamerTag must be between 3 and 24 characters.";
          tagErr.style.display = "block";
          hasError = true;
        } else if (!/^[a-zA-Z0-9_]+$/.test(gamertag)) {
          gamertagInput.classList.add("is-invalid");
          tagErr.textContent = "GamerTag can only contain letters, numbers, and underscores.";
          tagErr.style.display = "block";
          hasError = true;
        } else {
          gamertagInput.classList.remove("is-invalid");
          gamertagInput.classList.add("is-valid");
          tagErr.style.display = "none";
        }

        // Email Validation
        const emailErr = document.getElementById("reg-email-error");
        if (!email || !email.includes("@") || !email.includes(".")) {
          emailInput.classList.add("is-invalid");
          emailErr.textContent = "Please enter a valid operative email address.";
          emailErr.style.display = "block";
          hasError = true;
        } else {
          emailInput.classList.remove("is-invalid");
          emailInput.classList.add("is-valid");
          emailErr.style.display = "none";
        }

        // Password Validation
        const pwErr = document.getElementById("reg-password-error");
        if (!password || password.length < 8) {
          passwordInput.classList.add("is-invalid");
          pwErr.textContent = "Security cipher must be at least 8 characters long.";
          pwErr.style.display = "block";
          hasError = true;
        } else {
          passwordInput.classList.remove("is-invalid");
          passwordInput.classList.add("is-valid");
          pwErr.style.display = "none";
        }

        // Confirm Password Match
        const confirmErr = document.getElementById("reg-confirm-error");
        if (password !== confirm) {
          confirmInput.classList.add("is-invalid");
          confirmErr.textContent = "Security ciphers do not match.";
          confirmErr.style.display = "block";
          hasError = true;
        } else {
          confirmInput.classList.remove("is-invalid");
          confirmInput.classList.add("is-valid");
          confirmErr.style.display = "none";
        }

        // Terms Checkbox
        const termsErr = document.getElementById("reg-terms-error");
        if (!termsCheck.checked) {
          termsErr.style.display = "block";
          hasError = true;
        } else {
          termsErr.style.display = "none";
        }

        if (hasError) return;

        // Submit to Supabase
        const submitBtn = document.getElementById("btn-register-submit");
        submitBtn.classList.add("is-loading");
        submitBtn.disabled = true;

        const result = await window.nexusAuthService.signUp({ email, password, gamertag });
        submitBtn.classList.remove("is-loading");
        submitBtn.disabled = false;

        if (result.success) {
          window.nexusState.playSound("success");
          if (result.requiresEmailVerification) {
            this.pendingEmail = email;
            this.mode = 'verify';
            window.nexusRouter.handleRoute();
          } else {
            window.nexusState.login(result.session, result.user, result.profile);
            window.location.hash = "#profile";
          }
        } else {
          window.nexusState.playSound("logout");
          this.showAlert(result.error, "danger");
        }
      });
    }

    // Forgot Password Submit
    const forgotForm = document.getElementById("auth-forgot-form");
    if (forgotForm) {
      forgotForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        this.clearAlert();

        const emailInput = document.getElementById("forgot-email");
        const email = emailInput.value.trim();
        const emailErr = document.getElementById("forgot-email-error");

        if (!email || !email.includes("@")) {
          emailInput.classList.add("is-invalid");
          emailErr.textContent = "Please enter a valid email address.";
          emailErr.style.display = "block";
          return;
        }

        const submitBtn = document.getElementById("btn-forgot-submit");
        submitBtn.classList.add("is-loading");
        submitBtn.disabled = true;

        const result = await window.nexusAuthService.resetPasswordForEmail(email);
        submitBtn.classList.remove("is-loading");
        submitBtn.disabled = false;

        this.showAlert(result.message, "success");
        emailInput.value = "";
      });
    }

    // Reset Password Submit
    const resetForm = document.getElementById("auth-reset-form");
    if (resetForm) {
      resetForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        this.clearAlert();

        const newPwInput = document.getElementById("reset-new-password");
        const confirmPwInput = document.getElementById("reset-confirm-password");
        const newPw = newPwInput.value;
        const confirmPw = confirmPwInput.value;

        if (!newPw || newPw.length < 8) {
          this.showAlert("Security cipher must be at least 8 characters long.", "danger");
          return;
        }
        if (newPw !== confirmPw) {
          this.showAlert("Security ciphers do not match.", "danger");
          return;
        }

        const submitBtn = document.getElementById("btn-reset-submit");
        submitBtn.classList.add("is-loading");
        submitBtn.disabled = true;

        const result = await window.nexusAuthService.updatePassword(newPw);
        submitBtn.classList.remove("is-loading");
        submitBtn.disabled = false;

        if (result.success) {
          window.nexusState.playSound("success");
          window.nexusState.showToast("Security cipher successfully updated!", "success", "check");
          this.mode = 'login';
          window.nexusRouter.handleRoute();
        } else {
          this.showAlert(result.error, "danger");
        }
      });
    }

    // Resend Verification Email Button
    const resendBtn = document.getElementById("btn-resend-verification");
    if (resendBtn) {
      resendBtn.addEventListener("click", () => this.handleResend(this.pendingEmail));
    }

    // Configuration Modal Trigger
    const configBtn = document.getElementById("open-config-modal-btn");
    const configModal = document.getElementById("supabase-config-modal");
    const closeConfigBtn = document.getElementById("close-config-modal-btn");
    const configForm = document.getElementById("supabase-config-form");
    const resetConfigBtn = document.getElementById("reset-config-btn");

    if (configBtn && configModal) {
      configBtn.addEventListener("click", () => {
        configModal.classList.add("open");
        window.nexusState.playSound("click");
      });
      if (closeConfigBtn) {
        closeConfigBtn.addEventListener("click", () => configModal.classList.remove("open"));
      }
      configModal.addEventListener("click", (e) => {
        if (e.target === configModal) configModal.classList.remove("open");
      });
    }

    if (configForm) {
      configForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const url = document.getElementById("cfg-supabase-url").value.trim();
        const key = document.getElementById("cfg-supabase-key").value.trim();

        window.NEXUS_CONFIG.updateCredentials(url, key);
        configModal.classList.remove("open");
        window.nexusState.playSound("success");
        window.nexusState.showToast("Supabase credentials configured!", "success", "database");
        window.nexusRouter.handleRoute();
      });
    }

    if (resetConfigBtn) {
      resetConfigBtn.addEventListener("click", () => {
        window.NEXUS_CONFIG.resetCredentials();
        configModal.classList.remove("open");
        window.nexusState.playSound("click");
        window.nexusState.showToast("Supabase credentials reset to defaults.", "info", "rotate-ccw");
        window.nexusRouter.handleRoute();
      });
    }
  },

  async handleResend(email) {
    if (!email) {
      this.showAlert("Operative email not found for resend.", "danger");
      return;
    }
    const resendBtn = document.getElementById("btn-resend-verification");
    if (resendBtn) resendBtn.disabled = true;

    const result = await window.nexusAuthService.resendVerificationEmail(email);
    if (resendBtn) resendBtn.disabled = false;

    if (result.success) {
      window.nexusState.playSound("success");
      this.showAlert(result.message, "success");
    } else {
      this.showAlert(result.error, "danger");
    }
  }
};

window.AuthView = AuthView;
