import axios from "axios";

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
