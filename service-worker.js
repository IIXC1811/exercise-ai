const CACHE_NAME = "exercise-ai-v2";

const urlsToCache = [
  "/",
  "index.html",
  "manifest.json",
  "Correct.mp3"
];

// install → cache ไฟล์
self.addEventListener("install", event => {
  self.skipWaiting(); // อัปเดตทันที

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// activate → ลบ cache เก่า
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(names => {
      return Promise.all(
        names.map(name => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );

  self.clients.claim();
});

// fetch → ใช้ cache ก่อน
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
