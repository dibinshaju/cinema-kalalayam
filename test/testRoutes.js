import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const PORT = 3007;

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
  console.log(`🎬 Server route test listening on port ${PORT}...`);

  const routes = [
    '/',
    '/courses',
    '/mentors',
    '/leaderboard',
    '/about',
    '/training',
    '/training/dance',
    '/training/gesture',
    '/training/dialogue',
    '/training/hero-walk-101',
    '/src/app.js',
    '/src/styles/main.css',
    '/assets/characters/character_row.png',
    '/assets/characters/hero_center_ensemble.png'
  ];

  try {
    for (const r of routes) {
      const res = await new Promise((resolve, reject) => {
        http.get(`http://127.0.0.1:${PORT}${r}`, (res) => {
          let data = '';
          res.on('data', chunk => { data += chunk; });
          res.on('end', () => {
            resolve({ status: res.statusCode, headers: res.headers, len: data.length });
          });
        }).on('error', reject);
      });
      console.log(`✓ Route ${r.padEnd(35)} -> HTTP ${res.status} (${res.headers['content-type']})`);
      assert.strictEqual(res.status, 200, `Route ${r} returned HTTP ${res.status}`);
    }

    console.log('\n🎉 ALL 13 APPLICATION ROUTES & ASSETS VERIFIED SUCCESSFULLY!');
  } finally {
    server.close();
  }
});
