export type UserFormData = {
  userData?: string;
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  verificationCode?: string;
};

export type FormState = "default" | "verify";
