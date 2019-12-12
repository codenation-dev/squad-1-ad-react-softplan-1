import axios from "axios";
import { setupCache } from "axios-cache-adapter";
import { getUser} from "./Auth"

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
      Authorization: `bearer ${getUser() && getUser().authtoken}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
      "Access-Control-Allow-Headers":
        "Authorization, Origin, X-Requested-With, Content-Type, Accept"
    }
  };
  return config;
};

const getErrors = async () => {
  let config = getConfig();
  const { data } = await API.get("/logs/", config);
  return data;
};

const getErrorsById = async (userId) => {
  let config = getConfig();
  const { data } = await API.get(`/logs/${userId}`, config);
  return data;
};

export { getErrors, getErrorsById };