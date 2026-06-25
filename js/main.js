/* ===================================================================
   PARAY FC — Script principal (vanilla JS)
   - Menu mobile (toutes les pages)
   - Filtre des actualités par catégorie (page Actualités)
   - Formulaires de démonstration (message de succès, sans backend)
   =================================================================== */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    /* ---------- Menu mobile ---------- */
    var burger = document.querySelector('[data-burger]');
    var menu   = document.querySelector('[data-mobile-menu]');

    if (burger && menu) {
      var closeMenu = function () {
        menu.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      };
      burger.addEventListener('click', function () {
        var isOpen = menu.classList.toggle('is-open');
        burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
      menu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', closeMenu);
      });
      window.addEventListener('resize', function () {
        if (window.innerWidth >= 768) closeMenu();
      });
    }

    /* ---------- Filtre des actualités ---------- */
    var filterBtns = document.querySelectorAll('[data-filter]');
    var newsCards  = document.querySelectorAll('[data-cat]');

    if (filterBtns.length) {
      filterBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          var f = btn.getAttribute('data-filter');
          filterBtns.forEach(function (b) {
            b.classList.toggle('is-active', b === btn);
          });
          newsCards.forEach(function (card) {
            var show = (f === 'Tout') || (card.getAttribute('data-cat') === f);
            card.style.display = show ? '' : 'none';
          });
        });
      });
    }

    /* ---------- Formulaires de démonstration ----------
       Ces formulaires affichent un message de succès côté client,
       sans envoyer de données. Pour un envoi réel, voir le commentaire
       au-dessus de chaque <form> dans le HTML (Formspree / mailto). */
    var demoForms = document.querySelectorAll('[data-demo-form]');

    demoForms.forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var card = form.closest('.form-card');
        var success = card ? card.querySelector('[data-form-success]') : null;
        if (success) {
          form.hidden = true;
          success.hidden = false;
          success.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    });
  });
})();
