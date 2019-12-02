import React, { Component } from "react";
import Itens from "./ItemsList";
import { Table } from "react-bootstrap";

class List extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    listError: []
  };

  getListErrors() {
    fetch("http://localhost:3000/logs")
      .then(response => {
        if (!response.ok) throw new Error();

        return response.json();
      })
      .then(listError => this.setState({ listError }))
      .catch(error => console.log("Erro Lista: ", error));
  }

  componentDidMount() {
    console.log("montando");
    this.getListErrors();
  }

  changeItem = (item, idx) => {
    const listError = this.state.listError;
    listError[idx] = item;

    this.setState({ listError });
  };

  selectedAll = checked => {
    const listError = this.state.listError;

    listError.map(item => (item.selected = checked));

    this.setState({ listError });
  };

  handleArchivedSelected = () => {
    const listError = this.state.listError;

    listError.map(item => (item.archived = item.selected));
    // AtualizarBanco(listError);

    // Abaixo fazer o cógido abaixo ou chamar o método: getListErrors(); para evitar
    // consulta no banco de dados. Porém melhor deixar consultar para garantir os dados
    // ou terá que ter muito controle se foi concluído com sucesso a alteração
    const listFilter = listError.filter(item => !item.archived);
    this.setState({ listError: listFilter });
  };

  handleDeleteSelected = () => {
    const listError = this.state.listError;

    listError.map(item => (item.removed = item.selected));
    // AtualizarBanco(listError);

    // Abaixo fazer o cógido abaixo ou chamar o método: getListErrors(); para evitar
    // consulta no banco de dados. Porém melhor deixar consultar para garantir os dados
    // ou terá que ter muito controle se foi concluído com sucesso a exclusão
    const listFilter = listError.filter(item => !item.removed);
    this.setState({ listError: listFilter });
  };

  render() {
    const { listError } = this.state;
    return (
      <div className="m-3">
        <form className="p-4">
          {/* headerList */}
          <div className="row">
            <select className="custom-select col-lg-3">
              <option value="producao" selected>
                Produção
              </option>
              <option value="homologacao">Homologação</option>
              <option value="dev">Dev</option>
            </select>
            <select className="custom-select col-lg-2">
              <option value="" selected>
                Ordenar por
              </option>
              <option value="level">Level</option>
              <option value="frequencia">Frequência</option>
            </select>
            <select className="custom-select col-lg-2">
              <option selected>Buscar por</option>
              <option value="level">Level</option>
              <option value="descricao">Descrição</option>
              <option value="origem">Origem</option>
            </select>
            <div className="col-lg-5 input-group" style={{ padding: 0 }}>
              <input type="text" className="form-control" />
              <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="button">
                  <i className="material-icons" style={{ fontSize: "18px" }}>
                    search
                  </i>
                </button>
              </div>
            </div>
            {/* botões */}
            <div className="row container mb-4">
              <button
                type="button"
                className="btn btn-outline-secondary offset-1 col-lg-2"
                onClick={this.handleArchivedSelected}
              >
                Arquivar
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary col-lg-2 ml-3"
                onClick={this.handleDeleteSelected}
              >
                Apagar
              </button>
            </div>
            {/* table  */}
            <Table className="table table-hover">
              {/* Cabeçalho table */}
              <thead>
                <tr>
                  <th scope="col">
                    <input
                      type="checkbox"
                      onChange={e => {
                        this.selectedAll(e.target.checked);
                      }}
                    />
                  </th>
                  <th scope="col">Level</th>
                  <th scope="col">Log</th>
                  <th scope="col">Eventos</th>
                </tr>
              </thead>
              {/* Itens Table */}
              <tbody>
                {listError.map((item, idx) => {
                  return (
                    <Itens
                      key={idx}
                      item={item}
                      idx={idx}
                      changeItem={this.changeItem}
                    />
                  );
                })}
              </tbody>
            </Table>
            {/*  */}
          </div>
        </form>
      </div>
    );
  }
}

export default List;
