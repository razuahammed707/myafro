import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

let token = "";
(async function () {
  try {
    token = await AsyncStorage.getItem("access_token");
    return token;
  } catch (e) {
    console.log(e);
  }
})();

console.log(token)

const axiosClient = axios.create({
  baseURL: `https://tranquil-fjord-04022.herokuapp.com/api/v1`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosClient;
