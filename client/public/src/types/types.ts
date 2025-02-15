import { ReactNode } from "react";

export type ApiResponse = {
  message: string;
  success: boolean;
  name?: string;
  email?: string;
  isAdmin?: boolean;
  question?: string;
  questions?: string[];
  appKey?: string;
  appName?: string;
  isBlocked?: boolean;
  userAlias?: UserAlias[];
};

export type ApiRequest = {
  // useCase?: ApiUseCase;
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
  app?: string;
  appName: string;
  origin: string;
  creator?: string;
  admins: string[];
  resources: ConnectResource[];
  appDescription: string;
  status?: AppStatus;
  users?: number;
  deleteCommand?: string;
};

export type ConnectResource = {
  id: number;
  name: string;
  resource: string;
  visibility: "private" | "public";
};

export type VerifyAction = "verifyEmail" | "verifyPassword" | "unlockAccount" | "verifyAccess";

export type ApiMethod = "GET" | "POST" | "PUT" | "POST" | "PATCH" | "DELETE";

export type FormState = "default" | "verify" | "resendCode" | "question" | "password";

export type FetchStatus = "idle" | "loading" | "error" | "success";

export type FormUsage = "SIGNUP" | "SIGNIN" | "RESETPASSWORD" | "UNLOCKACCOUNT";

export type AccountTabName =
  | "Overview"
  | "Settings"
  | "Apps"
  | "Users"
  | "My apps"
  | "Administered apps"
  | "Active Connections"
  | "Invoices"
  | "Reported issues";

export type AccountTab = {
  tabName: AccountTabName;
  icon: ReactNode;
};

export type AccountRequest = {
  name?: string;
  email?: string;
  securityQuestion?: string;
  securityQuestionAnswer?: string;
  password?: string;
  confirmPassword?: string;
  verificationCode?: string;
  deleteCommand?: string;
};

export type AccountResponse = {
  message: string;
  success: boolean;
  createdAt?: string;
  lastLogin?: string;
  securityQuestion?: string;
  isRemembered?: string;
  createdApps?: AuthechoApp[];
  adminApps?: AuthechoApp[];
  appConnections?: AuthechoApp[];
  questions?: string[];
};

export type AccountApiUseCase =
  | "ACCOUNTOVERVIEW"
  | "SIGNOUT"
  | "REQUESTEMAILCODE"
  | "UPDATENAME"
  | "UPDATEEMAIL"
  | "UPDATEPASSWORD"
  | "UPDATESECURITYQUESTION"
  | "UPDATESECURITYQUESTIONANSWER"
  | "SECURITYQUESTIONS"
  | "DELETEACCOUNT";

export type AuthechoApp = {
  name: string;
  origin: string;
  creator: string;
  admins: string[];
  resources: ConnectResource[];
  description: string;
  status: AppStatus;
  users: number;
  isVisible?: boolean;
};

export type UserAlias = {
  name: string;
  email: string;
};

export type AppStatus = "development" | "testing" | "pre-production" | "production" | "maintenance";

export type AppStatusData = {
  status: AppStatus;
  color: string;
  icon: string;
  sortValue: number;
};
