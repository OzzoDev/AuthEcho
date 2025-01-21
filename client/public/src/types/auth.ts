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

export type FormUsage = "SIGNUP" | "SIGNIN" | "RESETPASSWORD" | "UNLOCKACCOUNT";

export type AuthState = {
  isAuthenticated: boolean;
};

export type ProtectedRouteProps = {
  children: React.ReactNode;
};
