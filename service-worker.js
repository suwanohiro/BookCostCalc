const CACHE_NAME = 'book-cost-calc-v1';
const urlsToCache = [
    './',
    './index.html',
    './assets/css/style.css',
    './assets/js/script.js',
    './manifest.json',
    './assets/icons/icon-192.png',
    './assets/icons/icon-512.png'
];

// インストール時にキャッシュを作成
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// フェッチ時にキャッシュから返す
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // キャッシュがあればそれを返す、なければネットワークから取得
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

// アクティベート時に古いキャッシュを削除
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
