import React from "react";
//import firebase from "firebase";
//import * as firebase from "firebase/app";
//import * as firebase from "firebase";
//import { auth } from "firebase/compat/auth";
//import "firebase/compat/firestore";

//just works

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useAuthState } from "react-firebase-hooks/auth";

//import "firebase/auth";

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { Button } from "@material-ui/core";

firebase.initializeApp({
  apiKey: "AIzaSyC0zhJhNNZQ7LX4OE2Xdh_ix5u4qVyVUWY",
  authDomain: "chatbase-af219.firebaseapp.com",
  projectId: "chatbase-af219",
  storageBucket: "chatbase-af219.appspot.com",
  messagingSenderId: "539230130249",
  appId: "1:539230130249:web:61b7247fd6143bfefeef98",
  measurementId: "G-B1207J3HGV",
});
const auth = firebase.auth();

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <>
      <Button onClick={signInWithGoogle}>Sign in with google!</Button>
    </>
  );
}

export default SignIn;
