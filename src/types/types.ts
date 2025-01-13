export type UserFormData = {
  userData?: string;
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  verificationCode?: string;
  securityQuestionId?: string;
  securityQuestionAnswer?: string;
};

export type SecurityQuestion = {
  id: string;
  question: string;
};

export type FormState = "default" | "question" | "verify";
