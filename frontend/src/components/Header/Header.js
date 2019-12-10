import React from "react"
import { Navbar, NavDropdown, Container } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faReact } from "@fortawesome/free-brands-svg-icons"
import { faUser } from "@fortawesome/free-solid-svg-icons"

const Header = ({ user }) => {

  const welcome = user 
    ? `Bem-vindo ${user.name}! Seu token é: ${user.token}`
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
          { user
              ? <NavDropdown.Item href="./logout">Sair</NavDropdown.Item>
              : <NavDropdown.Item href="./login">Entrar</NavDropdown.Item> }
        </NavDropdown>
      </Container>
    </Navbar>
  )
}

export default Header