/* global self */

self.addEventListener('install', (event) => {
  self.skipWaiting();
  console.log('Installed', event);
});

self.addEventListener('activate', (event) => {
  console.log('Activated', event);
});

self.addEventListener('push', (event) => {
  event.waitUntil(
    self.registration.showNotification('Pralni stroj je končal.', {
      body: 'Poberi cote ven, da ne zgnijejo.',
      icon: 'img/notification-icon.png',
    }));
});
