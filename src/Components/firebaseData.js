import firebase from "firebase/app"
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";
firebase.initializeApp(
{
    apiKey: "AIzaSyDtiGnj-CmRY0t5lWbsAh5hs5CUKICut24",
    authDomain: "reels-a9f49.firebaseapp.com",
    projectId: "reels-a9f49",
    storageBucket: "reels-a9f49.appspot.com",
    messagingSenderId: "229759831426",
    appId: "1:229759831426:web:48a0e5f7778c11c640d39b"
  })

  export const auth = firebase.auth();
  const firestore = firebase.firestore();
  export const database={
      users:firestore.collection('users'),
      posts:firestore.collection('posts'),
      comments:firestore.collection('comments'),
      getCurrentTimeStamp: firebase.firestore.FieldValue.serverTimestamp
  }
export const storage = firebase.storage();
//   export default firebase;