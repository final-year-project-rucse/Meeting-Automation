import React from "react";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="check">
      <div className="login_container">
        <p className="login_title">Meeting Automation</p>
        <Input type="text" placeholder="E-Mail" name="email" />
        <Input type="password" placeholder="Password" name="password" />
        <Link className="login_forgot_password" to="forgotpassword">
          Forgot Password ?
        </Link>
        <div className="login_btn_container">
          <Button title="log in" />
        </div>
      </div>
    </div>
  );
};

export default Login;
