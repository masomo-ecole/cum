importScripts(
    "https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"
);

importScripts(
    "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

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

messaging.setBackgroundMessageHandler(function(payload){

    console.log("Notification MASOMO reçue :", payload);

    var notification = payload.notification || {};

    var title = notification.title || "MASOMO";

    var options = {
        body: notification.body || "Nouvelle notification MASOMO",
        icon: notification.icon || "/cum/icon-192.png",
        badge: "/cum/icon-192.png"
    };

    return self.registration.showNotification(title, options);
});
