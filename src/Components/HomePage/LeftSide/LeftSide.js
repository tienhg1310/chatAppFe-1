/* eslint-disable jsx-a11y/img-redundant-alt */
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";

import { API_URL } from "../../../common/config";
import useChat from "../../../common/useChat";

import { userLogin } from "../../../recoil/socket.atom";

export default function LeftSide() {
  const userLoged = useRecoilValue(userLogin);
  const [usersOrGroups, setUsersOrGroups] = useState([]);
  const [isActiveUserOrGroup, setIsActiveUserOrGroup] = useState(true);

  const navigate = useNavigate();

  const selectUser = (e) => {
    e.preventDefault();
    if (userLoged.id == null) {
      toast.error("Xin mời đăng nhập!");
      navigate("/Login");
    } else {
      axios
        .get(`${API_URL}/fetchAllUsers/${userLoged.id}`, {
          headers: { 'Authorization': `Bearer ${userLoged.accessToken}` },
        })
        .then((res) => {
          // console.log(res);
          setUsersOrGroups([]);
          setIsActiveUserOrGroup(true);
          setUsersOrGroups(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const selectGroup = (e) => {
    e.preventDefault();
    if (userLoged.id == null) {
      toast.error("Xin mời đăng nhập!");
      navigate("/Login");
    } else {
      axios
        .get(`${API_URL}/fetchAllGroups/${userLoged.id}`, {
          headers: { 'Authorization': `Bearer ${userLoged.accessToken}` },
        })
        .then((res) => {
          setUsersOrGroups([]);
          setIsActiveUserOrGroup(false);
          setUsersOrGroups(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const { setSelectedId } = useChat();

  return (
    <div className="left-side">
      <h2 style={{ textAlign: "center" }}>
        {isActiveUserOrGroup ? "Chat with User" : "Chat With Group"}
      </h2>
      <div className="tab-control">
        <i
          className={isActiveUserOrGroup ? "fa-solid fa-user active" : "fa-solid fa-user"}
          onClick={selectUser}></i>
        <i
          className={
            isActiveUserOrGroup ? "fa-solid fa-user-group" : "fa-solid fa-user-group active"
          }
          onClick={selectGroup}></i>
      </div>

      <div className="list-user">
        <ul>
          {usersOrGroups.map((userOrGroup) => (
            <li
              key={userOrGroup.id}
              onClick={() => {
                setSelectedId(userOrGroup.id);
                // console.log('selected id' + userOrGroup.id)
              }}>
              <div className="user-contain">
                <div className="user-img">
                  <img src="../img/user-male.jpg" alt="Image of user" />
                  <div className="user-img-dot"></div>
                </div>
                <div className="user-info">
                  <span className="user-name">{userOrGroup.name || userOrGroup.group_name}</span>
                  <span className="user-last-message">Hello!</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
