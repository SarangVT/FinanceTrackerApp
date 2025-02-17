import axios from "axios";

const api = axios.create({
    baseURL: "https://fintrackbackend-9r6e.onrender.com/v1",
    // baseURL: "http://localhost:5000/v1",
  });
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

export default api;