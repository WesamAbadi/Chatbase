import React from "react";
import { auth } from "../firebase";

import "firebase/compat/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <div className="signin-container">
      <div className="signin-content">
        <h1 className="signin-title">Welcome to Chatbase!</h1>
        <p className="signin-subtitle">Sign in to start chatting</p>
        <button onClick={signInWithGoogle} className="btn btn-wide btn-outline">
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default SignIn;
