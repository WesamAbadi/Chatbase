import React from "react";
import { Button } from "@material-ui/core";
//import { initializeApp } from "firebase/app";
//firebase
//import firebase from "firebase/compat/app";
//import "../firebase";

import { auth } from "../firebase";
//import{getAuth, signOut} "firebase/compat/auth";
//import { auth } from "firebase/compat/auth";

/* firebase.initializeApp({
  apiKey: "AIzaSyC0zhJhNNZQ7LX4OE2Xdh_ix5u4qVyVUWY",
  authDomain: "chatbase-af219.firebaseapp.com",
  projectId: "chatbase-af219",
  storageBucket: "chatbase-af219.appspot.com",
  messagingSenderId: "539230130249",
  appId: "1:539230130249:web:61b7247fd6143bfefeef98",
  measurementId: "G-B1207J3HGV",
}); */
//const auth = firebase.auth();
function SignOut() {
  return (
    <div>
      <Button onClick={() => auth.signOut()}>Sign Out</Button>
    </div>
  );
}

export default SignOut;
