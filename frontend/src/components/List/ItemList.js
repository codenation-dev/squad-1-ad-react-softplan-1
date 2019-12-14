import React from "react";
import { Form } from "react-bootstrap";

const Item = props => {
  const handleChange = () => {
    props.setSelected(props.idx);
  };

  const goToErrorPage = () => {
    props.history.push(`./error-details/${props.item._id}`);
  };

  return (
    <tr>
      <th scope="row" style={{ cursor: "pointer" }}>
        <Form.Check
          inline
          type="checkbox"
          value={props.item.selected}
          checked={props.item.selected}
          onChange={() => handleChange()}
        />
      </th>
      <td onClick={goToErrorPage}>{props.item.level}</td>
      <td onClick={goToErrorPage} className="">
        {console.log(props.item)}
        <div>{props.item.description.title}</div>
        <div>{props.item.origin}</div>
      </td>
      <td onClick={goToErrorPage}>{props.item.occurrences}</td>
    </tr>
  );
};

export default Item;
