import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import SelectedList from "./SelectedList";
import {
  Button,
  FormControl,
  Form
} from "react-bootstrap";

const SearchForm = ( { changeSearchBy, handleSubmit }) => {

  const [filtro, setFiltro] = useState("");

  const handleChange = event => {
    event.preventDefault();
    setFiltro(event.target.value);
  };

  return (
    <>
      <SelectedList
        title="Buscar"
        options={["Todos", "Level", "Descrição", "Origem"]}
        handleChange={changeSearchBy}
        classname="p2 pr-1"
      />
      <Form noValidate onSubmit={(e) => handleSubmit(e, filtro)}>
        <FormControl
          placeholder="Filtrar por..."
          value={filtro}
          onChange={handleChange}
        />
      </Form>
      <Button variant="light" className="ml-1" onClick={(e) => handleSubmit(e, filtro)}>
        <FontAwesomeIcon icon={faSearch} />
      </Button>
    </>
  );
};

export default SearchForm;
