import axios from "axios";
import { getToken } from "../utils/storage";

const API = axios.create({
  baseURL: "https://wuthering-lai-patently.ngrok-free.dev/api",
  withCredentials: false,
});

API.interceptors.request.use(async (req) => {
  const token = await getToken();

  // ❌ DO NOT send token for user-side requests like /courses
  // ✅ ONLY send token for admin routes
  if (token && req.url && req.url.startsWith("/admin")) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;