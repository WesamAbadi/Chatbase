import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { Button, TextField } from "@material-ui/core";
import { serverTimestamp, addDoc, collection } from "firebase/firestore";

function SendMessage() {
  useEffect(() => {
    hal();
  }, []);
  const [msg, setMsg] = useState("");
  async function sendMessage(e) {
    e.preventDefault();
    const { uid, photoURL, displayName } = auth.currentUser;
    await addDoc(collection(db, "messages"), {
      text: msg,
      photoURL,
      uid,
      displayName,
      createdAt: serverTimestamp(),
    });

    setMsg("");

    window.scrollTo({
      top: document.body.scrollHeight,
      left: 0,
      behavior: "smooth",
    });
  }
  function hal() {
    window.scrollTo({
      top: document.body.scrollHeight,
      left: 0,
      behavior: "smooth",
    });
  }
  return (
    <div>
      <form onSubmit={sendMessage}>
        <TextField
          variant="standard"
          label="Message..."
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <Button type="submit">SEND</Button>
      </form>
    </div>
  );
}

export default SendMessage;
