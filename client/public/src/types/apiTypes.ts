import { SecurityQuestion } from "./types";

export type ApiRes = {
  data: JwtTokenResponse;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: Record<string, any>;
  request: Record<string, any>;
};

export type ApiResponse = {
  message: string;
  success: boolean;
  name?: string;
  email?: string;
  question?: string;
  questions?: SecurityQuestion[];
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
  action?: "verifyEmail" | "verifyPassword" | "unlockAccount" | "verifyAccess";
};

export type JwtTokenResponse = {
  message: string;
  success: boolean;
  jwtToken: string;
};

export type SecurityQuestionResponse = {
  message: string;
  success: boolean;
  question: string;
};

export type DefaultResponse = {
  message: string;
  success: boolean;
};

export type UserDataResponse = {
  message: string;
  success: boolean;
  userData: UserData;
};

export type SecurityQuestionsResponse = {
  message: string;
  success: string;
  questions: SecurityQuestion[];
};

export type VerificationCodeRequest = {
  userData: string;
  action: "verifyEmail" | "verifyPassword" | "unlockAccount" | "verifyAccess";
  to?: string;
};

export type UserData = {
  name: string;
  email: string;
};

export type FetchStatus = "idle" | "loading" | "error" | "success";
