import React, { useState, useEffect } from "react";
import SignOut from "./SignOut";
//import { db } from "../firebase";
import {
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  collection,
  orderBy,
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
  //const [arrays, setArray] = useState([]);

  /* function put(text) {
    setMessages(text);
  } */

  function startChat() {
    getDocs(collection(db, "messages"), orderBy("createdAt")).then(
      (querySnapshot) => {
        setMessages(
          querySnapshot.docs.map((doc) => ({
            ...doc.data(),
          }))
        );

        /*  newUserDataArray.map((msg) => {
          setMessages((prevArray) => [...prevArray, msg]);
          //setArray(msg);
        }); */

        console.log(messages);
        //setMessages(newUserDataArray.map((x)));
        //newUserDataArray.forEach((element) => setMessages(element.text));
      }
    );
    window.scrollTo({
      top: document.body.scrollHeight,
      left: 0,
      behavior: "smooth",
    });
  }

  console.log(messages);
  //  console.log(newUserDataArray);

  return (
    <div className="mainChat">
      <SignOut />

      <div className="msg">
        {messages.map((mymm) => (
          <div>
            <img src={mymm.photoURL} alt="" />
            <h3></h3>
            <p>{mymm.text}</p>
          </div>
        ))}
      </div>

      {/* <p>Your chat appears here ..</p> */}
      <div id="send">
        <SendMessage />
      </div>
    </div>
  );
}

export default Chat;
