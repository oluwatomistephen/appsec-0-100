// Local preview server with no dependencies: `node scripts/serve.mjs [port]`.
// ES modules don't load from file://, so the site needs a server to preview.
// Serves only files inside the project folder and only known file types.

import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { resolve, sep, extname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const port = Number(process.argv[2]) || 8080;
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
};

createServer(async (req, res) => {
  try {
    const path = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
    const file = resolve(root, "." + (path.endsWith("/") ? path + "index.html" : path));
    const type = types[extname(file)];
    if (!file.startsWith(root + sep) || !type || file.includes(`${sep}.`)) throw new Error("not allowed");
    const body = await readFile(file);
    res.writeHead(200, { "Content-Type": type, "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" });
    res.end(body);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
  }
}).listen(port, "127.0.0.1", () => console.log(`Serving ${root} at http://localhost:${port}`));
