import { useCallback, useEffect } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { useRecoilState } from "recoil";
import axios from "axios";

import { messagesChat, socketState, stompClientState, userLogin, userOrGroupStatusState } from "../recoil/socket.atom";
import { API_URL } from "./config";

export default function useChat() {
  const [socket, setSocket] = useRecoilState(socketState);
  const [stompClient, setStompClient] = useRecoilState(stompClientState);
  const [userOnLogin, setUserOnLogin] = useRecoilState(userLogin);
  const [messagesChatState, setMessagesChatState] = useRecoilState(messagesChat);
  const [messageUserOrGroupStatus, setMessageUserOrGroupStatus] = useRecoilState(userOrGroupStatusState);

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
    if(socket.type === "user"){
      global.window.stompClient.send(
        "/app/chat/" + socket.selectedId,
        {},
        JSON.stringify({
          fromLogin: userOnLogin.id,
          message: text,
        })
      );
    }else if (socket.type === "group") {
      global.window.stompClient.send(
        "/app/chat/group/" + socket.selectedId,
        {},
        JSON.stringify({
          fromLogin: userOnLogin.id,
          message: text,
        })
      );
    }
  };

  const subscribeTopicUser = () => {
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
          setMessageUserOrGroupStatus((v) => {
            return [...v, {id: data.messageTo, noti: "new message"}]
          })
          
        }
      }
    );
  };

  const subscribeTopicGroup = () => {
    if (!global.window.stompClient) return;
    global.window.subscribeTopic = global.window.stompClient.subscribe(
      "/topic/messages/group/" + socket.selectedId,
      (response) => {
        let data = JSON.parse(response.body);
        console.log("data" + data.user_id);
          if(socket.selectedId === data.group_id){
            setMessagesChatState((v) => {
              return [...v, data];
            });
          }else{
            setMessageUserOrGroupStatus((v) => {
              return [...v, {id: data.group_id, noti: "new message"}]
            })
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
    subscribeTopicUser,
    subscribeTopicGroup,
    unsubscribeTopic,
    init,
    destroy,
    setSelectedUser,
    sendMessage,
    setUserSession,
    getMessage,
  };
}
