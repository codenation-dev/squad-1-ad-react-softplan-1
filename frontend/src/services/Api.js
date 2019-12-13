import axios from "axios";
import { setupCache } from "axios-cache-adapter";
// import { getUser } from "./Auth";

const cache = setupCache({
  maxAge: 15 * 60 * 1000
});

const API = axios.create({
  baseURL: "http://localhost:3030"
  // adapter: cache.adapter
});
const getConfig = () => {
  let config = {
    headers: {
      // Authorization: `bearer ${getUser() && getUser().authtoken}`,
      ["Authorization"]:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZjBkYmJjNmNjNDUyNDc2NDJhNzRkNyIsImlhdCI6MTU3NjA2NjEwMSwiZXhwIjoxNTc2MzI1MzAxfQ.PUYRVw5Ff9ThBqLH4s4RcOIrheXwHen9nhpso0f2R5U"
      // "Content-Type": "application/json",
      // "Access-Control-Allow-Origin": "*",
      // "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
      // "Access-Control-Allow-Headers":
      //   "Authorization, Origin, X-Requested-With, Content-Type, Accept"
    },
    mode: "cors",
    cache: "default"
  };
  return config;
};
const markedArchived = id => {
  console.log("Entrou markedArchived: ", id);
  fetch(`http://localhost:3030/logs/${id}/archive`, {
    method: "PUT",
    headers: {
      ["Authorization"]:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZjBkYmJjNmNjNDUyNDc2NDJhNzRkNyIsImlhdCI6MTU3NjA2NjEwMSwiZXhwIjoxNTc2MzI1MzAxfQ.PUYRVw5Ff9ThBqLH4s4RcOIrheXwHen9nhpso0f2R5U"
    },
    mode: "cors",
    cache: "default"
  })
    .then(response => {
      if (!response.ok) throw new Error();
      return response.json();
    })
    .then(data => console.log("Arquivado com sucesso! ", data))
    .catch(error => console.log("Erro ao marcar como arquivado: ", error));
};

const setArchived = id => {
  console.log(id);
  let config = getConfig();
  const { data } = API.put(`/logs/${id}/archive`, config);
  return data;
};

const getErrors = async () => {
  let config = getConfig();
  const { data } = await API.get("/logs/", config);
  return data;
};

const getErrorsById = async userId => {
  let config = getConfig();
  const { data } = await API.get(`/logs/${userId}`, config);
  return data;
};

const deleteError = async id => {
  let config = getConfig();
  const { data } = await API.delete(`/logs/${id}`, config);
  return data;
};

export { getErrors, getErrorsById, setArchived, deleteError, markedArchived };
