import axios from "axios";
import { setupCache } from "axios-cache-adapter";
import { getToken} from "../Auth"

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
      //Authorization: `beare ${getToken()}`
      Authorization: `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZjA2M2I3MzdmMWNhMzQ2YzIzMjUyYyIsImlhdCI6MTU3NjExODE1MiwiZXhwIjoxNTc2Mzc3MzUyfQ.R5ndgjz6DikmHttqyXsnbAO9S2qgxQ9OVXfEWiRMYts`,
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
