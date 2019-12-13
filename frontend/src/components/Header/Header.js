import React from "react";
import { Navbar, NavDropdown, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReact } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { logout, getUser, isAuth } from "../../services/Auth";

const Header = () => {

  const redirect = () => {
    window.location = "./";
  }

  const handleLogout = () => {
    logout({ redirect });
  }

  const firstName = getUser().user && getUser().user.name && getUser().user.name.split(' ')[0];

  const welcome = isAuth() 
    ? `Bem-vindo ${firstName}! Seu token é: ${getUser().token}`
    : `Bem-vindo!`;

  //TODO Remover esta funcao - Apagar quando login estiver feito e redirecionar para ./login
  const login = () => {
    localStorage.setItem("user", JSON.stringify({"name": "Nome User"}))
    localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZjBkYmJjNmNjNDUyNDc2NDJhNzRkNyIsImlhdCI6MTU3NjA2NjEwMSwiZXhwIjoxNTc2MzI1MzAxfQ.PUYRVw5Ff9ThBqLH4s4RcOIrheXwHen9nhpso0f2R5U")
    redirect()
  }

  return (
    <Navbar bg="dark" variant="dark" sticky="top" expand="lg" className="align-items-center">
      <Navbar.Brand href="./">
        <FontAwesomeIcon icon={faReact} size="2x" className="d-inline-block align-middle"/>
         {' '} Central de Erros
      </Navbar.Brand>
      <Container className="justify-content-end">
        <Navbar.Text className="d-md-block d-lg-block d-none d-xl-block">{welcome}</Navbar.Text> 
        <NavDropdown title={<FontAwesomeIcon icon={faUser} size="2x"/>} alignRight >
          { isAuth()
              ? <NavDropdown.Item onClick={handleLogout}>Sair</NavDropdown.Item>
              : ( <>
                    <NavDropdown.Item onClick={login}>Login</NavDropdown.Item>
                    <NavDropdown.Item href="./login">Cadastro</NavDropdown.Item>
                  </> )
          }
        </NavDropdown>
      </Container>
    </Navbar>
  );
}

export default Header;