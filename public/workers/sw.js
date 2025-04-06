self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open('offline-cache').then((cache) => {
			return cache.addAll(['./offline.html']);
		})
	);
});
self.addEventListener('fetch', (event) => {
	event.respondWith(
		fetch(event.request)
		.catch(() => {
			if (event.request.headers.get('accept').includes('text/html')) {
				return caches.match('./workers/offline.html');
			}
			
			return new Response(JSON.stringify({ error: 'Server unreachable. Try again later.' }), {
				headers: { 'Content-Type': 'application/json' },
				status: 503
			});
		})
	);
});