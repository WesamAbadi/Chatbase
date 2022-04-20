// Import the functions you need from the SDKs you need
//import firebase from "firebase";
//import * as firebase from "firebase";
//import "firebase/compat/firestore";
/* import "firebase/compat/auth";
import { getAnalytics } from "firebase/analytics"; */
//import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseApp = {
  apiKey: "AIzaSyC0zhJhNNZQ7LX4OE2Xdh_ix5u4qVyVUWY",
  authDomain: "chatbase-af219.firebaseapp.com",
  projectId: "chatbase-af219",
  storageBucket: "chatbase-af219.appspot.com",
  messagingSenderId: "539230130249",
  appId: "1:539230130249:web:61b7247fd6143bfefeef98",
  measurementId: "G-B1207J3HGV",
};

const app = initializeApp(firebaseApp);
// Initialize Firebase

const db = getFirestore(app);
//const query = db.collection("messages").orderBy("createdAt").limit(100);

const auth = getAuth();
export { app, auth, db };
//export default firebase;
