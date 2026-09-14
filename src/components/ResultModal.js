// Cinema Kalalayam™ - Dramatic Result Modal Component
// "YOUR SCENE HAS BEEN JUDGED." - Blackout transition, Score Breakdown, Reactive Mentor & AI Verdict

import { MentorAnimator } from '../mentors/mentorEngine.js';
import { FeedbackEngine } from '../feedback/feedbackEngine.js';
import { sounds } from '../audio/soundEffects.js';
import { COURSES } from '../data/courseData.js';
import { unlockAchievement } from '../data/achievementsData.js';

export function renderResultModal(container, scoreData, mentorId, courseId, onRetake, onClaimCertificate, onNextCourse) {
  const course = COURSES.find(c => c.id === courseId) || COURSES[0];
  const verdict = FeedbackEngine.generateVerdict(scoreData, mentorId, courseId);

  // Check achievements
  if (scoreData.overall >= 80) unlockAchievement('hero-material');
  if (scoreData.overall >= 95) unlockAchievement('interval-block');
  if (scoreData.drama >= 98) unlockAchievement('pro-overactor');
  if (courseId === 'hero-walk-101' && scoreData.mass >= 94) unlockAchievement('slow-motion-specialist');
  if (courseId === 'dialogue-delivery' && scoreData.overall >= 90) unlockAchievement('climax-king');

  container.innerHTML = `
    <!-- Dramatic Blackout Transition -->
    <div id="result-blackout" class="result-blackout"></div>

    <div class="result-modal-overlay active" id="result-overlay">
      <div class="result-content-card">
        <!-- Top Judgement Banner -->
        <div class="result-top-banner">
          <div class="result-dramatic-tag">CELLULOID VERDICT RENDERED</div>
          <h2 class="result-main-title">YOUR SCENE HAS BEEN JUDGED.</h2>
        </div>

        <!-- Body Grid -->
        <div class="result-body-grid">
          <!-- Left: Score Showcase & Breakdown -->
          <div class="score-column">
            <div class="score-circle-box">
              <div class="score-main-number" id="animated-score">0%</div>
              <div class="score-category-label">CINEMATIC POTENTIAL</div>
              <div style="font-size: 0.8rem; color: var(--soft-yellow); margin-top: 4px;">
                ${scoreData.overall >= 95 ? '🔥 INTERVAL BLOCK ACHIEVED' : (scoreData.overall >= 80 ? '⭐ BOX OFFICE HIT' : '🎬 SCENE UNDU... BUT RETAKE REQD')}
              </div>
            </div>

            <!-- Performance Breakdown (PRD Section 16 & 19) -->
            <div class="breakdown-box">
              <div class="breakdown-title">PERFORMANCE BREAKDOWN</div>

              <div class="breakdown-row">
                <div class="breakdown-meta">
                  <span class="stat-name">Movement (Scene Accuracy)</span>
                  <span class="stat-val">${scoreData.accuracy}%</span>
                </div>
                <div class="breakdown-bar-bg">
                  <div class="breakdown-bar-fill" style="width: ${scoreData.accuracy}%;"></div>
                </div>
              </div>

              <div class="breakdown-row">
                <div class="breakdown-meta">
                  <span class="stat-name">BGM Timing</span>
                  <span class="stat-val">${scoreData.timing}%</span>
                </div>
                <div class="breakdown-bar-bg">
                  <div class="breakdown-bar-fill" style="width: ${scoreData.timing}%;"></div>
                </div>
              </div>

              <div class="breakdown-row">
                <div class="breakdown-meta">
                  <span class="stat-name">Drama & Expression</span>
                  <span class="stat-val">${scoreData.drama}%</span>
                </div>
                <div class="breakdown-bar-bg">
                  <div class="breakdown-bar-fill" style="width: ${scoreData.drama}%;"></div>
                </div>
              </div>

              <div class="breakdown-row">
                <div class="breakdown-meta">
                  <span class="stat-name">Style & Pose</span>
                  <span class="stat-val">${scoreData.style}%</span>
                </div>
                <div class="breakdown-bar-bg">
                  <div class="breakdown-bar-fill" style="width: ${scoreData.style}%;"></div>
                </div>
              </div>

              <div class="breakdown-row">
                <div class="breakdown-meta">
                  <span class="stat-name" style="color: var(--cinema-yellow);">Mass Index (The Essential Metric)</span>
                  <span class="stat-val" style="color: #ff3d00;">${scoreData.mass}%</span>
                </div>
                <div class="breakdown-bar-bg">
                  <div class="breakdown-bar-fill" style="width: ${scoreData.mass}%; background: linear-gradient(90deg, #F5C518, #ff3d00);"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right: Reactive Mentor & Yellow AI Feedback Card (PRD Section 17 & 18) -->
          <div class="mentor-reaction-column">
            <!-- Mentor Reactive Avatar Stage -->
            <div class="result-mentor-stage" id="result-mentor-slot"></div>

            <!-- Yellow AI Mentor Verdict Card -->
            <div class="ai-verdict-card">
              <div class="verdict-header">
                <span>🎬 MENTOR VERDICT</span>
                <span class="badge" style="background: rgba(0,0,0,0.15); color: #151515;">
                  ${verdict.tier.toUpperCase()}
                </span>
              </div>

              <div class="verdict-quote font-malayalam">
                ${verdict.quote}
              </div>

              <div class="verdict-translation">
                ${verdict.translation}
              </div>

              <div style="font-size: 0.78rem; font-family: monospace; color: #444; margin-top: 4px;">
                <strong>Sensor note:</strong> ${verdict.specificObservation}
              </div>

              <div class="verdict-author">
                — ${verdict.mentorName} (${verdict.mentorMalayalam})
              </div>
            </div>
          </div>
        </div>

        <!-- Result Bottom Action Buttons -->
        <div class="result-bottom-actions">
          <button id="res-retake-btn" class="btn btn-retake">
            🔄 RETAKE SCENE
          </button>

          <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            <button id="res-cert-btn" class="btn btn-primary">
              📜 CLAIM UNNECESSARY CERTIFICATE
            </button>
            <button id="res-next-btn" class="btn btn-secondary">
              CHOOSE NEXT COURSE →
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Trigger cinematic blackout & stinger sound
  const blackout = container.querySelector('#result-blackout');
  sounds.playSubBoom(0.9);

  setTimeout(() => {
    blackout.classList.add('faded');
    if (scoreData.overall >= 80) {
      sounds.playMassHorn();
      sounds.playWhistle();
    } else {
      sounds.playRetakeBuzzer();
    }
  }, 450);

  // Mount reactive mentor
  const mentorSlot = container.querySelector('#result-mentor-slot');
  const mentorAnimator = new MentorAnimator(mentorSlot, mentorId);
  mentorAnimator.setState(verdict.emotionalState);

  // Animate score counter smoothly: 0 -> scoreData.overall
  const scoreEl = container.querySelector('#animated-score');
  let currentScore = 0;
  const targetScore = scoreData.overall;
  const scoreInterval = setInterval(() => {
    currentScore += 2;
    if (currentScore >= targetScore) {
      currentScore = targetScore;
      clearInterval(scoreInterval);
    }
    scoreEl.textContent = `${currentScore}%`;
  }, 20);

  // Button Handlers
  container.querySelector('#res-retake-btn').addEventListener('click', () => {
    sounds.playClick();
    onRetake();
  });

  container.querySelector('#res-cert-btn').addEventListener('click', () => {
    sounds.playClick();
    onClaimCertificate(scoreData, mentorId, courseId);
  });

  container.querySelector('#res-next-btn').addEventListener('click', () => {
    sounds.playClick();
    onNextCourse();
  });
}
