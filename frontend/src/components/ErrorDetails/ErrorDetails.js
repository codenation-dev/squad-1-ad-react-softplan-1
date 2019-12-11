import React, { useState, useEffect } from "react";
import { Button, ButtonGroup, Badge } from "react-bootstrap";

const ErrorDetails = props => {
  const goToHomePage = () => {
    props.history.push("/");
  };

  const [objError, setObjError] = useState({
    level: "",
    origin: "",
    description: {
      title: "",
      stacktrace: ""
    },
    occurrences: 0,
    lastOccurrence: {
      date: new Date(),
      user: ""
    },
    removed: false,
    archived: false
  });

  // const [objError, setObjError] = useState({
  //   level: "error",
  //   origin: "127.0.0.2",
  //   description: {
  //     title: "Error: Cannot find module ./logs/log.route",
  //     stacktrace: `at Function.Module._resolveFilename (internal/modules/cjs/loader.js:581:15)
  //     at Function.Module._load (internal/modules/cjs/loader.js:507:25)
  //     at Module.require (internal/modules/cjs/loader.js:637:17)
  //     at require (internal/modules/cjs/helpers.js:20:18)
  //     at Object.<anonymous> (/codenation/desafio/squad-1-ad-react-softplan-1/src/server.js:5:14)
  //     at Module._compile (internal/modules/cjs/loader.js:689:30)
  //     at Object.Module._extensions..js (internal/modules/cjs/loader.js:700:10)
  //     at Module.load (internal/modules/cjs/loader.js:599:32)
  //     at tryModuleLoad (internal/modules/cjs/loader.js:538:12)
  //     at Function.Module._load (internal/modules/cjs/loader.js:530:3)
  //     at Function.Module.runMain (internal/modules/cjs/loader.js:742:12)
  //     at startup (internal/bootstrap/node.js:279:19)
  //     at bootstrapNodeJSCore (internal/bootstrap/node.js:696:3)`
  //   },
  //   occurrences: 5,
  //   lastOccurrence: {
  //     date: new Date(),
  //     user: "Squad react"
  //   }
  // });

  const retornarData = date => {
    const dayName = new Array(
      "domingo",
      "segunda",
      "terça",
      "quarta",
      "quinta",
      "sexta",
      "sábado"
    );
    const monName = new Array(
      "janeiro",
      "fevereiro",
      "março",
      "abril",
      "Maio",
      "junho",
      "julho",
      "agosto",
      "setembro",
      "outubro",
      "novembro",
      "dezembro"
    );

    return `${date.getDate()} de ${
      monName[date.getMonth()]
    } de ${date.getFullYear()}.`;
  };
  useEffect(() => {
    setObjError();
    fetch(`http://localhost:3030/logs/${props.match.params.id}`)
      .then(response => {
        if (!response.ok) throw new Error();
        return response.json();
      })
      .then(data => setObjError(data))
      .catch(error =>
        console.log("Erro ao buscar os detalhes do erro! ", error)
      );
  });

  return (
    <div className="m-3 p-4">
      <ButtonGroup className="mb-3">
        <Button variant="light" onClick={goToHomePage}>
          Voltar
        </Button>
      </ButtonGroup>
      <>
        <h1 className="mb-3">{`Erro no ${objError.origin} em ${retornarData(
          objError.lastOccurrence.date
        )}`}</h1>
        {console.log(props.match.params.id)}
        <div className="row d-flex align-items-center">
          <div className="col-sm-12 col-md-8">
            <h2 className="h5">Título</h2>
            <p>{objError.description.title}</p>
            <h2 className="h5">Detalhes</h2>
            <p>{objError.description.stacktrace}</p>
          </div>

          <div className="offset-md-1 col-sm-12 col-md-3">
            <div>
              <Badge className="h5" variant="secondary">
                {objError.level}
              </Badge>
              <h2 className="h5">Eventos</h2>
              <p>{objError.occurrences}.</p>
            </div>
            <div>
              <h2 className="h5">Coletado por</h2>
              <p>VERIFICAR COMO BUSCAR O TOKEN DO USUÁRIO</p>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default ErrorDetails;
