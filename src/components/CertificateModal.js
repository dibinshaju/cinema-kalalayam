// Cinema Kalalayam™ - Certificate Modal Component
// Displays official Diploma with Canvas live rendering, name customization, and PNG download

import { CertificateGenerator } from '../certificate/certificateGenerator.js';
import { COURSES } from '../data/courseData.js';
import { MENTORS } from '../data/mentorData.js';
import { submitScoreToLeaderboard } from '../data/leaderboardData.js';
import { sounds } from '../audio/soundEffects.js';

export function renderCertificateModal(container, scoreData, mentorId, courseId, onClose, onRefreshLeaderboard) {
  const course = COURSES.find(c => c.id === courseId) || COURSES[0];
  const mentor = MENTORS.find(m => m.id === mentorId) || MENTORS[0];

  container.innerHTML = `
    <div class="cert-modal-overlay active" id="cert-overlay">
      <div class="cert-modal-card">
        <div class="cert-modal-header">
          <div>
            <h3 style="color: var(--cinema-yellow); font-size: 1.6rem; line-height: 1;">
              📜 OFFICIAL CERTIFICATION STUDIO
            </h3>
            <span style="font-size: 0.78rem; color: var(--text-muted);">
              CENTRAL BOARD OF UNNECESSARY CINEMATIC EXCELLENCE
            </span>
          </div>
          <button id="cert-close-btn" class="icon-btn" style="font-size: 1.2rem; padding: 4px 10px;">✕</button>
        </div>

        <div style="background: #111; padding: 12px 24px; display: flex; align-items: center; gap: 16px; border-bottom: 1px solid var(--charcoal-border);">
          <label style="font-size: 0.85rem; font-weight: 700; color: var(--warm-white);">STUDENT NAME ON CERTIFICATE:</label>
          <input type="text" id="cert-student-name" value="AKHIL R." maxlength="30" 
            style="background: #222; border: 1px solid var(--cinema-yellow); color: var(--cinema-yellow); padding: 6px 12px; border-radius: 4px; font-weight: 700; font-size: 1rem; width: 240px;" />
          <button id="cert-update-name-btn" class="btn btn-secondary btn-sm" style="padding: 6px 12px; font-size: 0.85rem;">
            UPDATE DIPLOMA
          </button>
        </div>

        <div class="cert-canvas-container">
          <canvas id="cert-canvas"></canvas>
        </div>

        <div class="cert-modal-footer">
          <div style="font-size: 0.82rem; color: var(--soft-yellow);">
            ⭐ Legally non-binding. Valid only in imaginary 35mm theatres across Kerala.
          </div>

          <div style="display: flex; gap: 10px;">
            <button id="cert-leaderboard-btn" class="btn btn-secondary btn-sm">
              🏆 SUBMIT TO MASS RANKING
            </button>
            <button id="cert-download-btn" class="btn btn-primary btn-sm">
              📥 DOWNLOAD HIGH-RES PNG
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  const canvas = container.querySelector('#cert-canvas');
  const nameInput = container.querySelector('#cert-student-name');

  const updateCertificate = () => {
    CertificateGenerator.generateCertificate(canvas, {
      studentName: nameInput.value.trim() || 'PROSPECTIVE CINEMA STAR',
      courseTitle: course.title,
      massScore: scoreData.mass || 94,
      mentorName: mentor.name,
      mentorMalayalam: mentor.malayalamName
    });
  };

  // Initial draw
  updateCertificate();

  // Update on name change
  container.querySelector('#cert-update-name-btn').addEventListener('click', () => {
    sounds.playClick();
    updateCertificate();
  });

  nameInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      sounds.playClick();
      updateCertificate();
    }
  });

  // Download
  container.querySelector('#cert-download-btn').addEventListener('click', () => {
    sounds.playLevelUp();
    const filename = `cinema-kalalayam-${course.id}-${nameInput.value.trim().toLowerCase().replace(/\s+/g, '-')}.png`;
    CertificateGenerator.downloadCertificate(canvas, filename);
  });

  // Submit to Leaderboard
  container.querySelector('#cert-leaderboard-btn').addEventListener('click', (e) => {
    sounds.playMassHorn();
    const student = nameInput.value.trim() || 'ANONYMOUS STAR';
    submitScoreToLeaderboard(student, scoreData.mass, 'all-round');
    e.target.textContent = '✅ SUBMITTED TO RANKING!';
    e.target.disabled = true;
    if (onRefreshLeaderboard) onRefreshLeaderboard();
  });

  // Close
  container.querySelector('#cert-close-btn').addEventListener('click', () => {
    sounds.playClick();
    onClose();
  });
}
