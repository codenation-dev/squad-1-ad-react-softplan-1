import React from "react";
import SelectedList from "./SelectedList";

const SimpleFilters = ({ changeAmbiente, changeOrderBy, classname }) => (
  <>
    <SelectedList
      title="Origem"
      options={["Todas", "Produção", "Homologação", "Dev"]}
      handleChange={changeAmbiente}
      classname={classname}
    />
    <SelectedList
      title="Ordenar"
      options={["Data", "Level", "Frequência"]}
      handleChange={changeOrderBy}
      classname={classname}
    />
  </>
);

export default SimpleFilters;
