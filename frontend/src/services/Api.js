import axios from "axios";
import { setupCache } from "axios-cache-adapter";
import { getUser, setUser } from "./Auth.js";

const cache = setupCache({
  maxAge: 15 * 60 * 1000
});

const API = axios.create({
  baseURL: "http://localhost:3030",
  adapter: cache.adapter
});

const getConfig = () => {
  let config = {
    headers: {
      Authorization: `bearer ${getUser().authtoken}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
      "Access-Control-Allow-Headers":
        "Authorization, Origin, X-Requested-With, Content-Type, Accept"
    }
  };
  return config;
};

const getErrors = () => {
  let config = getConfig();
  return API.get("/logs/", config);
};

const getErrorById = id => {
  let config = getConfig();
  return API.get(`/logs/${id}`, config);
};

const deleteError = async ids => {
  let config = getConfig();
  return await API.delete(`/logs/${ids}`, config);
};

const archiveError = async ids => {
  let config = getConfig();
  return await API.put(`/logs/${ids}/archive`, [], config);
};

const createNewUser = async (name, email, password) => {
  let config = getConfig();
  try {
    var payLoad = `{"name": \"${name}\","email": \"${email}\","password": \"${password}\"}`;
    await API.post(`/users`, payLoad, config);
    return true;
  } catch (error) {
    console.log("Erro ao cadastrar novo usuário: ", error);
    return false;
  }
};

const loginUser = async (email, password) => {
  let config = getConfig();
  try {
    var payLoad = `{"email": \"${email}\","password": \"${password}\"}`;
    var { data } = await API.post(`/sessions`, payLoad, config);
    await setUser(data);
    return true;
  } catch (error) {
    console.log("Erro ao fazer o login: ", error);
    return false;
  }
};

export {
  getErrors,
  getErrorById,
  deleteError,
  archiveError,
  createNewUser,
  loginUser
};
