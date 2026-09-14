// Cinema Kalalayam™ - Leaderboard Section Component
// "🏆 WHO HAS THE MOST MASS?" - Movie Award Board Style

import { CATEGORIES, getLeaderboardData } from '../data/leaderboardData.js';
import { sounds } from '../audio/soundEffects.js';

export function renderLeaderboardSection(container) {
  let activeCat = 'all-round';

  const renderContent = () => {
    const list = getLeaderboardData(activeCat);

    const tabsHTML = CATEGORIES.map(cat => `
      <button class="leaderboard-tab-btn ${cat.id === activeCat ? 'active' : ''}" data-cat-id="${cat.id}">
        <span>${cat.icon}</span>
        <span>${cat.name.toUpperCase()}</span>
      </button>
    `).join('');

    const rowsHTML = list.map((item, idx) => {
      const topClass = idx === 0 ? 'top-1' : (idx === 1 ? 'top-2' : (idx === 2 ? 'top-3' : ''));
      return `
        <div class="leaderboard-row">
          <div class="leaderboard-rank ${topClass}">${item.rank}</div>
          <div class="leaderboard-user-info">
            <div class="leaderboard-name">${item.name}</div>
            <div class="leaderboard-user-title">${item.title}</div>
          </div>
          <div class="leaderboard-badges" style="font-size: 0.8rem; font-weight: 700; color: var(--soft-yellow);">
            ${item.badges}
          </div>
          <div class="leaderboard-mass-pill">
            ${item.mass} MASS
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <section class="leaderboard-section" id="ranking">
        <div class="container">
          <div class="section-header">
            <div class="section-tag">CELLULOID RECOGNITION</div>
            <h2 class="section-title">🏆 WHO HAS THE MOST MASS?</h2>
            <p class="section-subtitle">
              The official rankings of Kerala’s most unnecessarily cinematic individuals.
            </p>
          </div>

          <div class="leaderboard-board">
            <div class="leaderboard-tabs">
              ${tabsHTML}
            </div>

            <div class="leaderboard-list">
              ${rowsHTML}
            </div>
          </div>
        </div>
      </section>
    `;

    // Bind tab clicks
    container.querySelectorAll('.leaderboard-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        sounds.playClick();
        activeCat = btn.getAttribute('data-cat-id');
        renderContent();
      });
    });
  };

  renderContent();
}
