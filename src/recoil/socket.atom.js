import { atom } from "recoil";

export const socketState = atom({
  key: "socket", // unique ID (with respect to other atoms/selectors)
  default: {
    stompClient: null,
    selectedId: "",
  }, // default value (aka initial value)
});

export const userLogin = atom({
  key: "userLoged",
  default: {
    id: null,
    username: "",
    accessToken: ""
  }
})