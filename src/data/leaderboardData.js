// Cinema Kalalayam™ - Leaderboard Dataset & State
// "🏆 WHO HAS THE MOST MASS?" - Movie Award Board Style

export const CATEGORIES = [
  { id: 'all-round', name: 'Overall Mass', icon: '🔥' },
  { id: 'hero-walk', name: 'Best Hero Walk', icon: '🕺' },
  { id: 'dance', name: 'Best Dance', icon: '💃' },
  { id: 'gesture', name: 'Best Gesture', icon: '🤌' },
  { id: 'overacting', name: 'Best Overacting', icon: '🎭' },
  { id: 'unnecessary', name: 'Most Unnecessary Talent', icon: '🤡' }
];

export const INITIAL_LEADERBOARD = {
  'all-round': [
    { rank: '01', name: 'AKHIL R.', mass: 97, title: 'Grand Cinematic Legend', badges: '🔥 INTERVAL' },
    { rank: '02', name: 'ARJUN K.', mass: 94, title: 'Master of Slow Motion', badges: '🕶️ HERO' },
    { rank: '03', name: 'RAHUL P.', mass: 91, title: 'Wind Machine Pioneer', badges: '🍿 MASS' },
    { rank: '04', name: 'MEERA S.', mass: 89, title: 'Dramatic Stare Queen', badges: '🎬 PRO' },
    { rank: '05', name: 'VISHNU M.', mass: 87, title: 'Courtroom Monologue King', badges: '👑 CLIMAX' },
    { rank: '06', name: 'ANJALI N.', mass: 85, title: 'Pelvic Air Disruptor', badges: '💃 DANCE' },
    { rank: '07', name: 'DEEPAK B.', mass: 84, title: 'Property Dispute Mudra Guru', badges: '🤌 MUDRAS' },
    { rank: '08', name: 'FAHAD J.', mass: 82, title: 'Existential Glare Holder', badges: '😡 STARE' }
  ],
  'hero-walk': [
    { rank: '01', name: 'SUBIN CHERIAN', mass: 98, title: '0.1 km/h Stride Master', badges: '🕺 SLOW-MO' },
    { rank: '02', name: 'ARJUN K.', mass: 94, title: 'Sunglasses Never Slipped', badges: '🕶️ HERO' },
    { rank: '03', name: 'JITHIN RAJ', mass: 90, title: 'Mundu Wind Catch Expert', badges: '🌪️ SWAGGER' }
  ],
  'dance': [
    { rank: '01', name: 'SREELAKSHMI V.', mass: 96, title: 'Quad-Shoulder Wave Queen', badges: '💃 DANCE' },
    { rank: '02', name: 'ROHIT NAIR', mass: 93, title: 'Rain Song Aerobics Veteran', badges: '⚡ ENERGY' },
    { rank: '03', name: 'AKHIL R.', mass: 91, title: 'Spontaneous Background Sync', badges: '🕺 RHYTHM' }
  ],
  'gesture': [
    { rank: '01', name: 'DEEPAK B.', mass: 95, title: 'Finger of Ancient Curse', badges: '🤌 MUDRAS' },
    { rank: '02', name: 'NAVNEETH G.', mass: 92, title: 'Silent Threat Calibrator', badges: '✋ SILENT' },
    { rank: '03', name: 'HARIKRISHNAN', mass: 88, title: 'Beard Stroke of Conspiracy', badges: '🧔 SCHEMER' }
  ],
  'overacting': [
    { rank: '01', name: 'VISHNU M.', mass: 99, title: 'Surround Sound Lung Tremor', badges: '👑 CLIMAX' },
    { rank: '02', name: 'SANJU PRASAD', mass: 96, title: 'Tears of Pure Celluloid', badges: '🎭 METHOD' },
    { rank: '03', name: 'MEERA S.', mass: 94, title: 'Eyebrow Choreography Expert', badges: '🎬 PRO' }
  ],
  'unnecessary': [
    { rank: '01', name: 'UNNI K.', mass: 100, title: 'Entered Tea Shop with 4 BGM Tracks', badges: '🤡 UNNECESSARY' },
    { rank: '02', name: 'BIJOY BABU', mass: 97, title: 'Flipped Cigarette into Pocket 40 Times', badges: '🔥 LEGEND' },
    { rank: '03', name: 'MIDHUN T.', mass: 95, title: 'Argued with Auto Driver in Climax Voice', badges: '🎤 DRAMA' }
  ]
};

const LEADERBOARD_KEY = 'cinema_kalalayam_custom_leaderboard';

export function getLeaderboardData(category = 'all-round') {
  try {
    const raw = localStorage.getItem(LEADERBOARD_KEY);
    const store = raw ? JSON.parse(raw) : INITIAL_LEADERBOARD;
    return store[category] || store['all-round'] || INITIAL_LEADERBOARD['all-round'];
  } catch (e) {
    return INITIAL_LEADERBOARD[category] || INITIAL_LEADERBOARD['all-round'];
  }
}

export function submitScoreToLeaderboard(userName, score, category = 'all-round') {
  try {
    const raw = localStorage.getItem(LEADERBOARD_KEY);
    const store = raw ? JSON.parse(raw) : JSON.parse(JSON.stringify(INITIAL_LEADERBOARD));
    if (!store[category]) store[category] = [];

    const newEntry = {
      rank: '00',
      name: (userName || 'ANONYMOUS STAR').toUpperCase().slice(0, 16),
      mass: Math.round(score),
      title: score >= 95 ? 'National Mass Treasure' : (score >= 85 ? 'Blockbuster Star' : 'Cinema Enthusiast'),
      badges: score >= 90 ? '🔥 NEW MASS' : '⭐ KALALAYAM'
    };

    store[category].push(newEntry);
    store[category].sort((a, b) => b.mass - a.mass);

    // Reassign ranks
    store[category] = store[category].slice(0, 15).map((item, idx) => ({
      ...item,
      rank: String(idx + 1).padStart(2, '0')
    }));

    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(store));
    return true;
  } catch (e) {
    console.warn('Leaderboard save failed', e);
    return false;
  }
}
