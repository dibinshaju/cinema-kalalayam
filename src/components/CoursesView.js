// Cinema Kalalayam™ - Dedicated Courses Page Component (/courses)
// "CURRICULUM OF CELLULOID" - The Science of Looking Cinematic for No Reason

import { COURSES } from '../data/courseData.js';
import { MENTORS } from '../data/mentorData.js';
import { sounds } from '../audio/soundEffects.js';

export function renderCoursesView(container, onSelectCourse) {
  const cardsHTML = COURSES.map((course, idx) => {
    const mentor = MENTORS.find(m => m.id === course.mentorId) || MENTORS[0];
    const difficultyBadgeClass = course.difficulty === 'Beginner' ? 'badge-green' : (course.difficulty === 'Intermediate' ? 'badge-yellow' : 'badge-red');
    const courseIndexFormatted = `COURSE ${String(idx + 1).padStart(2, '0')}`;

    return `
      <div class="course-card" data-course-id="${course.id}">
        <div class="course-card-inner">
          <!-- Top Row: COURSE 01 + Icon + Difficulty Badge -->
          <div class="course-card-header-row">
            <div class="course-num-meta font-condensed">
              <span class="course-num-badge">${courseIndexFormatted}</span>
              <span class="course-code-tag">${course.code}</span>
            </div>
            <div class="course-badge-cluster">
              <span class="course-icon-badge">${course.icon}</span>
              <span class="badge ${difficultyBadgeClass}">${course.difficulty}</span>
            </div>
          </div>

          <!-- Course Title (Movie Poster Typography) -->
          <h3 class="course-poster-title font-display">${course.title}</h3>
          
          <!-- Malayalam Title (Authentic Unicode Font, Bold, Proper Line-Height) -->
          <div class="course-malayalam-title font-malayalam">${course.malayalamTitle}</div>

          <!-- Subtitle Quote -->
          <div class="course-quote-tagline font-display">
            “${course.subtitle}”
          </div>

          <!-- Description (Clean Modern Sans-Serif) -->
          <p class="course-editorial-desc font-body">${course.description}</p>

          <!-- Mentor Info Panel -->
          <div class="course-mentor-panel">
            <div class="mentor-meta-label font-condensed">MENTOR</div>
            <div class="mentor-display-name font-display">${mentor.name}</div>
            <div class="mentor-quote-line font-body">“${mentor.quote.replace(/^[“"']+|[”"']+$/g, '')}”</div>
          </div>

          <!-- Footer Row: Duration + Poster CTA Button -->
          <div class="course-card-footer">
            <div class="course-duration-meta">
              <span class="duration-label font-condensed">DURATION</span>
              <span class="duration-val font-body">⏱️ ${course.duration}</span>
            </div>
            <button class="btn btn-primary btn-sm start-btn-trigger font-display" data-course-id="${course.id}">
              ${course.buttonText || 'START TRAINING →'}
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div class="page-container container" style="padding: 60px 24px 100px;">
      <div class="section-header curriculum-header">
        <div class="curriculum-billboard-tag font-condensed">
          <span class="curriculum-reel-icon">🎞️</span>
          <span>CELLULOID ACADEMY • SEMESTER 2025</span>
          <span class="curriculum-reel-icon">🎞️</span>
        </div>
        <h1 class="curriculum-main-title font-display">
          CURRICULUM OF CELLULOID
        </h1>
        <div class="curriculum-sub-title font-display">
          THE SCIENCE OF LOOKING CINEMATIC FOR NO REASON
        </div>
        <p class="curriculum-subtitle font-body">
          Professional training for completely unnecessary skills. Backed by groundless kinetic research.
        </p>
      </div>

      <div class="course-grid">
        ${cardsHTML}
      </div>
    </div>
  `;

  // Bind Buttons
  container.querySelectorAll('.start-btn-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      sounds.playClapperboard();
      const courseId = btn.getAttribute('data-course-id');
      onSelectCourse(courseId);
    });
  });

  container.querySelectorAll('.course-card').forEach(card => {
    card.addEventListener('click', () => {
      sounds.playClick();
      const courseId = card.getAttribute('data-course-id');
      onSelectCourse(courseId);
    });
  });
}
