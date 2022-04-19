// Import the functions you need from the SDKs you need
import firebase from "firebase";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0zhJhNNZQ7LX4OE2Xdh_ix5u4qVyVUWY",
  authDomain: "chatbase-af219.firebaseapp.com",
  projectId: "chatbase-af219",
  storageBucket: "chatbase-af219.appspot.com",
  messagingSenderId: "539230130249",
  appId: "1:539230130249:web:61b7247fd6143bfefeef98",
  measurementId: "G-B1207J3HGV",
};

// Initialize Firebase
const db = firebaseApp.firestore();

const auth = firebase.auth();
const app = initializeApp(firebaseConfig);

export { db, auth };
