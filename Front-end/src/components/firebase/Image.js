import firebase from 'firebase/app'
import 'firebase/storage'
var firebaseConfig = {
    apiKey: "AIzaSyBOgGI7eHXIQAKGtZaB1IM3xoiuc29xu8w",
    authDomain: "uet-tinder-image.firebaseapp.com",
    databaseURL: "https://uet-tinder-image.firebaseio.com",
    projectId: "uet-tinder-image",
    storageBucket: "uet-tinder-image.appspot.com",
    messagingSenderId: "841568905597",
    appId: "1:841568905597:web:dbfcfebb06150e32"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const storage = firebase.storage();

  export{
      storage , firebase as default 
  }