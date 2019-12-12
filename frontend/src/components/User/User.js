import React from "react";
import { Card, Form, Button } from "react-bootstrap";

const User = () => (
  <Card>
    <Card.Header>Novo Usuárioader</Card.Header>
    <Card.Body>
      <Card.Text>
        <Form>
          <Form.Group controlId="formGridName1">
            <Form.Label>Nome</Form.Label>
            <Form.Control placeholder="Seu nome" />
          </Form.Group>

          <Form.Group controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Seu email" />
          </Form.Group>

          <Form.Group controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Sua senha" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Card.Text>
    </Card.Body>
  </Card>
);

export default User;
