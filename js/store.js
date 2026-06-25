/* ===================================================================
   PARAY FC — Couche de données (Store)
   - Si CONFIG.backend (Supabase) est configuré → lit/écrit en ligne
     (partagé entre tous les visiteurs).
   - Sinon → repli automatique sur localStorage (propre au navigateur).

   API : Store.getAll() · Store.get(key) · Store.set(key, data)
   Clés logiques : 'program' · 'results' · 'news'
   =================================================================== */
(function () {
  'use strict';

  function backend() {
    var b = (typeof CONFIG !== 'undefined') ? CONFIG.backend : null;
    return (b && b.supabaseUrl && b.supabaseKey) ? b : null;
  }
  function headers(key) {
    return { 'apikey': key, 'Authorization': 'Bearer ' + key, 'Content-Type': 'application/json' };
  }

  function lsGet(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } }
  function lsSet(k, v) { localStorage.setItem(k, JSON.stringify(v)); }

  var Store = {
    /* Renvoie un objet { program, results, news } */
    getAll: function () {
      var b = backend();
      if (b) {
        return fetch(b.supabaseUrl + '/rest/v1/content?select=key,data', { headers: headers(b.supabaseKey) })
          .then(function (res) { if (!res.ok) throw new Error('read ' + res.status); return res.json(); })
          .then(function (rows) {
            var map = {};
            rows.forEach(function (r) { map[r.key] = r.data; });
            return map;
          });
      }
      return Promise.resolve({
        program: lsGet('pfc_program'),
        results: lsGet('pfc_results'),
        news: lsGet('pfc_news')
      });
    },

    get: function (key) {
      return this.getAll().then(function (all) { return all[key] || null; });
    },

    /* Enregistre data sous la clé (upsert) */
    set: function (key, data) {
      var b = backend();
      if (b) {
        return fetch(b.supabaseUrl + '/rest/v1/content?on_conflict=key', {
          method: 'POST',
          headers: Object.assign(headers(b.supabaseKey), { 'Prefer': 'resolution=merge-duplicates' }),
          body: JSON.stringify({ key: key, data: data })
        }).then(function (res) {
          if (!res.ok) throw new Error('write ' + res.status);
          return true;
        });
      }
      lsSet('pfc_' + key, data);
      return Promise.resolve(true);
    }
  };

  window.Store = Store;
})();
