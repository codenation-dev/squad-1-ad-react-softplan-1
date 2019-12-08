import React from "react";
import { Dropdown } from "react-bootstrap";

const SelectedList = (props) => {
  const options = props.options.map((elem, idx) => (
    <Dropdown.Item eventKey={elem} key={idx}>
      {elem}
    </Dropdown.Item>
  ));

  return (
    <Dropdown 
      title="Dropdown"
      id={props.title}
      key={props.title}
      onSelect={(e) => props.handleChange(e)}
    >
      <Dropdown.Toggle variant="primary">
        {props.title}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {options}
      </Dropdown.Menu>      
    </Dropdown >
  );
  
}

export default SelectedList;