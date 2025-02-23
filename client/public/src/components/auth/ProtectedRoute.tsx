import { ReactNode } from "react";
import { Navigate } from "react-router";

interface Props {
  allowCondition: boolean;
  fallbackPath?: string;
  children: ReactNode;
}

export default function ProtectedRoute({ allowCondition, fallbackPath, children }: Props) {
  return allowCondition ? (
    <>{children}</>
  ) : (
    <Navigate to={fallbackPath ? fallbackPath : "/signin"} />
  );
}
