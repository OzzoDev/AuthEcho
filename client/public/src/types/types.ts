export type ApiResponse = {
  message: string;
  success: boolean;
  name?: string;
  email?: string;
  isAdmin?: boolean;
  question?: string;
  questions?: string[];
  appKey?: string;
  isBlocked?: boolean;
};

export type ApiRequest = {
  useCase?: ApiUseCase;
  userData?: string;
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  verificationCode?: string;
  securityQuestion?: string;
  securityQuestionAnswer?: string;
  action?: VerifyAction;
  rememberUser?: boolean;
  [key: string]: string | boolean | undefined;
};

export type ConnectRequest = {
  appName: string;
  origin: string;
  admin: string;
  appDescription: string;
};

export type VerifyAction = "verifyEmail" | "verifyPassword" | "unlockAccount" | "verifyAccess";

export type ApiMethod = "GET" | "POST" | "PUT" | "POST" | "PATCH" | "DELETE";

export type ApiUseCase =
  | "SIGNUP"
  | "SIGNIN"
  | "SENDVERIFICATIONCODE"
  | "REQUESTUNLOCKCODE"
  | "VERIFYACCOUNT"
  | "VERIFYAUTHENTICATION"
  | "SIGNOUT"
  | "SECURITYQUESTIONS"
  | "SETSECURITYQUESTION"
  | "GETUSERSECURITYQUESTION"
  | "VALIDATESECURITYQUESTION"
  | "UPDATEEMAIL"
  | "UPDATEUSERNAME"
  | "UPDATEPASSWORD"
  | "VALIDATEEMAIL"
  | "VALIDATEPASSWORD"
  | "RESETPASSWORD"
  | "UNLOCKACCOUNT"
  | "ISSUSPENDED"
  | "JOIN";

export type FormState = "default" | "verify" | "resendCode" | "question" | "password";

export type FetchStatus = "idle" | "loading" | "error" | "success";

export type FormUsage = "SIGNUP" | "SIGNIN" | "RESETPASSWORD" | "UNLOCKACCOUNT";

export type ProtectedRouteProps = {
  children: React.ReactNode;
};
