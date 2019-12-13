import React from "react";
import Item from "../ItemList";
import { Table, Form } from "react-bootstrap";

const Items = props => (
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>
          <Form.Check
            value={props.selectAll}
            checked={props.selectAll}
            onChange={e => props.setSelectAll(e.target.checked)}
          />
        </th>
        <th>Level</th>
        <th>Log</th>
        <th>Eventos</th>
      </tr>
    </thead>
    <tbody style={{cursor: "pointer"}}>
      {props.listError.map((item, idx) => {
        return (
          <Item
            key={idx}
            item={item}
            idx={idx}
            setSelected={props.setSelected}
            history={props.history}
          />
        );
      })}
    </tbody>
  </Table>
);

export default Items;
