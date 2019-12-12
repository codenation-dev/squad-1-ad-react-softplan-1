import React, { useState, useEffect } from "react";
import { Button, ButtonGroup, Badge } from "react-bootstrap";
import { getErrorById } from "../../services/ApiService"

const ErrorDetails = props => {
  
  const errorId = props.match.params.id;

  const goToHomePage = () => {
    props.history.push("/");
  };

  // const [objError, setObjError] = useState([]);
  const [objError, setObjError] = useState({
    user: {
      email: "",
      name: ""
    },
    description: {
      title: "",
      stacktrace: ""
    },
    lastOccurrence: {
      date: new Date(),
      user: ""
    },
    origin: "",
    occurrences: 0,
    level: ""
  });

  const getError = () => {
    getErrorById(errorId)
      .then(data => setObjError(data))
      .catch(error =>
        console.log("Erro ao buscar os detalhes do erro! ", error)
      );
  }

  useEffect(() => {
    getError();
  }, []);

  return (
    <div className="m-3 p-4">
      <ButtonGroup className="mb-3">
        <Button variant="light" onClick={goToHomePage}>
          Voltar
        </Button>
      </ButtonGroup>
      <>
        <h1 className="mb-3">{`Erro no ${objError.origin} em ${objError.lastOccurrence.date}`}</h1>
        <div className="row d-flex align-items-center">
          <div className="col-sm-12 col-md-8">
            <h5>Título</h5>
            <p>{objError.description.title}</p>
            <h5>Detalhes</h5>
            <p>{objError.description.stacktrace}</p>
          </div>

          <div className="offset-md-1 col-sm-12 col-md-3">
            <div>
              <Badge variant="secondary">
                {objError.level}
              </Badge>
              <h5>Eventos</h5>
              <p>{objError.occurrences}.</p>
            </div>
            <div>
              <h5>Coletado por</h5>
              <p>{`(VERIFICAR COMO BUSCAR O TOKEN DO USUÁRIO) do usuário ${objError.user.name}`}</p>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default ErrorDetails;
