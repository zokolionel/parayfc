/* ===================================================================
   PARAY FC — CONFIGURATION CENTRALE DU CLUB
   -------------------------------------------------------------------
   👉 C'est le SEUL fichier à modifier pour adapter tout le site.
   Changez une valeur ici, et elle se met à jour automatiquement
   dans le header, le footer et le contenu de la page d'accueil.

   Le moteur d'injection se trouve dans js/main.js (applyConfig).
   =================================================================== */
const CONFIG = {

  /* ---------- Identité du club ---------- */
  clubName:    'Paray FC',
  city:        'Paray-Vieille-Poste',
  foundedYear: 1947,

  /* ---------- Couleurs (pilotent les variables CSS du thème) ----------
     primary   = navy   (fonds sombres, header, titres)
     secondary = rouge  (boutons principaux, accents forts)
     accent    = or     (détails, surlignages)                         */
  colors: {
    primary:   '#13224F',
    secondary: '#C0192C',
    accent:    '#F2B705',
  },

  /* ---------- Coordonnées ---------- */
  email: 'parayfootball@gmail.com',
  phone: '',                 // ex. '01 69 12 34 56' — laissez vide pour masquer la ligne
  address: {
    street: '1 rue de Kruft',
    zip:    '91550',
    city:   'Paray-Vieille-Poste',
  },

  /* ---------- Logo ---------- */
  logoUrl: 'images/logo-paray.webp',

  /* ---------- Réseaux sociaux (mettez l'URL complète) ---------- */
  social: {
    facebook:  '#',
    instagram: '#',
    tiktok:    '#',
  },

  /* ---------- Boutique ---------- */
  shopUrl: 'boutique.html',  // ou l'URL externe de la boutique (Skita…)

  /* ---------- Sportif ---------- */
  flagshipTeam: {
    name:  'Seniors A',
    level: 'Régionale 2',
  },
  memberCount: 524,
  teamCount:   31,
};

/* Disponible aussi en global explicite (sécurité) */
window.CONFIG = CONFIG;
