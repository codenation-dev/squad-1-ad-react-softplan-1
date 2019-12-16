import React from "react";
import { Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReact } from "@fortawesome/free-brands-svg-icons";
import UserMenu from "./UserMenu.js";

const Header = ({ history }) => (
  <Navbar
    bg="dark"
    variant="dark"
    sticky="top"
    expand="lg"
    className="d-flex align-items-center justify-content-between"
  >
    <Navbar.Brand href="./">
      <FontAwesomeIcon
        icon={faReact}
        size="2x"
        className="d-inline-block align-middle"
      />{" "}
        Central de Erros
    </Navbar.Brand>
    <UserMenu history={history}/>
  </Navbar>
);

export default Header;
