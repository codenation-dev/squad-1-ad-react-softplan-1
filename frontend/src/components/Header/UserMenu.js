import React from "react";
import { Navbar, NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { logout, getUser, isAuth } from "../../services/Auth";
import { Link } from "react-router-dom";

const UserMenu = () => {
  const handleLogout = () => {
    logout();
  };

  const firstName =
    getUser().user && getUser().user.name && getUser().user.name.split(" ")[0];

  const welcome = isAuth()
    ? `Bem-vindo ${firstName}! Seu token é: ${getUser().token}`
    : `Faça seu login`;

  return (
    <>
      <Navbar.Text className="d-md-block d-lg-block d-none d-xl-block">
        {welcome}
      </Navbar.Text>
      <NavDropdown
        title={<FontAwesomeIcon icon={faUser} size="2x" />}
        alignRight
      >
        {isAuth() ? (
          <Link to={"./login"} onClick={handleLogout}>
            Sair
          </Link>
        ) : (
          <div className="d-flex flex-column">
            <Link to={"./login"}>Login</Link>
            <Link to={"./signup"}>Cadastro</Link>
          </div>
        )}
      </NavDropdown>
    </>
  );
};

export default UserMenu;
