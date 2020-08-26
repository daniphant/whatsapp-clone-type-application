import React from "react";

import "./index.css";

const Message = ({ message, username }) => {
  const isUser = username == message.name;

  return (
    <div>
      <div className={`message ${isUser && "message__user"}`}>
        <div className={isUser ? "message__userCard" : "message__guestCard"}>
          <p style={{ margin: 0, marginBottom: 6, fontWeight: 500 }}>
            {!isUser ? message.name.toString() : ""}
          </p>
          <div style={{ flexDirection: "row", flex: 1, display: "flex" }}>
            <p style={{ margin: 0 }}>{message.message.toString()}</p>
            <p
              style={{
                margin: 0,
                marginTop: 8,
                marginLeft: 16,
                fontSize: 8,
                color: "beb6b6",
              }}
            >
              {new Date(message.timestamp?.toDate()).toDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
