import { ProtectedRouteProps } from "../types/auth";
import { Navigate } from "react-router-dom";
import { AUTH_KEY } from "../constants/contants";
import useSessionStorage from "../hooks/useSessionStorage";

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { sessionValue } = useSessionStorage<boolean>(AUTH_KEY, false);

  return sessionValue ? <>{children}</> : <Navigate to="/signin" />;
}
