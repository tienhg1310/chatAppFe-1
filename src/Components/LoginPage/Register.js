import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import { toast } from "react-toastify";
export default function Register() {
  const [input, setInput] = useState({
    name: "Tien dan",
    username: "",
    email: "",
    phonenumber: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInput((v) => ({ ...v, [e.target.name]: e.target.value }));
  };

  const register = (e) => {
    e.preventDefault();
    console.log(input);
    axios
      .post("http://localhost:8080/auth/register", input)
      .then((response) => {
        console.log(response);
        navigate("/login");
        toast.success("Register success");
      })
      .catch((error) => {
        let data = error?.response?.data;
        if (data) {
          for (let key in data) {
            let message = data[key] || "An error occur";
            toast.error(message, {});
          }
        }
      });
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="form-title">Star Messenger</h2>
        <div className="tab-control">
          <h3 className="active tab-control-btn login">Sign up</h3>
        </div>
        <div className="register-form form active">
          <form onSubmit={register}>
            <input
              type="text"
              id="name"
              name="name"
              className="txt-input border"
              placeholder="Your name"
              required
              value={input.name}
              onChange={handleChange}
            />

            <input
              type="text"
              id="username"
              name="username"
              className="txt-input border"
              placeholder="Username"
              required
              value={input.username}
              onChange={handleChange}
            />

            <input
              type="email"
              id="email"
              name="email"
              className="txt-input border"
              placeholder="Email"
              required
              value={input.email}
              onChange={handleChange}
            />

            <input
              type="phonenumber"
              id="phonenumber"
              name="phonenumber"
              className="txt-input border"
              placeholder="Phone number"
              required
              value={input.phonenumber}
              onChange={handleChange}
            />

            <input
              type="password"
              id="password"
              name="password"
              className="txt-input border"
              placeholder="Password"
              required
              value={input.password}
              onChange={handleChange}
            />

            <button type="submit" className="btn btn-login border">
              Sign up
            </button>
            <p className="go-login">
              <span>You have an account?</span>
              <Link to="/login">Sign in</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
