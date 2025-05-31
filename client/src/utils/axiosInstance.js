// utils/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api", // your backend base URL
  withCredentials: true
});

export default axiosInstance;