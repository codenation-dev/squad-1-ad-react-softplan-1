import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { createNewUser } from "../../services/Api.js";

const User = () => {
  const [validated, setValidated] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const createUser = async () => {
    if (await createNewUser(userName, userEmail, userPassword)) {
      redirect();
    }
  };

  const redirect = () => {
    window.location = "./login";
  };

  const handleSubmit = event => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }
    setValidated(true);
    createUser();
  };

  const handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;

    let actions = {
      ["nome"]: setUserName,
      ["email"]: setUserEmail,
      ["password"]: setUserPassword
    };

    actions[name](value);
  };

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Header>Novo Usuário</Card.Header>
      <Card.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group controlId="nameValidation">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Nome"
                value={userName}
                onChange={handleChange}
                autoFocus
                name="nome"
              />
              <Form.Control.Feedback>Nome válido!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Nome inválido!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="emailValidation">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="exemplo@email.com"
                value={userEmail}
                onChange={handleChange}
                name="email"
              />
              <Form.Control.Feedback>Email válido!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Email inválido!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="passwordValidation">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="******"
                value={userPassword}
                onChange={handleChange}
                name="password"
              />
              <Form.Control.Feedback>Senha válida!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Senha inválida!
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Button type="submit">Submit form</Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default User;
