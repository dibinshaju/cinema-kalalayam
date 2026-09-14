// Cinema Kalalayam™ - About Institute Section Component

export function renderAboutSection(container) {
  container.innerHTML = `
    <section class="about-section" id="about">
      <div class="container">
        <div class="about-grid">
          <div class="about-text-column">
            <div class="section-tag">OFFICIAL REPOSITORY OF DRAMA</div>
            <h2 class="section-title" style="text-align: left; margin-bottom: 20px;">
              ABOUT THE KALALAYAM
            </h2>
            <div class="font-malayalam" style="font-size: 1.15rem; color: var(--cinema-yellow); margin-bottom: 16px;">
              “സ്കിൽ പഠിക്കാം. സിനിമ ആക്കാം.”
            </div>
            <p style="color: var(--warm-white); line-height: 1.7; margin-bottom: 16px;">
              Established in the collective cinematic subconscious of Kerala in 1982, <strong>Cinema Kalalayam™</strong> is the world's only research institution dedicated to the preservation of completely unnecessary cinematic abilities.
            </p>
            <p style="color: var(--text-muted); line-height: 1.6; margin-bottom: 24px;">
              From entering village tea shops at 0.3x speed with wind machines blowing from nowhere, to screaming courtroom speeches that shatter microphone diaphragms, we believe that normal people are boring. Cinema is life.
            </p>

            <div class="about-stats-row">
              <div class="about-stat-item">
                <div class="stat-num">400+</div>
                <div class="stat-label">Rain Songs Studied</div>
              </div>
              <div class="about-stat-item">
                <div class="stat-num">0%</div>
                <div class="stat-label">Real-World Utility</div>
              </div>
              <div class="about-stat-item">
                <div class="stat-num">100%</div>
                <div class="stat-label">Mass Index Guaranteed</div>
              </div>
            </div>
          </div>

          <div class="about-card-column">
            <div class="about-charter-box">
              <div style="font-family: var(--font-display); font-size: 1.4rem; color: var(--cinema-yellow); margin-bottom: 10px;">
                📜 THE KALALAYAM CHARTER
              </div>
              <ul style="list-style: none; display: flex; flex-direction: column; gap: 10px; font-size: 0.9rem; color: var(--warm-white);">
                <li>☑ Never walk normally if slow-motion is technologically viable.</li>
                <li>☑ If a villain stares at you, stare back until the camera crew gets nervous.</li>
                <li>☑ Always point an aggressive index finger when disputing ancestral paddy fields.</li>
                <li>☑ In aerobic exhaustion, maintain maximum smiling confidence for front rows.</li>
                <li>☑ All certificates issued are 100% non-binding and non-accredited.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="cinema-footer">
      <div class="container footer-container">
        <div class="footer-left">
          <div style="font-family: var(--font-display); font-size: 1.4rem; color: var(--cinema-yellow);">
            🎬 CINEMA KALALAYAM™
          </div>
          <div style="font-size: 0.78rem; color: var(--text-muted);">
            Official Institute for Unnecessary Skills • Kerala, India
          </div>
        </div>
        <div style="font-size: 0.8rem; color: var(--text-muted); text-align: right;">
          © 2026 Cinema Kalalayam. Designed for people who take cinema WAY too seriously.
        </div>
      </div>
    </footer>
  `;
}
