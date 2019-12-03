import React from "react";

const SelectedList = (props) => {
 
  const handleChange = e => {
    props.setValue(e.target.value);
  };

  const options = props.options.map((elem, idx) => (
    <option key={idx} value={elem}>
      {elem}
    </option>
  ));

  return (
    <select
      value={props.value}
      onChange={handleChange}
      className={props.classNameSelect}
    >
      {options}
    </select>
  );
  
}

export default SelectedList;
