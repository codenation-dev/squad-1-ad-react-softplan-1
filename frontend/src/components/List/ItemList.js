import React from "react";
import { Form } from "react-bootstrap";
import { connect } from "react-redux";
import { setSelected } from "../../actions";

const Item = props => {
  const handleChange = () => {
    props.setSelected(props.item._id);
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
        <div>{props.item.description.title}</div>
        <div>{props.item.origin}</div>
      </td>
      <td onClick={goToErrorPage}>{props.item.occurrences}</td>
    </tr>
  );
};

const mapDispatchToProps = dispatch => ({
  setSelected: selected => dispatch(setSelected(selected))
});

export default connect(null, mapDispatchToProps)(Item);
