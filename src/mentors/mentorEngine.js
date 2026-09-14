// Cinema Kalalayam™ - Animated Mentor Vector Engine
// Interactive SVG vector characters with state animations (Idle, Demo, Disappointed, Puzzled, Excited, Mass Celebration)

export class MentorAnimator {
  constructor(containerElement, mentorId = 'sasi-master') {
    this.container = containerElement;
    this.mentorId = mentorId;
    this.state = 'idle'; // 'idle' | 'demo' | 'react_poor' | 'react_average' | 'react_good' | 'react_excellent'
    this.animFrameId = null;
    this.startTime = performance.now();
    this.render();
  }

  setMentor(mentorId) {
    this.mentorId = mentorId;
    this.render();
  }

  setState(state) {
    this.state = state;
    this.startTime = performance.now();
    this.render();
  }

  render() {
    if (!this.container) return;
    this.container.innerHTML = this.getSVGContent();
  }

  getSVGContent() {
    const mId = this.mentorId;
    const st = this.state;

    // Render character based on mentor archetype
    switch (mId) {
      case 'subhash-pillai':
        return this.renderSubhashPillai(st);
      case 'guru-kunjumon':
        return this.renderGuruKunjumon(st);
      case 'colonel-vincent':
        return this.renderColonelVincent(st);
      case 'balan-menon':
        return this.renderBalanMenon(st);
      case 'sasi-master':
      default:
        return this.renderSasiMaster(st);
    }
  }

  // Master Sasi - Dance Master
  renderSasiMaster(state) {
    const isExcited = state === 'react_excellent' || state === 'react_good';
    const isSad = state === 'react_poor';
    const isPuzzled = state === 'react_average';
    const isDemo = state === 'demo';

    return `
      <div class="mentor-canvas-wrapper mentor-${state}">
        <svg viewBox="0 0 320 400" class="mentor-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="sasi-spotlight" cx="50%" cy="30%" r="70%">
              <stop offset="0%" stop-color="#F5C518" stop-opacity="0.3"/>
              <stop offset="100%" stop-color="#151515" stop-opacity="0"/>
            </radialGradient>
            <filter id="shadow">
              <feDropShadow dx="0" dy="8" stdDeviation="6" flood-color="#000" flood-opacity="0.6"/>
            </filter>
          </defs>

          <!-- Spotlight Aura -->
          <circle cx="160" cy="180" r="140" fill="url(#sasi-spotlight)"/>

          <!-- Group with CSS class for animation -->
          <g class="mentor-body-group ${isDemo ? 'anim-dance-demo' : ''} ${isExcited ? 'anim-celebrate' : ''} ${isSad ? 'anim-disappointed' : ''}">
            <!-- Ground Shadow -->
            <ellipse cx="160" cy="380" rx="90" ry="14" fill="#000" opacity="0.4"/>

            <!-- Legs & Dance Pants -->
            <path d="M125 270 L115 365 L135 368 L145 270 Z" fill="#1b1b1b"/>
            <path d="M175 270 L185 365 L165 368 L155 270 Z" fill="#1b1b1b"/>
            <!-- Shoes with Yellow stripes -->
            <path d="M100 365 Q115 360 138 368 L138 375 L100 375 Z" fill="#F5C518"/>
            <path d="M182 365 Q205 360 220 375 L182 375 Z" fill="#F5C518"/>

            <!-- Torso: Retro Yellow Pattern Shirt -->
            <path d="M110 160 Q160 150 210 160 L195 280 Q160 290 125 280 Z" fill="#F5C518" filter="url(#shadow)"/>
            <!-- Shirt buttons & collar -->
            <path d="M150 160 L160 185 L170 160" fill="#3A2A16"/>
            <circle cx="160" cy="205" r="3" fill="#151515"/>
            <circle cx="160" cy="235" r="3" fill="#151515"/>
            <circle cx="160" cy="265" r="3" fill="#151515"/>

            <!-- Towel on Shoulder (Classic Choreographer Style) -->
            <path d="M115 155 Q130 145 140 165 L130 240 Q120 245 110 235 Z" fill="#D92D20"/>

            <!-- Arms -->
            ${isSad ? `
              <!-- Hands on hips / face palm -->
              <path d="M115 165 Q85 200 135 210" stroke="#FFE58A" stroke-width="14" fill="none" stroke-linecap="round"/>
              <path d="M205 165 Q235 200 185 210" stroke="#FFE58A" stroke-width="14" fill="none" stroke-linecap="round"/>
            ` : isExcited ? `
              <!-- High Hands Celebration -->
              <path d="M115 165 Q70 110 85 75" stroke="#FFE58A" stroke-width="14" fill="none" stroke-linecap="round"/>
              <path d="M205 165 Q250 110 235 75" stroke="#FFE58A" stroke-width="14" fill="none" stroke-linecap="round"/>
              <circle cx="85" cy="70" r="10" fill="#FFE58A"/>
              <circle cx="235" cy="70" r="10" fill="#FFE58A"/>
            ` : `
              <!-- Classic Dance Pose Arms -->
              <path d="M115 165 Q75 180 85 230" stroke="#FFE58A" stroke-width="14" fill="none" stroke-linecap="round"/>
              <path d="M205 165 Q245 170 230 130" stroke="#FFE58A" stroke-width="14" fill="none" stroke-linecap="round"/>
              <circle cx="85" cy="235" r="9" fill="#FFE58A"/>
              <circle cx="230" cy="125" r="9" fill="#FFE58A"/>
            `}

            <!-- Head & Face -->
            <circle cx="160" cy="115" r="42" fill="#E8B888"/>
            <!-- Choreographer curly hair -->
            <path d="M120 110 Q115 70 160 65 Q205 70 200 110 Q160 80 120 110 Z" fill="#151515"/>
            <!-- Characteristic Thick Moustache -->
            <path d="M140 132 Q160 142 180 132 Q160 152 140 132 Z" fill="#151515"/>

            <!-- Sunglasses (Golden aviators) -->
            <path d="M135 110 L155 110 L152 125 L138 125 Z" fill="#151515" stroke="#F5C518" stroke-width="2"/>
            <path d="M165 110 L185 110 L182 125 L168 125 Z" fill="#151515" stroke="#F5C518" stroke-width="2"/>
            <line x1="155" y1="114" x2="165" y2="114" stroke="#F5C518" stroke-width="2"/>

            <!-- Expression Mouth -->
            ${isSad ? `
              <!-- Disappointed open mouth -->
              <ellipse cx="160" cy="148" rx="8" ry="4" fill="#3A2A16"/>
            ` : isExcited ? `
              <!-- Huge wide grin / cheer -->
              <path d="M148 145 Q160 160 172 145 Z" fill="#D92D20"/>
              <rect x="152" y="145" width="16" height="4" fill="#FFF"/>
            ` : isPuzzled ? `
              <!-- Wry smirk / questioning -->
              <path d="M152 148 Q162 144 170 150" stroke="#3A2A16" stroke-width="3" fill="none"/>
            ` : `
              <!-- Confident teacher smile -->
              <path d="M150 146 Q160 154 170 146" stroke="#3A2A16" stroke-width="3" fill="none"/>
            `}
          </g>

          <!-- Floating Motion trails during demo / mass -->
          ${(isDemo || isExcited) ? `
            <g class="motion-trails" opacity="0.6">
              <path d="M70 210 Q90 190 120 220" stroke="#F5C518" stroke-width="2" fill="none" stroke-dasharray="4,4"/>
              <path d="M220 120 Q240 100 260 130" stroke="#F5C518" stroke-width="2" fill="none" stroke-dasharray="4,4"/>
            </g>
          ` : ''}
        </svg>
      </div>
    `;
  }

  // Subhash "Slow-Mo" Pillai
  renderSubhashPillai(state) {
    const isExcited = state === 'react_excellent' || state === 'react_good';
    const isSad = state === 'react_poor';

    return `
      <div class="mentor-canvas-wrapper mentor-${state}">
        <svg viewBox="0 0 320 400" class="mentor-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="subhash-spotlight" cx="50%" cy="30%" r="70%">
              <stop offset="0%" stop-color="#FFE58A" stop-opacity="0.3"/>
              <stop offset="100%" stop-color="#151515" stop-opacity="0"/>
            </radialGradient>
          </defs>
          <circle cx="160" cy="180" r="140" fill="url(#subhash-spotlight)"/>

          <g class="mentor-body-group anim-slowmo-walk ${isExcited ? 'anim-celebrate' : ''}">
            <ellipse cx="160" cy="380" rx="90" ry="12" fill="#000" opacity="0.4"/>

            <!-- Mundu folded at knee (Iconic Kerala Mass Hero) -->
            <path d="M115 240 L205 240 L195 340 L125 340 Z" fill="#FFF8E7" stroke="#3A2A16" stroke-width="1.5"/>
            <!-- Gold Kasavu Border on Mundu -->
            <rect x="125" y="330" width="70" height="8" fill="#F5C518"/>

            <!-- Legs -->
            <path d="M135 340 L135 372" stroke="#E8B888" stroke-width="14" stroke-linecap="round"/>
            <path d="M185 340 L185 372" stroke="#E8B888" stroke-width="14" stroke-linecap="round"/>
            <!-- Kolhapuri / Leather Slippers -->
            <rect x="125" y="370" width="22" height="6" fill="#3A2A16"/>
            <rect x="175" y="370" width="22" height="6" fill="#3A2A16"/>

            <!-- Black Silk Shirt -->
            <path d="M105 155 Q160 145 215 155 L205 250 L115 250 Z" fill="#1b1b1b"/>
            <!-- Gold Chain dangling -->
            <path d="M145 158 Q160 188 175 158" stroke="#F5C518" stroke-width="3" fill="none"/>

            <!-- Arms: One hand holding mundu edge, other swinging slow -->
            <path d="M110 160 Q80 200 120 240" stroke="#E8B888" stroke-width="14" fill="none" stroke-linecap="round"/>
            <path d="M210 160 Q240 210 205 245" stroke="#E8B888" stroke-width="14" fill="none" stroke-linecap="round"/>

            <!-- Head & Flowing Hair in Wind Machine -->
            <circle cx="160" cy="110" r="40" fill="#E8B888"/>
            <!-- Windblown 80s Malayalam Hero Hair -->
            <path d="M120 100 Q130 50 180 55 Q215 65 200 105 Q195 80 160 85 Z" fill="#151515"/>
            <!-- Aviator Sunglasses -->
            <path d="M136 106 L154 106 L151 122 L139 122 Z" fill="#000" stroke="#F5C518" stroke-width="2"/>
            <path d="M166 106 L184 106 L181 122 L169 122 Z" fill="#000" stroke="#F5C518" stroke-width="2"/>
            <line x1="154" y1="110" x2="166" y2="110" stroke="#F5C518" stroke-width="2"/>

            <!-- Hero Beard & Stubble -->
            <path d="M135 125 Q160 152 185 125 Q160 162 135 125 Z" fill="#222"/>

            <!-- Mouth -->
            <line x1="152" y1="140" x2="168" y2="140" stroke="#151515" stroke-width="2.5"/>
          </g>

          <!-- Wind Machine lines -->
          <g class="wind-lines" opacity="0.4">
            <line x1="20" y1="140" x2="100" y2="140" stroke="#FFE58A" stroke-width="2" stroke-dasharray="8,6"/>
            <line x1="10" y1="180" x2="90" y2="180" stroke="#FFE58A" stroke-width="2" stroke-dasharray="10,8"/>
          </g>
        </svg>
      </div>
    `;
  }

  // Guru Kunjumon - Hand Gesture Science
  renderGuruKunjumon(state) {
    return `
      <div class="mentor-canvas-wrapper mentor-${state}">
        <svg viewBox="0 0 320 400" class="mentor-svg" xmlns="http://www.w3.org/2000/svg">
          <circle cx="160" cy="180" r="140" fill="rgba(245, 197, 24, 0.15)"/>
          <g class="mentor-body-group anim-mudra">
            <ellipse cx="160" cy="380" rx="85" ry="12" fill="#000" opacity="0.4"/>
            <!-- Kurta & Shawl -->
            <path d="M110 160 L210 160 L200 350 L120 350 Z" fill="#FFF8E7" stroke="#3A2A16"/>
            <path d="M120 160 Q160 210 200 160 L185 300 L135 300 Z" fill="#FFE58A" opacity="0.7"/>

            <!-- Massive Forearm & Expressive Mudra Hand extended -->
            <path d="M195 180 Q250 180 230 130" stroke="#E8B888" stroke-width="16" fill="none" stroke-linecap="round"/>
            <!-- Pointing Warning Finger & Mudra -->
            <circle cx="230" cy="120" r="14" fill="#E8B888"/>
            <line x1="230" y1="120" x2="255" y2="85" stroke="#E8B888" stroke-width="8" stroke-linecap="round"/>
            <circle cx="255" cy="85" r="5" fill="#F5C518"/>

            <!-- Head & Intellectual Glasses -->
            <circle cx="160" cy="110" r="38" fill="#E8B888"/>
            <path d="M125 100 Q160 60 195 100 Z" fill="#444"/> <!-- Salt & pepper hair -->
            <!-- Round Wire Glasses -->
            <circle cx="148" cy="108" r="10" stroke="#3A2A16" stroke-width="2" fill="none"/>
            <circle cx="172" cy="108" r="10" stroke="#3A2A16" stroke-width="2" fill="none"/>
            <line x1="158" y1="108" x2="162" y2="108" stroke="#3A2A16" stroke-width="2"/>
            <!-- Contemplative Pointed Beard -->
            <path d="M152 135 L168 135 L160 160 Z" fill="#3A2A16"/>
          </g>
        </svg>
      </div>
    `;
  }

  // Colonel Vincent - Villain Stare
  renderColonelVincent(state) {
    return `
      <div class="mentor-canvas-wrapper mentor-${state}">
        <svg viewBox="0 0 320 400" class="mentor-svg" xmlns="http://www.w3.org/2000/svg">
          <circle cx="160" cy="180" r="140" fill="rgba(217, 45, 32, 0.25)"/>
          <g class="mentor-body-group anim-villain-stare">
            <ellipse cx="160" cy="380" rx="90" ry="12" fill="#000" opacity="0.4"/>
            <!-- Villain Safari Suit -->
            <path d="M100 150 L220 150 L210 360 L110 360 Z" fill="#2b1a1a" stroke="#D92D20" stroke-width="1.5"/>
            <!-- Gold lapel pins -->
            <circle cx="120" cy="165" r="4" fill="#F5C518"/>
            <circle cx="130" cy="165" r="4" fill="#F5C518"/>

            <!-- Arms crossed menacingly -->
            <path d="M105 160 Q160 215 215 160" stroke="#2b1a1a" stroke-width="22" fill="none" stroke-linecap="round"/>
            <rect x="140" y="195" width="40" height="20" fill="#E8B888" rx="4"/>

            <!-- Cold Scowling Face & Scar -->
            <circle cx="160" cy="105" r="42" fill="#D69B75"/>
            <path d="M120 90 Q160 55 200 90 Z" fill="#151515"/> <!-- Slicked black hair -->
            <!-- The Piercing Red-Glint Eyes -->
            <ellipse cx="145" cy="102" rx="7" ry="4" fill="#FFF"/>
            <circle cx="145" cy="102" r="3" fill="#D92D20"/>
            <ellipse cx="175" cy="102" rx="7" ry="4" fill="#FFF"/>
            <circle cx="175" cy="102" r="3" fill="#D92D20"/>

            <!-- Menacing Scar across left cheek -->
            <line x1="135" y1="92" x2="148" y2="122" stroke="#8B0000" stroke-width="2"/>
            <!-- Hard Clenched Jaw -->
            <path d="M145 130 Q160 126 175 130" stroke="#151515" stroke-width="3" fill="none"/>
          </g>
        </svg>
      </div>
    `;
  }

  // Balan "Climax" Menon - Dialogue Delivery
  renderBalanMenon(state) {
    return `
      <div class="mentor-canvas-wrapper mentor-${state}">
        <svg viewBox="0 0 320 400" class="mentor-svg" xmlns="http://www.w3.org/2000/svg">
          <circle cx="160" cy="180" r="140" fill="rgba(245, 197, 24, 0.2)"/>
          <g class="mentor-body-group anim-courtroom-shout">
            <ellipse cx="160" cy="380" rx="90" ry="12" fill="#000" opacity="0.4"/>
            <!-- Pristine White Jubba -->
            <path d="M105 155 L215 155 L200 360 L120 360 Z" fill="#FFF8E7" stroke="#3A2A16" stroke-width="1.5"/>

            <!-- Raised Hand of Theatrical Justice -->
            <path d="M210 160 Q260 130 240 70" stroke="#E8B888" stroke-width="14" fill="none" stroke-linecap="round"/>
            <circle cx="240" cy="65" r="12" fill="#E8B888"/> <!-- Clenched dramatic fist -->

            <!-- Head with Expressive Shouting Mouth -->
            <circle cx="160" cy="105" r="42" fill="#E8B888"/>
            <path d="M120 90 Q160 60 200 90 Z" fill="#333"/>
            <!-- Wide shouting mouth with teeth -->
            <ellipse cx="160" cy="132" rx="14" ry="10" fill="#151515"/>
            <rect x="150" y="125" width="20" height="4" fill="#FFF"/>
            <!-- Eyebrows of Utter Moral Agony -->
            <path d="M135 94 L152 90" stroke="#151515" stroke-width="3"/>
            <path d="M185 94 L168 90" stroke="#151515" stroke-width="3"/>
          </g>
        </svg>
      </div>
    `;
  }
}
