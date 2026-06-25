/* ===================================================================
   PARAY FC — Script principal (vanilla JS)
   - Ouverture / fermeture du menu mobile
   - Fermeture auto au clic sur un lien ou au passage en desktop
   =================================================================== */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var burger = document.querySelector('[data-burger]');
    var menu   = document.querySelector('[data-mobile-menu]');

    if (!burger || !menu) return;

    function closeMenu() {
      menu.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
    }

    function toggleMenu() {
      var isOpen = menu.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }

    burger.addEventListener('click', toggleMenu);

    // Ferme le menu au clic sur un lien
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    // Ferme le menu si on repasse en affichage desktop
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 768) closeMenu();
    });
  });
})();
