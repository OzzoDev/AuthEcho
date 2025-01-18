import React, { useState } from "react";
import { sendVerificationCode, signIn } from "../utils/ServerClient";
import ReactLoading from "react-loading";
import Navbar from "../components/Navbar";
import FormInput from "../components/form/FormInput";
import FormPasswordInput from "../components/form/FormPasswordInput";
import { FetchStatus } from "../types/apiTypes";
import { FormState, UserFormData } from "../types/types";
import FormVerify from "../components/form/FormVerify";
import { useNavigate } from "react-router-dom";

export default function SigninPage() {
  const [formData, setFormData] = useState<UserFormData>({ userData: "", password: "", rememberUser: false });
  const [formState, setFormState] = useState<FormState>("default");
  const [status, setStatus] = useState<FetchStatus>("idle");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    switch (formState) {
      case "default":
        const verificationCodeResponse = await sendVerificationCode({ userData: formData.userData, action: "verifyAccess" }, setStatus, setError);
        if (verificationCodeResponse) {
          setFormState("verify");
        }
        break;
      case "verify":
        await sendVerificationCode({ userData: formData.userData, action: "verifyAccess" }, setStatus, setError);
        break;
      case "password":
        const signInResponse = await signIn({ userData: formData.userData, password: formData.password }, setStatus, setError);
        if (signInResponse) {
          navigate("/account");
        }
        break;
    }
  };

  if (status === "loading") {
    return (
      <>
        <Navbar />
        <ReactLoading type="spin" color="#00f" height={50} width={50} />
      </>
    );
  }

  switch (formState) {
    case "default":
      return (
        <>
          <Navbar />
          <h1 className="page-headline">Step Inside: Your Account Management Hub Awaits!</h1>
          <form onSubmit={handleSubmit}>
            <h2 className="form-headline">Access your account!</h2>
            <FormInput labelText="Username or email" name="userData" value={formData.userData || ""} onChange={handleChange} error={error} required />
            <div className="error-container">
              <p className="error-message">{error}</p>
            </div>
            <button type="submit" className="submit-btn btn btn-primary">
              Continue
            </button>
          </form>
        </>
      );
    case "verify":
      return (
        <>
          <Navbar />
          <h1 className="page-headline">Step Inside: Your Account Management Hub Awaits!</h1>
          <form onSubmit={handleSubmit}>
            <h2 className="form-headline">Authenticate Your Account</h2>
            <p className="form-info">Please check your inbox for an 8-character verification code and enter it below. For your security, this code is valid for only one attempt. If you require a new code, please use the "Regenerate Code" button to receive a fresh verification code via email.</p>
            <FormVerify formData={formData} verify="signin" setStatus={setStatus} setError={setError} setFormState={setFormState} setFormData={setFormData} />
            <div className="error-container">
              <p className="error-message">{error}</p>
            </div>
            <button type="submit" className="submit-btn btn btn-primary">
              Regenerate Code
            </button>
          </form>
        </>
      );
    case "password":
      return (
        <>
          <Navbar />
          <h1 className="page-headline">Step Inside: Your Account Management Hub Awaits!</h1>
          <form onSubmit={handleSubmit}>
            <h2 className="form-headline">Almost There: Input Your Password!</h2>
            <FormPasswordInput labelText="Password" name="password" value={formData.password || ""} onChange={handleChange} required />
            <div className="error-container">
              <p className="error-message">{error}</p>
            </div>
            <button type="button" onClick={() => setFormData((prevData) => ({ ...prevData, rememberUser: !formData.rememberUser }))} onMouseLeave={(e) => (e.target as HTMLButtonElement).blur()} className={formData.rememberUser ? `remeber-btn btn btn-check btn-check-selected` : `remeber-btn btn btn-check`}>
              Remember me
            </button>
            <button type="submit" className="submit-btn btn btn-primary">
              Sign in
            </button>
          </form>
        </>
      );
  }
}
