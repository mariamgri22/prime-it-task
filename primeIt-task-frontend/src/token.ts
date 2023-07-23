import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
   baseURL: "/api",
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("bearerToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;