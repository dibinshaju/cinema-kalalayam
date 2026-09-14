// Cinema Kalalayam™ - Dedicated About Page Component (/about)
// "WHY DOES THIS EXIST?" - Technical Complexity: HIGH, Practical Usefulness: 0%

export function renderAboutView(container) {
  container.innerHTML = `
    <div class="page-container container" style="padding: 60px 24px 100px;">
      <div class="section-header">
        <div class="section-tag">PHILOSOPHICAL & SCIENTIFIC INQUIRY</div>
        <h1 class="section-title" style="font-size: 4rem;">WHY DOES THIS EXIST?</h1>
        <p class="section-subtitle">
          “Because someone decided that normal human movement needed scientific evaluation.”
        </p>
      </div>

      <div style="max-width: 900px; margin: 0 auto; display: flex; flex-direction: column; gap: 32px;">
        <!-- Core Manifesto Card -->
        <div style="background-color: var(--charcoal-surface); border: 2px solid var(--cinema-yellow); border-radius: 10px; padding: 36px; box-shadow: 0 15px 35px rgba(0,0,0,0.7);">
          <h2 style="font-family: var(--font-display); font-size: 2.2rem; color: var(--cinema-yellow); margin-bottom: 12px;">
            THE KALALAYAM THESIS
          </h2>
          <p style="color: var(--warm-white); line-height: 1.7; font-size: 1.05rem; margin-bottom: 16px;">
            For over a century, cinema actors in Kerala have executed complex, high-velocity physical maneuvers that no sane physician would ever prescribe. From three-minute slow-motion hero entries across dusty village roads to sudden rain-song pelvic air disruptions, these skills have defined cultural glory.
          </p>
          <p style="color: var(--text-muted); line-height: 1.7; font-size: 1rem;">
            Yet, until the foundation of <strong>Cinema Kalalayam™</strong>, there was zero scientific framework to measure whether someone was staring with genuine villainous spite or merely suffering from dry eyes. We corrected this historical oversight.
          </p>
        </div>

        <!-- Technical Stack Grid -->
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
          <div style="background: #1c1c1c; border: 1px solid var(--charcoal-border); padding: 24px; border-radius: 8px;">
            <div style="font-size: 2rem; margin-bottom: 8px;">🤖</div>
            <h3 style="font-family: var(--font-display); font-size: 1.4rem; color: var(--cinema-yellow);">COMPUTER VISION</h3>
            <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5;">
              Real-time landmark extraction tracking shoulder angles, pelvic oscillations, and facial ocular malice.
            </p>
          </div>

          <div style="background: #1c1c1c; border: 1px solid var(--charcoal-border); padding: 24px; border-radius: 8px;">
            <div style="font-size: 2rem; margin-bottom: 8px;">🎤</div>
            <h3 style="font-family: var(--font-display); font-size: 1.4rem; color: var(--cinema-yellow);">SPEECH ACOUSTICS</h3>
            <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5;">
              Frequency spectrum and decibel burst analysis calibrated to classic 1990s courtroom climax monologues.
            </p>
          </div>

          <div style="background: #1c1c1c; border: 1px solid var(--charcoal-border); padding: 24px; border-radius: 8px;">
            <div style="font-size: 2rem; margin-bottom: 8px;">🎭</div>
            <h3 style="font-family: var(--font-display); font-size: 1.4rem; color: var(--cinema-yellow);">SYNTHETIC AUDIO</h3>
            <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5;">
              Web Audio API synthesized mass brass fanfare stingers, clapperboard impacts, and retro theater BGM.
            </p>
          </div>
        </div>

        <!-- The Grand Summary Rating Box -->
        <div style="background: #0f0f0f; border: 3px solid var(--cinema-red); border-radius: 10px; padding: 30px; text-align: center; box-shadow: 0 10px 30px rgba(217, 45, 32, 0.25);">
          <div style="font-family: var(--font-display); font-size: 1.4rem; letter-spacing: 2px; color: var(--cinema-yellow); margin-bottom: 12px;">
            OFFICIAL SCIENTIFIC EVALUATION
          </div>

          <div style="display: flex; justify-content: space-around; flex-wrap: wrap; gap: 20px; margin: 20px 0;">
            <div>
              <div style="font-family: var(--font-display); font-size: 3.5rem; color: #28a745; line-height: 1;">HIGH</div>
              <div style="font-size: 0.85rem; font-weight: 800; color: var(--warm-white); letter-spacing: 1px;">TECHNICAL COMPLEXITY</div>
            </div>

            <div style="width: 2px; background: var(--charcoal-border);"></div>

            <div>
              <div style="font-family: var(--font-display); font-size: 3.5rem; color: var(--cinema-red); line-height: 1; text-shadow: 0 0 20px rgba(217,45,32,0.6);">0%</div>
              <div style="font-size: 0.85rem; font-weight: 800; color: var(--warm-white); letter-spacing: 1px;">PRACTICAL USEFULNESS</div>
            </div>
          </div>

          <div style="font-size: 0.85rem; color: var(--soft-yellow); font-style: italic;">
            * Verified by the Central Board of Unnecessary Cinematic Excellence.
          </div>
        </div>
      </div>
    </div>
  `;
}
