import { FormUsage } from "../types/auth";
import { FormState } from "../types/types";

interface FormInput {
  labelText?: string;
  name?: string;
  type?: "text" | "password" | "code" | "select";
}

interface State {
  state: FormState;
  headline: string;
  subline?: string;
  btnText?: string;
  dynamicLine?: boolean;
  renderRememberUser?: boolean;
  regenerateCode?: boolean;
  excludeStep?: boolean;
  inputs: FormInput[];
}

interface AuthHelper {
  formStates: (State | undefined)[];
}

export const AUTH_HELPER: Record<FormUsage, AuthHelper> = {
  SIGNUP: {
    formStates: [
      {
        state: "default",
        headline: "Create your account!",
        btnText: "Sign up",
        inputs: [
          { labelText: "Username", name: "name" },
          { labelText: "Email", name: "email" },
          { labelText: "Password", name: "password", type: "password" },
          { labelText: "Confirm password", name: "confirmPassword", type: "password" },
        ],
      },
      {
        state: "verify",
        headline: "Verify Email!",
        subline:
          'Please check your inbox for an 8-character verification code and enter it below. For your security, this code is valid for only one attempt. If you require a new code, please use the "Regenerate Code" button to receive a fresh verification code via email.',
        btnText: "Regenerate Code",
        regenerateCode: true,
        inputs: [{ type: "code" }],
      },
      {
        state: "question",
        headline: "Select Security Question!",
        subline:
          "Implementing a security question significantly enhances your account's protection. Please choose a question that you can easily remember for future reference.",
        btnText: "Continue",
        renderRememberUser: true,
        inputs: [{ type: "select" }, { labelText: "Your answer", name: "securityQuestionAnswer" }],
      },
    ],
  },
  SIGNIN: {
    formStates: [
      {
        state: "default",
        headline: "Access your account!",
        btnText: "Continue",
        inputs: [{ labelText: "Email or username", name: "userData" }],
      },
      {
        state: "verify",
        headline: "Authenticate Your Account!",
        subline:
          "Please check your inbox for an 8-character verification code and enter it below. For your security, this code is valid for only one attempt. If the incorrect code is entered, you will need to answer your security question to proceed with the sign-in process.",
        inputs: [{ type: "code" }],
      },
      {
        state: "question",
        headline: "Verify authenticity!",
        subline:
          "To verify your identity, please respond to your security question, as the verification code provided was incorrect. Enter the answer to your security question below to proceed with the sign-in process.",
        btnText: "Continue",
        dynamicLine: true,
        excludeStep: true,
        inputs: [{ labelText: "Security question answer", name: "securityQuestionAnswer" }],
      },
      {
        state: "password",
        headline: "Almost There: Enter Your Password!",
        btnText: "Sign in",
        renderRememberUser: true,
        inputs: [{ labelText: "Password", name: "password", type: "password" }],
      },
    ],
  },
  RESETPASSWORD: {
    formStates: [
      {
        state: "default",
        headline: "Reset your password!",
        btnText: "Continue",
        inputs: [
          { labelText: "Email or username", name: "userData" },
          { labelText: "New password", name: "password", type: "password" },
          { labelText: "Confirm new password", name: "confirmPassword", type: "password" },
        ],
      },
      {
        state: "verify",
        headline: "Verify authenticity to reset!",
        subline:
          'Please check your inbox for an 8-character verification code and enter it below. For your security, this code is valid for only one attempt. If you require a new code, please use the "Regenerate Code" button to receive a fresh verification code via email.',
        btnText: "Regenerate Code",
        inputs: [{ type: "code" }],
      },
      {
        state: "question",
        headline: "Final step!",
        subline: "Enter the answer of your security question below",
        btnText: "Confirm reset",
        dynamicLine: true,
        renderRememberUser: true,
        inputs: [{ labelText: "Security question answer", name: "securityQuestionAnswer" }],
      },
    ],
  },
  UNLOCKACCOUNT: {
    formStates: [
      {
        state: "default",
        headline: "Unlock your account!",
        btnText: "Unlock",
        inputs: [{ labelText: "Email or username", name: "userData" }],
      },
      {
        state: "verify",
        headline: "Verify authenticity to Unlock!",
        subline:
          'Please check your inbox for an 8-character verification code and enter it below. For your security, this code is valid for only one attempt. If you require a new code, please use the "Regenerate Code" button to receive a fresh verification code via email.',
        btnText: "Regenerate Code",
        inputs: [{ type: "code" }],
      },
      {
        state: "question",
        headline: "Final step!",
        subline: "Enter the answer of your security question below",
        btnText: "Confirm unlock",
        dynamicLine: true,
        renderRememberUser: true,
        inputs: [{ labelText: "Security question answer", name: "securityQuestionAnswer" }],
      },
    ],
  },
};
