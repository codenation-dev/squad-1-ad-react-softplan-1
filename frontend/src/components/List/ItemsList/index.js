import React from "react";
import Item from "../ItemList";
import { Table, InputGroup } from "react-bootstrap";

const Items = props => (
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>
          <InputGroup>
            <InputGroup.Checkbox
              value={props.selectAll}
              checked={props.selectAll}
              onChange={e => props.setSelectAll(e.target.checked)}
            />
          </InputGroup>
        </th>
        <th>Level</th>
        <th>Log</th>
        <th>Eventos</th>
      </tr>
    </thead>
    <tbody>
      {props.listError.map((item, idx) => {
        return (
          <Item
            key={idx}
            item={item}
            idx={idx}
            setSelected={props.setSelected}
          />
        );
      })}
    </tbody>
  </Table>
);

export default Items;
