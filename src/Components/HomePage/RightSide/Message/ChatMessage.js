import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import useChat from "../../../../common/useChat";

import { messagesChat, userLogin } from "../../../../recoil/socket.atom";

export default function ChatMessage() {
  const messages = useRecoilValue(messagesChat);
  const [input, setInput] = useState("");
  const { sendMessage } = useChat();
  const divRef = useRef(null);

  const userID = useRecoilValue(userLogin).id;

  const submit = () => {
    sendMessage(input);
    setInput("");
  };

  useEffect(() => {
    if (divRef) {
      divRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    }
  }, [messages]);

  return (
    <div>
      <div className="list-messages-contain">
        <ul className="list-messages" ref={divRef}>
          {messages.map((message) => (
            <li key={message.id}>
              <div
                className={
                  message.messageFrom === userID || message.user_id === userID
                    ? "message"
                    : "message right"
                }>
                <div className="message-img">
                  <img src="../img/user-male.jpg" alt="" />
                </div>
                <div className="message-text">{message.messageText || message.messages}</div>
                {message.user_id ? <div className="message-name">{message.user_id}</div> : ""}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div className="form-send-message">
          {/* <ul className="list-file"></ul> */}
          <input
            type="text"
            className="txt-input"
            placeholder="Type message..."
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                submit();
              }
            }}
          />

          <button className="btn btn-send" onClick={submit}>
            <i className="fa fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
