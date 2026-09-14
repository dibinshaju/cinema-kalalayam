// Cinema Kalalayam™ - Final Call-to-Action Banner Component

import { sounds } from '../audio/soundEffects.js';

export function renderFinalCTASection(container, onEnterTraining) {
  container.innerHTML = `
    <section class="final-cta-section" id="final-cta">
      <div class="container">
        <div class="final-cta-box">
          <div class="film-strip-header" style="position: absolute; top: 0; left: 0; width: 100%;"></div>

          <span class="badge badge-yellow" style="margin-bottom: 16px;">
            CLAPPERBOARD READY
          </span>

          <h2 class="final-cta-title">
            READY FOR YOUR FIRST SCENE?
          </h2>

          <p class="final-cta-subtitle">
            Your future career probably doesn't require this.
          </p>

          <button id="final-cta-btn" class="btn btn-primary" style="font-size: 1.5rem; padding: 16px 36px;">
            ENTER TRAINING →
          </button>

          <div class="final-cta-subtext">
            100% cinematic. 0% necessary.
          </div>
        </div>
      </div>
    </section>
  `;

  const btn = container.querySelector('#final-cta-btn');
  btn.addEventListener('click', () => {
    sounds.playMassHorn();
    onEnterTraining('hero-walk-101');
  });
}
