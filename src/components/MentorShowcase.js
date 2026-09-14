// Cinema Kalalayam™ - Mentor Showcase Component
// Original Malayalam-cinema-inspired archetypes with Name, Speciality, Personality, and Funny Quote

import { MENTORS } from '../data/mentorData.js';
import { MentorAnimator } from '../mentors/mentorEngine.js';
import { COURSES } from '../data/courseData.js';
import { sounds } from '../audio/soundEffects.js';

export function renderMentorShowcase(container, onSelectMentor) {
  const mentorsHTML = MENTORS.map(mentor => {
    return `
      <div class="mentor-card" data-mentor-id="${mentor.id}">
        <!-- Illustrated Animated Vector Stage -->
        <div class="mentor-visual-box" id="mentor-slot-${mentor.id}"></div>

        <!-- Name -->
        <h3 class="mentor-name">${mentor.name}</h3>
        <div class="mentor-malayalam-name">${mentor.characterName} (${mentor.malayalamName})</div>

        <!-- Speciality -->
        <div class="mentor-detail-block">
          <span class="mentor-field-label">SPECIALITY:</span>
          <span class="mentor-field-value" style="color: var(--cinema-yellow);">${mentor.speciality}</span>
        </div>

        <!-- Personality -->
        <div class="mentor-detail-block">
          <span class="mentor-field-label">PERSONALITY:</span>
          <span class="mentor-field-value" style="color: var(--warm-white);">${mentor.personality}</span>
        </div>

        <!-- Funny Quote -->
        <div class="mentor-quote-callout font-malayalam">
          ${mentor.quote}
        </div>

        <!-- Stats Bar: Drama, Patience, Mass -->
        <div class="mentor-stats-box" style="margin-top: auto; margin-bottom: 16px;">
          <div class="mentor-stat-row">
            <span style="color: #FFF8E7;">DRAMA</span>
            <div class="stat-bar-outer">
              <div class="stat-bar-inner" style="width: ${mentor.drama}%;"></div>
            </div>
          </div>
          <div class="mentor-stat-row">
            <span style="color: #FFF8E7;">PATIENCE</span>
            <div class="stat-bar-outer">
              <div class="stat-bar-inner" style="width: ${mentor.patience}%; background-color: ${mentor.patience < 25 ? '#D92D20' : '#FFE58A'};"></div>
            </div>
          </div>
          <div class="mentor-stat-row">
            <span style="color: #F5C518;">MASS</span>
            <div class="stat-bar-outer">
              <div class="stat-bar-inner mass-bar" style="width: ${mentor.mass}%;"></div>
            </div>
          </div>
        </div>

        <button class="btn btn-secondary btn-sm train-with-me-btn" data-mentor-id="${mentor.id}">
          TRAIN WITH ME →
        </button>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <section class="mentors-section" id="mentors">
      <div class="container">
        <div class="section-header">
          <div class="section-tag">THE REVERED FACULTY</div>
          <h2 class="section-title">MEET YOUR MENTORS</h2>
          <p class="section-subtitle">
            Original fictional archetypes inspired by the golden traditions of Malayalam cinema. Dedicated to measuring and perfecting completely unnecessary skills.
          </p>
        </div>

        <div class="mentor-grid">
          ${mentorsHTML}
        </div>
      </div>
    </section>
  `;

  // Mount mentor vector animations
  MENTORS.forEach(mentor => {
    const slot = container.querySelector(`#mentor-slot-${mentor.id}`);
    if (slot) {
      new MentorAnimator(slot, mentor.id);
    }
  });

  // Bind train buttons
  container.querySelectorAll('.train-with-me-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      sounds.playMassHorn();
      const mentorId = btn.getAttribute('data-mentor-id');
      const associatedCourse = COURSES.find(c => c.mentorId === mentorId) || COURSES[0];
      onSelectMentor(associatedCourse.id);
    });
  });
}
