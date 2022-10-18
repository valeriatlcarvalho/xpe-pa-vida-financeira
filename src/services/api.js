import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  "Content-Type": "application/json",
});

export { api };
