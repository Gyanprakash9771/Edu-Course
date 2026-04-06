import axios from "axios";
import { getToken } from "../utils/storage";

const API = axios.create({
  baseURL: "https://wuthering-lai-patently.ngrok-free.dev/api",
  withCredentials: false,
});

API.interceptors.request.use(async (req) => {
  const token = await getToken();

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;