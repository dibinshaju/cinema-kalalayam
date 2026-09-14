// Cinema Kalalayam™ - "Why Train?" Section Component

export function renderWhySection(container) {
  container.innerHTML = `
    <section class="why-section" id="why-train">
      <div class="container">
        <div class="section-header">
          <div class="section-tag">PHILOSOPHICAL JUSTIFICATION</div>
          <h2 class="section-title">WHY TRAIN?</h2>
          <p class="section-subtitle">
            Rigorous scientific training for life situations that only happen in 1990s Malayalam cinema.
          </p>
        </div>

        <div class="why-grid">
          <!-- Card 1 -->
          <div class="why-card">
            <span class="why-card-icon">🕺</span>
            <h3 class="why-card-title">LOOK CINEMATIC</h3>
            <p class="why-card-text">
              Because walking normally is apparently not enough. Learn to move at 0.4x real-world speed while pretending an imaginary slow-motion blast is taking place behind you.
            </p>
          </div>

          <!-- Card 2 -->
          <div class="why-card">
            <span class="why-card-icon">🎭</span>
            <h3 class="why-card-title">MASTER THE SCENE</h3>
            <p class="why-card-text">
              Learn movements your future employer definitely won't ask for. From unblinking ocular malice to courtroom monologue screams that defy biological respiratory limits.
            </p>
          </div>

          <!-- Card 3 -->
          <div class="why-card">
            <span class="why-card-icon">🏆</span>
            <h3 class="why-card-title">GET CERTIFIED</h3>
            <p class="why-card-text">
              Become officially qualified in completely unnecessary skills. Download legally non-binding diplomas stamped with our official Golden Seal of Pure Mass.
            </p>
          </div>
        </div>
      </div>
    </section>
  `;
}
