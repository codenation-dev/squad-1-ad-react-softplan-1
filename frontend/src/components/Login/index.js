import React from "react";
import "./Login.css";

const Login = () => {
  return (
    <div className="login-centralizar">
      <div className="login-main">
        <h1>Login</h1>
        <input type="text" placeholder="e-mail"></input>
        <input type="password" placeholder="password"></input>
        <button className="submit-btn">Login</button>
        <a href="/">Esqueci a senha</a>
      </div>
    </div>
  );
};

export default Login;
