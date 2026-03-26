importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyDBn2tCaiVgQ6EYk46nNB6ntxPboUpKXOg",
  authDomain: "thecrunch-cc3ec.firebaseapp.com",
  projectId: "thecrunch-cc3ec",
  storageBucket: "thecrunch-cc3ec.firebasestorage.app",
  messagingSenderId: "427450207497",
  appId: "1:427450207497:web:1134a30fb54c87535b17d8"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Background Notification Handling
messaging.onBackgroundMessage((payload) => {
  console.log('[sw.js] Received background message ', payload);

  const notificationTitle = payload.notification?.title || "New Order Alert! 🔔";
  const notificationOptions = {
    body: payload.notification?.body || "You have a new order to process.",
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    tag: 'new-order', // ഒരേ ടൈപ്പ് നോട്ടിഫിക്കേഷൻ ഗ്രൂപ്പ് ചെയ്യാൻ
    renotify: true,
    requireInteraction: true,
    data: { 
      url: payload.data?.url || '/admin/orders' 
    }
  };

  // ഇത് നിർബന്ധമാണ്: ബ്രൗസറിനോട് നോട്ടിഫിക്കേഷൻ കാണിക്കാൻ പറയുന്നു
  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// നോട്ടിഫിക്കേഷനിൽ ക്ലിക്ക് ചെയ്യുമ്പോൾ അഡ്മിൻ പേജ് തുറക്കാൻ
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  const targetUrl = event.notification.data.url;
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      for (var i = 0; i < clientList.length; i++) {
        var client = clientList[i];
        if (client.url.includes(targetUrl) && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});