import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const PORT = 3089;

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'text/javascript; charset=UTF-8',
  '.mjs': 'text/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  const safePath = path.normalize(pathname).replace(/^(\.\.[/\\])+/, '');
  let filePath = path.join(rootDir, safePath);

  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    fs.readFile(filePath, (readErr, data) => {
      if (readErr) {
        if (!path.extname(pathname)) {
          fs.readFile(path.join(rootDir, 'index.html'), (fallbackErr, indexData) => {
            if (fallbackErr) {
              res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
              res.end('404: Not Found');
            } else {
              res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
              res.end(indexData);
            }
          });
          return;
        }

        res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
        res.end('404: Asset Not Found');
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache',
        'X-Content-Type-Options': 'nosniff'
      });
      res.end(data);
    });
  });
});

server.listen(PORT, '127.0.0.1', async () => {
  console.log(`Server listening on 127.0.0.1:${PORT}`);
  const outPath0 = '/home/nonsence/.gemini/antigravity/brain/732bf314-2278-4b39-90dc-9217596190b2/scratch/coverflow_stage.png';
  const outPath1 = '/home/nonsence/.gemini/antigravity/brain/732bf314-2278-4b39-90dc-9217596190b2/scratch/coverflow_course1.png';

  try {
    // 1. Capture course 0
    await execFileAsync('/usr/bin/chromium', [
      '--headless',
      '--disable-gpu',
      '--no-sandbox',
      '--window-size=1280,2400',
      '--virtual-time-budget=3000',
      `--screenshot=${outPath0}`,
      `http://127.0.0.1:${PORT}/#course=0`
    ]);
    console.log('✓ Course 0 screenshot captured:', outPath0);

    // 2. Capture course 1 (shows rotated 3D cards on both left and right!)
    await execFileAsync('/usr/bin/chromium', [
      '--headless',
      '--disable-gpu',
      '--no-sandbox',
      '--window-size=1280,2400',
      '--virtual-time-budget=3000',
      `--screenshot=${outPath1}`,
      `http://127.0.0.1:${PORT}/#course=1`
    ]);
    console.log('✓ Course 1 screenshot captured:', outPath1);
  } catch (err) {
    console.error('Chromium capture error:', err);
  } finally {
    server.close();
  }
});
