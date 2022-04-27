import React, { useId, useState } from "react";
import { db, auth } from "../firebase";
import { Button, Input } from "@material-ui/core";
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

function SendMessage({ scroll }) {
  const [msg, setMsg] = useState("");
  async function sendMessage(e) {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;

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
      createdAt: serverTimestamp(),
      //Timestamp(date),
    });

    setMsg("");
  }
  return (
    <div>
      <form onSubmit={sendMessage}>
        <Input
          placeholder="Message..."
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <Button type="submit">SEND</Button>
      </form>
    </div>
  );
}

export default SendMessage;
