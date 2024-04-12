import React from "react";
import "./App.css";
import Chat from "./components/Chat";
import Nav from "./components/Nav";
import SignIn from "./components/SignIn";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <div className="loading-container">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  return (
    <>
      {user ? (
        <>
          <Nav />
          <Chat />
        </>
      ) : (
        <SignIn />
      )}
    </>
  );
}

export default App;
