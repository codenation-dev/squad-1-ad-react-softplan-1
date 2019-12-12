import axios from "axios";
import { setupCache } from 'axios-cache-adapter'
import { getToken } from "../Auth/Auth"

const cache = setupCache({
    maxAge: 15 * 60 * 1000
})

const API = axios.create({
  baseURL: "http://localhost:3030",
  adapter: cache.adapter
})

const getLogs = async () => {
    let config = {
        headers: {
            "Authorization": `bearer ${getToken()}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
            "Access-Control-Allow-Headers": "Authorization, Origin, X-Requested-With, Content-Type, Accept"
        }
    };
    const { data } = await API.get("/logs/", config);
    return data;
}

// const getLogs = () => {
//     var myHeaders = new Headers({
//         "Authorization": `bearer ${getToken()}`,
//         "Content-Type": "application/json",
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
//         "Access-Control-Allow-Headers": "Authorization, Origin, X-Requested-With, Content-Type, Accept"
//       });
 
//     var myInit = { method: 'GET',
//                    headers: myHeaders,
//                    mode: 'cors',
//                    cache: 'default' };
                   
//     return fetch("http://localhost:3030/logs", myInit)
//       .then(resp => {
//           if (!resp.ok)
//             console.log("Não foi possível completar a requisição.");
//             else{
//                 return resp.json()
//             }
//       })
//       .then(logs => logs)
//       .catch(error => console.log(error));
//   };
export { getLogs };
