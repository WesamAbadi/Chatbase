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
  useEffect(() => {
    startChat();
  }, []);
  const [messages, setMessages] = useState([]);
  const [arrays, setArray] = useState([]);

  function put(text) {
    setMessages(text);
  }

  function startChat() {
    getDocs(collection(db, "messages")).then((querySnapshot) => {
      const newUserDataArray = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
      }));

      newUserDataArray.map((msg) => {
        setMessages(msg);
        setArray(msg);
      });
      console.log(newUserDataArray);

      //console.log(messages);
      //setMessages(newUserDataArray.map((x)));
      //newUserDataArray.forEach((element) => setMessages(element.text));
    });
  }

  //  console.log(newUserDataArray);
  console.log(messages);

  return (
    <div className="mainChat">
      <SignOut />

      <div className="msg">{}</div>

      <p>Your chat appears here ..</p>
      <SendMessage />
    </div>
  );
}

export default Chat;
