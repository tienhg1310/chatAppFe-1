import { atom } from "recoil";

export const socketState = atom({
  key: "socket", // unique ID (with respect to other atoms/selectors)
  default: {
    selectedId: "",
    type: "",
  }, // default value (aka initial value)
});
export const stompClientState = atom({
  key: "stompClientState",
  default: null,
});

export const userLogin = atom({
  key: "userLoged",
  default: {
    id: null,
    username: "",
    accessToken: "",
  },
});

export const messagesChat = atom({
  key: "messagesChat",
  default: [],
});

export const userOrGroupStatusState = atom({
  key: "userOrGroupStatusState",
  default: [],
})
