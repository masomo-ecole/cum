importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');


firebase.initializeApp({
 apiKey:"AIzaSyDcgJDckF9vejT476nYTGHAwa75dotPkMA",
 authDomain:"multi-ecole.firebaseapp.com",
 projectId:"multi-ecole"
});


const messaging = firebase.messaging();


messaging.onBackgroundMessage((payload)=>{

 console.log("Notification reçue :", payload);


 self.registration.showNotification(
 payload.notification.title,
 {
  body: payload.notification.body,
  icon:"icon.png"
 }
 );


});
