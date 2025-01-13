import { SecurityQuestion } from "./types";

export type ApiRes = {
  data: JwtTokenResponse;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: Record<string, any>;
  request: Record<string, any>;
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

export type ValidateSecurityQuestionRequest = {
  userData: string;
  verificationCode: string;
  newPassword: string;
  confirmNewPassword: string;
  securityQuestionAnswer: string;
};

export type VerificationCodeRequest = {
  userData: string;
  action: "verifyEmail" | "verifyPassword" | "unlockAccount";
  to?: string;
};

export type UserData = {
  name: string;
  email: string;
};

export type FetchStatus = "idle" | "loading" | "error" | "success";
