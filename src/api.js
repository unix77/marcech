// src/lib/axios.js
import axios from "axios";
import { ACCESS_TOKEN } from "./constants.js";

// Create an Axios instance with a base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL, // here I get the value from the env variable located at the .env file
});

// Example interceptor for requests, I will receive a config, and I first gonna check if it has the access token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN); // here we check if we have the access token stored in the local storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // if we have the token, we add it to the Authorization header
    }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

export default api;
