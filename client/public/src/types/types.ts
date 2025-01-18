export type UserFormData = {
  userData?: string;
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  verificationCode?: string;
  securityQuestion?: string;
  securityQuestionAnswer?: string;
  rememberUser?: boolean;
};

export type SecurityQuestion = {
  id: string;
  question: string;
};

export type FormState = "default" | "verify" | "question" | "password";
