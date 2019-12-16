import React from "react";
import { Navbar, NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { logout } from "../../services/Auth";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Creators as Actions } from "../../store/ducks/auth";
import { useSelector } from "react-redux";

const UserMenu = () => {
  const isAuth = useSelector(({ auth: { isAuth } }) => isAuth);
  const user = useSelector(({ auth: { user } }) => user);
  const dispatch = useDispatch();

  const SetUserLogeOut = () => {
    dispatch(Actions.setAuth(false));
    dispatch(Actions.setUser({}));
  };

  const handleLogout = () => {
    logout(SetUserLogeOut);
  };

  const firstName =
    user && user.name && user.name.split(" ")[0];

  const welcome = isAuth
    ? `Bem-vindo ${firstName}! Seu token é: ${user.token}`
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
        {isAuth ? (
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
