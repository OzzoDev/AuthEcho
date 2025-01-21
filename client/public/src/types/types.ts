export type ApiResponse = {
  message: string;
  success: boolean;
  name?: string;
  email?: string;
  question?: string;
  questions?: string[];
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
  | "ISSUSPENDED";

export type FormState = "default" | "verify" | "question" | "password";

export type FetchStatus = "idle" | "loading" | "error" | "success";

export type FormUsage = "SIGNUP" | "SIGNIN" | "RESETPASSWORD" | "UNLOCKACCOUNT";

export type ProtectedRouteProps = {
  children: React.ReactNode;
};
