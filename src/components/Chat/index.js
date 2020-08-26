import React, { useState, useEffect } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import { useParams } from "react-router-dom";
import firebase from "firebase";

import SearchIcon from "@material-ui/icons/Search";
import DehazeIcon from "@material-ui/icons/Dehaze";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import MicIcon from "@material-ui/icons/Mic";
import SendIcon from "@material-ui/icons/Send";
import { useStateValue } from "../../StateProvider";
import db from "../../Firebase";
import Message from "./Message";

import "./index.css";

const Chat = () => {
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatName, setChatName] = useState("");
  const [avatar, setAvatar] = useState([]);
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  const { chatId } = useParams();

  useEffect(() => {
    console.log(user);
    if (chatId) {
      db.collection("Chats")
        .doc(chatId)
        .onSnapshot(snapshot => {
          setChatName(snapshot.data().name);
          setAvatar(snapshot.data().avatar);
        });

      db.collection("Chats")
        .doc(chatId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot(snapshot =>
          setMessages(snapshot.docs.map(doc => doc.data()))
        );
    }
  }, [chatId]);

  /* Changes the microphone icon to an arrow icon, since there is no reason for there to be a microphone icon when you're typing a text message 
  (from whatsapp web original) */
  const swapInputIcon = inputMessage => {
    if (inputMessage.length > 0) {
      setIsTyping(true);
    } else {
      setIsTyping(false);
    }
  };
  const sendMessage = event => {
    event.preventDefault();
    db.collection("Chats").doc(chatId).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };
  const updateVal = val => {
    swapInputIcon(val);
    setInput(val);
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar
          variant="circle"
          src={`https://ui-avatars.com/api/?size=48&rounded=true&color=${avatar[2]}&background=${avatar[1]}&name=${avatar[0]}`}
        />
        <div className="chat__headerInfo">
          <h3 style={{ margin: 0, fontWeight: 500 }}>{chatName}</h3>
        </div>
        <div className="chat__headerRightIcons">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <DehazeIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map(message => (
          <Message
            id={message.id}
            key={message.id}
            message={message}
            username={user.displayName}
          />
        ))}
      </div>
      <div className="chat__inputBox">
        <IconButton>
          <AddCircleIcon />
        </IconButton>
        <form>
          <input
            type="text"
            value={input}
            onChange={val => {
              updateVal(val.target.value);
            }}
            placeholder="Type a message"
            style={{ width: "100%" }}
          />
          <button
            type="submit"
            style={{ display: "none" }}
            onClick={sendMessage}
          >
            send message
          </button>
        </form>
        <IconButton>
          <EmojiEmotionsIcon />
        </IconButton>
        {isTyping ? (
          <IconButton onClick={sendMessage}>
            <SendIcon />
          </IconButton>
        ) : (
          <IconButton>
            <MicIcon />
          </IconButton>
        )}
      </div>
    </div>
  );
};

export default Chat;
