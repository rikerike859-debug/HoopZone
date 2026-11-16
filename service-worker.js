// ---------- service-worker.js ----------
// This file lets Hoop Zone work OFFLINE and be installed as an app.
// The browser runs it in the background. Strategy: "network first":
//   - online:  always load the newest files from the website (and keep a copy)
//   - offline: use the copy that was saved last time
// To force everybody to re-download everything, change the number in CACHE.

const CACHE = "hoopzone-v1";

// Saved right away when the game is first opened, so it works offline from then on
const FILES = [
  "./",
  "index.html",
  "players.js",
  "script.js",
  "modes.js",
  "broadcast.js",
  "CSS/style.css",
  "CSS/extras.css",
  "manifest.json",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/apple-touch-icon.png",
  "music/background.mp3"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) =>
      // one missing file must not break the others
      Promise.all(FILES.map((file) => cache.add(file).catch(() => {})))
    )
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(names.filter((name) => name !== CACHE).map((name) => caches.delete(name)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(networkFirst(event.request));
});

async function networkFirst(request) {
  const cache = await caches.open(CACHE);

  try {
    const response = await fetch(request);

    // Keep a copy for offline use (but not partial responses, which audio uses)
    const partial = response.status === 206 || request.headers.has("range");
    if ((response.ok || response.type === "opaque") && !partial) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    // No internet: use the saved copy
    const saved = await cache.match(request, { ignoreSearch: true });
    if (saved) {
      return request.headers.has("range") ? rangeResponse(request, saved) : saved;
    }
    if (request.mode === "navigate") {
      const page = await cache.match("index.html");
      if (page) return page;
    }
    return new Response("You are offline.", { status: 503, headers: { "Content-Type": "text/plain" } });
  }
}

// Music players ask for a piece of the file ("bytes=1000-"). This cuts that piece out of the saved copy.
async function rangeResponse(request, saved) {
  const buffer = await saved.arrayBuffer();
  const total = buffer.byteLength;
  const asked = /bytes=(\d*)-(\d*)/.exec(request.headers.get("range") || "");
  const type = saved.headers.get("Content-Type") || "audio/mpeg";

  if (!asked) return new Response(buffer, { status: 200, headers: { "Content-Type": type } });

  const start = asked[1] ? parseInt(asked[1], 10) : 0;
  const end = asked[2] ? Math.min(parseInt(asked[2], 10), total - 1) : total - 1;

  return new Response(buffer.slice(start, end + 1), {
    status: 206,
    headers: {
      "Content-Type": type,
      "Content-Range": "bytes " + start + "-" + end + "/" + total,
      "Content-Length": String(end - start + 1)
    }
  });
}
