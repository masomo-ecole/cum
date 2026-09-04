importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyDcgJDckF9vejT476nYTGHAwa75dotPkMA",
  authDomain: "multi-ecole.firebaseapp.com",
  databaseURL: "https://multi-ecole-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "multi-ecole",
  storageBucket: "multi-ecole.firebasestorage.app",
  messagingSenderId: "421233691634",
  appId: "1:421233691634:web:c6884b8250c8cd1b7b796b"
});

var messaging = firebase.messaging();
var MASOMO_URL = "https://masomo-ecole.github.io/cum/";
var MASOMO_ICON = MASOMO_URL + "icon-192.png";

messaging.setBackgroundMessageHandler(function(payload){
  console.log("Notification MASOMO reçue :", payload);
  var notification = payload.notification || {};
  var data = payload.data || {};
  var title = notification.title || data.title || "MASOMO";
  var body = notification.body || data.body || data.message || "Nouvelle notification MASOMO";
  var url = data.url || MASOMO_URL;

  return self.registration.showNotification(title, {
    body: body,
    icon: notification.icon || MASOMO_ICON,
    badge: notification.badge || MASOMO_ICON,
    tag: data.notificationId || ("masomo-" + Date.now()),
    data: { url: url },
    renotify: true,
    requireInteraction: false
  });
});

self.addEventListener("notificationclick", function(event){
  event.notification.close();
  var url = (event.notification.data && event.notification.data.url) || MASOMO_URL;

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then(function(clientList){
      for (var i = 0; i < clientList.length; i++) {
        var client = clientList[i];
        if (client.url.indexOf("masomo-ecole.github.io/cum") !== -1 && "focus" in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});
