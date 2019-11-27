import React from "react";
import "./Login.css";
import LogoError from "../../img/logo-error.png";

const Login = () => {
  return (
    <div className="login-centralizar">
      <div className="login-agrupar-logo">
        <div className="login-main">
          <h1 className="login-title">Login</h1>
          <input className="login-input-data" type="text" placeholder="e-mail"></input>
          <input className="login-input-data" type="password" placeholder="password"></input>
          <button className="login-btn">Login</button>
          <a href="/">Esqueci a senha</a>
          <a href="/">Cadastrar</a>
        </div>
        <div>
          <p className="login-logo">Colocar nossa Logo aqui</p>
          <img
            className="login-logo"
            src={LogoError}
            alt="logo" />
        </div>
      </div>
    </div>
  );
};

export default Login;
