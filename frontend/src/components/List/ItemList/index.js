import React from "react";

const Item = props => {
  const {
    _id,
    selected,
    level,
    description,
    origin,
    lastOccurrence,
    occurrences
  } = props.item;

  const changeSelected = idx => {
    let { item } = props;
    item.selected = !item.selected;
    props.changeItem(item, idx);
  };

  const goToErrorPage = () => {
    window.location = `./error/${_id}`;
  };

  return (
    <tr>
      <th scope="row">
        <input
          type="checkbox"
          checked={selected}
          onChange={() => changeSelected(props.idx)}
        />
      </th>
      <td onClick={goToErrorPage}>{level}</td>
      <td onClick={goToErrorPage} className="">
        <div>{description.title}</div>
        <div>{origin}</div>
        <div>{lastOccurrence.date.toString()}</div>
      </td>
      <td onClick={goToErrorPage}>{occurrences}</td>
    </tr>
  );
};

export default Item;
