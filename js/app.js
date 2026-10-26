/**
 * NEXUS REALM - Master Application Bootstrap
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Interactive Canvas
  if (window.CyberParticleCanvas) {
    new window.CyberParticleCanvas("cyber-canvas");
  }

  // 2. Render Global Navbar
  const navRoot = document.getElementById("nav-root");
  if (navRoot && window.NexusNavbar) {
    navRoot.innerHTML = window.NexusNavbar.render();
    window.NexusNavbar.attachEvents();
  }

  // 3. Render Global Modals
  const modalsRoot = document.getElementById("modals-root");
  if (modalsRoot && window.nexusModals) {
    modalsRoot.innerHTML = window.nexusModals.render();
    window.nexusModals.attachEvents();
  }

  // 4. Render Global Footer
  const footerRoot = document.getElementById("footer-root");
  if (footerRoot && window.NexusFooter) {
    footerRoot.innerHTML = window.NexusFooter.render();
    window.NexusFooter.attachEvents();
  }

  // 5. Initialize Client Router
  if (window.nexusRouter) {
    window.nexusRouter.init();
  }

  // 6. Global Sound Effect Hooks on Interactive Elements
  document.addEventListener("mouseover", (e) => {
    const target = e.target.closest("button, a, .game-card, .tournament-card, .news-card, .filter-chip");
    if (target && window.nexusState) {
      window.nexusState.playSound("hover");
    }
  });

  // 7. Initial Lucide Icons Generation
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 8. Platform Boot Greetings Toast
  setTimeout(() => {
    if (window.nexusState) {
      window.nexusState.showToast(
        "Nexus Realm v4.2 Initialized. Sentinel Anti-Cheat & 128Hz Relays Operational.",
        "info",
        "shield"
      );
    }
  }, 1200);
});
