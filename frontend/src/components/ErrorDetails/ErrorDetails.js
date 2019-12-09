import React from "react";
import { Badge } from "react-bootstrap";
const ErrorDetails = props => {
  const goToHomePage = () => {
    window.location = "/";
  };

  return (
    <div className="m-3 p-4">
      <button
        type="button"
        className="btn btn-outline-secondary offset-1 col-sm-2 ml-3 m-3"
        onClick={goToHomePage}
      >
        Voltar
      </button>
      <h1>Erro no 127.0.0.1 em 24/05/2019 10:15</h1>
      <p>Título</p>
      <Badge variant="secondary">Level: Error</Badge>
    </div>
  );
};

export default ErrorDetails;
