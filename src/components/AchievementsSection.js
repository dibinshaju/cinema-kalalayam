// Cinema Kalalayam™ - Achievements Section Component

import { ACHIEVEMENTS, getUnlockedAchievements } from '../data/achievementsData.js';

export function renderAchievementsSection(container) {
  const unlocked = getUnlockedAchievements();

  const badgesHTML = ACHIEVEMENTS.map(ach => {
    const isUnlocked = unlocked.includes(ach.id);

    return `
      <div class="achievement-card ${isUnlocked ? 'unlocked' : 'locked'}">
        <div class="achievement-header">
          <span class="achievement-icon">${ach.icon}</span>
          <span class="badge ${isUnlocked ? 'badge-yellow' : 'badge-red'}">
            ${isUnlocked ? 'UNLOCKED' : 'LOCKED'}
          </span>
        </div>

        <h3 class="achievement-title">${ach.title}</h3>
        <div class="achievement-malayalam">${ach.malayalamTitle}</div>
        <p class="achievement-desc">${ach.description}</p>

        <div class="achievement-status" style="color: ${isUnlocked ? '#28A745' : '#777'};">
          ${isUnlocked ? '✓ Distinction Conferred' : `Requires: ${ach.requirement}`}
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <section class="achievements-section" id="achievements">
      <div class="container">
        <div class="section-header">
          <div class="section-tag">UNNECESSARY HONORS</div>
          <h2 class="section-title">🎖️ HALL OF CINEMATIC GLORY</h2>
          <p class="section-subtitle">
            Prestige trophies and badges you cannot add to your LinkedIn profile without deep shame.
          </p>
        </div>

        <div class="achievements-grid">
          ${badgesHTML}
        </div>
      </div>
    </section>
  `;
}
