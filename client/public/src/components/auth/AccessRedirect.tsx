import { ReactNode } from "react";
import { Navigate } from "react-router";
import useAuthStore from "../../hooks/useAuthStore";

interface Props {
  children: ReactNode;
}

export default function AccessRedirect({ children }: Props) {
  const { isAdmin, isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    if (isAdmin) {
      return <Navigate to="/admin" />;
    }
    return <Navigate to="/account" />;
  }

  return <>{children}</>;
}
