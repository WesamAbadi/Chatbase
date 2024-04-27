import React from "react";
import { auth } from "../firebase";
import { signInAnonymously } from "firebase/auth";

import "firebase/compat/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const signInAsGuest = () => {
    signInAnonymously(auth)
      .then(() => {
        console.log("signed in as guest");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="signin-container">
      <div className="signin-content">
        <h1 className="signin-title">Welcome to Chatbase!</h1>
        <p className="signin-subtitle">Sign in to start chatting</p>
        <button onClick={signInWithGoogle} className="btn btn-wide btn-outline">
          Sign in with Google
        </button>
        <button onClick={signInAsGuest} className="btn btn-wide btn-outline">
          View as Guest
        </button>
      </div>
    </div>
  );
}

export default SignIn;
