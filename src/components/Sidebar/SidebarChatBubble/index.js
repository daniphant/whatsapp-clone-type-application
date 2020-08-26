import React, { useState, useEffect } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useStateValue } from "../../../StateProvider";

import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import db from "../../../Firebase";

import "./index.css";

const SidebarChatBubble = ({ name, id, avatar }) => {
  const [isLocked, setLocked] = useState(false);
  const [displayMessage, setDisplayMessage] = useState("");
  const [{ user }, dispatch] = useStateValue();

  const styles = {
    LockIcons: {
      alignSelf: "center",
      margin: 12,
    },
  };

  const lockChat = () => {
    setLocked(!isLocked);
  };

  useEffect(() => {
    console.log(
      db.collection("Chats").doc(id).collection("messages") == undefined
    );
    if (db.collection("Chats").doc(id).collection("messages") == undefined) {
      db.collection("Chats").doc(id).collection("messages").add({});
    }
  }, []);

  useEffect(() => {
    console.log("At use uffect");
    console.log(id);
    if (!id == null) {
      db.collection("Chats")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot(snapshot => setDisplayMessage(snapshot.docs[0].data()));
    }
  }, [id]);

  return (
    <Link to={`/chats/${id}`}>
      <div className="chatBubble">
        {/* TODO: MAKE AVATARS HAVE USER INITIALS AS THE SOURCE */}
        <Avatar
          variant="circle"
          src={`https://ui-avatars.com/api/?size=48&rounded=true&color=${avatar[2]}&background=${avatar[1]}&name=${avatar[0]}`}
          style={{ marginLeft: 12 }}
        />
        <div className="chatBubble__textInfo">
          <p>
            <h2 style={{ margin: 0 }}>{name}</h2>
            {user.displayName == displayMessage.username
              ? displayMessage?.name + ": "
              : "You: "}
            {displayMessage?.message}
          </p>
        </div>
        <div className="chatBubble__rightContainer">
          <p>yesterday</p>
          <IconButton onClick={lockChat}>
            {isLocked ? (
              <LockIcon style={styles.LockIcons} />
            ) : (
              <LockOpenIcon style={styles.LockIcons} />
            )}
          </IconButton>
        </div>
      </div>
    </Link>
  );
};

export default SidebarChatBubble;
