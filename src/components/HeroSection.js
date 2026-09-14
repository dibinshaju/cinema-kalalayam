// Cinema Kalalayam™ - Hero Section Component
// Recreates the exact mockup composition as interactive HTML/CSS components

import { sounds } from '../audio/soundEffects.js';

export function renderHeroSection(container, onStartTraining, onSelectCourse) {
  container.innerHTML = `
    <section class="mockup-hero-stage" id="hero-stage">
      <!-- 35mm Film Strip Perforations Along Top & Bottom Borders -->
      <div class="film-perforations-top-strip"></div>
      <div class="film-perforations-bottom-strip"></div>

      <!-- Top-Left Studio Floodlight Rig (Real SVG with volumetric light beam) -->
      <div class="studio-floodlight-fixture">
        <svg viewBox="0 0 160 160" width="130" height="130" fill="none" xmlns="http://www.w3.org/2000/svg" class="floodlight-svg">
          <!-- Stand & bracket -->
          <line x1="20" y1="10" x2="60" y2="50" stroke="#111" stroke-width="6" stroke-linecap="round"/>
          <line x1="50" y1="40" x2="90" y2="70" stroke="#222" stroke-width="4"/>
          <!-- Lamp housing -->
          <path d="M50 35 L95 70 L85 85 L40 50 Z" fill="#151515" stroke="#333" stroke-width="2"/>
          <ellipse cx="85" cy="72" rx="22" ry="12" fill="#FFE58A" stroke="#F5C518" stroke-width="3" transform="rotate(38 85 72)"/>
          <circle cx="85" cy="72" r="8" fill="#FFF"/>
          <!-- Barn doors -->
          <polygon points="70,55 95,30 110,42 85,67" fill="#1c1c1c" stroke="#333"/>
          <polygon points="75,85 100,110 112,98 87,73" fill="#1c1c1c" stroke="#333"/>
        </svg>
        <div class="floodlight-volumetric-beam"></div>
      </div>

      <!-- Top-Left Pinned Note: "Dance, Dialogue, Gesture..." -->
      <div class="pinned-parchment-note left-note">
        <div class="note-pin"></div>
        <div class="note-text-content">
          <div>Dance</div>
          <div>Dialogue</div>
          <div>Gesture</div>
          <div>Expression</div>
          <div>& More...</div>
        </div>
        <svg class="hand-drawn-arrow-svg" viewBox="0 0 60 40" width="50" height="34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 5 Q 35 12 45 32" stroke="#151515" stroke-width="2.5" stroke-linecap="round" fill="none"/>
          <path d="M35 30 L45 32 L44 20" stroke="#151515" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>

      <!-- Center-Top Main Branding Title -->
      <div class="mockup-hero-branding-center">
        <!-- "CINEMA" with Film Reel Icon -->
        <div class="title-cinema-row">
          <div class="title-film-reel-icon">
            <svg viewBox="0 0 50 50" width="48" height="48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="25" cy="25" r="22" stroke="#151515" stroke-width="4.5" fill="#F5C518"/>
              <circle cx="25" cy="25" r="7" fill="#151515"/>
              <circle cx="25" cy="11" r="4.5" fill="#151515"/>
              <circle cx="25" cy="39" r="4.5" fill="#151515"/>
              <circle cx="11" cy="25" r="4.5" fill="#151515"/>
              <circle cx="39" cy="25" r="4.5" fill="#151515"/>
            </svg>
          </div>
          <h1 class="title-cinema-text">CINEMA</h1>
        </div>

        <!-- "KALALAYAM" in Distressed Blood-Red Lettering -->
        <div class="title-kalalayam-row">
          <span class="title-kalalayam-text">KALALAYAM</span>
          <span class="title-tm">TM</span>

          <!-- Crown Doodle & "Official Institute for Unnecessary Skills" -->
          <div class="crown-doodle-box">
            <svg viewBox="0 0 36 24" width="32" height="20" fill="none" stroke="#151515" stroke-width="2" stroke-linecap="round">
              <path d="M2 20 L6 6 L14 14 L18 2 L22 14 L30 6 L34 20 Z"/>
              <line x1="2" y1="20" x2="34" y2="20"/>
            </svg>
            <div class="crown-annotation-text">
              Official Institute<br>for Unnecessary Skills
            </div>
            <svg viewBox="0 0 40 40" width="30" height="30" class="crown-arrow-doodle">
              <path d="M35 5 Q 15 10 8 30" stroke="#151515" stroke-width="2" fill="none" stroke-linecap="round"/>
              <path d="M16 28 L8 30 L6 20" stroke="#151515" stroke-width="2" fill="none" stroke-linecap="round"/>
            </svg>
          </div>
        </div>

        <!-- Tagline: "Skill padikkam. Cinema aakkam." -->
        <div class="hero-tagline-brush font-malayalam">
          Skill padikkam. Cinema aakkam.
        </div>
      </div>

      <!-- Top-Right: Coconut Trees Silhouette & Cinema Theatre Billboard -->
      <div class="theatre-billboard-complex">
        <!-- Silhouetted Palm Trees -->
        <div class="palm-trees-silhouette">
          <svg viewBox="0 0 120 100" width="110" height="90" fill="#151515" xmlns="http://www.w3.org/2000/svg">
            <!-- Trunk 1 -->
            <path d="M40 100 Q 42 60 50 35 Q 52 60 48 100 Z"/>
            <!-- Fronds 1 -->
            <path d="M50 35 Q 20 20 5 35 Q 25 30 50 35"/>
            <path d="M50 35 Q 30 10 18 15 Q 35 22 50 35"/>
            <path d="M50 35 Q 50 5 60 8 Q 55 20 50 35"/>
            <path d="M50 35 Q 75 15 88 28 Q 70 28 50 35"/>
            <!-- Trunk 2 -->
            <path d="M75 100 Q 78 70 82 45 Q 84 70 80 100 Z"/>
            <!-- Fronds 2 -->
            <path d="M82 45 Q 60 30 50 42 Q 68 38 82 45"/>
            <path d="M82 45 Q 75 22 92 18 Q 85 30 82 45"/>
            <path d="M82 45 Q 105 28 115 40 Q 98 40 82 45"/>
          </svg>
        </div>

        <!-- Yellow Billboard Box -->
        <div class="kerala-billboard-frame">
          <div class="billboard-inner-text">
            KERALA'S<br>
            FIRST AI-POWERED<br>
            CINEMATIC SKILL<br>
            TRAINING CENTRE
          </div>
        </div>

        <!-- "Scene Ready?" Annotation -->
        <div class="scene-ready-annotation">
          <span>Scene Ready?</span>
          <svg viewBox="0 0 40 30" width="32" height="24" fill="none">
            <path d="M5 5 Q 25 8 30 25" stroke="#151515" stroke-width="2" stroke-linecap="round"/>
            <path d="M22 20 L30 25 L32 15" stroke="#151515" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
      </div>

      <!-- The Character Collage Layer with Individual Interactive Zones & Speech Bubbles -->
      <div class="characters-interactive-ensemble">
        <div class="character-ensemble-stage">
          <!-- 1. Style/Dance Master (Left, Afro hair) -->
          <div class="character-slot slot-dance" data-mentor="sasi-master" title="Master Sasi - Dance Master">
            <div class="speech-bubble bubble-left">
              Style venam daa Style!
            </div>
          </div>

          <!-- 2. Gesture Master (Checked shirt, horn gesture) -->
          <div class="character-slot slot-gesture" data-mentor="guru-kunjumon" title="Guru Kunjumon - Hand Gesture Science">
            <div class="speech-bubble bubble-gesture">
              Class undo?
            </div>
          </div>

          <!-- 3. Grand Cinema Master (Center, holding clapperboard) -->
          <div class="character-slot slot-center" data-mentor="grand-master" title="Grand Cinema Master">
          </div>

          <!-- 4. Background Student Girl -->
          <div class="character-slot slot-student" title="Aspiring Star">
            <div class="speech-bubble bubble-student">
              Training thudangiyo?
            </div>
          </div>

          <!-- 5. Mass Master (Red shirt, mustache) -->
          <div class="character-slot slot-mass" data-mentor="subhash-pillai" title="Subhash Pillai - Mass Master">
          </div>

          <!-- 6. Comedy & Acting Master (Pink kurta, laughing) -->
          <div class="character-slot slot-comedy" data-mentor="balan-menon" title="Balan Menon - Acting Master">
            <div class="speech-bubble bubble-right">
              Mass aa!
            </div>
          </div>

          <!-- Interactive START TRAINING Button Hotspot (Placed over the image button) -->
          <button id="hero-main-start-btn" class="embedded-start-btn-hotspot" title="Start Training Now" aria-label="Start Training"></button>

          <!-- Complete High-Res Character Ensemble Visual (Filling the Screen) -->
          <img 
            src="/assets/characters/hero_center_ensemble.png" 
            alt="Cinema Kalalayam Mentors Ensemble" 
            class="character-ensemble-img"
            loading="eager"
          />
        </div>
      </div>

      <!-- Bottom Dark Feature Strip (5 Icons & Labels from Mockup) -->
      <div class="hero-bottom-feature-strip">
        <div class="feature-strip-item" data-action="mentors">
          <span class="feature-icon">👤</span>
          <span class="feature-label">Learn from Cinematic Legends</span>
        </div>
        <div class="feature-strip-item" data-action="training">
          <span class="feature-icon">📈</span>
          <span class="feature-label">AI Powered Evaluation</span>
        </div>
        <div class="feature-strip-item" data-action="about">
          <span class="feature-icon">🏆</span>
          <span class="feature-label">Earn Useless Certificates</span>
        </div>
        <div class="feature-strip-item" data-action="leaderboard">
          <span class="feature-icon">👥</span>
          <span class="feature-label">Compete with Your Friends</span>
        </div>
        <div class="feature-strip-item" data-action="courses">
          <span class="feature-icon">🎬</span>
          <span class="feature-label">Become Unnecessarily Cinematic</span>
        </div>
      </div>
    </section>
  `;

  // Bind Main Start Training Button
  const mainBtn = container.querySelector('#hero-main-start-btn');
  mainBtn.addEventListener('click', () => {
    sounds.playClapperboard();
    onStartTraining('hero-walk-101');
  });

  // Bind Character Slots click -> launches training with that archetype
  container.querySelectorAll('.character-slot').forEach(slot => {
    slot.addEventListener('click', () => {
      sounds.playMassHorn();
      const mentor = slot.getAttribute('data-mentor');
      const courseId = mentor === 'sasi-master' ? 'cinematic-dance' :
                       (mentor === 'guru-kunjumon' ? 'hand-gesture-science' :
                       (mentor === 'balan-menon' ? 'dialogue-delivery' : 'hero-walk-101'));
      onStartTraining(courseId);
    });
  });

  // Bind Feature Strip Items
  container.querySelectorAll('.feature-strip-item').forEach(item => {
    item.addEventListener('click', () => {
      sounds.playClick();
      const action = item.getAttribute('data-action');
      if (action === 'training') {
        onStartTraining('hero-walk-101');
      } else {
        onSelectCourse(action);
      }
    });
  });
}
