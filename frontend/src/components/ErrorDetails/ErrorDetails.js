import React, { useEffect } from "react";
import { ButtonGroup, Badge } from "react-bootstrap";
import { BackToHome } from "../BackToHome";
import { Loading } from "../Loading";
import { connect } from "react-redux";
import { getErrorId, getUserLogado } from "../../actions";

const ErrorDetails = props => {
  useEffect(() => {
    props.getErrorId(props.match.params.id);
    props.getUserLogado();
  }, []);

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

  return (
    <div className="m-3 p-4">
      <ButtonGroup className="mb-3">
        <BackToHome history={props.history} message="Voltar para lista" />
      </ButtonGroup>
      {props.isLoading || !props.objError ? (
        <Loading />
      ) : (
        <div>
          <h1 className="mb-3">{`Erro no ${
            props.objError.origin
          } em ${formatDate(props.objError.lastOccurrence.date)}`}</h1>
          <div className="row d-flex align-items-center">
            <div className="col-sm-12 col-md-8">
              <h5>Título</h5>
              <p>{props.objError.description.title}</p>
              <h5>Detalhes</h5>
              <p>{props.objError.description.stacktrace}</p>
            </div>
            <div className="offset-md-1 col-sm-12 col-md-3">
              <div>
                <Badge variant="secondary">{props.objError.level}</Badge>
                <h5>Eventos</h5>
                <p>{props.objError.occurrences}.</p>
              </div>
              <div>
                <h5>Coletado por</h5>
                {props.user ? (
                  <>
                    <p>{props.user.user.name}</p>
                    <p Style={"overflow-wrap: break-word;"}>
                      Token: {props.user.token}
                    </p>
                  </>
                ) : (
                  <p>Carregando...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  objError: state.objError,
  user: state.user,
  isLoading: state.isLoading
});

const mapDispatchToProps = dispatch => ({
  getErrorId: id => dispatch(getErrorId(id)),
  getUserLogado: () => dispatch(getUserLogado())
});

export default connect(mapStateToProps, mapDispatchToProps)(ErrorDetails);
