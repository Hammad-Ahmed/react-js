import axios from "axios";

// Change to your backend URL if different
const API = axios.create({
  baseURL: "http://localhost:4000",
});

export default API;
