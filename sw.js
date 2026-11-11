// Bitácora HVAC · Bisonte — service worker: instalación y uso sin internet.
const CACHE = 'bishvac-v14';
const ASSETS = ['./', './index.html', './manifest.webmanifest',
  './fonts/Poppins-Light.otf', './fonts/Poppins-Regular.otf', './fonts/Poppins-Bold.otf',
  './assets/bisonte-horizontal.png', './assets/bisonte-horizontal-blanco.png', './assets/icon-192.png', './assets/icon-512.png',
  './assets/icon-maskable-512.png', './assets/apple-touch-icon.png', './assets/favicon-64.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('bishvac-') && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then(res => { const cp = res.clone(); caches.open(CACHE).then(c => c.put('./index.html', cp)); return res; })
      .catch(() => caches.match('./index.html', { ignoreSearch: true })));
    return;
  }
  e.respondWith(caches.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req).then(res => {
    if (res.ok) { const cp = res.clone(); caches.open(CACHE).then(c => c.put(req, cp)); }
    return res;
  })));
});
