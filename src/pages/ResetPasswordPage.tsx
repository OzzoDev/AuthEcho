// @ts-ignore
import "../styles/signupPage.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FetchStatus, ResetPassword } from "../types/userTypes";
import { capitalize, removeAllQuotes } from "../utils/utils";
import axios from "axios";
import { resetPassword, sendVerificationCode, validatePassword } from "../utils/ServerClient";
import ReactLoading from "react-loading";

export default function SigninPage() {
  const [formData, setFormData] = useState<ResetPassword>({ userData: "", verificationCode: "", newPassword: "", confirmNewPassword: "" });
  const [verify, setVerify] = useState<boolean>(false);
  const [status, setStatus] = useState<FetchStatus>("idle");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setStatus("loading");
      setError("");
      if (verify) {
        await resetPassword(formData);
        navigate("/account");
      } else {
        await validatePassword({ newPassword: formData.newPassword, confirmNewPassword: formData.confirmNewPassword });
        await sendVerificationCode(formData.userData);
        setVerify(true);
      }
      setStatus("success");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorMessage: string = capitalize(removeAllQuotes(error.response?.data.message || error.message));
        console.error("Password resetting failed", error);
        setStatus("error");
        setError(errorMessage);
      }
    }
  };

  return (
    <>
      {status === "loading" ? (
        <ReactLoading type="spin" color="#00f" height={50} width={50} />
      ) : (
        <form onSubmit={handleSubmit}>
          {!verify ? (
            <>
              <div>
                <label>
                  Email or Username
                  <input type="text" name="userData" value={formData.userData} onChange={handleChange} required />
                </label>
              </div>
              <div>
                <label>
                  New password
                  <input type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} required />
                </label>
              </div>
              <div>
                <label>
                  Confirm new password
                  <input type="password" name="confirmNewPassword" value={formData.confirmNewPassword} onChange={handleChange} required />
                </label>
              </div>
              <p className="errorMessage">{error}</p>
              <button type="submit">Continue</button>
              <div className="links">
                <a href="/signup">No account? Sign up here</a>
                <a href="/signin">Already have an account? Sign in here</a>
              </div>
            </>
          ) : (
            <>
              <div>
                <label>
                  Verification code
                  <input type="text" name="verificationCode" value={formData.verificationCode} onChange={handleChange} required />
                </label>
              </div>
              <p className="errorMessage">{error}</p>
              <button type="submit">Sign In</button>
              <div className="links">
                <a href="/signup">No account? Sign up here</a>
                <a href="/signin">Already have an account? Sign in here</a>
              </div>
            </>
          )}
        </form>
      )}
    </>
  );
}
