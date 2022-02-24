import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseURL } from "./baseurl";
import axios from "axios";
// export const postData = async (api, body) => {
//   console.log(baseURL+api)
//   const res = await fetch(baseURL + api, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Access-Control-Allow-Origin": "*",
//       Accept: "application/json",
//     },
//     body: JSON.stringify(body),
//   });
//   return await res.json();
// };

const axiosClient = axios.create({
  baseURL: `http://192.168.0.111:8000/api`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

axiosClient.interceptors.response.use(
  function (response) {
    console.log(response)
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosClient;
