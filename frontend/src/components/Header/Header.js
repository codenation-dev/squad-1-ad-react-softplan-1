import React from "react";
import { Navbar, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReact } from "@fortawesome/free-brands-svg-icons";
import { isMobile } from "react-device-detect";
import UserMenu from "./UserMenu.js";

const Header = () => (
  <Navbar
    bg="dark"
    variant="dark"
    sticky="top"
    expand="lg"
    className="align-items-center"
  >
    <Navbar.Brand href="./">
      <FontAwesomeIcon
        icon={faReact}
        size="2x"
        className="d-inline-block align-middle"
      />{" "}
      Central de Erros
    </Navbar.Brand>
    {isMobile ? (
      <UserMenu />
    ) : (
      <Container className="justify-content-end">
        <UserMenu />
      </Container>
    )}
  </Navbar>
);

export default Header;
