import axios from "axios";
import { getToken } from "../utils/storage";

const API = axios.create({
  //baseURL: "https://edutest-backend.onrender.com/api"
  baseURL: "https://edutest-backend-0r41.onrender.com/api",
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