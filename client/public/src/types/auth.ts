export type NewAccount = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type UnlockAccount = {
  userData: string;
  verificationCode: string;
};

export type Verify = "signup" | "signin" | "reset" | "unlock";

export type AuthState = {
  isAuthenticated: boolean;
};

export type ProtectedRouteProps = {
  children: React.ReactNode;
};
