import React, { useState, useEffect } from "react";
import SignOut from "./SignOut";
//import { db } from "../firebase";
import {
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  collection,
} from "firebase/firestore";
//import { getDatabase, ref, query, orderByChild } from "firebase/database";
import "firebase/compat/firestore";
import SendMessage from "./SendMessage";
const db = getFirestore();
function Chat() {
  const [messages, setMessages] = useState([]);

  function put(text) {
    setMessages(text);
  }
  useEffect(() => {}, []);
  getDocs(collection(db, "messages")).then((querySnapshot) => {
    const newUserDataArray = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    //newUserDataArray.forEach((element) => put(element.text));
  });
  //console.log(messages);
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
