import React, { useState, useEffect } from "react";
import { Avatar, IconButton, Input, debounce } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import db from "../../Firebase";

import SmsIcon from "@material-ui/icons/Sms";
import SettingsIcon from "@material-ui/icons/Settings";
import SearchIcon from "@material-ui/icons/Search";
import SidebarChatBubble from "./SidebarChatBubble";

import "./index.css";
const cryptojs = require("crypto");

const Sidebar = () => {
  const [chatArray, setChatArray] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    const unsubscribe = db.collection("Chats").onSnapshot(snapshot => {
      // Add the subcollection "messages" to the collection in case it doesn't already exists. Can come in clutch with some specific errors, though it has problems with optimization that don't justify always running it.
      // snapshot.docs.forEach(element => {
      //   console.log(element.id);
      //   db.collection("Chats")
      //     .doc(element.id)
      //     .collection("messages")
      //     .onSnapshot(snapshot2 => {
      //       if (snapshot2.docs.length == 0) {
      //         db.collection("Chats")
      //           .doc(element.id)
      //           .collection("messages")
      //           .add({});
      //       }
      //     });
      // });
      setChatArray(
        snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const createChat = () => {
    var token;
    cryptojs.randomBytes(48, function (err, buffer) {
      token = buffer.toString("hex");
    });
    const chatName = prompt("Enter the chat name");
    console.log(
      db.collection("Chats").add({
        name: chatName,
        avatar: [chatName[0], "0000ff", "ffffff"],
        members: [],
      })
    );
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar variant="circle" src={user?.photoURL} />
        <div className="sidebar__headerRightIcons">
          <IconButton onClick={createChat}>
            <SmsIcon />
          </IconButton>
          <IconButton>
            <SettingsIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchIcon style={{ padding: 12 }} />
          <Input
            disableUnderline="true"
            placeholder="Search"
            style={{ border: "none", marginLeft: 0, flex: 1, height: "100%" }}
          />
        </div>
      </div>
      <div className="sidebar__chatBox">
        {chatArray.map(chat => (
          <SidebarChatBubble
            key={chat.id}
            id={chat.id}
            name={chat.data.name}
            avatar={chat.data.avatar}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
