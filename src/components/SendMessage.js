import React, { useId, useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { Button, Input, TextField } from "@material-ui/core";
import { async } from "@firebase/util";
import {
  doc,
  setDoc,
  Timestamp,
  serverTimestamp,
  addDoc,
  collection,
  orderBy,
} from "firebase/firestore";

function SendMessage() {
  useEffect(() => {
    hal();
  }, []);
  const [msg, setMsg] = useState("");
  async function sendMessage(e) {
    e.preventDefault();
    const { uid, photoURL, displayName } = auth.currentUser;

    /*  await setDoc(doc(db, "messages", "LA"), {
      text: msg,
      photoURL,
      uid,
      //createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      //createdAt: Timestamp(),
    }); */
    //timestamp: serverTimestamp();
    await addDoc(collection(db, "messages"), {
      text: msg,
      photoURL,
      uid,
      displayName,
      createdAt: serverTimestamp(),
      //Timestamp(date),
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
