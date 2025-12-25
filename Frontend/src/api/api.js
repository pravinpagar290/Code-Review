import axios from "axios";

const baseURL = "http://localhost:3000".replace(/\/\+$/, "") + "/api";

const api = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 60000, // 60s timeout to avoid silent connection resets
});

export default api;
