import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { Button, TextField } from "@material-ui/core";
import { serverTimestamp, addDoc, collection } from "firebase/firestore";

function SendMessage({ addMessage, anonymous }) {
  useEffect(() => {}, []);
  const [msg, setMsg] = useState("");
  async function sendMessage(e) {
    e.preventDefault();
    // Trim the message to remove leading and trailing whitespace
    const trimmedMessage = msg.trim();

    // Check if the message is empty or exceeds a certain length
    if (trimmedMessage === "") {
      // Display an error message or prevent sending
      console.error("Error: Message cannot be empty");
      return;
    }
    if (trimmedMessage.length > 1000) {
      // Display an error message or prevent sending
      console.error("Error: Message exceeds 1000 characters");
      return;
    }

    const { uid, photoURL, displayName } = auth.currentUser;
    const messageData = {
      text: trimmedMessage,
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
      {!anonymous ? (
        <form onSubmit={sendMessage}>
          <TextField
            variant="standard"
            label="Message..."
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <Button type="submit">SEND</Button>
        </form>
      ) : (
        <div>
          <p>Sign in to send messages</p>
        </div>
      )}
    </div>
  );
}

export default SendMessage;
