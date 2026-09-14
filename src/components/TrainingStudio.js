// Cinema Kalalayam™ - Comprehensive Training Studio Component
// Supports Dance Training, Hand Gesture Science, and Dialogue Climax Monologues

import { COURSES } from '../data/courseData.js';
import { MENTORS } from '../data/mentorData.js';
import { MentorAnimator } from '../mentors/mentorEngine.js';
import { VisionEngine } from '../cv/visionEngine.js';
import { sounds } from '../audio/soundEffects.js';

export function renderTrainingStudio(container, courseId, onBack, onPerformanceComplete) {
  const course = COURSES.find(c => c.id === courseId) || COURSES[0];
  const mentor = MENTORS.find(m => m.id === course.mentorId) || MENTORS[0];

  const isGesture = course.id === 'hand-gesture-science';
  const isDialogue = course.id === 'dialogue-delivery';
  const modeName = isGesture ? 'GESTURE SCIENCE' : (isDialogue ? 'DIALOGUE DELIVERY' : 'CINEMATIC DANCE');

  container.innerHTML = `
    <div class="studio-wrapper">
      <!-- Top Studio Bar -->
      <div class="studio-nav-bar">
        <div class="studio-nav-left">
          <button id="studio-back-btn" class="btn btn-secondary btn-sm" style="padding: 8px 16px;">
            ← BACK
          </button>
          <div class="studio-title-box">
            <div class="studio-course-title" style="display: flex; align-items: center; gap: 10px;">
              <span>${course.icon}</span>
              <span>${course.title}</span>
            </div>
            <div class="studio-course-code">${course.code} • MENTOR: ${mentor.name} (${mentor.characterName})</div>
          </div>
        </div>

        <div style="display: flex; align-items: center; gap: 14px;">
          <!-- Mode Switcher Tabs for quick test during exhibition -->
          <div style="display: flex; gap: 6px;">
            <button class="mode-switch-btn ${!isGesture && !isDialogue ? 'active' : ''}" data-cid="cinematic-dance">💃 DANCE</button>
            <button class="mode-switch-btn ${isGesture ? 'active' : ''}" data-cid="hand-gesture-science">🤌 GESTURE</button>
            <button class="mode-switch-btn ${isDialogue ? 'active' : ''}" data-cid="dialogue-delivery">🎤 DIALOGUE</button>
          </div>
          <button id="studio-quick-finish-btn" class="btn btn-primary btn-sm" style="font-weight: 800;">
            JUDGE SCENE NOW 🎬
          </button>
        </div>
      </div>

      <!-- Split Studio Grid -->
      <div class="studio-grid">
        <!-- LEFT PANEL: Master's Demonstration -->
        <div class="master-panel">
          <div class="panel-header">
            <div class="panel-title">
              <span>🎬</span>
              <span>WATCH THE MASTER</span>
            </div>
            <span class="badge badge-yellow">DEMO STAGE</span>
          </div>

          <div class="master-stage-box">
            <div class="master-advice-bubble">
              <span class="master-quote">“${mentor.quote}”</span>
              <span style="font-size: 0.75rem; color: var(--cinema-yellow); font-weight: 800;">${mentor.characterName}</span>
            </div>

            <!-- Animated Mentor Vector Canvas -->
            <div id="studio-mentor-slot" style="width: 100%; height: 360px;"></div>
          </div>

          <div class="master-controls">
            <button id="btn-replay-demo" class="btn btn-secondary btn-sm">
              ▶ REPLAY STEP
            </button>
            <button id="btn-slowmo-demo" class="btn btn-secondary btn-sm">
              🌪️ SUPER SLOW-MO
            </button>
          </div>

          <div style="margin-top: 14px; background: rgba(0,0,0,0.4); padding: 12px; border-radius: 6px; border: 1px solid var(--charcoal-border);">
            <div style="font-size: 0.75rem; font-weight: 800; color: var(--cinema-yellow); margin-bottom: 2px;">CINEMATIC RULE:</div>
            <div style="font-size: 0.85rem; color: var(--warm-white);">
              ${course.kinematicRules[0]}
            </div>
          </div>
        </div>

        <!-- RIGHT PANEL: Your Turn / Live Camera Feed & Telemetry -->
        <div class="performer-panel">
          <div class="panel-header">
            <div class="panel-title">
              <span>🎥</span>
              <span>YOUR TURN: PERFORM THE SCENE</span>
            </div>
            <div id="recording-indicator" class="badge badge-yellow" style="display: none;">
              ● CV ACTION SENSOR ACTIVE
            </div>
          </div>

          <div class="camera-stage-box" id="camera-box">
            <!-- Hidden Video Feed -->
            <video id="camera-video" playsinline autoplay muted></video>

            <!-- Interactive Tracking Canvas -->
            <canvas id="camera-canvas"></canvas>

            <!-- Countdown Overlay -->
            <div id="countdown-overlay" class="countdown-overlay" style="display: none;">
              <div id="countdown-number" class="countdown-number">3</div>
              <div class="countdown-label">${isDialogue ? 'INHALE LUNGS!' : (isGesture ? 'AIM MUDRA!' : 'GET READY TO DANCE!')}</div>
            </div>

            <!-- Live Floating Metrics HUD (Section 15) -->
            <div class="live-metrics-hud">
              <div class="metric-chip">
                <span class="label">POSE ACCURACY</span>
                <span class="value" id="hud-shoulder">84%</span>
              </div>
              <div class="metric-chip">
                <span class="label">${isGesture ? 'FINGER ANGLE' : (isDialogue ? 'DECIBEL BURST' : 'HANDS')}</span>
                <span class="value" id="hud-hand">76%</span>
              </div>
              <div class="metric-chip">
                <span class="label">BGM TIMING</span>
                <span class="value" id="hud-timing">91%</span>
              </div>
              <div class="metric-chip">
                <span class="label">${isDialogue ? 'CLIMAX PAUSE' : 'BODY SWAGGER'}</span>
                <span class="value" id="hud-pose">80%</span>
              </div>
            </div>

            <!-- Bottom Meters: Energy & Mass Index -->
            <div class="bottom-meters-box">
              <div class="meter-group">
                <div class="meter-label-row">
                  <span style="color: #FFF8E7;">${isDialogue ? 'DIALOGUE IMPACT' : 'CINEMATIC ENERGY'}</span>
                  <span style="color: var(--cinema-yellow);" id="label-cinematic-energy">86%</span>
                </div>
                <div class="meter-bar-track">
                  <div class="meter-bar-fill" id="bar-cinematic-energy" style="width: 86%;"></div>
                </div>
              </div>

              <div class="meter-group">
                <div class="meter-label-row">
                  <span style="color: #F5C518;">MASS INDEX (ESSENTIAL METRIC)</span>
                  <span style="color: #ff3d00;" id="label-mass-index">94%</span>
                </div>
                <div class="meter-bar-track">
                  <div class="meter-bar-fill mass-fill" id="bar-mass-index" style="width: 94%;"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Controls under Camera -->
          <div class="performer-controls">
            <div style="display: flex; align-items: center; gap: 10px;">
              <button id="btn-start-performance" class="btn btn-primary" style="font-weight: 800;">
                🎬 MY TURN (START TAKE)
              </button>
              <button id="btn-stop-performance" class="btn btn-retake btn-sm" style="display: none;">
                ⏹️ CUT! (RETAKE)
              </button>
            </div>

            <div style="display: flex; align-items: center; gap: 8px;">
              <button id="btn-toggle-camera-mode" class="source-toggle-btn">
                🔄 SENSOR: AI ACTOR SIMULATION
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Mode Switchers
  container.querySelectorAll('.mode-switch-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const cid = btn.getAttribute('data-cid');
      sounds.playClick();
      vision.stop();
      if (countdownTimer) clearInterval(countdownTimer);
      if (takeTimeout) clearTimeout(takeTimeout);
      
      if (window.cinemaApp) {
        if (cid === 'cinematic-dance') window.cinemaApp.navigateTo('/training/dance');
        else if (cid === 'hand-gesture-science') window.cinemaApp.navigateTo('/training/gesture');
        else if (cid === 'dialogue-delivery') window.cinemaApp.navigateTo('/training/dialogue');
        else window.cinemaApp.navigateTo(`/training/${cid}`);
      } else {
        renderTrainingStudio(container, cid, onBack, onPerformanceComplete);
      }
    });
  });

  // Initialize Animated Mentor Demonstration
  const mentorSlot = container.querySelector('#studio-mentor-slot');
  const mentorAnimator = new MentorAnimator(mentorSlot, mentor.id);
  mentorAnimator.setState('demo');

  // Initialize Computer Vision Engine
  const videoEl = container.querySelector('#camera-video');
  const canvasEl = container.querySelector('#camera-canvas');
  const vision = new VisionEngine(videoEl, canvasEl);
  vision.setCourse(course.id);

  // HUD Elements
  const hudShoulder = container.querySelector('#hud-shoulder');
  const hudHand = container.querySelector('#hud-hand');
  const hudTiming = container.querySelector('#hud-timing');
  const hudPose = container.querySelector('#hud-pose');
  const barEnergy = container.querySelector('#bar-cinematic-energy');
  const labelEnergy = container.querySelector('#label-cinematic-energy');
  const barMass = container.querySelector('#bar-mass-index');
  const labelMass = container.querySelector('#label-mass-index');
  const recIndicator = container.querySelector('#recording-indicator');
  const cameraBox = container.querySelector('#camera-box');
  const btnStart = container.querySelector('#btn-start-performance');
  const btnStop = container.querySelector('#btn-stop-performance');
  const btnToggleMode = container.querySelector('#btn-toggle-camera-mode');
  const countdownOverlay = container.querySelector('#countdown-overlay');
  const countdownNum = container.querySelector('#countdown-number');

  // CV Metrics Callback
  vision.onMetricsUpdate = (metrics) => {
    if (hudShoulder) hudShoulder.textContent = `${metrics.shoulder}%`;
    if (hudHand) hudHand.textContent = `${metrics.hand}%`;
    if (hudTiming) hudTiming.textContent = `${metrics.timing}%`;
    if (hudPose) hudPose.textContent = `${metrics.pose}%`;
    if (barEnergy) barEnergy.style.width = `${metrics.cinematicEnergy}%`;
    if (labelEnergy) labelEnergy.textContent = `${metrics.cinematicEnergy}%`;
    if (barMass) barMass.style.width = `${metrics.mass}%`;
    if (labelMass) labelMass.textContent = `${metrics.mass}%`;
  };

  // Start with simulation fallback
  vision.startSimulation();

  let takeTimeout = null;
  let countdownTimer = null;

  const triggerJudgement = () => {
    sounds.playRetakeBuzzer();
    vision.stop();
    if (recIndicator) recIndicator.style.display = 'none';
    if (cameraBox) cameraBox.classList.remove('recording');
    btnStart.style.display = 'inline-flex';
    btnStop.style.display = 'none';

    // Calculate real score
    const finalScore = vision.getFinalScore();
    onPerformanceComplete(finalScore, mentor.id, course.id);
  };

  // Action / Start Performance Flow
  btnStart.addEventListener('click', () => {
    sounds.playClapperboard();
    btnStart.style.display = 'none';
    btnStop.style.display = 'inline-flex';

    // 3... 2... 1... COUNTDOWN
    countdownOverlay.style.display = 'flex';
    let count = 3;
    countdownNum.textContent = count;

    countdownTimer = setInterval(() => {
      count--;
      if (count > 0) {
        countdownNum.textContent = count;
        sounds.playClick();
      } else if (count === 0) {
        countdownNum.textContent = isDialogue ? 'SPEAK!' : (isGesture ? 'STRIKE MUDRA!' : 'DANCE!');
        sounds.playClapperboard();
      } else {
        clearInterval(countdownTimer);
        countdownOverlay.style.display = 'none';

        // Recording active
        recIndicator.style.display = 'inline-flex';
        cameraBox.classList.add('recording');
        sounds.playMassHorn();

        // Performance take timer (8.5 seconds)
        takeTimeout = setTimeout(() => {
          triggerJudgement();
        }, 8500);
      }
    }, 1000);
  });

  // Stop / Cut Performance
  btnStop.addEventListener('click', () => {
    if (countdownTimer) clearInterval(countdownTimer);
    if (takeTimeout) clearTimeout(takeTimeout);
    countdownOverlay.style.display = 'none';
    triggerJudgement();
  });

  // Fast-Forward to Judgement
  container.querySelector('#studio-quick-finish-btn').addEventListener('click', () => {
    if (countdownTimer) clearInterval(countdownTimer);
    if (takeTimeout) clearTimeout(takeTimeout);
    countdownOverlay.style.display = 'none';
    triggerJudgement();
  });

  // Toggle Camera vs AI Actor Simulation
  btnToggleMode.addEventListener('click', async () => {
    sounds.playClick();
    if (vision.isSimulation) {
      btnToggleMode.textContent = '🔄 CONNECTING WEBCAM...';
      const ok = await vision.startCamera();
      if (ok && !vision.isSimulation) {
        btnToggleMode.textContent = '📹 SENSOR: LIVE WEBCAM ACTIVE';
      } else {
        btnToggleMode.textContent = '🔄 SENSOR: AI ACTOR SIMULATION';
      }
    } else {
      vision.startSimulation();
      btnToggleMode.textContent = '🔄 SENSOR: AI ACTOR SIMULATION';
    }
  });

  // Replay Mentor Demonstration
  container.querySelector('#btn-replay-demo').addEventListener('click', () => {
    sounds.playClick();
    mentorAnimator.setState('demo');
  });

  container.querySelector('#btn-slowmo-demo').addEventListener('click', () => {
    sounds.playClick();
    sounds.playSubBoom(0.5);
    mentorAnimator.setState('demo');
  });

  // Back Button
  container.querySelector('#studio-back-btn').addEventListener('click', () => {
    vision.stop();
    if (countdownTimer) clearInterval(countdownTimer);
    if (takeTimeout) clearTimeout(takeTimeout);
    onBack();
  });
}
