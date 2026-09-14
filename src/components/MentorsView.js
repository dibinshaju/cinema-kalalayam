// Cinema Kalalayam™ - Dedicated Mentors Page Component (/mentors)
// "MEET YOUR MENTORS" - Fictional original Malayalam-cinema-inspired faculty

import { MENTORS } from '../data/mentorData.js';
import { COURSES } from '../data/courseData.js';
import { MentorAnimator } from '../mentors/mentorEngine.js';
import { sounds } from '../audio/soundEffects.js';

export function renderMentorsView(container, onSelectMentorCourse) {
  const mentorsHTML = MENTORS.map(m => {
    const taughtCourses = COURSES.filter(c => c.mentorId === m.id);
    const taughtTags = taughtCourses.map(tc => `<span class="badge badge-yellow" style="font-size: 0.72rem;">${tc.title}</span>`).join(' ');

    return `
      <div class="mentor-card" data-mentor-id="${m.id}" style="padding: 28px;">
        <div class="mentor-visual-box" id="mentors-page-slot-${m.id}" style="height: 220px;"></div>

        <h3 class="mentor-name" style="font-size: 2rem;">${m.name}</h3>
        <div class="mentor-malayalam-name" style="font-size: 1rem; color: var(--soft-yellow);">
          ${m.characterName} (${m.malayalamName})
        </div>

        <div style="margin: 10px 0 6px;">
          <div style="font-size: 0.72rem; font-weight: 800; color: var(--text-muted); letter-spacing: 1px;">SPECIALITY</div>
          <div style="font-size: 0.95rem; font-weight: 700; color: var(--cinema-yellow);">${m.speciality}</div>
        </div>

        <div style="margin-bottom: 12px;">
          <div style="font-size: 0.72rem; font-weight: 800; color: var(--text-muted); letter-spacing: 1px;">PERSONALITY</div>
          <div style="font-size: 0.88rem; color: var(--warm-white);">${m.personality}</div>
        </div>

        <div class="mentor-quote-callout font-malayalam" style="margin-bottom: 16px;">
          ${m.quote}
        </div>

        <div style="margin-bottom: 18px;">
          <div style="font-size: 0.72rem; font-weight: 800; color: var(--text-muted); margin-bottom: 6px;">COURSES TAUGHT</div>
          <div style="display: flex; gap: 6px; flex-wrap: wrap;">${taughtTags}</div>
        </div>

        <div class="mentor-stats-box" style="margin-top: auto; margin-bottom: 20px;">
          <div class="mentor-stat-row">
            <span>DRAMA</span>
            <div class="stat-bar-outer"><div class="stat-bar-inner" style="width: ${m.drama}%;"></div></div>
          </div>
          <div class="mentor-stat-row">
            <span>PATIENCE</span>
            <div class="stat-bar-outer"><div class="stat-bar-inner" style="width: ${m.patience}%; background-color: ${m.patience < 25 ? '#D92D20' : '#FFE58A'};"></div></div>
          </div>
          <div class="mentor-stat-row">
            <span style="color: var(--cinema-yellow);">MASS</span>
            <div class="stat-bar-outer"><div class="stat-bar-inner mass-bar" style="width: ${m.mass}%;"></div></div>
          </div>
        </div>

        <button class="btn btn-primary btn-sm mentor-train-btn" data-mentor-id="${m.id}" style="width: 100%;">
          TRAIN WITH ${m.name} →
        </button>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div class="page-container container" style="padding: 60px 24px 100px;">
      <div class="section-header">
        <div class="section-tag">REVERED FACULTY & ACADEMIC ARCHETYPES</div>
        <h1 class="section-title" style="font-size: 4rem;">MEET YOUR MENTORS</h1>
        <p class="section-subtitle">
          Original fictional characters inspired by recognizable Malayalam cinema archetypes. Capable of evaluating your posture with ruthless artistic judgment.
        </p>
      </div>

      <div class="mentor-grid">
        ${mentorsHTML}
      </div>
    </div>
  `;

  // Mount SVGs
  MENTORS.forEach(m => {
    const slot = container.querySelector(`#mentors-page-slot-${m.id}`);
    if (slot) {
      new MentorAnimator(slot, m.id);
    }
  });

  // Bind Buttons
  container.querySelectorAll('.mentor-train-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      sounds.playMassHorn();
      const mentorId = btn.getAttribute('data-mentor-id');
      const associated = COURSES.find(c => c.mentorId === mentorId) || COURSES[0];
      onSelectMentorCourse(associated.id);
    });
  });
}
