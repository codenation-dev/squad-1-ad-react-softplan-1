import React from "react";

import { ErrorDetails } from "../../components/ErrorDetails";

const Error = props => {
  return (
    <div>
      <ErrorDetails id={props.match.params.id}></ErrorDetails>
    </div>
  );
};

export default Error;
