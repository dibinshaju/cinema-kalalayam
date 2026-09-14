// Cinema Kalalayam™ - Main Application Router & Controller
// "Skill padikkam. Cinema aakkam."

import { renderNavbar } from './components/Navbar.js';
import { renderHeroSection } from './components/HeroSection.js';
import { renderCoursesView } from './components/CoursesView.js';
import { renderMentorsView } from './components/MentorsView.js';
import { renderLeaderboardView } from './components/LeaderboardView.js';
import { renderAboutView } from './components/AboutView.js';
import { renderCourseCatalog } from './components/CourseCatalog.js';
import { renderTrainingStudio } from './components/TrainingStudio.js';
import { renderResultModal } from './components/ResultModal.js';
import { renderCertificateModal } from './components/CertificateModal.js';
import { sounds } from './audio/soundEffects.js';

class CinemaApp {
  constructor() {
    this.state = {
      currentView: 'home', // 'home' | 'courses' | 'mentors' | 'leaderboard' | 'about' | 'training'
      currentCourseId: 'hero-walk-101',
      lastScoreData: null,
      lastMentorId: 'sasi-master',
      bgmEnabled: false
    };

    this.navMount = document.getElementById('nav-mount');
    this.mainMount = document.getElementById('main-mount');
    this.modalMount = document.getElementById('modal-mount');
    this.toastContainer = document.getElementById('toast-container');
    this.mobileNavMount = document.getElementById('mobile-nav-mount');

    this.init();
  }

  init() {
    this.bindRouting();
    this.handleCurrentRoute();
  }

  bindRouting() {
    // Keyboard shortcuts
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.closeModal();
    });

    // Browser navigation (Back / Forward)
    window.addEventListener('popstate', () => {
      this.handleCurrentRoute();
    });

    // Global interception for internal route links
    document.addEventListener('click', (e) => {
      const anchor = e.target.closest('a');
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && href.startsWith('/') && !href.startsWith('//') && !anchor.getAttribute('target') && !anchor.getAttribute('download')) {
          e.preventDefault();
          this.navigateTo(href);
        }
      }
    });
  }

  parseRoute() {
    let pathname = window.location.pathname.toLowerCase().trim();

    // Hash fallback migration if someone enters with #courses or #/training/dance
    if ((pathname === '/' || pathname === '') && window.location.hash) {
      const hash = window.location.hash.replace(/^#\/?/, '').trim();
      if (hash) {
        pathname = '/' + hash;
      }
    }

    // Strip trailing slashes (except root '/')
    pathname = pathname.replace(/\/+$/, '') || '/';

    if (pathname === '/' || pathname === '/home') {
      return { view: 'home', courseId: this.state.currentCourseId, path: '/' };
    }
    if (pathname === '/courses') {
      return { view: 'courses', courseId: this.state.currentCourseId, path: '/courses' };
    }
    if (pathname === '/mentors') {
      return { view: 'mentors', courseId: this.state.currentCourseId, path: '/mentors' };
    }
    if (pathname === '/leaderboard') {
      return { view: 'leaderboard', courseId: this.state.currentCourseId, path: '/leaderboard' };
    }
    if (pathname === '/about') {
      return { view: 'about', courseId: this.state.currentCourseId, path: '/about' };
    }
    if (pathname.startsWith('/training')) {
      const sub = pathname.replace(/^\/training\/?/, '').trim();
      let courseId = 'hero-walk-101';
      if (sub === 'dance' || sub === 'cinematic-dance') {
        courseId = 'cinematic-dance';
      } else if (sub === 'gesture' || sub === 'gestures' || sub === 'hand-gesture-science') {
        courseId = 'hand-gesture-science';
      } else if (sub === 'dialogue' || sub === 'dialogue-delivery') {
        courseId = 'dialogue-delivery';
      } else if (sub) {
        courseId = sub;
      }
      return { view: 'training', courseId, path: pathname };
    }

    // Default fallback
    return { view: 'home', courseId: this.state.currentCourseId, path: '/' };
  }

  navigateTo(target, params = {}) {
    let targetPath = '/';

    if (typeof target === 'string') {
      if (target.startsWith('/')) {
        targetPath = target;
      } else if (target === 'home') {
        targetPath = '/';
      } else if (target === 'courses') {
        targetPath = '/courses';
      } else if (target === 'mentors') {
        targetPath = '/mentors';
      } else if (target === 'leaderboard') {
        targetPath = '/leaderboard';
      } else if (target === 'about') {
        targetPath = '/about';
      } else if (target === 'training') {
        const courseId = (params && params.courseId) || this.state.currentCourseId || 'hero-walk-101';
        if (courseId === 'cinematic-dance') targetPath = '/training/dance';
        else if (courseId === 'hand-gesture-science') targetPath = '/training/gesture';
        else if (courseId === 'dialogue-delivery') targetPath = '/training/dialogue';
        else targetPath = `/training/${courseId}`;
      } else {
        targetPath = `/${target}`;
      }
    }

    if (params && params.courseId) {
      this.state.currentCourseId = params.courseId;
    }

    if (window.location.pathname !== targetPath) {
      window.history.pushState(null, '', targetPath);
    }

    this.handleCurrentRoute();
  }

  navigateToTrainingCourse(courseId) {
    if (courseId === 'cinematic-dance') {
      this.navigateTo('/training/dance', { courseId });
    } else if (courseId === 'hand-gesture-science') {
      this.navigateTo('/training/gesture', { courseId });
    } else if (courseId === 'dialogue-delivery') {
      this.navigateTo('/training/dialogue', { courseId });
    } else {
      this.navigateTo(`/training/${courseId}`, { courseId });
    }
  }

  handleCurrentRoute() {
    const route = this.parseRoute();
    this.state.currentView = route.view;
    if (route.courseId) {
      this.state.currentCourseId = route.courseId;
    }

    this.updateDocumentTitle(route);
    this.renderNavigation();
    this.renderMobileNav();
    this.closeModal();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Render Target View
    switch (route.view) {
      case 'courses':
        renderCoursesView(this.mainMount, (courseId) => {
          this.state.currentCourseId = courseId;
          this.navigateToTrainingCourse(courseId);
        });
        break;

      case 'mentors':
        renderMentorsView(this.mainMount, (courseId) => {
          this.state.currentCourseId = courseId;
          this.navigateToTrainingCourse(courseId);
        });
        break;

      case 'leaderboard':
        renderLeaderboardView(this.mainMount);
        break;

      case 'about':
        renderAboutView(this.mainMount);
        break;

      case 'training':
        this.renderTrainingStudioView(this.state.currentCourseId);
        break;

      case 'home':
      default:
        this.renderHomepageView();
        break;
    }
  }

  updateDocumentTitle(route) {
    const base = 'CINEMA KALALAYAM™';
    switch (route.view) {
      case 'courses':
        document.title = `Courses — ${base}`;
        break;
      case 'mentors':
        document.title = `Faculty Mentors — ${base}`;
        break;
      case 'leaderboard':
        document.title = `Mass Rankings Leaderboard — ${base}`;
        break;
      case 'about':
        document.title = `Why Does This Exist? — ${base}`;
        break;
      case 'training':
        document.title = `Studio: ${route.courseId} — ${base}`;
        break;
      case 'home':
      default:
        document.title = `${base} — Skill padikkam. Cinema aakkam.`;
        break;
    }
  }

  renderNavigation() {
    renderNavbar(
      this.navMount,
      this.state,
      (target) => this.navigateTo(target),
      () => this.toggleBgm()
    );
  }

  renderMobileNav() {
    if (!this.mobileNavMount) return;
    const v = this.state.currentView;
    this.mobileNavMount.innerHTML = `
      <div class="mobile-nav-bar">
        <a href="/" class="mobile-nav-item ${v === 'home' ? 'active' : ''}" data-target="/">
          <span>🏠</span>
          <span>HOME</span>
        </a>
        <a href="/courses" class="mobile-nav-item ${v === 'courses' ? 'active' : ''}" data-target="/courses">
          <span>🎓</span>
          <span>COURSES</span>
        </a>
        <a href="/mentors" class="mobile-nav-item ${v === 'mentors' ? 'active' : ''}" data-target="/mentors">
          <span>👨‍🏫</span>
          <span>MENTORS</span>
        </a>
        <a href="/leaderboard" class="mobile-nav-item ${v === 'leaderboard' ? 'active' : ''}" data-target="/leaderboard">
          <span>🏆</span>
          <span>LEADERBOARD</span>
        </a>
        <a href="/training" class="mobile-nav-item ${v === 'training' ? 'active' : ''}" data-target="/training">
          <span>🎬</span>
          <span>TRAIN</span>
        </a>
      </div>
    `;

    this.mobileNavMount.querySelectorAll('[data-target]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const target = el.getAttribute('data-target');
        this.navigateTo(target);
      });
    });
  }

  renderHomepageView() {
    this.mainMount.innerHTML = `
      <div id="mockup-hero-slot"></div>
      <div id="home-courses-preview-slot"></div>
      <footer class="cinema-global-footer">
        <div class="film-strip-header" style="margin-bottom: 24px;"></div>
        <div class="container" style="text-align: center; padding: 20px 24px 44px;">
          <div style="font-family: var(--font-display); font-size: 1.6rem; letter-spacing: 2px; color: var(--cinema-yellow); margin-bottom: 6px;">
            CINEMA KALALAYAM™
          </div>
          <div class="font-malayalam" style="font-size: 0.95rem; color: #FFE58A; margin-bottom: 10px;">
            “സ്കിൽ പഠിക്കാം. സിനിമ ആക്കാം.”
          </div>
          <div style="font-family: var(--font-body); font-size: 0.8rem; color: #777; letter-spacing: 1px;">
            CENTRAL BOARD OF UNNECESSARY CINEMATIC EXCELLENCE • EST. 1982 • ALL RIGHTS FICTIONAL
          </div>
        </div>
      </footer>
    `;

    // 1. Recreated Mockup Hero Stage (The complete visual interface from the uploaded reference)
    renderHeroSection(
      document.getElementById('mockup-hero-slot'),
      (courseId) => {
        this.navigateToTrainingCourse(courseId || 'hero-walk-101');
      },
      (targetView) => {
        if (targetView === 'training') {
          this.navigateToTrainingCourse('hero-walk-101');
        } else {
          this.navigateTo(targetView || '/courses');
        }
      }
    );

    // 2. Course Preview - Panoramic Side-Scrolling Container Carousel
    renderCourseCatalog(
      document.getElementById('home-courses-preview-slot'),
      (courseId) => {
        this.navigateToTrainingCourse(courseId);
      }
    );
  }

  renderTrainingStudioView(courseId) {
    this.mainMount.innerHTML = `<div id="training-studio-slot"></div>`;
    renderTrainingStudio(
      document.getElementById('training-studio-slot'),
      courseId,
      () => this.navigateTo('/courses'),
      (scoreData, mentorId, cId) => this.handlePerformanceJudged(scoreData, mentorId, cId)
    );
  }

  handlePerformanceJudged(scoreData, mentorId, courseId) {
    this.state.lastScoreData = scoreData;
    this.state.lastMentorId = mentorId;
    this.state.currentCourseId = courseId;

    renderResultModal(
      this.modalMount,
      scoreData,
      mentorId,
      courseId,
      // Retake
      () => {
        this.closeModal();
        this.renderTrainingStudioView(courseId);
        this.showToast('RETAKE ENGAGED: Director demands cinematic perfection.');
      },
      // Claim Certificate
      () => {
        this.closeModal();
        renderCertificateModal(
          this.modalMount,
          scoreData,
          mentorId,
          courseId,
          () => this.closeModal(),
          () => this.showToast('🏆 Score submitted to Mass Rankings!')
        );
      },
      // Next Course
      () => {
        this.closeModal();
        this.navigateTo('/courses');
      }
    );
  }

  closeModal() {
    this.modalMount.innerHTML = '';
  }

  toggleBgm() {
    sounds.init();
    const isPlaying = sounds.toggleBgm();
    this.state.bgmEnabled = isPlaying;

    const label = document.getElementById('nav-sound-text');
    const icon = document.getElementById('nav-sound-icon');
    if (label) label.textContent = isPlaying ? 'BGM: ON' : 'BGM: OFF';
    if (icon) icon.textContent = isPlaying ? '🔊' : '🎵';

    this.showToast(isPlaying ? '🎵 Retro Cinema BGM activated' : '🔇 BGM paused');
  }

  showToast(message) {
    if (!this.toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <span style="font-size: 1.2rem;">🎬</span>
      <span style="font-size: 0.9rem; font-weight: 600;">${message}</span>
    `;
    this.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.4s ease-out';
      setTimeout(() => toast.remove(), 400);
    }, 3200);
  }
}

// Bootstrap application on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.cinemaApp = new CinemaApp();
});
