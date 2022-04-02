import React, { useState } from "react";
import axios from '../../axios/axios'

function MemberLogin() {
  const [loginCredential, setLoginCredential] = useState({
    email: "",
    password: "",
  });
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setLoginCredential({ ...loginCredential, [name]: value });
  };

  const loginHandler = () => {
      axios.post('/v1/head/headin', loginCredential).then(res => {
        console.log(res.data)
      }).catch(err => {
          console.log(err.response)
      })
    console.log(loginCredential);
  };
  return (
    <div style={{width: "80%", margin: "2rem auto"}}>
      <input
      type="text"
        placeholder="Email"
        name="email"
        value={loginCredential.email}
        onChange={inputHandler}
      />
      <br></br>
      <input
      type="password"
        placeholder="Password"
        name="password"
        value={loginCredential.password}
        onChange={inputHandler}
      />
      <br></br>
      <button onClick={loginHandler}>Login</button>
      <a href="/"> back</a>
    </div>
  );
}

export default MemberLogin;
