import axios from "axios";

const apiWithoutAuth = axios.create({
   baseURL: "/api",
});

export { apiWithoutAuth };