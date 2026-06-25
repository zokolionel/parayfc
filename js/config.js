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

  /* ---------- Couleurs (pilotent les variables CSS du thème) ---------- */
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
  shopUrl: 'boutique.html',

  /* ---------- Sportif ---------- */
  flagshipTeam: {
    name:  'Seniors A',
    level: 'Régionale 2',
  },
  memberCount: 524,
  teamCount:   31,

  /* ---------- Base de données en ligne (Supabase) ----------
     Pilote le partage du week-end (admin → site, visible par tous).
     La clé "publishable" est publique par conception : aucun secret ici. */
  backend: {
    supabaseUrl: 'https://rdxavrviphxpnlaymoly.supabase.co',
    supabaseKey: 'sb_publishable_R7apWN1oHpqH5Q36J1Fe0Q_tEPF_2E0',
  },
};

window.CONFIG = CONFIG;
