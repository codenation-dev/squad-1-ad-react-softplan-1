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
import { archiveError, deleteError } from "../../services/Api";

const HeaderList = () => {
  const allErrors = useSelector(({ error: { allErrors } }) => allErrors);
  const filteredErrors = useSelector(({ error: { filteredErrors } }) => filteredErrors); 
  const user = useSelector(({ auth: { user } }) => user);
  const dispatch = useDispatch();

  const [filtro, setFiltro] = useState("");
  const [searchBy, setSearchBy] = useState("");

  const confirmAction = text => window.confirm(text);

  const removeDeleted = (id) => {
    dispatch(Actions.removeError(id))
  }

  const archiveSelected = () => {
    if (confirmAction('Todos os itens selecionados serão arquivados!')) {
      filteredErrors.forEach(item => {
        if (item.selected) {
          archiveError(item._id, removeDeleted, user);
        };
      });
    };
  };

  const deleteSelected = () => {
    if (confirmAction('Todos os itens selecionados serão excluídos!')) {
      filteredErrors.forEach(item => {
        if (item.selected) {
          deleteError(item._id, removeDeleted, user);
        };
      });
    };
  };

  const changeAmbiente = filterAmbiente => {
    const filters = {
      "Produção": "production",
      "Homologação": "homologation",
      "Dev": "development"
    };
    const filter = filters[filterAmbiente];
    let items = allErrors;
    if (filter) items = items.filter(e => e.environment === filter);
    dispatch(Actions.updateFilteredErrors(items));
  };

  const changeOrderBy = orderBy => {
    switch (orderBy) {
      case "Frequência":
        filteredErrors.sort((a, b) => a.occurrences - b.occurrences);
        break;
      case "Level":
        filteredErrors.sort((a, b) => a.level.localeCompare(b.level));
        break;
      default:
        filteredErrors.sort((a, b) => (
          new Date(b.lastOccurrence.date) - new Date(a.lastOccurrence.date))
        );
    }
    const items = filteredErrors.filter(e => e);
    dispatch(Actions.updateFilteredErrors(items));
  };

  const changeSearchBy = searchBy => setSearchBy(searchBy);

  const applyFilter = filter => {
    let items = []
    if (filter) {
      const pattern = new RegExp(filter.trim(), "i");
      switch (searchBy) {
        case "Level":
          items = allErrors.filter(item => item.level.match(pattern));
          break;
        case "Origem":
          items = allErrors.filter(item => item.environment.match(pattern));
          break;
        case "Descrição":
          items = allErrors.filter(item => {
            return (
              item.description.title.match(pattern) ||
              item.description.stacktrace.match(pattern)
            );
          });
          break;
        default:
          items = allErrors.filter(item => {
            return (
              item.description.title.match(pattern) ||
              item.description.stacktrace.match(pattern) ||
              item.origin.match(pattern) ||
              item.level.match(pattern) ||
              item.occurrences.toString().match(pattern)
            );
          });
      }
      dispatch(Actions.updateFilteredErrors(items));
    } else {
      dispatch(Actions.updateFilteredErrors(allErrors));
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    event.stopPropagation();
    applyFilter(filtro);
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
