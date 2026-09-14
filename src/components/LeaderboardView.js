// Cinema Kalalayam™ - Dedicated Leaderboard Page Component (/leaderboard)
// "WHO HAS THE MOST MASS?" - Cinema Award Ceremony Board

import { CATEGORIES, getLeaderboardData } from '../data/leaderboardData.js';
import { sounds } from '../audio/soundEffects.js';

export function renderLeaderboardView(container) {
  let activeCat = 'all-round';

  const renderBoard = () => {
    const list = getLeaderboardData(activeCat);

    const tabsHTML = CATEGORIES.map(cat => `
      <button class="leaderboard-tab-btn ${cat.id === activeCat ? 'active' : ''}" data-cat="${cat.id}">
        <span>${cat.icon}</span>
        <span>${cat.name.toUpperCase()}</span>
      </button>
    `).join('');

    const rowsHTML = list.map((item, idx) => {
      const rankNum = String(idx + 1).padStart(2, '0');
      const topClass = idx === 0 ? 'top-1' : (idx === 1 ? 'top-2' : (idx === 2 ? 'top-3' : ''));
      return `
        <div class="leaderboard-row">
          <div class="leaderboard-rank ${topClass}">${rankNum}</div>
          <div class="leaderboard-user-info">
            <div class="leaderboard-name" style="font-size: 1.25rem;">${item.name}</div>
            <div class="leaderboard-user-title">${item.title}</div>
          </div>
          <div class="leaderboard-badges" style="font-size: 0.82rem; font-weight: 700; color: var(--soft-yellow);">
            ${item.badges}
          </div>
          <div class="leaderboard-mass-pill" style="font-size: 1.1rem; padding: 8px 18px;">
            ${item.mass} MASS
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <div class="page-container container" style="padding: 60px 24px 100px;">
        <div class="section-header">
          <div class="section-tag">ANNUAL CELLULOID CITATION</div>
          <h1 class="section-title" style="font-size: 4rem;">WHO HAS THE MOST MASS?</h1>
          <p class="section-subtitle">
            The official roll of honour. Certified individuals whose cinematic swagger has defied common sense.
          </p>
        </div>

        <div class="leaderboard-board" style="border-width: 3px; box-shadow: 0 20px 50px rgba(0,0,0,0.9), 0 0 30px var(--gold-glow);">
          <div class="leaderboard-tabs">
            ${tabsHTML}
          </div>

          <div class="leaderboard-list">
            ${rowsHTML}
          </div>
        </div>
      </div>
    `;

    // Tab buttons
    container.querySelectorAll('.leaderboard-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        sounds.playClick();
        activeCat = btn.getAttribute('data-cat');
        renderBoard();
      });
    });
  };

  renderBoard();
}
