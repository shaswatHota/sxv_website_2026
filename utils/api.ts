import axios from "axios";

const api = axios.create({
  baseURL: "https://sxv-backend-eight.vercel.app",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  withCredentials: true
});

export default api;
