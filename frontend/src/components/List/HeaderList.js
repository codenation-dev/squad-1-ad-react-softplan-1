import React, { useState } from "react";
import SelectedList from "./SelectedList";
import {
  Button,
  ButtonGroup,
  InputGroup,
  FormControl,
  Form
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Creators as Actions } from "../../store/ducks/error";
import { useSelector } from "react-redux";
import { getErrors, archiveError, deleteError } from "../../services/Api";

const HeaderList = () => {
  const allErrors = useSelector(({ error: { allErrors } }) => allErrors);
  const filteredErrors = useSelector(({ error: { filteredErrors } }) => filteredErrors); 
  const dispatch = useDispatch();

  const [filtro, setFiltro] = useState("");
  const [searchBy, setSearchBy] = useState("");

  const confirmAction = text => window.confirm(text);

  const removeDeleted = (id) => {
    dispatch(Actions.removeError(id))
  }

  const archiveSelected = () => {
    filteredErrors.forEach(item => {
      if (item.selected) {
        if (confirmAction(`Deseja arquivar o item: ${item._id}`)) {
          archiveError(item._id, removeDeleted);
        }
      }
    });
  };

  const deleteSelected = () => {
    filteredErrors.forEach(item => {
      if (item.selected) {
        if (confirmAction(`Deseja deletar o item: ${item._id}`)) {
          deleteError(item._id, removeDeleted);
        }
      }
    });
  };

  const changeAmbiente = filterAmbiente => {
    let filters = {
      ["Produção"]: "production",
      ["Homologação"]: "homologation",
      ["Dev"]: "development"
    };
    let filter = filters[filterAmbiente];
    let items = allErrors;
    if (filter) items = items.filter(e => e.environment === filter);
    dispatch(Actions.updateFilteredErrors(items));
  };

  const changeOrderBy = orderBy => {
    if (orderBy === "Frequência") {
      filteredErrors.sort((a, b) => {
        return a.occurrences - b.occurrences;
      });
    }
    if (orderBy === "Level") {
      filteredErrors.sort((a, b) => {
        return a.level.localeCompare(b.level);
      });
    }
    //Falta ordenação por data
    let items = filteredErrors.filter(e => e);
    dispatch(Actions.updateFilteredErrors(items));
  };

  const changeSearchBy = searchBy => setSearchBy(searchBy);

  const aplicarFiltro = filtro => {
    //Falta arrumar para filtrar de acordo com o searchBy
    if (filtro !== "") {
      let items = allErrors.filter(item => {
        return (
          item.description.title.search(filtro) !== -1 ||
          item.description.stacktrace.search(filtro) !== -1 ||
          item.origin.search(filtro) !== -1 ||
          item.level.search(filtro) !== -1 ||
          item.occurrences.toString().search(filtro) !== -1
        );
      });
      dispatch(Actions.updateFilteredErrors(items));
    } else {
      dispatch(Actions.updateFilteredErrors(allErrors));
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    event.stopPropagation();
    aplicarFiltro(filtro);
  };

  const handleChange = event => {
    event.preventDefault();
    setFiltro(event.target.value);
  };

  return (
    <>
      <InputGroup>
        <SelectedList
          title="Origem"
          options={["Todas", "Produção", "Homologação", "Dev"]}
          handleChange={changeAmbiente}
          classname="pr-1 pb-2"
        />
        <SelectedList
          title="Ordenar por"
          options={["Data", "Level", "Frequência"]}
          handleChange={changeOrderBy}
          classname="pr-1 pb-2"
        />
        <SelectedList
          title="Buscar por"
          options={["Todos", "Level", "Descrição", "Origem"]}
          handleChange={changeSearchBy}
          classname="pr-1 pb-2"
        />
        <Form noValidate onSubmit={handleSubmit}>
          <FormControl
            placeholder="Filtrar por..."
            value={filtro}
            onChange={handleChange}
          />
        </Form>
        <ButtonGroup className="pb-3">
          <Button variant="light" className="mr-1" onClick={handleSubmit}>
            Pesquisar
          </Button>
        </ButtonGroup>
      </InputGroup>
      <ButtonGroup className="mb-3">
        <Button
          variant="light"
          className="mr-1"
          onClick={archiveSelected}
        >
          Arquivar
        </Button>
        <Button variant="light" className="mr-1" onClick={deleteSelected}>
          Apagar
        </Button>
      </ButtonGroup>
    </>
  );
};

export default HeaderList;
