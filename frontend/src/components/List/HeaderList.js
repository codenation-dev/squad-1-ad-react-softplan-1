import React, { useState } from "react";
import SelectedList from "./SelectedList";
import {
  Button,
  ButtonGroup,
  InputGroup,
  FormControl,
  Form
} from "react-bootstrap";

import { connect } from "react-redux";
import {
  archiveSelected,
  deleteSelected,
  changeAmbiente,
  changeOrderBy,
  applyFilter
} from "../../actions";

const HeaderList = props => {
  const [filtro, setFiltro] = useState("");
  const [, setSearchBy] = useState("");

  const changeSearchBy = searchBy => setSearchBy(searchBy);

  const handleSubmit = event => {
    event.preventDefault();
    event.stopPropagation();
    props.applyFilter(filtro);
  };

  const handleChange = event => {
    event.preventDefault();
    setFiltro(event.target.value);
  };

  const handleArchive = () => {
    if (window.confirm("Deseja arquivar todos os itens selecionados?")) {
      props.archiveSelected(props.listError);
    }
  };

  const handleDelete = () => {
    if (window.confirm("Deseja deletar todos os itens selecionados?")) {
      props.deleteSelected(props.listError);
    }
  };

  return (
    <>
      <InputGroup>
        <SelectedList
          title="Origem"
          options={["Todas", "Produção", "Homologação", "Dev"]}
          handleChange={props.changeAmbiente}
          classname="pr-1 pb-2"
        />
        <SelectedList
          title="Ordenar por"
          options={["Data", "Level", "Frequência"]}
          handleChange={props.changeOrderBy}
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
        <Button variant="light" className="mr-1" onClick={handleArchive}>
          Arquivar
        </Button>
        <Button variant="light" className="mr-1" onClick={handleDelete}>
          Apagar
        </Button>
      </ButtonGroup>
    </>
  );
};

const mapStateToProps = state => ({
  listError: state.listError
});

const mapDispatchToProps = dispatch => ({
  archiveSelected: listErrors => dispatch(archiveSelected(listErrors)),
  deleteSelected: listErrors => dispatch(deleteSelected(listErrors)),
  changeAmbiente: filterAmbiente => dispatch(changeAmbiente(filterAmbiente)),
  changeOrderBy: orderBy => dispatch(changeOrderBy(orderBy)),
  applyFilter: filter => dispatch(applyFilter(filter))
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderList);
