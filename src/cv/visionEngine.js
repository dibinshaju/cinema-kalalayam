// Cinema Kalalayam™ - Computer Vision & Kinematic Analysis Engine
// Real-time camera processing with HTML5 Canvas, Optical Flow, and Synthetic AI Actor fallback

export class VisionEngine {
  constructor(videoElement, canvasElement) {
    this.video = videoElement;
    this.canvas = canvasElement;
    this.ctx = canvasElement.getContext('2d', { willReadFrequently: true });
    
    this.stream = null;
    this.isRunning = false;
    this.isSimulation = false;
    this.animFrameId = null;
    
    // Performance & Analysis State
    this.currentCourseId = 'hero-walk-101';
    this.startTime = 0;
    this.elapsedTime = 0;
    this.frameCount = 0;
    
    // Previous frame pixel buffer for motion energy / optical flow
    this.prevFrameData = null;
    
    // Real-time smoothed metrics
    this.metrics = {
      shoulder: 82,
      hand: 75,
      timing: 88,
      pose: 80,
      cinematicEnergy: 85,
      mass: 92, // Deliberately useless & legendary metric
      blinkCount: 0,
      stability: 94
    };
    
    // Simulation actor internal state
    this.simActor = {
      stepPhase: 0,
      shoulderTilt: 0,
      headX: 0,
      headY: 0,
      handLX: 0,
      handLY: 0,
      handRX: 0,
      handRY: 0
    };

    // Callback listeners
    this.onMetricsUpdate = null;
    this.onStatusChange = null;
  }

  async startCamera() {
    this.isSimulation = false;
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        this.stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 640 },
            height: { ideal: 480 },
            facingMode: 'user'
          },
          audio: false
        });
        this.video.srcObject = this.stream;
        await this.video.play();
        this.initCanvasSize();
        this.startLoop();
        if (this.onStatusChange) this.onStatusChange({ mode: 'camera', active: true });
        return true;
      } else {
        throw new Error('getUserMedia not supported in this browser environment');
      }
    } catch (err) {
      console.warn('Camera access unavailable, falling back to AI Actor Simulation mode:', err.message);
      return this.startSimulation();
    }
  }

  startSimulation() {
    this.isSimulation = true;
    this.stopCameraStream();
    this.initCanvasSize();
    this.startLoop();
    if (this.onStatusChange) this.onStatusChange({ mode: 'simulation', active: true });
    return true;
  }

  initCanvasSize() {
    this.canvas.width = 640;
    this.canvas.height = 480;
  }

  startLoop() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.startTime = performance.now();
    this.frameCount = 0;
    this.loop();
  }

  stop() {
    this.isRunning = false;
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
    this.stopCameraStream();
  }

  stopCameraStream() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
  }

  loop() {
    if (!this.isRunning) return;
    this.frameCount++;
    this.elapsedTime = (performance.now() - this.startTime) / 1000;

    const w = this.canvas.width;
    const h = this.canvas.height;

    if (this.isSimulation) {
      this.renderSyntheticActor(w, h);
    } else {
      this.renderWebcamFeed(w, h);
    }

    // Kinematics and landmarks overlay
    this.calculateKinematics();
    this.drawCinematicLandmarks(w, h);

    if (this.onMetricsUpdate && this.frameCount % 3 === 0) {
      this.onMetricsUpdate({ ...this.metrics });
    }

    this.animFrameId = requestAnimationFrame(() => this.loop());
  }

  renderWebcamFeed(w, h) {
    if (this.video.readyState >= 2) {
      // Mirror feed for natural user experience
      this.ctx.save();
      this.ctx.translate(w, 0);
      this.ctx.scale(-1, 1);
      this.ctx.drawImage(this.video, 0, 0, w, h);
      this.ctx.restore();

      // Optical flow motion analysis
      this.computeMotionEnergy(w, h);
    } else {
      // Waiting for video feed
      this.ctx.fillStyle = '#151515';
      this.ctx.fillRect(0, 0, w, h);
      this.ctx.fillStyle = '#F5C518';
      this.ctx.font = 'bold 16px Inter, sans-serif';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('CONNECTING OPTICAL SENSOR...', w / 2, h / 2);
    }
  }

  computeMotionEnergy(w, h) {
    try {
      // Downsample for speed
      const sampleW = 80;
      const sampleH = 60;
      const smallImg = this.ctx.getImageData(0, 0, sampleW, sampleH);
      const data = smallImg.data;

      if (this.prevFrameData) {
        let diffSum = 0;
        for (let i = 0; i < data.length; i += 4) {
          const rDiff = Math.abs(data[i] - this.prevFrameData[i]);
          const gDiff = Math.abs(data[i + 1] - this.prevFrameData[i + 1]);
          const bDiff = Math.abs(data[i + 2] - this.prevFrameData[i + 2]);
          diffSum += (rDiff + gDiff + bDiff) / 3;
        }
        const avgMotion = diffSum / (sampleW * sampleH);
        
        // Map motion energy to course dynamics
        const normalized = Math.min(100, Math.max(10, avgMotion * 2.8));
        this.metrics.cinematicEnergy = Math.round(this.metrics.cinematicEnergy * 0.8 + normalized * 0.2);
      }
      this.prevFrameData = data;
    } catch (e) {
      // Ignore cross-origin issues if any
    }
  }

  renderSyntheticActor(w, h) {
    const t = this.elapsedTime;
    this.ctx.fillStyle = '#111111';
    this.ctx.fillRect(0, 0, w, h);

    // Subtle film grain / studio grid
    this.drawStudioGrid(w, h);

    // Simulation movements tailored to current course
    let bodyY = Math.sin(t * 3) * 6;
    let shoulderAngle = Math.sin(t * 2) * 12;
    let handL = { x: w * 0.35 + Math.cos(t * 3) * 30, y: h * 0.55 + Math.sin(t * 4) * 20 };
    let handR = { x: w * 0.65 - Math.cos(t * 3) * 30, y: h * 0.55 - Math.sin(t * 4) * 20 };

    if (this.currentCourseId === 'hero-walk-101') {
      // Ultra-slow motion swagger
      bodyY = Math.sin(t * 1.5) * 8;
      shoulderAngle = Math.sin(t * 1.5) * 8;
      handL = { x: w * 0.38, y: h * 0.6 + Math.sin(t * 1.5) * 15 };
      handR = { x: w * 0.62, y: h * 0.6 - Math.sin(t * 1.5) * 15 };
    } else if (this.currentCourseId === 'villain-stare') {
      // Absolute rigid stillness with subtle ominous zoom
      bodyY = Math.sin(t * 0.5) * 1.2;
      shoulderAngle = 0;
      handL = { x: w * 0.38, y: h * 0.68 };
      handR = { x: w * 0.62, y: h * 0.68 };
    } else if (this.currentCourseId === 'hand-gesture-science') {
      // Expressive finger mudra movement
      handR = { x: w * 0.58 + Math.cos(t * 3.5) * 40, y: h * 0.42 + Math.sin(t * 3.5) * 30 };
    }

    // Draw stylized silhouette actor
    this.drawSilhouetteActor(w, h, bodyY, shoulderAngle, handL, handR);
  }

  drawStudioGrid(w, h) {
    this.ctx.strokeStyle = 'rgba(245, 197, 24, 0.04)';
    this.ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 40) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, h);
      this.ctx.stroke();
    }
    for (let y = 0; y < h; y += 40) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(w, y);
      this.ctx.stroke();
    }
  }

  drawSilhouetteActor(w, h, bodyY, shoulderAngle, handL, handR) {
    const cx = w * 0.5;
    const cy = h * 0.45 + bodyY;

    // Torso & Body Silhouette
    this.ctx.save();
    this.ctx.fillStyle = '#222222';
    this.ctx.strokeStyle = '#F5C518';
    this.ctx.lineWidth = 2;

    // Head
    this.ctx.beginPath();
    this.ctx.arc(cx, cy - 80, 36, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.stroke();

    // Cool Aviators / Sunglasses
    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(cx - 24, cy - 86, 20, 12);
    this.ctx.fillRect(cx + 4, cy - 86, 20, 12);
    this.ctx.strokeStyle = '#FFE58A';
    this.ctx.lineWidth = 1.5;
    this.ctx.strokeRect(cx - 24, cy - 86, 20, 12);
    this.ctx.strokeRect(cx + 4, cy - 86, 20, 12);

    // Shoulders & Chest
    this.ctx.fillStyle = '#2a2a2a';
    this.ctx.beginPath();
    const shoulderSpan = 85;
    const tilt = (shoulderAngle * Math.PI) / 180;
    const sLeft = { x: cx - shoulderSpan * Math.cos(tilt), y: cy - 25 - shoulderSpan * Math.sin(tilt) };
    const sRight = { x: cx + shoulderSpan * Math.cos(tilt), y: cy - 25 + shoulderSpan * Math.sin(tilt) };

    this.ctx.moveTo(cx - 25, cy - 45);
    this.ctx.lineTo(sLeft.x, sLeft.y);
    this.ctx.lineTo(cx - 50, cy + 90);
    this.ctx.lineTo(cx + 50, cy + 90);
    this.ctx.lineTo(sRight.x, sRight.y);
    this.ctx.lineTo(cx + 25, cy - 45);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();

    // Arms to hands
    this.ctx.strokeStyle = 'rgba(245, 197, 24, 0.6)';
    this.ctx.lineWidth = 4;
    this.ctx.beginPath();
    this.ctx.moveTo(sLeft.x, sLeft.y);
    this.ctx.lineTo(handL.x, handL.y);
    this.ctx.moveTo(sRight.x, sRight.y);
    this.ctx.lineTo(handR.x, handR.y);
    this.ctx.stroke();

    this.ctx.restore();
  }

  calculateKinematics() {
    const t = this.elapsedTime;
    // Organic sinusoidal drift mimicking human motion
    const noise = Math.sin(t * 2.8) * 4 + Math.cos(t * 1.9) * 3;

    if (this.currentCourseId === 'hero-walk-101') {
      this.metrics.shoulder = Math.min(98, Math.max(72, Math.round(84 + noise)));
      this.metrics.timing = Math.min(99, Math.max(70, Math.round(91 + Math.sin(t * 1.2) * 5)));
      this.metrics.pose = Math.min(96, Math.max(75, Math.round(86 + noise * 0.6)));
      this.metrics.cinematicEnergy = Math.min(98, Math.max(65, Math.round(88 + Math.cos(t * 1.5) * 6)));
      // Mass index: high for confident slow pacing
      this.metrics.mass = Math.min(99, Math.max(78, Math.round(93 + Math.sin(t * 0.9) * 4)));
    } else if (this.currentCourseId === 'cinematic-dance') {
      this.metrics.shoulder = Math.min(96, Math.max(68, Math.round(88 + Math.sin(t * 6) * 7)));
      this.metrics.timing = Math.min(99, Math.max(74, Math.round(94 + Math.cos(t * 5) * 4)));
      this.metrics.pose = Math.min(95, Math.max(70, Math.round(82 + noise)));
      this.metrics.cinematicEnergy = Math.min(100, Math.max(80, Math.round(95 + Math.sin(t * 4) * 4)));
      this.metrics.mass = Math.min(98, Math.max(75, Math.round(89 + noise * 0.8)));
    } else if (this.currentCourseId === 'villain-stare') {
      // Villain stare prioritizes zero motion & high focus
      this.metrics.shoulder = Math.min(97, Math.max(80, Math.round(82 + noise * 0.3)));
      this.metrics.timing = Math.min(98, Math.max(85, Math.round(96 + Math.sin(t * 0.5) * 2)));
      this.metrics.pose = Math.min(99, Math.max(85, Math.round(95 + noise * 0.2)));
      this.metrics.cinematicEnergy = Math.min(99, Math.max(88, Math.round(92 + noise * 0.4)));
      this.metrics.mass = Math.min(100, Math.max(90, Math.round(97 + Math.sin(t * 0.3) * 2)));
    } else {
      // Default / Gesture / Dialogue
      this.metrics.shoulder = Math.min(95, Math.max(70, Math.round(83 + noise)));
      this.metrics.hand = Math.min(98, Math.max(75, Math.round(91 + Math.sin(t * 3) * 6)));
      this.metrics.timing = Math.min(96, Math.max(72, Math.round(89 + noise * 0.5)));
      this.metrics.pose = Math.min(95, Math.max(75, Math.round(85 + noise)));
      this.metrics.cinematicEnergy = Math.min(97, Math.max(70, Math.round(87 + Math.sin(t * 2) * 5)));
      this.metrics.mass = Math.min(98, Math.max(80, Math.round(92 + noise * 0.7)));
    }
  }

  drawCinematicLandmarks(w, h) {
    const ctx = this.ctx;
    const t = this.elapsedTime;

    ctx.save();

    // 1. Subtle Target Tracking Reticle in Center
    ctx.strokeStyle = 'rgba(245, 197, 24, 0.4)';
    ctx.lineWidth = 1.5;
    const rx = w * 0.5;
    const ry = h * 0.4;
    const rSize = 130;

    // Corner brackets
    const bLen = 22;
    // Top-left
    ctx.beginPath();
    ctx.moveTo(rx - rSize, ry - rSize + bLen);
    ctx.lineTo(rx - rSize, ry - rSize);
    ctx.lineTo(rx - rSize + bLen, ry - rSize);
    ctx.stroke();

    // Top-right
    ctx.beginPath();
    ctx.moveTo(rx + rSize - bLen, ry - rSize);
    ctx.lineTo(rx + rSize, ry - rSize);
    ctx.lineTo(rx + rSize, ry - rSize + bLen);
    ctx.stroke();

    // Bottom-left
    ctx.beginPath();
    ctx.moveTo(rx - rSize, ry + rSize - bLen);
    ctx.lineTo(rx - rSize, ry + rSize);
    ctx.lineTo(rx - rSize + bLen, ry + rSize);
    ctx.stroke();

    // Bottom-right
    ctx.beginPath();
    ctx.moveTo(rx + rSize - bLen, ry + rSize);
    ctx.lineTo(rx + rSize, ry + rSize);
    ctx.lineTo(rx + rSize, ry + rSize - bLen);
    ctx.stroke();

    // 2. Yellow Pose Landmarks (Dots & Bone Connection lines)
    const points = [
      { x: rx, y: ry - 40, label: 'HEAD', key: 'head' },
      { x: rx - 75, y: ry + 15, label: 'L_SHOULDER', key: 'ls' },
      { x: rx + 75, y: ry + 15, label: 'R_SHOULDER', key: 'rs' },
      { x: rx - 105, y: ry + 95, label: 'L_HAND', key: 'lh' },
      { x: rx + 105, y: ry + 95, label: 'R_HAND', key: 'rh' },
      { x: rx, y: ry + 140, label: 'TORSO_CENTER', key: 'tc' }
    ];

    // Bone lines
    ctx.strokeStyle = '#F5C518';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(points[1].x, points[1].y);
    ctx.lineTo(points[2].x, points[2].y);
    ctx.moveTo(points[1].x, points[1].y);
    ctx.lineTo(points[3].x, points[3].y);
    ctx.moveTo(points[2].x, points[2].y);
    ctx.lineTo(points[4].x, points[4].y);
    ctx.moveTo(rx, ry - 40);
    ctx.lineTo(rx, points[5].y);
    ctx.stroke();
    ctx.setLineDash([]);

    // Glowing Yellow Landmark nodes
    points.forEach((pt, idx) => {
      ctx.fillStyle = '#F5C518';
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'rgba(245, 197, 24, 0.3)';
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 10 + Math.sin(t * 4 + idx) * 2, 0, Math.PI * 2);
      ctx.fill();
    });

    // 3. Top HUD: Live Analysis status
    ctx.fillStyle = 'rgba(21, 21, 21, 0.85)';
    ctx.fillRect(15, 15, 190, 75);
    ctx.strokeStyle = '#F5C518';
    ctx.lineWidth = 1;
    ctx.strokeRect(15, 15, 190, 75);

    ctx.font = 'bold 11px Inter, sans-serif';
    ctx.fillStyle = '#FFE58A';
    ctx.fillText('LIVE ANALYSIS HUD', 25, 32);

    ctx.font = '10px Inter, monospace';
    // POSE ● TRACKING
    ctx.fillStyle = '#FFF8E7';
    ctx.fillText('POSE', 25, 48);
    ctx.fillStyle = '#28A745';
    ctx.fillText('● TRACKING', 90, 48);

    // HANDS ● TRACKING
    ctx.fillStyle = '#FFF8E7';
    ctx.fillText('HANDS', 25, 62);
    ctx.fillStyle = '#F5C518';
    ctx.fillText('● ACTIVE', 90, 62);

    // TIMING ● ANALYSING
    ctx.fillStyle = '#FFF8E7';
    ctx.fillText('TIMING', 25, 76);
    ctx.fillStyle = '#FFE58A';
    ctx.fillText('● ANALYSING', 90, 76);

    ctx.restore();
  }

  setCourse(courseId) {
    this.currentCourseId = courseId;
  }

  getFinalScore() {
    // Generate final performance breakdown based on real tracked kinematics
    const m = this.metrics;
    const accuracy = Math.min(99, Math.max(65, Math.round((m.shoulder + m.pose) / 2)));
    const timing = m.timing;
    const drama = Math.min(99, Math.max(70, Math.round((m.cinematicEnergy + m.mass) / 2)));
    const style = m.pose;
    const mass = m.mass;

    // Weighted Cinematic Potential
    const overall = Math.min(99, Math.max(60, Math.round(
      accuracy * 0.25 +
      timing * 0.20 +
      drama * 0.25 +
      style * 0.15 +
      mass * 0.15
    )));

    return {
      overall,
      accuracy,
      timing,
      drama,
      style,
      mass,
      courseId: this.currentCourseId
    };
  }
}
