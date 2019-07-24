const arquivos_offline = [
  './',
  './index.css',
  './index.js',
  './index.html',
  './manifest.json',
  './favicon.ico',
  './images/icons/icon-72x72.png',
  './images/icons/icon-96x96.png',
  './images/icons/icon-128x128.png',
  './images/icons/icon-144x144.png',
  './images/icons/icon-152x152.png',
  './images/icons/icon-192x192.png',
  './images/icons/icon-512x512.png',
];

const nome_cache = 'pages-cache-v1';

self.addEventListener('install', evento => {
  console.log('Tentando instalar os arquivos offline');
  evento.waitUntil(
    caches.open(nome_cache)
    .then(cache => {
      return cache.addAll(arquivos_offline);
    })
  );
});

self.addEventListener('fetch', evento => {
  console.log('Captura requisição para ', evento.request.url);
  evento.respondWith(
    caches.match(evento.request)
    .then(response => {
      if (response) {
        console.log('Encontrado ', evento.request.url, ' no cache');
        return response;
      }
      console.log('Network request for ', evento.request.url);
      return fetch(evento.request);
    })
  );
});