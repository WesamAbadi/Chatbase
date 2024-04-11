import React, { useState, useEffect } from "react";
import SignOut from "./SignOut";
import SendMessage from "./SendMessage";
import { auth } from "../firebase";
import {
  getDocs,
  getFirestore,
  collection,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";
import "firebase/compat/firestore";

const db = getFirestore();

function Chat() {
  useEffect(() => {
    startChat();
    // eslint-disable-next-line
  }, []);

  const [messages, setMessages] = useState([]);
  const usrr = auth.currentUser;

  function startChat() {
    getDocs(collection(db, "messages"), orderBy("createdAt")).then(
      (querySnapshot) => {
        setMessages(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      }
    );
    setTimeout(() => {
      scrollDown();
    }, 600);
  }

  function scrollDown() {
    window.scrollTo({
      top: document.body.scrollHeight,
      left: 0,
      behavior: "smooth",
    });
  }

    function addMessage(message) {
      setMessages((prevMessages) => [...prevMessages, message]);
      scrollDown();
    }

  function formatTimestamp(timestampInSeconds) {
    const date = new Date(timestampInSeconds * 1000);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();
    return `${formattedDate} ${formattedTime}`;
  }

  async function deleteMessage(messageId) {
    try {
      await deleteDoc(doc(db, "messages", messageId));
      setMessages(messages.filter((msg) => msg.id !== messageId));
    } catch (error) {
      console.error("Error deleting message: ", error);
    }
  }

  return (
    <div className="mainChat">
      <SignOut />
      <div className="msg">
        {messages
          .sort((a, b) => a.createdAt.seconds - b.createdAt.seconds)
          .reduce((acc, msg, index) => {
            const prevMsg = messages[index - 1];
            if (!prevMsg || prevMsg.uid !== msg.uid) {
              acc.push([]);
            }
            acc[acc.length - 1].push(msg);
            return acc;
          }, [])
          .map((messageGroup, groupIndex) => (
            <div key={groupIndex} className="message-group">
              {messageGroup.map((msg) => (
                <div
                  // key={msg.createdAt}
                  key={msg.id}
                  className={`message ${
                    usrr.uid === msg.uid ? "sent" : "received"
                  }`}
                >
                  <div className="user-name">
                    {usrr.uid === msg.uid ? "You" : msg.displayName}
                  </div>
                  {usrr.uid !== msg.uid && (
                    <div className="profile-pic">
                      <img src={msg.photoURL} alt="" />
                    </div>
                  )}

                  <div className="message-content">
                    {!groupIndex && (
                      <div className="user-name">
                        {usrr.uid === msg.uid ? "You" : msg.displayName}
                      </div>
                    )}
                    {usrr.uid !== msg.uid ? (
                      <div className="message-content">
                        {" "}
                        <div className="text">{msg.text}</div>
                        <div className="timestamp">
                          {formatTimestamp(msg.createdAt.seconds)}
                        </div>
                      </div>
                    ) : (
                      <div className="message-content">
                        <div className="timestamp">
                          {formatTimestamp(msg.createdAt.seconds)}
                        </div>
                        <div className="text">{msg.text}</div>
                      </div>
                    )}

                    {usrr.uid === msg.uid && (
                      <button
                        className="delete"
                        onClick={() => deleteMessage(msg.id)}
                      >
                        X
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
      </div>
      <div id="send">
        <SendMessage addMessage={addMessage} />
      </div>
    </div>
  );
}

export default Chat;
