import { useSelector } from "react-redux";
import { getToken } from "../utils/utils";
import { RootState } from "../store/store";
import { ProtectedRouteProps } from "../types/auth";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated) || !!getToken();

  return isAuthenticated ? <>{children}</> : <Navigate to="/signin" />;
}
