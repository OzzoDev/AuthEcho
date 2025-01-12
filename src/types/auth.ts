export type NewAccount = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type AuthState = {
  isAuthenticated: boolean;
};

export type ProtectedRouteProps = {
  children: React.ReactNode;
};
