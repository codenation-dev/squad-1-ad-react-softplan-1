import { getUser } from "./Auth"

const URL = "http://localhost:3030"

const authHeader = () => {
  return new Headers({
    'Authorization': `Bearer ${getUser && getUser.token}`
  })
}

const setUser = (user) => {
  fetch(`${URL}/users`, { 
    method: 'POST', 
    headers: authHeader, 
    mode: 'cors', 
    cache: 'default',
    body: {
      "name": user.name,
      "email": user.email,
      "password": user.password
    }
  })
  .then(response => {
    if (!response.ok) throw new Error()
    return response.json()
  })
  .then(data => data)
  .catch(error => console.error("Erro ao cadastrar usuário: ", error))
}

const setSession = (user) => {
  fetch(`${URL}/session`, { 
    method: 'POST', 
    headers: authHeader, 
    mode: 'cors', 
    cache: 'default',
    body: {
      "email": user.email,
      "password": user.password
    }
  })
  .then(response => {
    if (!response.ok) throw new Error()
    return response.json()
  })
  .then(data => data)
  .catch(error => console.error("Erro ao cadastrar session: ", error))
}

const getErrors = () => {
  fetch(`${URL}/logs`, { 
    method: 'GET', 
    headers: authHeader, 
    mode: 'cors', 
    cache: 'default' 
  })
  .then(response => {
    console.log(response)
    if (!response.ok) throw new Error()
    return response.json()
  })
  .then(data => {
    console.log(data)
    return data
  })
  .catch(error => console.error("Erro ao buscar os itens da lista: ", error))
}

const getErrorById = id => {
  fetch(`${URL}/logs/${id}`, { 
    method: 'GET', 
    headers: authHeader,
    mode: 'cors', 
    cache: 'default' 
  })
    .then(response => {
      if (!response.ok) throw new Error()
      return response.json()
    })
    .then(data => data)
    .catch(error => console.log("Erro ao buscar os detalhes do erro! ", error))
}

export { getErrors, setUser, setSession, getErrorById }
