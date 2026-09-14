// Cinema Kalalayam™ - Exhibition Mode Component
// Rapid 45-second challenge flow for public showcases, kiosks, and demo walkthroughs (<2 minutes total)

import { COURSES } from '../data/courseData.js';
import { sounds } from '../audio/soundEffects.js';

export function renderExhibitionModal(container, onLaunchChallenge, onClose) {
  const coursesButtons = COURSES.map(c => `
    <button class="btn btn-secondary btn-sm exhibition-choice-btn" data-course-id="${c.id}" style="justify-content: flex-start; text-align: left; padding: 14px 20px;">
      <span style="font-size: 1.6rem; margin-right: 10px;">${c.icon}</span>
      <div>
        <div style="font-size: 1.15rem; color: var(--cinema-yellow);">${c.title}</div>
        <div style="font-size: 0.75rem; color: var(--warm-white); opacity: 0.8;">${c.subtitle}</div>
      </div>
    </button>
  `).join('');

  container.innerHTML = `
    <div class="result-modal-overlay active" id="exhibition-modal-overlay">
      <div class="result-content-card" style="max-width: 640px;">
        <div class="result-top-banner" style="background: linear-gradient(90deg, #151515, #2b1f06, #151515);">
          <span class="exhibition-tag">EXHIBITION SPEED PASS</span>
          <h2 class="result-main-title" style="font-size: 2.6rem; margin-top: 8px;">
            🎪 60-SECOND MASS CHALLENGE
          </h2>
          <div style="font-size: 0.9rem; color: var(--warm-white); margin-top: 4px;">
            No registration. No syllabus. Immediate judgement and instant certificate.
          </div>
        </div>

        <div style="padding: 24px; display: flex; flex-direction: column; gap: 14px;">
          <div style="font-size: 0.85rem; font-weight: 700; color: var(--soft-yellow); letter-spacing: 1px;">
            SELECT ONE CINEMATIC CHALLENGE TO TEST:
          </div>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            ${coursesButtons}
          </div>
        </div>

        <div class="result-bottom-actions" style="justify-content: flex-end;">
          <button id="exhibition-close-btn" class="btn btn-secondary btn-sm">
            CLOSE
          </button>
        </div>
      </div>
    </div>
  `;

  sounds.playMassHorn();

  container.querySelectorAll('.exhibition-choice-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      sounds.playClapperboard();
      const courseId = btn.getAttribute('data-course-id');
      onLaunchChallenge(courseId);
    });
  });

  container.querySelector('#exhibition-close-btn').addEventListener('click', () => {
    sounds.playClick();
    onClose();
  });
}
