import axios from "axios";
import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_URL } from "../../common/config";

import useChat from "../../common/useChat";

export default function Login() {
  const [input, setInput] = useState({
    username: "Tien",
    password: "a",
  });

  const {setUserSession} = useChat();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInput((v) => ({ ...v, [e.target.name]: e.target.value }));
  };

  const login = (e) => {
    e.preventDefault();
    axios
      .post(`${API_URL}/auth/login`, input)
      .then((response) => {
        setUserSession(response.data.id, input.username, response.data.accessToken)
        navigate("/Home");
        toast.success("Login success");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Incorrect username or password!!");
        setInput({
          username: "",
          password: "",
        });
      });
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="form-title">Star Messenger</h2>
        <div className="tab-control">
          <h3 className="active tab-control-btn login">Sign in</h3>
        </div>
        <div className="login-form form active">
          <form onSubmit={login}>
            <input
              type="text"
              id="username"
              className="txt-input border"
              placeholder="Username"
              name="username"
              required
              value={input.username}
              onChange={handleChange}
            />
            <input
              type="password"
              id="password"
              className="txt-input border"
              placeholder="Password"
              name="password"
              required
              value={input.password}
              onChange={handleChange}
            />

            <button type="submit" className="btn btn-login border">
              Sign in
            </button>
            <p className="go-register">
              <span>Create an account? </span>
              <Link className="link" to="/register">
                SIGN UP
              </Link>{" "}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
