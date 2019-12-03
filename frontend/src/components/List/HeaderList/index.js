import React, { Component } from "react";
import SelectedList from "../SelectedList";

class HeaderList extends Component {
  constructor(props) {
    super(props);
  }

  render(props) {
    return (
      <div>
        <div className="row container mb-3">
          <SelectedList
            classNameSelect={"custom-select col-lg-3"}
            options={["Produção", "Homologação", "Dev"]}
            setValue={this.props.changeProducao}
          />
          <SelectedList
            classNameSelect={"custom-select col-lg-2"}
            options={["Ordenar por", "Level", "Frequência"]}
            setValue={this.props.changeOrderBy}
          />
          <SelectedList
            classNameSelect={"custom-select col-lg-2"}
            options={["Buscar por", "Level", "Descrição", "Origem"]}
            setValue={this.props.changeSearchBy}
          />
          <div className="col-lg-5 input-group" style={{ padding: 0 }}>
            <input type="text" className="form-control" />
            <div className="input-group-append">
              <button
                type="button"
                class="btn btn-default"
                onClick={this.props.aplicarFiltro()}
              >
                <span class="glyphicon glyphicon-search"></span> Search
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
            onClick={this.props.archivedSelected}
          >
            Arquivar
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary col-lg-2 ml-3"
            onClick={this.props.deleteSelected}
          >
            Apagar
          </button>
        </div>
      </div>
    );
  }
}

export default HeaderList;
