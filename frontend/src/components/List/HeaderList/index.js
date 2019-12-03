import React from "react";
import SelectedList from "../SelectedList";

const HeaderList = (props) => {
  return (
    <div>
      <div className="row container mb-3">
        <SelectedList
          classNameSelect={"custom-select col-lg-3"}
          options={["Produção", "Homologação", "Dev"]}
          setValue={props.changeProducao}
          value={props.filterHomologProduDev}
        />
        <SelectedList
          classNameSelect={"custom-select col-lg-2"}
          options={["Ordenar por", "Level", "Frequência"]}
          setValue={props.changeOrderBy}
          value={props.orderBy}
        />
        <SelectedList
          classNameSelect={"custom-select col-lg-2"}
          options={["Buscar por", "Level", "Descrição", "Origem"]}
          setValue={props.changeSearchBy}
          value={props.searchBy}
        />
        <div className="col-lg-5 input-group" style={{ padding: 0 }}>
          <input type="text" className="form-control" />
          <div className="input-group-append">
            <button
              type="button"
              className="btn btn-default"
              onClick={props.aplicarFiltro()}
            >
              <span className="glyphicon glyphicon-search"></span> Search
            </button>
            {/* <button className="btn btn-outline-secondary" type="button">
                <i className="material-icons" style={{ fontSize: "18px" }}>
                  search
                </i>
              </button> */}
          </div>
        </div>
      </div>
      <div className="row container mb-4">
        <button
          type="button"
          className="btn btn-outline-secondary offset-1 col-lg-2 ml-3"
          onClick={props.archivedSelected}
        >
          Arquivar
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary col-lg-2 ml-3"
          onClick={props.deleteSelected}
        >
          Apagar
        </button>
      </div>
    </div>
  );
}

export default HeaderList;
