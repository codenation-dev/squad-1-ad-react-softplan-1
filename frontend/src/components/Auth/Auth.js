const TOKEN_TAG = "token";

const setToken = () => localStorage.setItem(TOKEN_TAG, "1238192dasjdisoa2");

const getToken = () => localStorage.getItem(TOKEN_TAG);

const isAuth = () => getToken();

const login = ({ user, redirect }) => {
  if (user) {
    setToken();
    redirect();
  }
};

const logout = ({ redirect }) => {
  localStorage.removeItem(TOKEN_TAG);
  redirect();
};

export { setToken, getToken, login, logout };
export default isAuth;
