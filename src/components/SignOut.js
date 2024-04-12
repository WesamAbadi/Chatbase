import React from "react";
import { auth } from "../firebase";
function SignOut() {
  return (
    <div>
      <button
        onClick={() => auth.signOut()}
        className="btn btn-xs sm:btn-sm btn-outline"
      >
        Sign Out
      </button>
    </div>
  );
}

export default SignOut;
