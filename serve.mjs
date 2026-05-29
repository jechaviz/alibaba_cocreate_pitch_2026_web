import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const root = process.cwd();
const port = Number(process.env.PORT || 8787);
const host = '127.0.0.1';
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.vue': 'text/plain; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8'
};

function resolvePath(url) {
  const pathname = decodeURIComponent(new URL(url, `http://${host}:${port}`).pathname);
  const relative = pathname === '/' ? 'index.html' : pathname.slice(1);
  const file = normalize(join(root, relative));
  if (!file.startsWith(root)) return null;
  return file;
}

createServer(async (request, response) => {
  const file = resolvePath(request.url || '/');
  if (!file) {
    response.writeHead(403);
    response.end('Forbidden');
    return;
  }
  try {
    const body = await readFile(file);
    response.writeHead(200, {
      'Content-Type': types[extname(file)] || 'application/octet-stream',
      'Cache-Control': 'no-store'
    });
    response.end(body);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Not found');
  }
}).listen(port, host, () => {
  console.log(`Serving http://${host}:${port}/`);
});
