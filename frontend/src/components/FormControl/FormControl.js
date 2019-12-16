import React from "react";
import { Form } from "react-bootstrap";

const FormControl = props => (
  <Form.Group controlId={props.controlId}>
    <Form.Label>{props.label}</Form.Label>
    <Form.Control
      {...(props.required === "true" && { required: true })}
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      {...(props.autoFocus === "true" && { autoFocus: true })}
      name={props.name}
    />
    <Form.Control.Feedback>{props.goodFeedback}</Form.Control.Feedback>
    <Form.Control.Feedback type="invalid">
      {props.badFeedback}
    </Form.Control.Feedback>
  </Form.Group>
);

export default FormControl;