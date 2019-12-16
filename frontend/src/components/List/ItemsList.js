import React, { useState, useEffect } from "react";
import Item from "./ItemList";
import { Table, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Creators as Actions } from "../../store/ducks/error";
import { useSelector } from "react-redux";

const Items = props => {
  const filteredErrors = useSelector(({ error: { filteredErrors } }) => filteredErrors);
  const dispatch = useDispatch();

  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    filteredErrors.forEach(item => {
      item.selected = selectAll;
    });
    let items = filteredErrors.filter(e => e);
    dispatch(Actions.updateFilteredErrors(items));
  }, [selectAll]);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>
            <Form.Check
              value={selectAll}
              checked={selectAll}
              onChange={e => setSelectAll(e.target.checked)}
            />
          </th>
          <th>Level</th>
          <th>Log</th>
          <th>Eventos</th>
        </tr>
      </thead>
      <tbody style={{ cursor: "pointer" }}>
        {filteredErrors.map((item, idx) => {
          return (
            <Item
              key={idx}
              item={item}
              idx={idx}
              history={props.history}
            />
          );
        })}
      </tbody>
    </Table>
  );
}

export default Items;