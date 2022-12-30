import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import { API_URL } from "../../common/config";


export default function Register() {
  const [input, setInput] = useState({
    name: "",
    password: "",
    status: 1,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInput((v) => ({ ...v, [e.target.name]: e.target.value }));
  };

  const register = (e) => {
    e.preventDefault();

    axios
      .post(`${API_URL}/auth/register`, input)
      .then((response) => {
        console.log(response);
        navigate("/login");
        toast.success("Register success");
        navigate("/Login")
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
              <span>You have an account? </span>
              <Link className="link" to="/login">
                SIGN IN
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
