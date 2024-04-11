import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { Button, TextField } from "@material-ui/core";
import { serverTimestamp, addDoc, collection } from "firebase/firestore";

function SendMessage({ addMessage }) {
  useEffect(() => {}, []);
  const [msg, setMsg] = useState("");
async function sendMessage(e) {
  e.preventDefault();
  const { uid, photoURL, displayName } = auth.currentUser;
  const messageData = {
    text: msg,
    photoURL,
    uid,
    displayName,
    createdAt: serverTimestamp(),
  };
  try {
    const docRef = await addDoc(collection(db, "messages"), messageData);
    addMessage({ ...messageData, id: docRef.id });
    setMsg("");
  } catch (error) {
    console.error("Error sending message: ", error);
  }
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
