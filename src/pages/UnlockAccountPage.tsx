import { useState } from "react";
import ReactLoading from "react-loading";
import { isSuspended, sendVerificationCode, unlockAccount, validateSecurityQuestion } from "../utils/ServerClient";
import Navbar from "../components/Navbar";
import FormInput from "../components/form/FormInput";
import FormVerify from "../components/form/FormVerify";
import { FormState, UserFormData } from "../types/types";
import { FetchStatus } from "../types/apiTypes";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function UnlockAccountPage() {
  const [formData, setFormData] = useState<UserFormData>({ userData: "", verificationCode: "" });

  const [formState, setFormState] = useState<FormState>("default");
  const [status, setStatus] = useState<FetchStatus>("idle");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formState === "default") {
      const isSuspendedResponse = await isSuspended(formData.userData || "", setStatus, setError);
      if (isSuspendedResponse) {
        const verificationCodeResponse = await sendVerificationCode({ userData: formData.userData || "", action: "unlockAccount" }, setStatus, setError);
        if (verificationCodeResponse) {
          setFormState("verify");
        }
      }
    } else if (formState === "question") {
      const validateSecurityQuestionResponse = await validateSecurityQuestion({ userData: formData.userData || "", verificationCode: formData.verificationCode || "", securityQuestionAnswer: formData.securityQuestionAnswer || "" }, setStatus, setError);
      if (validateSecurityQuestionResponse) {
        const unlockResponse = await unlockAccount({ userData: formData.userData || "", verificationCode: formData.verificationCode || "" }, setStatus, setError, dispatch);
        if (unlockResponse) {
          navigate("/signin");
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
          <h1 className="page-headline">Unlock Your Account and Take Control of Your Access!</h1>
          <form onSubmit={handleSubmit}>
            <h2 className="form-headline">Unlock your account!</h2>
            <FormInput labelText="Email or username" name="userData" value={formData.userData || ""} onChange={handleChange} required />
            <button type="submit" className="submit-btn btn btn-primary">
              Unlock
            </button>
          </form>
          <h2 className="errorMessage">{error}</h2>
        </>
      );
    case "verify":
      return (
        <>
          <Navbar />
          <h1 className="page-headline">Unlock Your Account and Take Control of Your Access!</h1>
          <form onSubmit={handleSubmit}>
            <h2 className="form-headline">Verify to Unlock!</h2>
            <p className="form-info">Please check your inbox for an 8-character verification code and enter it in the field provided below</p>
            <FormVerify formData={formData} verify="unlock" setStatus={setStatus} setError={setError} setFormState={setFormState} setFormData={setFormData} />
          </form>
          <h2 className="errorMessage">{error}</h2>
        </>
      );
    case "question":
      return (
        <>
          <Navbar />
          <h1 className="page-headline">Unlock Your Account and Take Control of Your Access!</h1>
          <form onSubmit={handleSubmit}>
            <h2 className="form-headline">Final step!</h2>
            <p className="form-info">Enter the answer of your security question below</p>
            <p className="form-info">{formData.securityQuestion}</p>
            <FormInput labelText="Security question answer" name="securityQuestionAnswer" value={formData.securityQuestionAnswer || ""} onChange={handleChange} required />
            <button type="submit" className="submit-btn btn btn-primary">
              Verify
            </button>
          </form>
          <h2 className="errorMessage">{error}</h2>
        </>
      );
  }
}
