import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FetchStatus, ResetPassword } from "../types/userTypes";
import { resetPassword, sendVerificationCode, validatePassword } from "../utils/ServerClient";
import ReactLoading from "react-loading";
import Navbar from "../components/Navbar";
import FormPasswordInput from "../components/form/FormPasswordInput";
import FormInput from "../components/form/FormInput";
import FormVerify from "../components/form/FormVerify";

export default function SigninPage() {
  const [formData, setFormData] = useState<ResetPassword>({ userData: "", newPassword: "", confirmNewPassword: "", verificationCode: "" });
  const [verify, setVerify] = useState<boolean>(false);
  const [status, setStatus] = useState<FetchStatus>("idle");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();
  const dispatch = useNavigate();

  useEffect(() => {
    const verifyAccountAsync = async () => {
      if (formData.verificationCode.length === 8) {
        const passwordResposne = await resetPassword(formData, setStatus, setError, dispatch);
        if (passwordResposne) {
          navigate("/account");
        }
      }
    };

    verifyAccountAsync();
  }, [formData.verificationCode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSetVerificationCode = (verificationCode: string) => {
    setFormData((prevData) => ({ ...prevData, ["verificationCode"]: verificationCode }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (verify) {
      const passwordResposne = await resetPassword(formData, setStatus, setError, dispatch);
      if (passwordResposne) {
        navigate("/account");
      }
    } else {
      const validatePasswordResponse = await validatePassword({ newPassword: formData.newPassword, confirmNewPassword: formData.confirmNewPassword, userData: formData.userData }, setStatus, setError);
      if (validatePasswordResponse) {
        const verificationCodeResponse = await sendVerificationCode({ userData: formData.userData, action: "verifyEmail" }, setStatus, setError);
        if (verificationCodeResponse) {
          setVerify(true);
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

  return (
    <>
      <Navbar />
      <h1 className="page-headline">Quickly Reset Your Password and Secure Your Account!</h1>
      <form onSubmit={handleSubmit}>
        {!verify ? (
          <>
            <h2 className="form-headline">Reset your password!</h2>
            <FormInput labelText="Username" name="userData" value={formData.userData} onChange={handleChange} required />
            <FormPasswordInput labelText="Password" name="newPassword" value={formData.newPassword} onChange={handleChange} required />
            <FormPasswordInput labelText="Confirm password" name="confirmNewPassword" value={formData.confirmNewPassword} onChange={handleChange} required />
            <button type="submit" className="submit-btn btn btn-primary">
              Reset
            </button>
          </>
        ) : (
          <>
            <>
              <h2 className="form-headline">Verify Account!</h2>
              <p className="form-info">Please check your inbox for an 8-character verification code and enter it in the field provided below</p>
              <FormVerify setVerificationCode={handleSetVerificationCode} />
            </>
          </>
        )}
      </form>
      <h2 className="errorMessage">{error}</h2>
    </>
  );
}
