export type UserFormData = {
  userData?: string;
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  verificationCode?: string;
  securityQuestionId?: number;
  securityQuestionAnswer?: string;
};

export type SecurityQuestion = {
  id: number;
  question: string;
};

export type FormState = "default" | "question" | "verify";
