const CACHE_NAME = "aspk-cache-v1";

const APP_FILES = [
  "./",
  "./index.html",
  "./manifest.json"
];

// Installation du service worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(APP_FILES);
    })
  );

  self.skipWaiting();
});

// Activation et nettoyage des anciens caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name.startsWith("aspk-cache-") && name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );

  self.clients.claim();
});

// Gestion des requêtes
self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Ne pas intercepter les requêtes qui ne sont pas HTTP(S)
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    return;
  }

  // Laisser le navigateur gérer normalement les requêtes Firebase
  // et les autres requêtes vers des domaines externes.
  if (url.origin !== self.location.origin) {
    return;
  }

  // Ne mettre en cache que les requêtes GET.
  if (request.method !== "GET") {
    return;
  }

  event.respondWith(
    fetch(request).catch(() => caches.match(request))
  );
});
