const TOKEN_TAG = "token";
const USER_TAG = "user";

const setUser = async ({ user, token }, setUserLogedIn) => {
  localStorage.setItem(USER_TAG, JSON.stringify(user));
  localStorage.setItem(TOKEN_TAG, token);
  user.authtoken = token;
  user.token = token && token.substring(token.lastIndexOf(".") + 1);
  setUserLogedIn(user);
};

const getUser = () => {
  const user = localStorage.getItem(USER_TAG);
  const token = localStorage.getItem(TOKEN_TAG);
  return {
    user: user && JSON.parse(user),
    authtoken: token,
    token: token && token.substring(token.lastIndexOf(".") + 1)
  };
};

const logout = setUserLogeOut => {
  localStorage.removeItem(TOKEN_TAG);
  localStorage.removeItem(USER_TAG);
  setUserLogeOut();
};

export { getUser, setUser, logout };
