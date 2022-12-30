import SockJS from "sockjs-client";
import { over } from "stompjs";
import { useRecoilState } from "recoil";
import { socketState, userLogin } from "../recoil/socket.atom";

import { API_URL } from "./config";
import { Stomp } from "@stomp/stompjs";

export default function useChat() {
  const [socket, setSocket] = useRecoilState(socketState);
  const [userOnLogin, setUserOnLogin] = useRecoilState(userLogin);

  const setUserSession = (id, username, accessToken) => {
    setUserOnLogin((v) => ({
      ...v,
      id: id,
      username: username,
      accessToken: accessToken,
    }));
  };

  const sendMessage = (from, text) => {
    socket.stompClient.send(
      "/app/chat/" + socket.selectedId,
      {},
      JSON.stringify({
        fromLogin: from,
        message: text,
      })
    );
  };

  const setSelectedId = (id) => {
    setSocket((v) => ({ ...v, selectedId: id }));
  };

var stompClient = null;

  const init = (userId) => {
    console.log("connecting...");
    var url = SockJS(`${API_URL}/ws`);
    stompClient = Stomp.over(url)
    console.log(stompClient)
    stompClient.connect(
      {Authorization: userOnLogin.accessToken},
      function(frame) {
        console.log("connected to: " + frame);

        stompClient.subscribe(
          "/topic/messages/" + userId,
          (response) => {
            console.log(response)
            let data = JSON.parse(response.body);
          }
        )
      }
    );
   
  };




  const destroy = () => {
    if (socket.stompClient) {
      socket.stompClient.disconnect();
    }

    setSocket({ stompClient: null, selectedId: "" });
  };

  return { init, destroy, setSelectedId, sendMessage, setUserSession };
}
