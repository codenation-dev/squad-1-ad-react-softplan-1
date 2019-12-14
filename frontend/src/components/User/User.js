import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { createNewUser } from "../../services/Api.js";
import { FormControl } from "../Common/FormControl";

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
            <FormControl
              controlId="nomeValidation"
              label="Nome"
              required="true"
              type="text"
              placeholder="Nome"
              value={userName}
              onChange={handleChange}
              autoFocus="true"
              name="nome"
              goodFeedback="Nome válido!"
              badFeedback="Nome inválido!"
            />
            <FormControl
              controlId="emailValidation"
              label="Email"
              required="true"
              type="email"
              placeholder="exemplo@email.com"
              value={userEmail}
              onChange={handleChange}
              autoFocus="false"
              name="email"
              goodFeedback="Email válido!"
              badFeedback="Email inválido!"
            />
            <FormControl
              controlId="passwordValidation"
              label="Senha"
              required="true"
              type="password"
              placeholder="******"
              value={userPassword}
              onChange={handleChange}
              name="password"
              goodFeedback="Senha válida!"
              badFeedback="Senha inválida!"
            />
          </Form.Row>
          <Button type="submit">Submit form</Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default User;
