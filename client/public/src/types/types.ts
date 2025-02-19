import { ReactNode } from "react";

export type UserData = {
  name: string;
  email: string;
  createdAt: string;
  lastLogin: string;
  isFrozen: boolean;
  isVisible: boolean;
};

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
  logs?: ActivityLog[];
};

export type ApiRequest = {
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
  admins?: string[];
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

export type AppActivityRequest = {
  appName: string;
  days?: number;
};

export type ActivityLog = {
  date: string;
  userCount: number;
};

export type TimeOption = {
  time: string;
  days: number;
};

export type InvoiceRequest = {
  invoiceID: string;
};

export type VerifyAction = "verifyEmail" | "verifyPassword" | "unlockAccount" | "verifyAccess";

export type ApiMethod = "GET" | "POST" | "PUT" | "POST" | "PATCH" | "DELETE";

export type FormState = "default" | "verify" | "resendCode" | "question" | "password";

export type FetchStatus = "idle" | "loading" | "error" | "success";

export type FormUsage = "SIGNUP" | "SIGNIN" | "RESETPASSWORD" | "UNLOCKACCOUNT";

export type AccountTabName =
  | "Overview"
  | "Settings"
  | "My apps"
  | "Administered apps"
  | "Active Connections"
  | "Invoices";

export type AdminTabName =
  | "Overview"
  | "Settings"
  | "Apps"
  | "Users"
  | "Reported Issues"
  | "Traffic";

export type AccountTab = {
  tabName: AccountTabName;
  icon: ReactNode;
};

export type AdminTab = {
  tabName: AdminTabName;
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

export type AdminRequest = {
  username?: string;
  app?: string;
  deleteCommand?: string;
  issueID?: string;
};

export type AccountResponse = {
  message?: string;
  success?: boolean;
  createdAt?: string;
  lastLogin?: string;
  securityQuestion?: string;
  isRemembered?: string;
  createdApps?: AuthechoApp[];
  adminApps?: AuthechoApp[];
  appConnections?: AuthechoApp[];
  questions?: string[];
  invoices?: Invoice[];
  unReadInvoices?: number;
};

export type AdminResponse = {
  message?: string;
  success?: boolean;
  users?: UserData[];
  apps?: AuthechoApp[];
  issues?: ReportedIssue[];
  issue?: ReportedIssue;
  unResolvedIssues?: number;
  userCountToday?: number;
};

export type AuthechoApp = {
  name: string;
  origin: string;
  creator: string;
  admins: string[];
  resources: ConnectResource[];
  description: string;
  status: AppStatus;
  users: number;
  isFrozen: boolean;
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

export type PaginatedPage = {
  current: number;
  latest: number;
  pageCount: number;
};

export type Invoice = {
  _id: string;
  subject: string;
  from: string;
  to: string;
  text: string;
  isRead: boolean;
  sentAt: string;
  isVisible: boolean;
};

export type Issue = {
  issue: string;
  text: string;
};

export type ReportedIssue = {
  _id: string;
  user: string;
  issue: string;
  text: string;
  isResolved: boolean;
  sentAt: string;
  isVisible: boolean;
};
