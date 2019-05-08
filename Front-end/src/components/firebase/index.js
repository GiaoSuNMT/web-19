"1:1058592706762:web:465c4b981a145525"
import firebase from 'firebase/app'
import 'firebase/storage'
var firebaseConfig = {
    apiKey: "AIzaSyBKWYv0MyEgXlB4yTWmQy4-Lllc-0FlDsY",
    authDomain: "uet-tinder-a9c6c.firebaseapp.com",
    databaseURL: "https://uet-tinder-a9c6c.firebaseio.com",
    projectId: "uet-tinder-a9c6c",
    storageBucket: "uet-tinder-a9c6c.appspot.com",
    messagingSenderId: "1058592706762",
    appId: "1:1058592706762:web:465c4b981a145525"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const storage = firebase.storage();

  export{
      storage , firebase as default 
  }