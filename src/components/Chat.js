import React, { useState, useEffect } from "react";
import SendMessage from "./SendMessage";
import { auth } from "../firebase";
import {
  getDocs,
  query,
  getFirestore,
  collection,
  orderBy,
  deleteDoc,
  doc,
  startAfter,
  limit,
} from "firebase/firestore";
import "firebase/compat/firestore";

import {
  ContextMenu,
  MenuItem,
  ContextMenuTrigger,
} from "@firefox-devtools/react-contextmenu";
import "../Contextmenu.css";
const db = getFirestore();

function Chat() {
  useEffect(() => {
    startChat();
    // eslint-disable-next-line
  }, []);

  const [messages, setMessages] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const usrr = auth.currentUser;
  // console.log(usrr);

  function handleClick(e, data, target) {
    if (data.action === "delete") {
      const childElement = target.querySelector(".text");
      if (childElement) {
        const attributeValue = childElement.getAttribute("msg-id");
        deleteMessage(attributeValue);
      }
    } else if (data.action === "edit") {
      const childElement = target.querySelector(".text");
      if (childElement) {
        const attributeValue = childElement.getAttribute("msg-id");
        editMessage(attributeValue);
      }
    } else if (data.action === "copy") {
      const childElement = target.querySelector(".text");
      if (childElement) {
        const attributeValue = childElement.innerHTML;
        navigator.clipboard.writeText(attributeValue);
      }
    } else if (data.action === "reload") {
      window.location.reload();
    }
  }
  const editMessage = (messageId) => {
    const message = messages.find((msg) => msg.id === messageId);
    if (message) {
      // console.log("editing");
    }
  };

  function startChat() {
    getDocs(
      query(collection(db, "messages"), orderBy("createdAt", "desc"), limit(20))
    ).then((querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setMessages(data.reverse());
      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
    });
    setTimeout(() => {
      scrollDown();
    }, 600);
  }

  function loadMoreMessages() {
    getDocs(
      query(
        collection(db, "messages"),
        orderBy("createdAt", "desc"),
        startAfter(lastVisible),
        limit(20)
      )
    ).then((querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setMessages((prevMessages) => [...prevMessages, ...data.reverse()]);
      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
    });
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
    <ContextMenuTrigger id="Contextmenu">
      <div className="mainChat">
        <div className="msg">
          <button className="load-more" onClick={loadMoreMessages}>
            Load More
          </button>
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
                    key={msg.id}
                    className={`message ${
                      usrr.uid === msg.uid ? "sent" : "received"
                    }`}
                  >
                    <div className="user-name">
                      {usrr.uid === msg.uid ? "You" : msg.displayName}
                      {msg.uid === "vLvzk4bWknVTHe0cUb6XuO1o9ZW2" && (
                        <div className="badge badge-primary">Admin</div>
                      )}
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
                        <ContextMenuTrigger id="Contextmenu3" name={msg.id}>
                          <div className="message-content">
                            <div className="text">{msg.text}</div>
                            <div className="timestamp">
                              {formatTimestamp(msg.createdAt.seconds)}
                            </div>
                          </div>
                        </ContextMenuTrigger>
                      ) : (
                        <div className="message-content">
                          <div className="timestamp">
                            {formatTimestamp(msg.createdAt.seconds)}
                          </div>

                          <ContextMenuTrigger id="Contextmenu2">
                            <div className="text" msg-id={msg.id}>
                              {msg.text}
                            </div>
                          </ContextMenuTrigger>
                        </div>
                      )}

                      {usrr.uid === msg.uid && (
                        <button
                          className="delete hidden"
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
          <SendMessage addMessage={addMessage} anonymous={usrr.isAnonymous} />
        </div>
        <ContextMenu id="Contextmenu">
          <MenuItem data={{ action: "reload" }} onClick={handleClick}>
            reload
          </MenuItem>
        </ContextMenu>
        <ContextMenu id="Contextmenu2">
          <MenuItem data={{ action: "copy" }} onClick={handleClick}>
            Copy
          </MenuItem>
          <MenuItem disabled data={{ action: "edit" }} onClick={handleClick}>
            Edit
          </MenuItem>
          <MenuItem data={{ action: "delete" }} onClick={handleClick}>
            Delete Message
          </MenuItem>
          <MenuItem></MenuItem>
        </ContextMenu>
        <ContextMenu id="Contextmenu3" onShow={() => console.log("Show")}>
          <MenuItem disabled data={{ action: "report" }} onClick={handleClick}>
            Report
          </MenuItem>
          <MenuItem disabled data={{ action: "view" }} onClick={handleClick}>
            View Profile
          </MenuItem>
        </ContextMenu>
      </div>
    </ContextMenuTrigger>
  );
}

export default Chat;
