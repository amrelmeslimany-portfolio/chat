import axios from "axios";
import { API_SERVER } from "../constants/words";

export const axiosInstance = axios.create({
  baseURL: `${API_SERVER}/api`,
  withCredentials: true,
});
