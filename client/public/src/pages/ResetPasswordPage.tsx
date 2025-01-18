import { useEffect, useState } from "react";
import { resetPassword, sendVerificationCode, validatePassword, validateSecurityQuestion } from "../utils/ServerClient";
import ReactLoading from "react-loading";
import Navbar from "../components/Navbar";
import FormPasswordInput from "../components/form/FormPasswordInput";
import FormInput from "../components/form/FormInput";
import FormVerify from "../components/form/FormVerify";
import { FetchStatus } from "../types/apiTypes";
import { FormState, UserFormData } from "../types/types";
import { useNavigate } from "react-router-dom";
import Stepper from "../components/Stepper";

export default function SigninPage() {
  const [formData, setFormData] = useState<UserFormData>({ userData: "", password: "", confirmPassword: "", verificationCode: "", securityQuestionAnswer: "", rememberUser: false });
  const [formState, setFormState] = useState<FormState>("default");
  const [status, setStatus] = useState<FetchStatus>("idle");
  const [error, setError] = useState<string>("");
  const [currentStep, setCurrentStep] = useState<number>(0);

  const navigate = useNavigate();

  useEffect(() => {
    setCurrentStep(formState === "default" ? 0 : formState === "verify" ? 1 : 2);
  }, [formState]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    switch (formState) {
      case "default":
        const validatePasswordResponse = await validatePassword({ userData: formData.userData, password: formData.password, confirmPassword: formData.confirmPassword }, setStatus, setError);
        if (validatePasswordResponse) {
          const verificationCodeResponse = await sendVerificationCode({ userData: formData.userData, action: "verifyPassword" }, setStatus, setError);
          if (verificationCodeResponse) {
            setFormState("verify");
          }
        }
        break;
      case "verify":
        await sendVerificationCode({ userData: formData.userData, action: "verifyPassword" }, setStatus, setError);
        break;
      case "question":
        const validateSecurityQuestionResponse = await validateSecurityQuestion({ userData: formData.userData, verificationCode: formData.verificationCode, securityQuestionAnswer: formData.securityQuestionAnswer }, setStatus, setError);

        if (validateSecurityQuestionResponse) {
          const resetPasswordResponse = await resetPassword({ userData: formData.userData, password: formData.password, confirmPassword: formData.confirmPassword, verificationCode: formData.verificationCode }, setStatus, setError);
          if (resetPasswordResponse) {
            navigate("/account");
          }
        }
        break;
    }
  };

  if (status === "loading") {
    return (
      <>
        <ReactLoading type="spin" color="#00f" height={50} width={50} />
        <Navbar />
      </>
    );
  }

  switch (formState) {
    case "default":
      return (
        <>
          <Navbar />
          <h1 className="page-headline">Quickly Reset Your Password and Secure Your Account!</h1>
          <form onSubmit={handleSubmit}>
            <h2 className="form-headline">Reset your password!</h2>
            <FormInput labelText="Email or username" name="userData" value={formData.userData || ""} onChange={handleChange} required />
            <FormPasswordInput labelText="New password" name="password" value={formData.password || ""} onChange={handleChange} required />
            <FormPasswordInput labelText="Confirm new password" name="confirmPassword" value={formData.confirmPassword || ""} onChange={handleChange} required />
            <div className="error-container">
              <p className="error-message">{error}</p>
            </div>
            <button type="submit" className="submit-btn btn btn-primary">
              Reset
            </button>
          </form>
          <Stepper steps={3} selectedIndex={currentStep} />
        </>
      );
    case "verify":
      return (
        <>
          <Navbar />
          <h1 className="page-headline">Quickly Reset Your Password and Secure Your Account!</h1>
          <form onSubmit={handleSubmit}>
            <h2 className="form-headline">Verify to reset!</h2>
            <p className="form-info">Please check your inbox for an 8-character verification code and enter it below. For your security, this code is valid for only one attempt. If you require a new code, please use the "Regenerate Code" button to receive a fresh verification code via email.</p>
            <FormVerify formData={formData} verify="reset" setStatus={setStatus} setError={setError} setFormState={setFormState} setFormData={setFormData} />
            <div className="error-container">
              <p className="error-message">{error}</p>
            </div>
            <button type="submit" className="submit-btn btn btn-primary">
              Regenerate Code
            </button>
          </form>
          <Stepper steps={3} selectedIndex={currentStep} />
        </>
      );
    case "question":
      return (
        <>
          <Navbar />
          <h1 className="page-headline">Quickly Reset Your Password and Secure Your Account!</h1>
          <form onSubmit={handleSubmit}>
            <h2 className="form-headline">Final step!</h2>
            <p className="form-info">Enter the answer of your security question below</p>
            <p className="form-info security-question">{formData.securityQuestion}</p>
            <FormInput labelText="Security question answer" name="securityQuestionAnswer" value={formData.securityQuestionAnswer || ""} onChange={handleChange} required />
            <div className="error-container">
              <p className="error-message">{error}</p>
            </div>
            <button type="button" onClick={() => setFormData((prevData) => ({ ...prevData, rememberUser: !formData.rememberUser }))} onMouseLeave={(e) => (e.target as HTMLButtonElement).blur()} className={formData.rememberUser ? `remeber-btn btn btn-check btn-check-selected` : `remeber-btn btn btn-check`}>
              Remember me
            </button>
            <button type="submit" className="submit-btn btn btn-primary">
              Verify
            </button>
          </form>
          <Stepper steps={3} selectedIndex={currentStep} />
        </>
      );
  }
}
