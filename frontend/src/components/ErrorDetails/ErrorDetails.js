import React, { useState, useEffect } from "react";
import { ButtonGroup, Badge } from "react-bootstrap";
import { BackToHome } from "../BackToHome";
import { Loading } from "../Loading";
import { getErrorById } from "../../services/Api";
import { getUser } from "../../services/Auth.js";

const ErrorDetails = props => {
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
  const [user, setUser] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const getItemById = async () => {
    setIsLoading(true);
    let data = await getErrorById(props.match.params.id);
    if (data.length === 0)
      props.history.push("/");
    setObjError(data);
    setIsLoading(false);
  };

  const formatDate = dateString => {
    const date = dateString && new Date(dateString);
    const day =
      date &&
      date
        .getDate()
        .toString()
        .padStart(2, "0");
    const month = date && (date.getMonth() + 1).toString().padStart(2, "0");
    const hour =
      date &&
      date
        .getHours()
        .toString()
        .padStart(2, "0");
    const minute =
      date &&
      date
        .getMinutes()
        .toString()
        .padStart(2, "0");
    return `${day}/${month}/${date && date.getFullYear()} ${hour}:${minute}`;
  };

  useEffect(() => {
    setUser(getUser());
    getItemById();
  }, []);

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
                <p>{objError.occurrences}.</p>
              </div>
              <div>
                <h5>Coletado por</h5>
                <p>{user.user.name}</p>
                <p Style="overflow-wrap: break-word;">{user.authtoken}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ErrorDetails;
