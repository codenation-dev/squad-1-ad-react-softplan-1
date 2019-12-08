import React from "react";

const SelectedList = (props) => {
 
  const options = props.options.map((elem, idx) => (
    <option key={idx} value={elem}>
      {elem}
    </option>
  ));

  return (
    <select
      onChange={(e) => props.handleChange(e.target.value)}
      className={props.classNameSelect}
    >
      {options}
    </select>
  );
  
}

export default SelectedList;
