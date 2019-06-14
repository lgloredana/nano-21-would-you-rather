const CACHE_STATIC_NAME = 'sea-movers-static-v2';
const CACHE_DYNAMIC_NAME = 'sea-movers-dynamic_v1';
const URLS_TO_PRECACHE = [
    '/',
    'index.html',
    'offline.html',
    'src/index.js',
    'src/utils/helpers.js',
    'src/utils/_DATA.js',
    'src/containers/App.js',
    'src/actions/*.js',
    'src/middleware/*.js',
    'src/reducers/*.js',
    'src/css/App.css',
    'src/css/index.css',
    'src/images/logo.svg',
];

self.addEventListener('install', event => {
    console.log('[Service Worker] Installing Service Worker ...', event);
    event.waitUntil(
        caches.open(CACHE_STATIC_NAME)
            .then(cache => {
                console.log('[Service Worker] Precaching App Shell');
                cache.addAll(URLS_TO_PRECACHE);
            })
            .then(() => {
                console.log('[ServiceWorker] Skip waiting on install');
                return self.skipWaiting();
            })
    );
});

self.addEventListener('fetch', event => {
    console.log('[Service Worker] Fetching something ....', event);

    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    console.log(response);
                    return response;
                }

                // Clone the request - a request is a stream and can be only consumed once
                const requestToCache = event.request.clone();

                // Try to make the original HTTP request as intended
                return fetch(requestToCache)
                    .then(response => {
                        // If request fails or server responds with an error code, return that error immediately
                        if (!response || response.status !== 200) {
                            return response;
                        }

                        // Again clone the response because you need to add it into the cache and because it's used
                        // for the final return response
                        const responseToCache = response.clone();

                        caches.open(CACHE_DYNAMIC_NAME)
                            .then(cache => {
                                cache.put(requestToCache, responseToCache);
                            });

                        return response;
                    })
            })
            .catch(error => {
                return caches.open(CACHE_STATIC_NAME)
                    .then(cache => {
                        console.log(event.request, event.request.headers.get('accept'));
                        if (event.request.headers.get('accept').includes('text/html')) {
                            return cache.match('/would-you-rather/offline.html');
                        }
                    });
            })
    );
});