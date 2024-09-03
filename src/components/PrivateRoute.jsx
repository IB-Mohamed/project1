import { userService } from "../services/userService";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  return userService.auth() ? children : <Navigate to={"/login"} replace />;
}
