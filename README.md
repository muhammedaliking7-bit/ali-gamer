# NEXUS REALM — Next-Gen Competitive Gaming Platform

A modern, premium, professional gaming website built with pure vanilla web technologies (HTML5, CSS3, ES6+ JavaScript), custom canvas particle physics, Web Audio API sound synthesis, a client-side SPA hash router, and **production-ready Supabase Authentication with PostgreSQL Row Level Security (RLS)**.

---

## 🌟 Architecture & Authentication System

### 1. Real Supabase Authentication Backend
- **Official Client:** Uses the official Supabase JavaScript client (`@supabase/supabase-js@2`) configured in [`js/auth-client.js`](file:///c:/Users/AdminUser/Desktop/12345/js/auth-client.js) and [`js/config.js`](file:///c:/Users/AdminUser/Desktop/12345/js/config.js).
- **Security-First Architecture:**
  - Passwords are encrypted and handled exclusively by Supabase Auth with bcrypt/Argon2 hashing. No plaintext passwords or private keys are ever stored on the frontend or in localStorage.
  - Only the public `anon` key is used on the client.
  - Server-side Row Level Security (RLS) policies enforce that users can only modify their own profile data, wishlists, and tournament registrations.
- **Session Persistence & Restoration:**
  - Active sessions are restored on browser reload/reopen via `supabase.auth.getSession()`.
  - Real-time `onAuthStateChange` listener synchronizes login, logout, and token refresh events across tabs.
- **Complete Authentication Flows:**
  - **Registration (`#auth?mode=register`):** GamerTag validation (3-24 alphanumeric chars), email validation, live 4-tier password strength meter, password confirmation, required Terms of Service & Privacy Policy agreement, loading states, and prevention of duplicate accounts.
  - **Email Verification:** Clean confirmation screen with "Resend Verification Dispatch" support.
  - **Login (`#auth?mode=login`):** Email & security cipher validation, password visibility toggles, Remember Me option, and unconfirmed email detection.
  - **Password Recovery (`#auth?mode=forgot`):** Generic, anti-enumeration confirmation dispatch to registered emails.
  - **Password Reset (`#auth?mode=reset`):** Deep-link detection (`type=recovery`) to allow setting and confirming a new security cipher.
  - **Discord OAuth:** Real Supabase OAuth flow via `supabase.auth.signInWithOAuth({ provider: 'discord' })`.
  - **Console Ecosystems (Steam, Xbox, PlayStation):** Professional informational dialogs explaining that Steam requires an OpenID 2.0 relay, and Xbox/PlayStation require Microsoft Azure / Sony Partner developer API configurations, ensuring transparent and honest user communication.

---

## 🗄️ Database Schema & RLS Setup

The database schema is provided in [`supabase/schema.sql`](file:///c:/Users/AdminUser/Desktop/12345/supabase/schema.sql).

### Setting up Supabase:
1. Log in to [Supabase](https://supabase.com) and create a new project.
2. In the Supabase Dashboard, navigate to the **SQL Editor**.
3. Copy and run the contents of [`supabase/schema.sql`](file:///c:/Users/AdminUser/Desktop/12345/supabase/schema.sql):
   - Creates the `public.profiles` table with foreign key `id REFERENCES auth.users(id) ON DELETE CASCADE`.
   - Creates `public.user_favorites` and `public.user_tournament_registrations` tables.
   - Enables Row Level Security (RLS) on all tables with explicit `auth.uid() = id` policies.
   - Creates the `on_auth_user_created` trigger which automatically provisions a user profile with their selected GamerTag upon signup.
4. Retrieve your API credentials from **Project Settings > API**:
   - `Project URL`
   - `Project API keys > anon (public)`
5. Paste these credentials into [`js/config.js`](file:///c:/Users/AdminUser/Desktop/12345/js/config.js) or configure them via the in-app **Configure Keys** button in the authentication interface.

### URL & Email Configuration:
In your Supabase Dashboard under **Authentication > URL Configuration**:
- **Site URL:** `http://localhost:8080` (or your production domain)
- **Redirect URLs:**
  - `http://localhost:8080`
  - `http://localhost:8080/#auth`
  - `http://localhost:8080/#auth?mode=reset`
  - `http://localhost:8080/#profile`

---

## 🎮 The 11 Core Pages (Single-Page App)

1. **Home (`#home`):** Cinematic hero with live stats (`2.4M+` players, `$6.85M` prize pool), 3D game showcase, video trailer trigger, Featured Games with category filter chips, Trending Games grid, and upcoming tournaments spotlight.
2. **Games Catalog (`#games`):** Comprehensive game library with real-time text search, multi-filters (Genre, Platform, Pricing model: Free vs Premium), and sorting.
3. **Game Details (`#game-detail?id=...`):** Hero trailer banner, interactive screenshot gallery, synopsis, engine features, tabbed hardware requirements (Minimum vs Recommended 120 FPS), interactive user review form, and similar games.
4. **Gaming News Hub (`#news`):** Dispatch hub with a featured headline banner, category chips (*Patch Notes, Esports, Hardware, Industry*), and search.
5. **News Article (`#news-article?id=...`):** Reading progress bar, author credentials, social share link copy, interactive like button, blockquotes, callout boxes, and live comment submission.
6. **Tournaments Hub (`#tournaments`):** Tournament hub with status tabs (*All, Live Now 🔴, Upcoming ⚡, Completed 🏆*), prize pool matrix, slot capacity bars, schedule & rules accordion, and squad registration modal.
7. **Community Hub (`#community`):** Discord server widget with live online counter, view switcher between Tactical Discussions, Global Leaderboard, and Elite Clans.
8. **About Us (`#about`):** Company genesis story, 4 core pillars (128-tick netcode, Sentinel anti-cheat, instant payouts, creator-first APIs), milestone roadmap, leadership team cards, and technology partner logos.
9. **Contact & Support (`#contact`):** Priority dispatch form with automated ticket generation (`#NX-xxxxx`), department and urgency selectors, regional server latency monitors, and an expandable FAQ accordion.
10. **Login & Sign Up (`#auth`):** Production-grade authentication with real Supabase Auth, live password strength meter, email verification support, and password reset flows.
11. **User Profile (`#profile`):** Personalized dashboard with real user data, join date, email confirmation badge, level progression XP bar, Career Overview, Wishlist library manager, Enlisted Tournaments tracker, and database profile editor.

---

## 🧪 Automated Testing

Automated unit and validation tests are included in [`tests/auth-validation.test.js`](file:///c:/Users/AdminUser/Desktop/12345/tests/auth-validation.test.js).

To execute the test suite:
```bash
node tests/auth-validation.test.js
```

### Verified Test Results:
- `[PASS]` GamerTag: valid tags pass (3-24 alphanumeric characters + underscores)
- `[PASS]` GamerTag: too short rejected (< 3 chars)
- `[PASS]` GamerTag: too long rejected (> 24 chars)
- `[PASS]` GamerTag: illegal characters rejected (spaces, symbols, hyphens)
- `[PASS]` Email: valid formats pass
- `[PASS]` Email: invalid formats rejected
- `[PASS]` Password: empty string handled safely
- `[PASS]` Password: weak score for short password
- `[PASS]` Password: fair score for 8+ characters without mix
- `[PASS]` Password: good score for length + case mix
- `[PASS]` Password: cyber-secure score for high entropy with symbols
- `[PASS]` Error Sanitizer: masks raw credential failure into user-friendly security text
- `[PASS]` Error Sanitizer: handles duplicate user registration error gracefully
- `[PASS]` Error Sanitizer: handles unconfirmed email warning
- `[PASS]` Error Sanitizer: handles rate limiting cooldown
- `[PASS]` Error Sanitizer: never exposes technical stack traces or DB details

---

## 🚀 Running the Project Locally

You can run the site using any web server, or directly open `index.html` in any modern web browser:

### Option A: Run via Python Built-in Server
```bash
py -m http.server 8080
```
Open **`http://localhost:8080`** in your browser.

### Option B: Open Directly in Browser
Double-click [`index.html`](file:///c:/Users/AdminUser/Desktop/12345/index.html) or navigate to `file:///c:/Users/AdminUser/Desktop/12345/index.html`.
