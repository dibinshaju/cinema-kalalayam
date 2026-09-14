// Cinema Kalalayam™ - Top Navigation Bar Component
// Visually recreates the exact mockup navbar (#151515, film reel logo, yellow pill buttons)

export function renderNavbar(container, state, onNavigate, onToggleSound) {
  const current = state.currentView;

  container.innerHTML = `
    <nav class="mockup-navbar">
      <div class="mockup-nav-inner">
        <!-- Left: Film Reel Logo + CINEMA KALALAYAM -->
        <a href="/" class="nav-brand-group" data-target="/">
          <div class="nav-film-reel-icon">
            <svg viewBox="0 0 40 40" width="34" height="34" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="17" stroke="#F5C518" stroke-width="3" fill="#151515"/>
              <circle cx="20" cy="20" r="5" fill="#F5C518"/>
              <circle cx="20" cy="10" r="3.5" fill="#F5C518"/>
              <circle cx="20" cy="30" r="3.5" fill="#F5C518"/>
              <circle cx="10" cy="20" r="3.5" fill="#F5C518"/>
              <circle cx="30" cy="20" r="3.5" fill="#F5C518"/>
            </svg>
          </div>
          <div class="nav-brand-text">
            <div class="brand-line-1">CINEMA</div>
            <div class="brand-line-2">KALALAYAM</div>
          </div>
        </a>

        <!-- Center: Nav Items -->
        <ul class="nav-center-menu">
          <li>
            <a href="/" class="nav-menu-item ${current === 'home' || current === '/' ? 'active' : ''}" data-target="/">
              Home
            </a>
          </li>
          <li>
            <a href="/courses" class="nav-menu-item ${current === 'courses' || current === '/courses' ? 'active' : ''}" data-target="/courses">
              Courses
            </a>
          </li>
          <li>
            <a href="/mentors" class="nav-menu-item ${current === 'mentors' || current === '/mentors' ? 'active' : ''}" data-target="/mentors">
              Mentors
            </a>
          </li>
          <li>
            <a href="/leaderboard" class="nav-menu-item ${current === 'leaderboard' || current === '/leaderboard' ? 'active' : ''}" data-target="/leaderboard">
              Leaderboard
            </a>
          </li>
          <li>
            <a href="/about" class="nav-menu-item ${current === 'about' || current === '/about' ? 'active' : ''}" data-target="/about">
              About
            </a>
          </li>
        </ul>

        <!-- Right: Audio BGM, Start Training Button & Profile Icon -->
        <div class="nav-right-cluster">
          <button id="nav-sound-btn" class="nav-sound-toggle-btn" title="Toggle Cinematic Synthesizer BGM">
            <span id="nav-sound-icon">${state.bgmEnabled ? '🔊' : '🎵'}</span>
            <span id="nav-sound-text" class="sound-text-label">${state.bgmEnabled ? 'BGM: ON' : 'BGM: OFF'}</span>
          </button>

          <button id="nav-start-btn" class="nav-cta-pill-btn" data-target="/training">
            Start Training →
          </button>

          <button class="nav-profile-circle-btn" title="Student Profile & Certificates" id="nav-profile-btn" data-target="/about">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#F5C518" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  `;

  // Bind navigation links
  container.querySelectorAll('[data-target]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const target = el.getAttribute('data-target');
      onNavigate(target);
    });
  });

  // Sound toggle button
  const soundBtn = container.querySelector('#nav-sound-btn');
  soundBtn.addEventListener('click', () => {
    onToggleSound();
  });

  // Profile icon button -> opens certificates/profile
  const profileBtn = container.querySelector('#nav-profile-btn');
  profileBtn.addEventListener('click', () => {
    onNavigate('/about');
  });
}
