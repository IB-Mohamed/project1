import { userService } from "../services/userService";
import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
  return userService.auth() ? <Navigate to={"/todos"} replace /> : children;
}