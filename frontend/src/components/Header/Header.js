import React from "react"
import { Navbar, NavDropdown, Container } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faReact } from "@fortawesome/free-brands-svg-icons"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { logout, getUser, isAuth } from "../../services/Auth"

const Header = () => {

  const redirect = () => {
    window.location = "./"
  }

  const handleLogout = () => {
    logout({ redirect })
  }

  const welcome = isAuth 
    ? `Bem-vindo ${getUser().user && getUser().user.name}! Seu token é: ${getUser().token}`
    : `Bem-vindo!`

  return (
    <Navbar bg="dark" variant="dark" sticky="top" expand="lg" className="align-items-center">
      <Navbar.Brand href="./">
        <FontAwesomeIcon icon={faReact} size="2x" className="d-inline-block align-middle"/>
         {' '} Central de Erros
      </Navbar.Brand>
      <Container className="justify-content-end">
        <Navbar.Text className="d-md-block d-lg-block d-none d-xl-block">{welcome}</Navbar.Text> 
        <NavDropdown title={<FontAwesomeIcon icon={faUser} size="2x"/>} alignRight >
          { isAuth
              ? <NavDropdown.Item onClick={handleLogout}>Sair</NavDropdown.Item>
              : <NavDropdown.Item href="./login">Entrar</NavDropdown.Item> }
        </NavDropdown>
      </Container>
    </Navbar>
  )
}

export default Header