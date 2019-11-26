import React from "react";
import "./Login.css";

const Login = () => {
  return (
    <div className="login-centralizar">
      <div className="login-main">
        <h1 className="login-title">Login</h1>
        <input className="login-input-data" type="text" placeholder="e-mail"></input>
        <input className="login-input-data" type="password" placeholder="password"></input>
        <button className="login-btn">Login</button>
        <a href="/">Esqueci a senha</a>
      </div>
    </div>
  );
};

export default Login;
