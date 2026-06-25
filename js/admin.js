/* ===================================================================
   PARAY FC — Espace admin du week-end
   - Accès par mot de passe (côté client uniquement)
   - Données enregistrées dans localStorage
   Clés : pfc_program · pfc_results · pfc_news
   =================================================================== */
(function () {
  'use strict';

  var PASSWORD = 'admin2026';
  var K_PROG = 'pfc_program', K_RES = 'pfc_results', K_NEWS = 'pfc_news';
  var VENUES = ['Domicile', 'Extérieur'];
  var OUTCOMES = ['Victoire', 'Nul', 'Défaite', 'N/A'];

  function $(id) { return document.getElementById(id); }
  function read(key) { try { return JSON.parse(localStorage.getItem(key)); } catch (e) { return null; } }
  function write(key, val) { localStorage.setItem(key, JSON.stringify(val)); }

  document.addEventListener('DOMContentLoaded', function () {
    /* Branding depuis config.js */
    if (typeof CONFIG !== 'undefined') {
      if (CONFIG.logoUrl) { $('login-logo').src = CONFIG.logoUrl; $('admin-logo').src = CONFIG.logoUrl; }
      if (CONFIG.clubName) $('admin-club').textContent = CONFIG.clubName;
    }
    initAuth();
  });

  /* ---------- Authentification ---------- */
  function initAuth() {
    if (sessionStorage.getItem('pfc_admin_ok') === '1') showApp();

    $('login-form').addEventListener('submit', function (e) {
      e.preventDefault();
      if ($('login-pass').value === PASSWORD) {
        sessionStorage.setItem('pfc_admin_ok', '1');
        showApp();
      } else {
        $('login-err').hidden = false;
        $('login-pass').value = '';
      }
    });

    $('logout').addEventListener('click', function () {
      sessionStorage.removeItem('pfc_admin_ok');
      location.reload();
    });
  }

  function showApp() {
    $('login').hidden = true;
    $('app').hidden = false;
    bootData();
    wireActions();
  }

  /* ---------- Toast ---------- */
  var toastTimer;
  function toast(msg) {
    var t = $('toast');
    t.textContent = msg;
    t.hidden = false;
    requestAnimationFrame(function () { t.classList.add('show'); });
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      t.classList.remove('show');
      setTimeout(function () { t.hidden = true; }, 320);
    }, 2600);
  }

  /* ---------- Constructeurs de lignes (DOM, sans injection) ---------- */
  function makeSelect(options, val) {
    var s = document.createElement('select');
    s.className = 'in';
    options.forEach(function (o) {
      var op = document.createElement('option');
      op.textContent = o;
      if (o === val) op.selected = true;
      s.appendChild(op);
    });
    return s;
  }
  function makeInput(type, ph, val) {
    var i = document.createElement('input');
    i.className = 'in';
    i.type = type;
    if (ph) i.placeholder = ph;
    if (val != null) i.value = val;
    return i;
  }
  function cell(label, child) {
    var td = document.createElement('td');
    td.setAttribute('data-label', label);
    td.appendChild(child);
    return td;
  }
  function delCell(tr) {
    var td = document.createElement('td');
    td.className = 'row-act';
    td.setAttribute('data-label', '');
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'del';
    b.textContent = '✕';
    b.setAttribute('aria-label', 'Supprimer la ligne');
    b.addEventListener('click', function () { tr.remove(); });
    td.appendChild(b);
    return td;
  }

  function progRow(d) {
    d = d || {};
    var tr = document.createElement('tr');
    tr.appendChild(cell('Lieu', makeSelect(VENUES, d.venue || 'Domicile')));
    tr.appendChild(cell('Équipe', makeInput('text', 'Seniors A', d.team)));
    tr.appendChild(cell('Adversaire', makeInput('text', 'Adversaire', d.opponent)));
    tr.appendChild(cell('Type', makeInput('text', 'Championnat', d.type)));
    tr.appendChild(cell('Heure', makeInput('time', '', d.time)));
    tr.appendChild(delCell(tr));
    return tr;
  }
  function resRow(d) {
    d = d || {};
    var tr = document.createElement('tr');
    tr.appendChild(cell('Lieu', makeSelect(VENUES, d.venue || 'Domicile')));
    tr.appendChild(cell('Équipe', makeInput('text', 'Seniors A', d.team)));
    tr.appendChild(cell('Adversaire', makeInput('text', 'Adversaire', d.opponent)));
    tr.appendChild(cell('Type', makeInput('text', 'Championnat', d.type)));
    tr.appendChild(cell('Heure', makeInput('time', '', d.time)));
    tr.appendChild(cell('Score', makeInput('text', '2-1', d.score)));
    tr.appendChild(cell('Résultat', makeSelect(OUTCOMES, d.outcome || 'N/A')));
    tr.appendChild(delCell(tr));
    return tr;
  }

  /* ---------- Collecte des lignes ---------- */
  function collectProg() {
    return Array.from($('prog-rows').children).map(function (tr) {
      var s = tr.querySelectorAll('select'), i = tr.querySelectorAll('input');
      return { venue: s[0].value, team: i[0].value.trim(), opponent: i[1].value.trim(), type: i[2].value.trim(), time: i[3].value };
    }).filter(function (m) { return m.team || m.opponent; });
  }
  function collectRes() {
    return Array.from($('res-rows').children).map(function (tr) {
      var s = tr.querySelectorAll('select'), i = tr.querySelectorAll('input');
      return { venue: s[0].value, team: i[0].value.trim(), opponent: i[1].value.trim(), type: i[2].value.trim(), time: i[3].value, score: i[4].value.trim(), outcome: s[1].value };
    }).filter(function (m) { return m.team || m.opponent; });
  }

  /* ---------- Chargement des données existantes ---------- */
  function bootData() {
    var prog = read(K_PROG) || { weekend: '', matches: [] };
    $('weekend-date').value = prog.weekend || '';
    var pt = $('prog-rows'); pt.innerHTML = '';
    (prog.matches || []).forEach(function (m) { pt.appendChild(progRow(m)); });
    if (!pt.children.length) pt.appendChild(progRow());

    var res = read(K_RES) || { results: [] };
    var rt = $('res-rows'); rt.innerHTML = '';
    (res.results || []).forEach(function (m) { rt.appendChild(resRow(m)); });
    if (!rt.children.length) rt.appendChild(resRow());

    var news = read(K_NEWS);
    if (news) {
      $('news-title').value = news.title || '';
      $('news-cat').value = news.category || 'Résultats';
      $('news-text').value = news.text || '';
    }
    updateCount();
  }

  function updateCount() { $('news-count').textContent = ($('news-text').value || '').length; }

  /* ---------- Boutons ---------- */
  function wireActions() {
    $('prog-add').addEventListener('click', function () { $('prog-rows').appendChild(progRow()); });
    $('res-add').addEventListener('click', function () { $('res-rows').appendChild(resRow()); });

    $('prog-save').addEventListener('click', function () {
      write(K_PROG, { weekend: $('weekend-date').value.trim(), matches: collectProg() });
      toast('✓ Programme enregistré');
    });
    $('res-save').addEventListener('click', function () {
      write(K_RES, { results: collectRes() });
      toast('✓ Résultats enregistrés');
    });
    $('news-save').addEventListener('click', function () {
      var title = $('news-title').value.trim();
      if (!title) { toast('Ajoutez un titre'); return; }
      write(K_NEWS, {
        title: title,
        category: $('news-cat').value,
        text: $('news-text').value.trim(),
        date: new Date().toISOString()
      });
      toast('✓ Actualité publiée');
    });

    $('news-text').addEventListener('input', updateCount);
  }
})();
