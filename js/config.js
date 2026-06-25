/* ===================================================================
   PARAY FC — CONFIGURATION CENTRALE DU CLUB
   👉 Le SEUL fichier à modifier pour adapter tout le site.
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
  phone: '',
  address: {
    street: '1 rue de Kruft',
    zip:    '91550',
    city:   'Paray-Vieille-Poste',
  },

  /* ---------- Logo ---------- */
  logoUrl: 'images/logo-paray.webp',

  /* ---------- Réseaux sociaux (URL complète, ou '#' pour masquer le lien) ---------- */
  social: {
    facebook:  'https://www.facebook.com/share/1D4Kj7roFJ/',
    instagram: 'https://www.instagram.com/parayfcofficiel',
    tiktok:    '#',
  },

  /* ---------- Boutique (URL externe) ---------- */
  shopUrl: 'https://www.skita.fr/voir-categorie-collection-32.html',

  /* ---------- Sportif ---------- */
  flagshipTeam: { name: 'Seniors A', level: 'Régionale 2' },
  memberCount: 524,
  teamCount:   31,

  /* ---------- Mesure d'audience (Google Analytics) ----------
     Mettez votre identifiant (ex. 'G-XXXXXXXXXX') pour activer GA
     APRÈS consentement du visiteur. Vide = aucune mesure. */
  analyticsId: '',

  /* ---------- Base de données en ligne (Supabase) ----------
     Pilote le partage du week-end (admin → site, visible par tous).
     La clé "publishable" est publique par conception. */
  backend: {
    supabaseUrl: 'https://rdxavrviphxpnlaymoly.supabase.co',
    supabaseKey: 'sb_publishable_R7apWN1oHpqH5Q36J1Fe0Q_tEPF_2E0',
  },
};

window.CONFIG = CONFIG;
