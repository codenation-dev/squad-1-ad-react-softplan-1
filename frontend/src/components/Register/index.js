import React from "react";
import "./Register.css";

const Register = () => {
  return (
    <div className="register-centralizar">
      <div className="register-main">
        <h1 className="register-title">Cadastro</h1>
        <input className="register-input-data" type="text" placeholder="e-mail"></input>
        <input className="register-input-data" type="password" placeholder="password"></input>
        <input className="register-input-data" type="password" placeholder="confirm password"></input>
        <button className="register-btn">Cadastrar</button>
      </div>
      <div>
        IMAGEM DESKTOP
      </div>
    </div>
  );
};

export default Register;
