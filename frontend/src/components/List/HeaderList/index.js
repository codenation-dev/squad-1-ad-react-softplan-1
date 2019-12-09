import React, { useState } from "react";
import SelectedList from "../SelectedList";
import {
  Button,
  ButtonGroup,
  InputGroup,
  FormControl,
  Form
} from "react-bootstrap";

const HeaderList = props => {
  const [filtro, setFiltro] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    event.stopPropagation();
    props.aplicarFiltro(filtro);
  };

  const handleChange = event => {
    event.preventDefault();
    setFiltro(event.target.value);
  };

  return (
    <>
      <InputGroup className="mb-3">
        <SelectedList
          title="Origem"
          options={["Todas", "Produção", "Homologação", "Dev"]}
          handleChange={props.changeAmbiente}
        />
        <SelectedList
          title="Ordenar por"
          options={["Nenhum", "Level", "Frequência"]}
          handleChange={props.changeOrderBy}
        />
        <SelectedList
          title="Buscar por"
          options={["Todos", "Level", "Descrição", "Origem"]}
          handleChange={props.changeSearchBy}
        />
        <Form noValidate onSubmit={handleSubmit}>
          <FormControl
            placeholder="Filtrar por..."
            value={filtro}
            onChange={handleChange}
          />
        </Form>
        <InputGroup.Append>
          <InputGroup.Text>Pesquisar</InputGroup.Text>
        </InputGroup.Append>
      </InputGroup>
      <ButtonGroup className="mb-3">
        <Button variant="light" onClick={props.archivedSelected}>
          Arquivar
        </Button>
        <Button variant="light" onClick={props.deleteSelected}>
          Apagar
        </Button>
      </ButtonGroup>
    </>
  );
};

export default HeaderList;
