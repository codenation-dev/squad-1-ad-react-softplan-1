import React from "react";
import Item from "./ItemList";
import { Table, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { setSelectedAll } from "../../actions";

const Items = props => (
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>
          <Form.Check
            value={props.allSelected}
            checked={props.allSelected}
            onChange={e =>
              props.setSelectedAll(props.allSelected, props.listError)
            }
          />
        </th>
        <th>Level</th>
        <th>Log</th>
        <th>Eventos</th>
      </tr>
    </thead>
    <tbody style={{ cursor: "pointer" }}>
      {props.listError.map((item, idx) => {
        return <Item key={idx} item={item} history={props.history} />;
      })}
    </tbody>
  </Table>
);

const mapStateToProps = state => ({
  listError: state.listError,
  allSelected: state.allSelected
});

const mapDispatchToProps = dispatch => ({
  setSelectedAll: (select, listError) =>
    dispatch(setSelectedAll(select, listError))
});

export default connect(mapStateToProps, mapDispatchToProps)(Items);
