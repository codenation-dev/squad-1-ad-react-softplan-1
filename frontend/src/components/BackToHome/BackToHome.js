import React from "react";
import { Button } from "react-bootstrap";

const BackToHome = ({ history }) => {
  const goToHomePage = () => {
    history.push("/");
  };

  return (
    <Button variant="primary" onClick={goToHomePage}>
      Voltar para Home
    </Button>
  );
};

export default BackToHome;
