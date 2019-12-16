const TOKEN_TAG = "token";
const USER_TAG = "user";

const setUser = async ({ user, token }, setUserLogedIn) => {
  localStorage.setItem(USER_TAG, JSON.stringify(user));
  localStorage.setItem(TOKEN_TAG, token);
  user.authtoken = token;
  user.token = token && token.substring(token.lastIndexOf(".") + 1);
  setUserLogedIn(user);
};

const logout = setUserLogeOut => {
  localStorage.removeItem(TOKEN_TAG);
  localStorage.removeItem(USER_TAG);
  setUserLogeOut();
};

const setUserFromStorage = setUserLogedIn => {
  const data = localStorage.getItem(USER_TAG);
  const token = localStorage.getItem(TOKEN_TAG);
  if (data && token) {
    let user = data && JSON.parse(data);
    user.authtoken = token;
    user.token = token && token.substring(token.lastIndexOf(".") + 1);
    setUserLogedIn(user);
  }
};

export { setUser, logout, setUserFromStorage };
