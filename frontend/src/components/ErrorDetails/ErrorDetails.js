import React, { useState, useEffect } from "react";
import { ButtonGroup, Badge } from "react-bootstrap";
import { BackToHome } from "../BackToHome";
import { Loading } from "../Loading";
import { getErrorById } from "../../services/Api";
import { useSelector } from "react-redux";
import { formatDate } from "../../utils";

const ErrorDetails = props => {
  const user = useSelector(({ auth: { user } }) => user);

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

  const [isLoading, setIsLoading] = useState(true);

  const getItemById = async () => {
    setIsLoading(true);
    let data = await getErrorById(props.match.params.id, user);
    if (data.length === 0)
      props.history.push("/");
    setObjError(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getItemById();
  }, []);//eslint-disable-line
  // Desabilitado o eslint pois não vou ficar especificamente a função getItemById 

  return (
    <div className="m-3 p-4">
      <ButtonGroup className="mb-3">
        <BackToHome history={props.history} message="Voltar para lista" />
      </ButtonGroup>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <h1 className="mb-3">{`Erro no ${objError.origin} em ${formatDate(
            objError.lastOccurrence.date
          )}`}</h1>
          <div className="row d-flex align-items-center">
            <div className="col-sm-12 col-md-8">
              <h5>Título</h5>
              <p>{objError.description.title}</p>
              <h5>Detalhes</h5>
              <p>{objError.description.stacktrace}</p>
            </div>
            <div className="offset-md-1 col-sm-12 col-md-3">
              <div>
                <Badge variant="secondary">{objError.level}</Badge>
                <h5>Eventos</h5>
                <p>{objError.occurrences}</p>
              </div>
              <div>
                <h5>Coletado por</h5>
                <p>{user.name}</p>
                <p style={{overflowWrap: "break-word"}}>{user.authtoken}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ErrorDetails;
