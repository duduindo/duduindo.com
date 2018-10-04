
if ('serviceWorker' in navigator) {
  const sw = navigator.serviceWorker.register('/serviceworker.js');

  sw.then(function(registration) {
    console.log('Service Worker registered with scope:', registration.scope);
  });

  sw.catch(function(err) {
    console.log('Service Worker registration failed:', err);
  });
}
