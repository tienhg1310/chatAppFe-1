import { useCallback, useEffect } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { useRecoilState } from "recoil";
import axios from "axios";

import { messagesChat, socketState, stompClientState, userLogin } from "../recoil/socket.atom";
import { API_URL } from "./config";

export default function useChat() {
  const [socket, setSocket] = useRecoilState(socketState);
  const [stompClient, setStompClient] = useRecoilState(stompClientState);
  const [userOnLogin, setUserOnLogin] = useRecoilState(userLogin);
  const [messagesChatState, setMessagesChatState] = useRecoilState(messagesChat);

  const setUserSession = (id, username, accessToken) => {
    setUserOnLogin((v) => ({
      ...v,
      id: id,
      username: username,
      accessToken: accessToken,
    }));
  };

  const getMessage = (userId, selectedId, type) => {
    if (type === "user") {
      axios
        .get(`${API_URL}/listmessage/${userId}/${selectedId}`, {
          headers: {
            Authorization: `Bearer ${userOnLogin.accessToken}`,
          },
        })
        .then((response) => {
          setMessagesChatState(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (type === "group") {
      axios
        .get(`${API_URL}/listmessage/group/${selectedId}`, {
          headers: {
            Authorization: `Bearer ${userOnLogin.accessToken}`,
          },
        })
        .then((response) => {
          setMessagesChatState(response.data);
        });
    }
  };

  const setSelectedUser = (id, type) => {
    setSocket((v) => ({ ...v, selectedId: id, type: type }));
  };

  const sendMessage = (text) => {
    global.window.stompClient.send(
      "/app/chat/" + socket.selectedId,
      {},
      JSON.stringify({
        fromLogin: userOnLogin.id,
        message: text,
      })
    );
  };

  const subscribeTopic = () => {
    if (!global.window.stompClient) return;
    global.window.subscribeTopic = global.window.stompClient.subscribe(
      "/topic/messages/" + userOnLogin.id,
      (response) => {
        let data = JSON.parse(response.body);
        console.log("socket", socket);
        console.log("data", data);
        if (socket.selectedId === data.messageFrom || socket.selectedId === data.messageTo) {
          setMessagesChatState((v) => {
            return [...v, data];
          });
        } else {
          console.log("new message", response.body);
        }
      }
    );
  };

  const unsubscribeTopic = () => {
    if (global.window.subscribeTopic) {
      global.window.subscribeTopic.unsubscribe();
    }
  };

  const init = () => {
    if (!userOnLogin.id) return;
    if (global.window.stompClient) return;
    console.log("connecting...");
    // const ws =
    const client = Stomp.over(function () {
      return SockJS(`${API_URL}/ws`);
    });

    global.window.stompClient = client;

    client.connect(
      { Authorization: userOnLogin.accessToken },
      function (frame) {
        console.log("connected to:: " + frame);
      },
      function onError() {
        console.log("Disconnected from console!!!");
      }
    );
  };

  const destroy = () => {
    console.log("destroy...");
    if (global.window.stompClient) {
      global.window.stompClient.disconnect();
    }
    // setStompClient(null);
    delete global.window.stompClient;
  };

  return {
    socket,
    subscribeTopic,
    unsubscribeTopic,
    init,
    destroy,
    setSelectedUser,
    sendMessage,
    setUserSession,
    getMessage,
  };
}
