// Cinema Kalalayam™ - Official Certificate of Unnecessary Cinematic Qualification
// High-resolution Canvas generator with gold filigree border, seal, and export capabilities

export class CertificateGenerator {
  static generateCertificate(canvas, { studentName, courseTitle, massScore, mentorName, mentorMalayalam }) {
    const ctx = canvas.getContext('2d');
    const w = 1200;
    const h = 840;

    canvas.width = w;
    canvas.height = h;

    // Background: Warm Off-White / Parchment #FFF8E7 with subtle gradient
    const bgGrad = ctx.createLinearGradient(0, 0, w, h);
    bgGrad.addColorStop(0, '#FFFDF6');
    bgGrad.addColorStop(0.5, '#FFF8E7');
    bgGrad.addColorStop(1, '#F7EDD2');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Subtle paper grain/vignette
    ctx.strokeStyle = '#3A2A16';
    ctx.lineWidth = 1;

    // 1. Outer Dark Brown & Gold Decorative Double Border
    ctx.strokeStyle = '#3A2A16';
    ctx.lineWidth = 12;
    ctx.strokeRect(30, 30, w - 60, h - 60);

    ctx.strokeStyle = '#F5C518';
    ctx.lineWidth = 4;
    ctx.strokeRect(46, 46, w - 92, h - 92);

    ctx.strokeStyle = '#3A2A16';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(54, 54, w - 108, h - 108);

    // Corner Vintage Filigree Accents
    this.drawCornerAccents(ctx, 46, 46);
    this.drawCornerAccents(ctx, w - 46, 46, true, false);
    this.drawCornerAccents(ctx, 46, h - 46, false, true);
    this.drawCornerAccents(ctx, w - 46, h - 46, true, true);

    // 2. Institution Header
    ctx.textAlign = 'center';

    // Clapperboard & Film Emblem icon
    ctx.fillStyle = '#151515';
    ctx.font = '28px serif';
    ctx.fillText('🎬 ★ 🎥', w / 2, 105);

    ctx.fillStyle = '#151515';
    ctx.font = 'bold 36px "Bebas Neue", "Oswald", sans-serif';
    ctx.letterSpacing = '4px';
    ctx.fillText('CINEMA KALALAYAM™', w / 2, 145);

    ctx.fillStyle = '#D92D20';
    ctx.font = 'bold 15px "Inter", sans-serif';
    ctx.letterSpacing = '2px';
    ctx.fillText('CENTRAL BOARD OF UNNECESSARY CINEMATIC EXCELLENCE', w / 2, 172);

    ctx.fillStyle = '#3A2A16';
    ctx.font = '14px "Noto Sans Malayalam", sans-serif';
    ctx.letterSpacing = '1px';
    ctx.fillText('സിനിമാറ്റിക് കഴിവുകളുടെ ഔദ്യോഗിക സ്ഥാപനം • REG. NO. CK/KL/1982/MASS', w / 2, 195);

    // Gold divider
    ctx.strokeStyle = '#F5C518';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(w / 2 - 250, 215);
    ctx.lineTo(w / 2 + 250, 215);
    ctx.stroke();

    // 3. Certificate Title
    ctx.fillStyle = '#3A2A16';
    ctx.font = 'italic 20px "Times New Roman", serif';
    ctx.fillText('This is to certify that', w / 2, 260);

    // Candidate Name
    ctx.fillStyle = '#151515';
    ctx.font = 'bold 44px "Bebas Neue", "Oswald", sans-serif';
    const cleanName = (studentName || 'PROSPECTIVE CINEMA STAR').toUpperCase();
    ctx.fillText(cleanName, w / 2, 315);

    // Underline for name
    ctx.strokeStyle = '#3A2A16';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(w / 2 - 220, 328);
    ctx.lineTo(w / 2 + 220, 328);
    ctx.stroke();

    // Body Text
    ctx.fillStyle = '#3A2A16';
    ctx.font = '17px "Inter", sans-serif';
    ctx.fillText('has successfully undergone rigorous and scientifically groundless training in', w / 2, 370);

    // Course Title Box
    ctx.fillStyle = '#151515';
    ctx.fillRect(w / 2 - 280, 395, 560, 48);
    ctx.fillStyle = '#F5C518';
    ctx.font = 'bold 24px "Bebas Neue", "Oswald", sans-serif';
    ctx.fillText((courseTitle || 'HERO ENTRY 101').toUpperCase(), w / 2, 428);

    ctx.fillStyle = '#3A2A16';
    ctx.font = '16px "Inter", sans-serif';
    ctx.fillText('and is hereby conferred the official, legally non-binding distinction of', w / 2, 480);

    ctx.fillStyle = '#D92D20';
    ctx.font = 'bold 22px "Bebas Neue", "Inter", sans-serif';
    ctx.fillText('“OFFICIALLY & UNNECESSARILY QUALIFIED”', w / 2, 512);

    // Tagline in Malayalam
    ctx.fillStyle = '#3A2A16';
    ctx.font = 'italic 15px "Noto Sans Malayalam", sans-serif';
    ctx.fillText('“Skill padikkam. Cinema aakkam.” (സ്കിൽ പഠിക്കാം. സിനിമ ആക്കാം.)', w / 2, 542);

    // 4. Score Medal & Gold Seal
    this.drawOfficialSeal(ctx, 220, 670, massScore);

    // 5. Signatures
    this.drawSignature(ctx, w - 260, 660, mentorName, mentorMalayalam);

    // 6. Serial Number & Barcode simulation
    ctx.textAlign = 'center';
    ctx.fillStyle = '#777';
    ctx.font = '11px monospace';
    const serial = `VERIFIED_ID: CK-${Math.floor(100000 + Math.random() * 900000)}-MASS-${massScore}%`;
    ctx.fillText(serial, w / 2, 775);

    return canvas.toDataURL('image/png');
  }

  static drawCornerAccents(ctx, x, y, flipX = false, flipY = false) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(flipX ? -1 : 1, flipY ? -1 : 1);
    ctx.strokeStyle = '#F5C518';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(8, 25);
    ctx.lineTo(8, 8);
    ctx.lineTo(25, 8);
    ctx.stroke();
    ctx.restore();
  }

  static drawOfficialSeal(ctx, cx, cy, score) {
    ctx.save();
    // Golden Starburst Seal
    ctx.fillStyle = '#F5C518';
    ctx.beginPath();
    const points = 24;
    for (let i = 0; i < points; i++) {
      const angle = (i * Math.PI * 2) / points;
      const r = i % 2 === 0 ? 58 : 50;
      const px = cx + Math.cos(angle) * r;
      const py = cy + Math.sin(angle) * r;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = '#3A2A16';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Inner circle
    ctx.fillStyle = '#151515';
    ctx.beginPath();
    ctx.arc(cx, cy, 42, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#F5C518';
    ctx.font = 'bold 22px "Bebas Neue", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${score}%`, cx, cy + 3);

    ctx.fillStyle = '#FFF8E7';
    ctx.font = 'bold 9px "Inter", sans-serif';
    ctx.fillText('MASS INDEX', cx, cy + 16);
    ctx.fillText('SEAL OF MASS', cx, cy - 14);

    ctx.restore();
  }

  static drawSignature(ctx, x, y, mentorName, mentorMalayalam) {
    ctx.save();
    ctx.textAlign = 'center';

    // Cursive stamp-like signature line
    ctx.strokeStyle = '#1a365d';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x - 90, y - 10);
    ctx.bezierCurveTo(x - 60, y - 35, x - 30, y + 10, x, y - 20);
    ctx.bezierCurveTo(x + 30, y - 40, x + 60, y + 5, x + 90, y - 15);
    ctx.stroke();

    // Stamp circle
    ctx.strokeStyle = 'rgba(217, 45, 32, 0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x + 20, y - 22, 28, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = 'rgba(217, 45, 32, 0.6)';
    ctx.font = 'bold 8px sans-serif';
    ctx.fillText('APPROVED', x + 20, y - 20);

    // Line and Name
    ctx.strokeStyle = '#3A2A16';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x - 110, y + 10);
    ctx.lineTo(x + 110, y + 10);
    ctx.stroke();

    ctx.fillStyle = '#151515';
    ctx.font = 'bold 15px "Inter", sans-serif';
    ctx.fillText(mentorName || 'Master Sasi', x, y + 30);

    ctx.fillStyle = '#3A2A16';
    ctx.font = '12px "Noto Sans Malayalam", sans-serif';
    ctx.fillText(mentorMalayalam || 'മുഖ്യ പരിശീലകൻ', x, y + 46);

    ctx.font = '10px "Inter", sans-serif';
    ctx.fillStyle = '#777';
    ctx.fillText('Dean of Cinematic Movement', x, y + 60);

    ctx.restore();
  }

  static downloadCertificate(canvas, filename = 'cinema-kalalayam-certificate.png') {
    const dataUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
