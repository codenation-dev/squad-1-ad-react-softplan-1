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
          handleChange={props.changeSearchBy}
          classname="pr-1 pb-2"
        />
        <Form noValidate onSubmit={handleSubmit}>
          <FormControl
            placeholder="Filtrar por..."
            value={filtro}
            onChange={handleChange}
          />
        </Form>
        <InputGroup.Append className="pb-3">
          <InputGroup.Text>Pesquisar</InputGroup.Text>
        </InputGroup.Append>
      </InputGroup>
      <ButtonGroup className="mb-3">
        <Button variant="light" className="mr-1" onClick={props.archivedSelected}>
          Arquivar
        </Button>
        <Button variant="light" className="mr-1" onClick={props.deleteSelected}>
          Apagar
        </Button>
      </ButtonGroup>
    </>
  );
};

export default HeaderList;
