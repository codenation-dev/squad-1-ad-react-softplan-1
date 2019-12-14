import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { loginUser } from "../../services/Api.js";
import { FormControl } from "../../components/FormControl";

const Login = props => {
  const [validated, setValidated] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const login = async () => {
    if (await loginUser(userEmail, userPassword)) {
      redirect();
    }
  };

  const redirect = () => {
    props.history.push("/");
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
    login();
  };

  const handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;

    let actions = {
      ["email"]: setUserEmail,
      ["password"]: setUserPassword
    };

    actions[name](value);
  };

  return (
    <div className="p-5 d-flex justify-content-center align-items-center">
      <Card style={{ width: "18rem" }}>
        <Card.Header>Login</Card.Header>
        <Card.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Row>
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
            <Button type="submit">Login</Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
