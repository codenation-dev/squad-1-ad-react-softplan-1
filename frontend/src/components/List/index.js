import React, { Component } from "react";
import Itens from "./ItemsList";
import { Table } from "react-bootstrap";
import HeaderList from "./HeaderList";

class List extends Component {
  state = {
    fullList: [],
    listError: [],
    searchBy: ""
  };

  getListErrors() {
    fetch("http://localhost:3000/logs")
      .then(response => {
        if (!response.ok) throw new Error();

        return response.json();
      })
      .then(listError => {
        this.setState({ listError, fullList: listError });
        console.log(listError);
      })
      .catch(error => console.log("Erro Lista: ", error));
  }

  markedArchived(id) {
    // Definir como vai atualizar na API
  }

  deleteError(id) {
    // Definir como vai excluir na API
  }

  componentDidMount() {
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

  archivedSelected = () => {
    const listError = this.state.listError;
    let bUpdated = false;
    listError.forEach(item => {
      if (item.selected) {
        this.markedArchived(item.id);
        item.archived = item.selected;
        bUpdated = true;
      }
    });

    // Abaixo fazer o cógido abaixo ou chamar o método: getListErrors(); para evitar
    // consulta no banco de dados. Porém melhor deixar consultar para garantir os dados
    // ou terá que ter muito controle se foi concluído com sucesso a alteração
    if (bUpdated) {
      const listFilter = listError.filter(item => !item.archived);
      this.setState({ listError: listFilter });
    }
  };

  deleteSelected = () => {
    const listError = this.state.listError;

    let bUpdated = false;
    listError.forEach(item => {
      if (item.selected) {
        this.deleteError(item.id);
        item.removed = item.selected;
        bUpdated = true;
      }
    });

    // Abaixo fazer o cógido abaixo ou chamar o método: getListErrors();
    if (bUpdated) {
      const listFilter = listError.filter(item => !item.removed);
      this.setState({ listError: listFilter });
    }
  };

  aplicarFiltro = () => {
    // Vai filtrar no array ou no banco de dados ?
    // O Certo seria no banco de dados.
    // getListErrors(PassarParâmetrosNecessários)
  };

  changeAmbiente = filterAmbiente => {
    let filter = "";
    if (filterAmbiente === "Produção") filter = "production";
    if (filterAmbiente === "Homologação") filter = "homologation";
    if (filterAmbiente === "Dev") filter = "development";

    let listError = this.state.fullList;
    if (filter) listError = listError.filter(e => e.environment === filter);
    this.setState({ listError });
  };

  changeOrderBy = orderBy => {
    let listError = this.state.listError;
    if (orderBy === "Frequência") {
      listError.sort((a, b) => {
        return a.occurrences - b.occurrences;
      });
    }
    if (orderBy === "Level") {
      listError.sort((a, b) => {
        return a.level === "warning" ? 1 : -1;
      });
    }
    this.setState({ listError });
  };

  changeSearchBy = searchBy => this.setState({ searchBy });

  render() {
    const { listError } = this.state;
    return (
      <div className="m-3 p-4">
        <HeaderList
          changeAmbiente={this.changeAmbiente}
          changeOrderBy={this.changeOrderBy}
          changeSearchBy={this.changeSearchBy}
          aplicarFiltro={this.aplicarFiltro}
          archivedSelected={this.archivedSelected}
          deleteSelected={this.deleteSelected}
        />

        <Table className="table table-hover">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={e => this.selectedAll(e.target.checked)}
                />
              </th>
              <th>Level</th>
              <th>Log</th>
              <th>Eventos</th>
            </tr>
          </thead>
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
      </div>
    );
  }
}

export default List;
