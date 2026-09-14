// Cinema Kalalayam™ - Cinematic Scoring Section Component
// "WE DON'T JUST TEACH. WE JUDGE." - Highlights the humorous "USEFULNESS 0%" metric

export function renderScoringSection(container) {
  container.innerHTML = `
    <section class="scoring-evaluation-section" id="scoring">
      <div class="container">
        <div class="section-header" style="margin-bottom: 36px;">
          <div class="section-tag" style="color: var(--cinema-red); letter-spacing: 4px;">
            STRICT COMPUTER VISION ALGORITHMS
          </div>
          <div style="font-family: var(--font-display); font-size: 2rem; color: var(--warm-white); letter-spacing: 2px;">
            WE DON'T JUST TEACH.
          </div>
          <h2 class="section-title" style="font-size: 5rem; color: var(--cinema-yellow); text-shadow: 0 4px 30px var(--gold-glow); line-height: 0.95;">
            WE JUDGE.
          </h2>
          <p class="section-subtitle">
            Every millimeter of shoulder displacement, sunglass tilt, and unwarranted facial drama is analyzed by our uncompromising cinematic engine.
          </p>
        </div>

        <div class="scoring-board-grid">
          <!-- Left: Real-time Telemetry Visualizer -->
          <div class="scoring-display-card">
            <div class="scoring-display-header">
              <span class="badge badge-yellow">LIVE CV SCANNER v2.4</span>
              <span style="font-family: monospace; font-size: 0.8rem; color: #28a745;">● SENSORS ONLINE</span>
            </div>

            <div class="metrics-bars-container">
              <!-- Metric 1 -->
              <div class="scoring-metric-row">
                <div class="metric-info">
                  <span class="metric-title">POSE ACCURACY</span>
                  <span class="metric-value">84%</span>
                </div>
                <div class="metric-track">
                  <div class="metric-fill" style="width: 84%;"></div>
                </div>
              </div>

              <!-- Metric 2 -->
              <div class="scoring-metric-row">
                <div class="metric-info">
                  <span class="metric-title">TIMING</span>
                  <span class="metric-value">76%</span>
                </div>
                <div class="metric-track">
                  <div class="metric-fill" style="width: 76%;"></div>
                </div>
              </div>

              <!-- Metric 3 -->
              <div class="scoring-metric-row">
                <div class="metric-info">
                  <span class="metric-title">EXPRESSION</span>
                  <span class="metric-value">91%</span>
                </div>
                <div class="metric-track">
                  <div class="metric-fill" style="width: 91%;"></div>
                </div>
              </div>

              <!-- Metric 4 -->
              <div class="scoring-metric-row">
                <div class="metric-info">
                  <span class="metric-title">CINEMATIC ENERGY</span>
                  <span class="metric-value">94%</span>
                </div>
                <div class="metric-track">
                  <div class="metric-fill" style="width: 94%;"></div>
                </div>
              </div>

              <!-- Metric 5 -->
              <div class="scoring-metric-row">
                <div class="metric-info">
                  <span class="metric-title" style="color: var(--cinema-yellow);">MASS</span>
                  <span class="metric-value" style="color: var(--cinema-yellow);">87%</span>
                </div>
                <div class="metric-track">
                  <div class="metric-fill mass-fill" style="width: 87%;"></div>
                </div>
              </div>

              <!-- The Humorous Highlight: USEFULNESS 0% -->
              <div class="scoring-metric-row useless-metric-highlight">
                <div class="metric-info">
                  <span class="metric-title" style="color: var(--cinema-red); font-weight: 800; font-size: 1.15rem;">
                    ⚠️ USEFULNESS
                  </span>
                  <span class="metric-value" style="color: var(--cinema-red); font-size: 1.35rem; font-weight: 900;">
                    0%
                  </span>
                </div>
                <div class="metric-track" style="background-color: rgba(217, 45, 32, 0.2); height: 12px;">
                  <div class="metric-fill" style="width: 0%; background-color: var(--cinema-red);"></div>
                </div>
                <div class="useless-subtext">
                  Scientific confirmation: Zero practical application in corporate, domestic, or legal spheres.
                </div>
              </div>
            </div>
          </div>

          <!-- Right: Diagnostic Breakdown Card -->
          <div class="scoring-verdict-preview-card">
            <div class="camera-target-reticle-box">
              <div class="reticle-corner top-left"></div>
              <div class="reticle-corner top-right"></div>
              <div class="reticle-corner bottom-left"></div>
              <div class="reticle-corner bottom-right"></div>

              <div class="scan-line-anim"></div>

              <div style="font-size: 3rem; margin-bottom: 10px;">📸</div>
              <div style="font-family: var(--font-display); font-size: 1.6rem; color: var(--cinema-yellow);">
                AI CINEMATIC VISION HUD
              </div>
              <div style="font-size: 0.85rem; color: var(--warm-white); max-width: 280px; text-align: center; margin-top: 6px;">
                Tracking ocular malice, slow-motion stride drag, and unnecessary swagger coefficients in real-time.
              </div>

              <div class="hud-status-chips">
                <span class="status-chip">SWAGGER: DETECTED</span>
                <span class="status-chip">CONVICTION: 100%</span>
                <span class="status-chip" style="color: var(--cinema-red); border-color: var(--cinema-red);">UTILITY: NONE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
