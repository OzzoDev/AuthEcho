import { Navigate } from "react-router";
import { AUTH_KEY } from "../constants/contants";
import useSessionStorage from "../hooks/useSessionStorage";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const { sessionValue } = useSessionStorage<boolean>(AUTH_KEY, false);

  return sessionValue ? <>{children}</> : <Navigate to="/signin" />;
}
