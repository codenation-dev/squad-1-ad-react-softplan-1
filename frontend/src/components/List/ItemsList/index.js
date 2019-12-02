import React, { Component } from "react";

class Item extends Component {
  constructor(props) {
    super(props);
  }

  changeSelected = idx => {
    let { item } = this.props;
    item.selected = !item.selected;
    this.props.changeItem(item, idx);
  };

  render() {
    const {
      selected,
      level,
      description,
      origin,
      lastOccurrence,
      occurrences
    } = this.props.item;

    return (
      <tr>
        <th scope="row">
          <input
            type="checkbox"
            checked={selected}
            onChange={event => {
              this.changeSelected(this.props.idx);
            }}
          />
        </th>
        <td>{level}</td>
        <td className="">
          <div>{description.title}</div>
          <div>{origin}</div>
          <div>{lastOccurrence.date.toString()}</div>
        </td>
        <td>{occurrences}</td>
      </tr>
    );
  }
}

export default Item;
