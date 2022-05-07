import React, { useState, useEffect } from "react";
import SignOut from "./SignOut";
import { auth } from "../firebase";
//import styled from "styled-components";

//import { db } from "../firebase";
import {
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  collection,
  orderBy,
  orderByChild,
} from "firebase/firestore";
//import { getDatabase, ref, query, orderByChild } from "firebase/database";
import "firebase/compat/firestore";
import SendMessage from "./SendMessage";
import { FirebaseError } from "firebase/app";
import userEvent from "@testing-library/user-event";

const db = getFirestore();

function Chat() {
  useEffect(() => {
    startChat();
  }, []);
  const [messages, setMessages] = useState([]);
  const [messages2, setMessages2] = useState([]);
  const array = [];
  //const [arrays, setArray] = useState([]);

  /* function put(text) {
    setMessages(text);
  } */
  const usrr = auth.currentUser;

  function startChat() {
    getDocs(collection(db, "messages"), orderBy("createdAt")).then(
      (querySnapshot) => {
        setMessages(
          querySnapshot.docs.map(
            (doc) => ({
              ...doc.data(),
            }),
            orderBy("createdAt.seconds")
          )
        );
        array.push(
          querySnapshot.docs.map((doc) => ({
            ...doc.data(),
          }))
        );
        //console.log("new array is ");
        //console.log(array);

        //console.log(array.text);
        /*  newUserDataArray.map((msg) => {
          setMessages((prevArray) => [...prevArray, msg]);
          //setArray(msg);
        }); */

        //console.log(messages);
        //setMessages(newUserDataArray.map((x)));
        //newUserDataArray.forEach((element) => setMessages(element.text));
      }
    );
  }
  messages.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));

  //console.log(messages);
  //console.log(usrr);

  //  console.log(newUserDataArray);
  window.scrollTo({
    top: document.body.scrollHeight,
    left: 0,
    behavior: "smooth",
  });
  return (
    <div className="mainChat">
      <SignOut />

      <div className="msg">
        {messages.map((msg) => (
          <div
            key={usrr.uid + Math.random()}
            id="msg2"
            style={{
              backgroundColor: usrr.uid === msg.uid ? "wheat" : "cadetblue",
              //textAlign: usrr.uid === msg.uid ? "right" : "left",
            }}
          >
            <div id="userName">
              Sent by {usrr.uid === msg.uid ? "You" : msg.displayName}
            </div>
            <div id="msg3">
              <img src={msg.photoURL} alt="" />
            </div>
            <div>{msg.text}</div>
            <div>{msg.createdAt.seconds}</div>
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
