import React, { useState, useEffect } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { loginUser } from "../../services/Api.js";
import { FormControl } from "../../components/FormControl";
import { setUser, setUserFromStorage } from "../../services/Auth";
import { useDispatch } from "react-redux";
import { Creators as Actions } from "../../store/ducks/auth";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Login = props => {
  const [validated, setValidated] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const isAuth = useSelector(({ auth: { isAuth } }) => isAuth);
  const dispatch = useDispatch();

  const SetUserOnStorage = async (user, setUserLogedIn) => {
    await setUser(user, setUserLogedIn);
  };

  const SetUserLogedIn = user => {
    dispatch(Actions.setAuth(true));
    dispatch(Actions.setUser(user));
  };

  const login = async () => {
    if (
      await loginUser(userEmail, userPassword, SetUserOnStorage, SetUserLogedIn)
    ) {
      redirectToHome();
    }
  };

  const redirectToHome = () => {
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

  useEffect(() => {
    //console.clear();
    setUserFromStorage(SetUserLogedIn);
  }, []);

  useEffect(() => {
    if (isAuth) redirectToHome();
  }, [isAuth]);

  const cardSize = {
    width: "250px",
    minWidth: "250px"
  };

  return (
    <div className="p-5 d-flex justify-content-center align-items-center">
      <Card style={cardSize}>
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
            <div className="d-flex justify-content-between align-items-end">
              <Button type="submit">Login</Button>
              <Link to={"./signup"}>Cadastrar</Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
