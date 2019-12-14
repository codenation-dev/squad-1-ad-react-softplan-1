const TOKEN_TAG = "token"
const USER_TAG = "user"

const isAuth = () => getUser().authtoken

const setUser = ({ user, token }) => {
  localStorage.setItem(USER_TAG, JSON.stringify(user))
  localStorage.setItem(TOKEN_TAG, token)
}

const getUser = () => {
 const user = localStorage.getItem(USER_TAG)
 const token = localStorage.getItem(TOKEN_TAG)
 return ({
    "user": user && JSON.parse(user),
    "authtoken": token,
    "token": token && token.substring(token.lastIndexOf('.') + 1)
  })
}

const login = ({ user, token, redirect }) => {
  if(user) {
    setUser(user, token)
    redirect()
  }
}

const logout = () => {
  localStorage.removeItem(TOKEN_TAG)
  localStorage.removeItem(USER_TAG)
}

export { 
  isAuth, 
  getUser,
  setUser,
  login,
  logout
}