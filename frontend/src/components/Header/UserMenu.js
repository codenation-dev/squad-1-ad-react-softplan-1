import React from "react";
import { Navbar, NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { logout } from "../../services/Auth";
import { useDispatch } from "react-redux";
import { Creators as Actions } from "../../store/ducks/auth";
import { useSelector } from "react-redux";

const UserMenu = ({ history }) => {
  const isAuth = useSelector(({ auth: { isAuth } }) => isAuth);
  const user = useSelector(({ auth: { user } }) => user);
  const dispatch = useDispatch();

  const SetUserLogeOut = () => {
    dispatch(Actions.setAuth(false));
    dispatch(Actions.setUser({}));
  };

  const handleLogout = () => {
    logout(SetUserLogeOut);
    redirect("./login");
    
  };

  const redirect = path => {
    window.location = path;
  }

  const firstName =
    user && user.name && user.name.split(" ")[0];

  const welcome = isAuth
    ? `Bem-vindo ${firstName}! Seu token é: ${user.token}`
    : `Faça seu login`;

  return (
    <div className="d-flex flex-row justify-content-end align-items-center">
      <Navbar.Text className="d-md-block d-lg-block d-none d-xl-block">
        {welcome}
      </Navbar.Text>
      <NavDropdown
        title={<FontAwesomeIcon icon={faUser} size="2x" />}
        alignRight
      >
        {isAuth ? (
          <NavDropdown.Item onClick={handleLogout}>Sair</NavDropdown.Item>
        ) : (
          <div className="d-flex flex-column">
            <NavDropdown.Item onClick={() => redirect('./login')}>Login</NavDropdown.Item>
            <NavDropdown.Item onClick={() => redirect('./signup')}>Cadastro</NavDropdown.Item>
          </div>
        )}
      </NavDropdown>
    </div>
  );
};

export default UserMenu;
