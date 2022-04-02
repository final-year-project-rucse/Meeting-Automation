import React, { useState } from "react";
import Button from "../../components/button/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      email: email,
      password: password,
    };
    await axios
      .post("http://localhost:8000/api/v1/user/signin", data)
      .then((res) => {
        if(res.status == 200){
          const {token} = res.data.data;
          localStorage.setItem("token",token);
          navigate("/committees")
        }
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="check">
      <div className="login_container">
        <p className="login_title">Meeting Automation</p>
        <form onSubmit={handleSubmit}>
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
          <input
            type="password"
            id="password"
            value={password}
            placeholder="Password"
            name="password"
            onChange={(e)=>{
              setPassword(e.target.value)
            }}
          />
          <br/>
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
  );
};

export default Login;
