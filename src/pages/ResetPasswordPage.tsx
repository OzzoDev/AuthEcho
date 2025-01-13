import { useState } from "react";
import { resetPassword, sendVerificationCode, validatePassword, validateSecurityQuestion } from "../utils/ServerClient";
import ReactLoading from "react-loading";
import Navbar from "../components/Navbar";
import FormPasswordInput from "../components/form/FormPasswordInput";
import FormInput from "../components/form/FormInput";
import FormVerify from "../components/form/FormVerify";
import { FetchStatus } from "../types/apiTypes";
import { FormState, UserFormData } from "../types/types";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function SigninPage() {
  const [formData, setFormData] = useState<UserFormData>({ userData: "", password: "", confirmPassword: "", verificationCode: "", securityQuestionAnswer: "" });
  const [formState, setFormState] = useState<FormState>("default");
  const [status, setStatus] = useState<FetchStatus>("idle");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (formData.securityQuestion) {
  //     setFormState("question");
  //   }
  // }, [formData.securityQuestion]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formState === "default") {
      const validatePasswordResponse = await validatePassword({ userData: formData.userData || "", newPassword: formData.password || "", confirmNewPassword: formData.confirmPassword || "" }, setStatus, setError);
      if (validatePasswordResponse) {
        const verificationCodeResponse = await sendVerificationCode({ userData: formData.userData || "", action: "verifyEmail" }, setStatus, setError);
        if (verificationCodeResponse) {
          setFormState("verify");
        }
      }
    } else if (formState === "question") {
      const validateSecurityQuestionResponse = await validateSecurityQuestion({ userData: formData.userData || "", verificationCode: formData.verificationCode || "", newPassword: formData.password || "", confirmNewPassword: formData.confirmPassword || "", securityQuestionAnswer: formData.securityQuestionAnswer || "" }, setStatus, setError);

      if (validateSecurityQuestionResponse) {
        const resetPasswordResponse = await resetPassword({ userData: formData.userData || "", newPassword: formData.password || "", confirmNewPassword: formData.confirmPassword || "", verificationCode: formData.verificationCode || "" }, setStatus, setError, dispatch);
        if (resetPasswordResponse) {
          navigate("/account");
        }
      }
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
            <button type="submit" className="submit-btn btn btn-primary">
              Reset
            </button>
          </form>
          <h2 className="errorMessage">{error}</h2>
        </>
      );
    case "verify":
      return (
        <>
          <Navbar />
          <h1 className="page-headline">Quickly Reset Your Password and Secure Your Account!</h1>
          <form onSubmit={handleSubmit}>
            <h2 className="form-headline">Verify to reset!</h2>
            <p className="form-info">Please check your inbox for an 8-character verification code and enter it in the field provided below</p>
            <FormVerify formData={formData} verify="reset" setStatus={setStatus} setError={setError} setFormState={setFormState} setFormData={setFormData} />
          </form>
          <h2 className="errorMessage">{error}</h2>
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
            <p className="form-info">{formData.securityQuestion}</p>
            <FormInput labelText="Email or username" name="securityQuestionAnswer" value={formData.securityQuestionAnswer || ""} onChange={handleChange} required />
          </form>
          <h2 className="errorMessage">{error}</h2>
        </>
      );
  }
}
