// Cinema Kalalayam™ - Course Catalog Component
// "CURRICULUM OF CELLULOID" - The Science of Looking Cinematic for No Reason
// 3D Perspective Coverflow Animation Engine (Zero External Dependencies)

import { COURSES } from '../data/courseData.js';
import { MENTORS } from '../data/mentorData.js';
import { sounds } from '../audio/soundEffects.js';

export function renderCourseCatalog(container, onSelectCourse) {
  const totalCards = COURSES.length;

  const coursesHTML = COURSES.map((course, idx) => {
    const mentor = MENTORS.find(m => m.id === course.mentorId) || MENTORS[0];
    const difficultyBadgeClass = course.difficulty === 'Beginner' ? 'badge-green' : (course.difficulty === 'Intermediate' ? 'badge-yellow' : 'badge-red');
    const courseIndexFormatted = `COURSE ${String(idx + 1).padStart(2, '0')}`;
    const frameIndexFormatted = `SCENE ${String(idx + 1).padStart(2, '0')} // REEL 35MM`;

    const cleanQuote = mentor.quote ? mentor.quote.replace(/^[“"']+|[”"']+$/g, '') : '';
    const cleanSubtitle = course.subtitle ? course.subtitle.replace(/^[“"']+|[”"']+$/g, '') : '';

    return `
      <article 
        class="coverflow-box ${idx === 0 ? 'is-active' : ''}" 
        data-course-id="${course.id}" 
        data-index="${idx}"
        role="button"
        tabindex="0"
        aria-label="${course.title} - ${course.malayalamTitle}"
      >
        <!-- Top 35mm Sprocket Strip -->
        <div class="coverflow-sprocket-header">
          <div class="sprocket-perforations">
            <span class="sprocket-hole"></span>
            <span class="sprocket-hole"></span>
            <span class="sprocket-hole"></span>
          </div>
          <span class="sprocket-frame-label">${frameIndexFormatted}</span>
          <div class="sprocket-perforations">
            <span class="sprocket-hole"></span>
            <span class="sprocket-hole"></span>
            <span class="sprocket-hole"></span>
          </div>
        </div>

        <!-- 3D Card Interior -->
        <div class="coverflow-card-body">
          <div class="coverflow-card-header">
            <div class="course-num-meta font-condensed">
              <span class="course-num-badge">${courseIndexFormatted}</span>
              <span class="course-code-tag">${course.code}</span>
            </div>
            <div class="course-badge-cluster">
              <span class="course-icon-badge">${course.icon}</span>
              <span class="badge ${difficultyBadgeClass}">${course.difficulty}</span>
            </div>
          </div>

          <div class="coverflow-title-group">
            <h3 class="coverflow-title font-display">${course.title}</h3>
            <div class="coverflow-malayalam font-malayalam">${course.malayalamTitle}</div>
            <div class="coverflow-tagline font-condensed">“${cleanSubtitle}”</div>
          </div>

          <p class="coverflow-desc font-body">${course.description}</p>

          <!-- Mentor Panel -->
          <div class="coverflow-mentor-panel">
            <div class="coverflow-mentor-label font-condensed">MENTOR ARCHETYPE</div>
            <div class="coverflow-mentor-name font-display">${mentor.name}</div>
            <div class="coverflow-mentor-quote font-body">“${cleanQuote}”</div>
          </div>

          <!-- Bottom Actions -->
          <div class="coverflow-footer">
            <div class="coverflow-duration-meta">
              <span class="coverflow-duration-label font-condensed">DURATION</span>
              <span class="coverflow-duration-val font-body">⏱️ ${course.duration}</span>
            </div>
            <button class="btn btn-primary coverflow-cta-btn start-course-btn font-display" data-course-id="${course.id}">
              ${course.buttonText || 'LEARN THIS →'}
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');

  const timelineChipsHTML = COURSES.map((course, idx) => `
    <button class="timeline-chip ${idx === 0 ? 'active' : ''}" data-goto-index="${idx}" aria-label="Go to ${course.title}">
      <span style="opacity: 0.6;">0${idx + 1}</span> ${course.title}
    </button>
  `).join('');

  container.innerHTML = `
    <section class="courses-section" id="courses">
      <div class="container">
        <!-- Section Header Typography Hierarchy -->
        <div class="section-header curriculum-header">
          <div class="curriculum-billboard-tag font-condensed">
            <span class="curriculum-reel-icon">🎞️</span>
            <span>CELLULOID ACADEMY • SEMESTER 2025</span>
            <span class="curriculum-reel-icon">🎞️</span>
          </div>
          <h2 class="curriculum-main-title font-display">
            CURRICULUM OF CELLULOID
          </h2>
          <div class="curriculum-sub-title font-display">
            THE SCIENCE OF LOOKING CINEMATIC FOR NO REASON
          </div>
          <p class="curriculum-subtitle font-body">
            Professional training for completely unnecessary skills. Backed by groundless kinetic research.
          </p>
        </div>

        <!-- 3D Perspective Coverflow Animation Container -->
        <div class="coverflow-3d-wrapper" id="coverflow-wrapper">
          <!-- Top Reel Status Bar & Nav Controls -->
          <div class="coverflow-status-bar">
            <div class="coverflow-reel-badge">
              <span>🎞️</span>
              <span class="reel-counter-active" id="coverflow-reel-counter">REEL [ 01 / 06 ]</span>
              <span style="color: #666;">•</span>
              <span id="coverflow-reel-title" style="color: var(--warm-white);">${COURSES[0].title}</span>
            </div>

            <div class="coverflow-drag-hint font-condensed">
              <span class="scroll-icon-mini">↔</span> DRAG, SCROLL OR ARROWS TO ROTATE
            </div>
          </div>

          <!-- 3D Stage with Perspective -->
          <div class="coverflow-stage" id="coverflow-stage" tabindex="0" role="region" aria-label="3D Course Carousel">
            <div class="coverflow-boxes" id="coverflow-boxes">
              ${coursesHTML}
            </div>
          </div>

          <!-- Round 3D Controls Matching Snippet Style -->
          <div class="coverflow-controls">
            <button class="coverflow-nav-btn prev-btn" id="coverflow-prev" aria-label="Previous Reel">
              <span>Previous</span>
              <svg viewBox="0 0 448 512" width="18" height="18" aria-hidden="true">
                <path d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"/>
              </svg>
            </button>
            <button class="coverflow-nav-btn next-btn" id="coverflow-next" aria-label="Next Reel">
              <span>Next</span>
              <svg viewBox="0 0 448 512" width="18" height="18" aria-hidden="true">
                <path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"/>
              </svg>
            </button>
          </div>

          <!-- Bottom Timeline & Progress Dock -->
          <div class="carousel-bottom-dock">
            <div class="carousel-progress-track">
              <div class="carousel-progress-fill" id="coverflow-progress-fill"></div>
            </div>
            <div class="carousel-timeline-dots">
              ${timelineChipsHTML}
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  // Query DOM Elements
  const stage = container.querySelector('#coverflow-stage');
  const prevBtn = container.querySelector('#coverflow-prev');
  const nextBtn = container.querySelector('#coverflow-next');
  const counterEl = container.querySelector('#coverflow-reel-counter');
  const titleEl = container.querySelector('#coverflow-reel-title');
  const progressFill = container.querySelector('#coverflow-progress-fill');
  const chips = container.querySelectorAll('.timeline-chip');
  const cards = Array.from(container.querySelectorAll('.coverflow-box'));

  // 3D Physics & Animation State
  let currentIndex = 0;
  let currentPos = 0;
  let targetPos = 0;
  let isDragging = false;
  let startX = 0;
  let dragStartPos = 0;
  let hasDragged = false;
  let rafId = null;

  function updateStatusUI(index) {
    const safeIdx = Math.max(0, Math.min(totalCards - 1, index));
    if (counterEl) {
      counterEl.textContent = `REEL [ 0${safeIdx + 1} / 0${totalCards} ]`;
    }
    if (titleEl && COURSES[safeIdx]) {
      titleEl.textContent = COURSES[safeIdx].title;
    }
    if (progressFill) {
      progressFill.style.width = `${((safeIdx + 1) / totalCards) * 100}%`;
    }
    chips.forEach((chip, i) => {
      if (i === safeIdx) {
        chip.classList.add('active');
      } else {
        chip.classList.remove('active');
      }
    });
    if (prevBtn) prevBtn.disabled = safeIdx === 0;
    if (nextBtn) nextBtn.disabled = safeIdx === totalCards - 1;
  }

  function applyTransforms(pos) {
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth <= 1024;
    const stepX = isMobile ? 120 : (isTablet ? 165 : 200);
    const centerOffset = isMobile ? 140 : (isTablet ? 175 : 220);

    const activeRounded = Math.round(pos);
    if (activeRounded !== currentIndex && !isDragging) {
      currentIndex = Math.max(0, Math.min(totalCards - 1, activeRounded));
      updateStatusUI(currentIndex);
    }

    cards.forEach((card, i) => {
      const d = i - pos;
      const absD = Math.abs(d);
      const sign = Math.sign(d);

      let x = 0;
      let rotateY = 0;
      let z = 100;
      let scale = 1.05;
      let opacity = 1;
      let zIndex = 100;

      if (absD < 0.001) {
        x = 0;
        rotateY = 0;
        z = 100;
        scale = 1.05;
        opacity = 1;
        zIndex = 100;
      } else {
        x = sign * (centerOffset * Math.min(1, absD) + Math.max(0, absD - 1) * stepX);
        rotateY = -sign * Math.min(50, absD * 50);
        z = 100 - absD * 140;
        scale = Math.max(0.65, 1.05 - absD * 0.14);
        opacity = Math.max(0.12, 1 - absD * 0.28);
        zIndex = Math.round(100 - absD * 10);
      }

      card.style.transform = `translate3d(calc(-50% + ${x.toFixed(1)}px), -50%, ${z.toFixed(1)}px) rotateY(${rotateY.toFixed(1)}deg) scale(${scale.toFixed(3)})`;
      card.style.opacity = opacity.toFixed(2);
      card.style.zIndex = zIndex;
      card.style.visibility = absD > 2.8 ? 'hidden' : 'visible';
      card.style.pointerEvents = absD > 1.2 ? 'none' : 'auto';

      if (absD < 0.45) {
        if (!card.classList.contains('is-active')) card.classList.add('is-active');
      } else {
        if (card.classList.contains('is-active')) card.classList.remove('is-active');
      }
    });
  }

  let isAnimating = false;
  function scheduleAnimation() {
    if (isAnimating) return;
    isAnimating = true;

    function step() {
      const diff = targetPos - currentPos;
      const damping = isDragging ? 0.38 : 0.16;

      if (Math.abs(diff) > 0.0008) {
        currentPos += diff * damping;
      } else {
        currentPos = targetPos;
      }

      applyTransforms(currentPos);

      if (Math.abs(targetPos - currentPos) > 0.0008 || isDragging) {
        rafId = requestAnimationFrame(step);
      } else {
        currentPos = targetPos;
        applyTransforms(currentPos);
        isAnimating = false;
        rafId = null;
      }
    }

    rafId = requestAnimationFrame(step);
  }

  function goTo(index) {
    const clamped = Math.max(0, Math.min(totalCards - 1, index));
    targetPos = clamped;
    currentIndex = clamped;
    updateStatusUI(currentIndex);
    scheduleAnimation();
  }

  // Prev / Next button listeners
  prevBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    sounds.playClick();
    goTo(currentIndex - 1);
  });

  nextBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    sounds.playClick();
    goTo(currentIndex + 1);
  });

  // Timeline chips
  chips.forEach(chip => {
    chip.addEventListener('click', (e) => {
      e.stopPropagation();
      sounds.playClick();
      const idx = parseInt(chip.getAttribute('data-goto-index'), 10);
      goTo(idx);
    });
  });

  // Pointer drag scrubbing (Mouse & Touch via unified Pointer Events)
  if (stage) {
    stage.addEventListener('pointerdown', (e) => {
      if (e.target.closest('.coverflow-controls') || e.target.closest('.start-course-btn')) return;
      isDragging = true;
      hasDragged = false;
      startX = e.clientX;
      dragStartPos = currentPos;
      try {
        stage.setPointerCapture(e.pointerId);
      } catch (err) {}
      scheduleAnimation();
    });

    stage.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - startX;
      if (Math.abs(deltaX) > 6) {
        hasDragged = true;
      }
      const isMobile = window.innerWidth <= 768;
      const stepX = isMobile ? 120 : 200;
      const sensitivity = stepX * 1.05;
      const newTarget = dragStartPos - (deltaX / sensitivity);
      targetPos = Math.max(-0.35, Math.min(totalCards - 0.65, newTarget));
      scheduleAnimation();
    });

    const endDrag = (e) => {
      if (!isDragging) return;
      isDragging = false;
      try {
        if (stage.hasPointerCapture(e.pointerId)) {
          stage.releasePointerCapture(e.pointerId);
        }
      } catch (err) {}
      const snapIndex = Math.max(0, Math.min(totalCards - 1, Math.round(targetPos)));
      goTo(snapIndex);
    };

    stage.addEventListener('pointerup', endDrag);
    stage.addEventListener('pointercancel', endDrag);

    // Horizontal wheel scrubbing ONLY - NEVER hijack vertical page scrolling!
    let wheelCooldown = false;
    stage.addEventListener('wheel', (e) => {
      // If primarily vertical scroll, let browser scroll the page natively with zero interference!
      if (Math.abs(e.deltaY) >= Math.abs(e.deltaX) * 0.8) {
        return;
      }

      // Explicit horizontal swipe gesture
      if (Math.abs(e.deltaX) > 20) {
        e.preventDefault();
        if (wheelCooldown) return;
        wheelCooldown = true;
        setTimeout(() => { wheelCooldown = false; }, 200);

        if (e.deltaX > 0) {
          goTo(currentIndex + 1);
        } else {
          goTo(currentIndex - 1);
        }
      }
    }, { passive: false });

    // Keyboard navigation
    stage.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'd' || e.key === 'D') {
        e.preventDefault();
        sounds.playClick();
        goTo(currentIndex + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        sounds.playClick();
        goTo(currentIndex - 1);
      }
    });
  }

  // Card click behavior
  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      if (hasDragged) return; // Prevent click trigger after swipe
      const idx = parseInt(card.getAttribute('data-index'), 10);
      const courseId = card.getAttribute('data-course-id');

      if (e.target.closest('.start-course-btn')) {
        e.stopPropagation();
        sounds.playClapperboard();
        onSelectCourse(courseId);
        return;
      }

      if (idx !== currentIndex) {
        sounds.playClick();
        goTo(idx);
      } else {
        sounds.playClick();
        onSelectCourse(courseId);
      }
    });

    // Keyboard accessibility for card enter
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const idx = parseInt(card.getAttribute('data-index'), 10);
        const courseId = card.getAttribute('data-course-id');
        if (idx !== currentIndex) {
          sounds.playClick();
          goTo(idx);
        } else {
          sounds.playClapperboard();
          onSelectCourse(courseId);
        }
      }
    });
  });

  // Initialize UI & Render Initial State with URL Hash Support
  function checkHash() {
    if (window.location.hash) {
      const match = window.location.hash.match(/course=(\d+)/);
      if (match) {
        const hashIdx = Math.max(0, Math.min(totalCards - 1, parseInt(match[1], 10)));
        goTo(hashIdx);
        return hashIdx;
      }
    }
    return 0;
  }

  const initialIdx = checkHash();
  currentIndex = initialIdx;
  currentPos = initialIdx;
  targetPos = initialIdx;
  updateStatusUI(initialIdx);
  applyTransforms(initialIdx);
  window.addEventListener('hashchange', checkHash);
}
