// Cinema Kalalayam™ - "How It Works" 4-Step Pipeline Component

export function renderHowItWorksSection(container) {
  container.innerHTML = `
    <section class="how-it-works-section" id="how-it-works">
      <div class="container">
        <div class="section-header">
          <div class="section-tag">THE UNNECESSARY PIPELINE</div>
          <h2 class="section-title">HOW IT WORKS</h2>
          <p class="section-subtitle">
            From observational confusion to algorithmic roast in four seamless cinematic steps.
          </p>
        </div>

        <div class="how-it-works-grid">
          <!-- Step 1 -->
          <div class="how-step-card">
            <div class="step-badge-number">01</div>
            <div class="step-icon">👁️</div>
            <h3 class="step-title">WATCH</h3>
            <p class="step-desc">
              Learn from your cinematic mentor. Observe exaggerated joint displacements, slow strides, and meaningless finger geometry.
            </p>
          </div>

          <!-- Step 2 -->
          <div class="how-step-card">
            <div class="step-badge-number">02</div>
            <div class="step-icon">🎥</div>
            <h3 class="step-title">PERFORM</h3>
            <p class="step-desc">
              Turn on your camera. Try not to embarrass yourself as the countdown hits ACTION and imaginary BGM blasts in your room.
            </p>
          </div>

          <!-- Step 3 -->
          <div class="how-step-card">
            <div class="step-badge-number">03</div>
            <div class="step-icon">🤖</div>
            <h3 class="step-title">GET JUDGED</h3>
            <p class="step-desc">
              Computer vision analyses your performance. Joint angles, timing synchronization, and mass coefficient are computed instantly.
            </p>
          </div>

          <!-- Step 4 -->
          <div class="how-step-card">
            <div class="step-badge-number">04</div>
            <div class="step-icon">🔥</div>
            <h3 class="step-title">GET ROASTED</h3>
            <p class="step-desc">
              Your mentor gives the final verdict. Receive deadpan Malayalam roasts, acclaim, or demand for an immediate retake.
            </p>
          </div>
        </div>
      </div>
    </section>
  `;
}
