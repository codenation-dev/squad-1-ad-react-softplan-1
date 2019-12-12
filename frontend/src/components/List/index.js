import React, { useState, useEffect } from "react";
import Items from "./ItemsList";
import HeaderList from "./HeaderList";
import { getErrors } from "../../services/Api"

const List = props => {
  const [fullList, setFullList] = useState([]);
  const [listError, setListError] = useState([]);
  const [searchBy, setSearchBy] = useState("");
  const [selectAll, setSelectAll] = useState(false);

  const getListErrors = async () => {
    try {
      let errors = await getErrors();
      errors.forEach(item => {
        item.selected = false;
      });
      setFullList(errors);
      setListError(errors);
    } catch (error) {
      console.log("Erro ao buscar os itens da lista: ", error);
    }
  };

  useEffect(() => {
    getListErrors();
  }, []);

  useEffect(() => {
    listError.forEach(item => {
      item.selected = selectAll;
    });
    let items = listError.filter(e => e);
    setListError(items);
  }, [selectAll]);

  useEffect(() => {
    setListError(fullList);
  }, [fullList]);

  const setSelected = idx => {
    listError[idx].selected = !listError[idx].selected;
    let items = listError.filter(e => e);
    setListError(items);
  };

  const markedArchived = id => {
    // Definir como vai atualizar na API
  };

  const archiveSelected = () => {
    let items = listError;
    let bUpdated = false;
    listError.forEach(item => {
      if (item.selected) {
        markedArchived(item.id);
        item.archived = item.selected;
        bUpdated = true;
      }
    });

    // Abaixo fazer o cógido abaixo ou chamar o método: getListErrors(); para evitar
    // consulta no banco de dados. Porém melhor deixar consultar para garantir os dados
    // ou terá que ter muito controle se foi concluído com sucesso a alteração
    if (bUpdated) {
      items = items.filter(item => !item.archived);
      setFullList(items);
    }
  };

  const deleteError = id => {
    // Definir como vai excluir na API
  };

  const deleteSelected = () => {
    let items = listError;
    let bUpdated = false;
    items.forEach(item => {
      if (item.selected) {
        deleteError(item.id);
        item.removed = item.selected;
        bUpdated = true;
      }
    });

    // Abaixo fazer o cógido abaixo ou chamar o método: getListErrors();
    if (bUpdated) {
      items = items.filter(item => !item.removed);
      setFullList(items);
    }
  };

  const aplicarFiltro = filtro => {
    alert(`filtrou por:${searchBy} e ${filtro}`);
    setFullList([]);
    // Vai filtrar no array ou no banco de dados ?
    // O Certo seria no banco de dados.
    // getListErrors(PassarParâmetrosNecessários)
  };

  const changeAmbiente = filterAmbiente => {
    let filters = {
      ["Produção"]: "production",
      ["Homologação"]: "homologation",
      ["Dev"]: "development"
    };
    let filter = filters[filterAmbiente];
    let items = fullList;
    if (filter) items = items.filter(e => e.environment === filter);
    setListError(items);
  };

  const changeOrderBy = orderBy => {
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
    let items = listError.filter(e => e);
    setListError(items);
  };

  const changeSearchBy = searchBy => setSearchBy(searchBy);

  return (
    <div className="m-3 p-4">
      <HeaderList
        changeAmbiente={changeAmbiente}
        changeOrderBy={changeOrderBy}
        changeSearchBy={changeSearchBy}
        aplicarFiltro={aplicarFiltro}
        archivedSelected={archiveSelected}
        deleteSelected={deleteSelected}
      />
      <Items history={props.history}
        listError={listError}
        setSelected={setSelected}
        selectAll={selectAll}
        setSelectAll={setSelectAll}
      />
    </div>
  );
};

export default List;
