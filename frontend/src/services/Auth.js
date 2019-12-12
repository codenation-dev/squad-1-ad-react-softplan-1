const TOKEN_TAG = "token"
const USER_TAG = "user"

const isAuth = () => getUser().token

const setUser = (user, token) => {
  localStorage.setItem(USER_TAG, JSON.stringify(user))
  localStorage.setItem(TOKEN_TAG, token)
}

const getUser = () => {
 const user = localStorage.getItem(USER_TAG)
 return ({
    "user": user && JSON.parse(user),
    "token": localStorage.getItem(TOKEN_TAG)
  })
}

const login = ({ user, token, redirect }) => {
  if(user) {
    setUser(user, token)
    redirect()
  }
}

const logout = ({ redirect }) => {
  localStorage.removeItem(TOKEN_TAG)
  localStorage.removeItem(USER_TAG)
  redirect()
}

export { 
  isAuth, 
  getUser,
  setUser,
  login,
  logout
}