import React, { useState } from "react";
import Button from "../../components/button/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Error from "../../components/Error/Error";
import Input from "../../components/input/Input";

const HeadLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ isError: false, message: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError({ isError: false, message: "" });

    const data = {
      email: email,
      password: password,
    };
    await axios
      .post("http://localhost:8000/api/v1/head/headin", data)
      .then((res) => {
        if (res.status === 200) {
          const { token } = res.data.data;
          localStorage.setItem("headToken", token);
          localStorage.setItem("headEmail", email);
          navigate("/headAllCommittees");
        }
      })
      .catch((err) => {
        setError({ isError: true, message: err.response.data.message });
        console.log(err.response);
      });
  };

  return (
    <>
      {error.isError && <Error message={error.message} />}
      <div className="check">
        <div className="login_container">
          <p className="login_title">Meeting Automation as head login</p>
          <form onSubmit={handleSubmit}>
            <div className="input_container">
              <label>E-Mail</label>
              <input
                type="text"
                id="email"
                value={email}
                placeholder="E-Mail"
                name="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>

            <div className="input_container">
              <label>Password</label>
              <input
                type="password"
                id="password"
                value={password}
                placeholder="Password"
                name="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <Link className="login_forgot_password" to="forgotpassword">
              Forgot Password ?
            </Link>
            <div className="login_btn_container">
              <Button title="log in" />
            </div>
          </form>
          <a href="/"> back</a>
        </div>
      </div>
    </>
  );
};

export default HeadLogin;
