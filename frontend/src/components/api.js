import axios from "axios";
import { setupCache } from 'axios-cache-adapter'

const cache = setupCache({
    maxAge: 15 * 60 * 1000
})

const API = axios.create({
  baseURL: "http://localhost:3000",
  adapter: cache.adapter
})

const getLogs = async (token) => {
    let config = {
        headers: {'Authorization': `bearer ${token}`}
    };
    const { data } = await API.get(`/logs/`, config);
    return data;
}

export { getLogs };
