import axios from "axios";

const API = axios.create({
  // ★ CHANGE THIS LINE
  baseURL: "https://wonderindia-backend.onrender.com/api", // Use your live Render URL
});

// Add token to every request if logged in
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;