import { FormState } from "../types/types";

export interface FormInput {
  labelText?: string;
  name?: string;
  type: "text" | "password" | "code" | "select";
}

export interface State {
  state: FormState;
  subline: string;
  info: string;
  inputs: FormInput[];
}

export interface AuthHelper {
  usage: "SIGNUP" | "SIGNIN";
  headline: string;
  formStates: State[];
}

export const AUTH_HELPER: Record<"SIGNUP", AuthHelper> = {
  SIGNUP: {
    usage: "SIGNUP",
    headline: "Join Now for Effortless Account Management in 3 Simple Steps!",
    formStates: [
      {
        state: "default",
        subline: "Create your account!",
        info: "",
        inputs: [
          { labelText: "Username", name: "name", type: "text" },
          { labelText: "Email", name: "email", type: "text" },
          { labelText: "Password", name: "password", type: "password" },
          { labelText: "Confirm password", name: "confirmPassword", type: "password" },
        ],
      },
      {
        state: "verify",
        subline: "Verify Email!",
        info: 'Please check your inbox for an 8-character verification code and enter it below. For your security, this code is valid for only one attempt. If you require a new code, please use the "Regenerate Code" button to receive a fresh verification code via email.',
        inputs: [{ type: "code" }],
      },
      {
        state: "question",
        subline: "Select Security Question!",
        info: "Implementing a security question significantly enhances your account's protection. Please choose a question that you can easily remember for future reference.",
        inputs: [
          { type: "select" },
          { labelText: "Your answer", name: "securityQuestionAnswer", type: "text" },
        ],
      },
    ],
  },
};
