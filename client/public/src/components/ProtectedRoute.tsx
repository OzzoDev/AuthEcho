import { ProtectedRouteProps } from "../types/auth";
import { Navigate } from "react-router-dom";
import { getSessionData } from "../utils/utils";
import { AUTH_KEY } from "../constants/contants";

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = Boolean(getSessionData(AUTH_KEY));

  console.log("isAuthenticated", isAuthenticated);

  return isAuthenticated ? <>{children}</> : <Navigate to="/signin" />;
}
