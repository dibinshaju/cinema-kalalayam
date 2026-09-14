// Cinema Kalalayam™ - Achievement System Dataset

export const ACHIEVEMENTS = [
  {
    id: 'side-character',
    title: 'SIDE CHARACTER',
    malayalamTitle: 'സൈഡ് ക്യാരക്ടർ',
    icon: '🎭',
    description: 'Completed your first cinematic training module.',
    requirement: 'Complete any course once.',
    tag: 'Beginner Glory'
  },
  {
    id: 'hero-material',
    title: 'HERO MATERIAL',
    malayalamTitle: 'നായകൻറെ ലക്ഷണം',
    icon: '🕶️',
    description: 'Scored above 80% Cinematic Potential.',
    requirement: 'Score >= 80% in any training session.',
    tag: 'Box Office Hit'
  },
  {
    id: 'interval-block',
    title: 'INTERVAL BLOCK',
    malayalamTitle: 'ഇന്റർവെൽ ബ്ലോക്ക് മാസ്സ്',
    icon: '🍿',
    description: 'Scored above 95% Cinematic Potential. Audience is screaming.',
    requirement: 'Score >= 95% in any course.',
    tag: 'Blockbuster'
  },
  {
    id: 'pro-overactor',
    title: 'PROFESSIONAL OVERACTOR',
    malayalamTitle: 'ഓവർ ആക്ടിങ്ങിന്റെ ഉസ്താദ്',
    icon: '🎬',
    description: 'Expression/Drama score hit above 98%. Academy is stunned.',
    requirement: 'Achieve Drama/Expression score >= 98%.',
    tag: 'Method Acting'
  },
  {
    id: 'plot-armor',
    title: 'PLOT ARMOR',
    malayalamTitle: 'തൊട്ടാൽ തെറിക്കുന്ന പ്ലോട്ട് ആർമർ',
    icon: '🛡️',
    description: 'Passed an Expert level challenge on the first try without blinking.',
    requirement: 'Score >= 85% on Expert / Advanced course.',
    tag: 'Invincible'
  },
  {
    id: 'why-are-you-like-this',
    title: 'WHY ARE YOU LIKE THIS?',
    malayalamTitle: 'എന്തിനാടാ നീ ഇങ്ങനെ?',
    icon: '🤡',
    description: 'Attempted or retaken a single scene at least 5 times in pursuit of useless perfection.',
    requirement: 'Retake a scene 5+ times.',
    tag: 'Dedication'
  },
  {
    id: 'slow-motion-specialist',
    title: 'SLOW-MO SPECIALIST',
    malayalamTitle: 'സ്ലോ മോഷൻ സ്പെഷ്യലിസ്റ്റ്',
    icon: '🌪️',
    description: 'Mastered Hero Walk 101 with a Mass Index of 94% or above.',
    requirement: 'Hero Walk Mass Index >= 94%.',
    tag: 'Aerodynamic'
  },
  {
    id: 'climax-king',
    title: 'CLIMAX EMPEROR',
    malayalamTitle: 'ക്ലൈമാക്സ് ചക്രവർത്തി',
    icon: '👑',
    description: 'Shouted loud enough in Dialogue Delivery to awaken imaginary courtroom ancestors.',
    requirement: 'Score >= 90% in Dialogue Delivery.',
    tag: 'Pure Decibels'
  }
];

const STORAGE_KEY = 'cinema_kalalayam_unlocked_achievements';

export function getUnlockedAchievements() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : ['side-character']; // starter unlocked
  } catch (e) {
    return ['side-character'];
  }
}

export function unlockAchievement(id) {
  try {
    const current = getUnlockedAchievements();
    if (!current.includes(id)) {
      current.push(id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
      return true; // Newly unlocked
    }
  } catch (e) {
    console.warn('Storage unavailable', e);
  }
  return false;
}
