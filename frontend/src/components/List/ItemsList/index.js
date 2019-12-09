import React from "react";
import Item from "../ItemList";
import { Table } from "react-bootstrap";

const Items = props => (
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>
          <input
            type="checkbox"
            onChange={e => props.selectAll(e.target.checked)}
          />
        </th>
        <th>Level</th>
        <th>Log</th>
        <th>Eventos</th>
      </tr>
    </thead>
    <tbody>
      {props.listError.map((item, idx) => {
        return (
          <Item key={idx} item={item} idx={idx} changeItem={props.changeItem} />
        );
      })}
    </tbody>
  </Table>
);

export default Items;
