import React from "react";
import useChat from "../../../../common/useChat";

export default function ChatMessage() {
  
  const { sendMessage } = useChat();

  return (
    <div>
      <div className="list-messages-contain">
        <ul className="list-messages">
          <li>
            <div className="message">
              <div className="message-img">
                <img src="../img/user-male.jpg" alt="" />
              </div>
              <div className="message-text">Hello, How are you?</div>
            </div>
          </li>
          <li>
            <div className="message right">
              <div className="message-img">
                <img src="../img/user-male.jpg" alt="" />
              </div>
              <div className="message-text">Hello, How are you?</div>
            </div>
          </li>
          <li>
            <div className="message right">
              <div className="message-img">
                <img src="../img/user-male.jpg" alt="" />
              </div>
              <div className="message-text">Hello, How are you?</div>
            </div>
          </li>
          <li>
            <div className="message">
              <div className="message-img">
                <img src="../img/user-male.jpg" alt="" />
              </div>
              <div className="message-text">Hello, How are you?</div>
            </div>
          </li>
        </ul>
      </div>
      <div>
        <form className="form-send-message" onSubmit={() => {
          // sendMessage
        }}>
          <ul className="list-file"></ul>
          <input type="text" className="txt-input" placeholder="Type message..." />
          <label className="btn btn-image" htmlFor="attach">
            <i className="fa fa-file"></i>
          </label>
          <input type="file" multiple id="attach" />
          <label className="btn btn-image" htmlFor="image">
            <i className="fa fa-file-image-o"></i>
          </label>
          <input type="file" accept="image/*" multiple id="image" />
          <button type="submit" className="btn btn-send">
            <i className="fa fa-paper-plane"></i>
          </button>
        </form>
      </div>
    </div>
  );
}
