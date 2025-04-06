if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('./workers/sw.js')
		.then(() => console.log('Service Worker registered'))
		.catch((error) => console.error('SW registration failed:', error));
}

