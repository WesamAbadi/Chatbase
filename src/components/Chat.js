import React, { useState, useEffect } from "react";
import SignOut from "./SignOut";
//import { db } from "../firebase";
import { doc, getFirestore, onSnapshot, collection } from "firebase/firestore";
//import { getDatabase, ref, query, orderByChild } from "firebase/database";
import "firebase/compat/firestore";
import SendMessage from "./SendMessage";
const db = getFirestore();
function Chat() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const test = onSnapshot(doc(collection(db, "messages")), (doc) => {
      console.log(doc.data());
    });
  }, []);
  //console.log(db);
  return (
    <div>
      <SignOut />
      {messages}
      <h5>chat js</h5>
      <SendMessage />
    </div>
  );
}

export default Chat;
