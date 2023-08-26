import io from "socket.io-client";
import { API_SERVER } from "./words";

export const socket = io(API_SERVER, {
  autoConnect: false,
  withCredentials: true,
  transports: ["websocket"],
});
