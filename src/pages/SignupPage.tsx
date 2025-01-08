import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FetchStatus, User, VerifyAccountCredz } from "../types/userTypes";
//@ts-ignore
import "../styles/SignupPage.css";
import { signUp, verifyAccount } from "../utils/ServerClient";
import ReactLoading from "react-loading";
import axios from "axios";
import { capitalize, removeAllQuotes } from "../utils/utils";

export default function SignUpPage() {
  const [formData, setFormData] = useState<User>({ name: "", email: "", password: "" });
  const [verificationCode, setVerficationCode] = useState<string>("");
  const [isSignedUp, setSignedUp] = useState<boolean>(false);

  const [status, setStatus] = useState<FetchStatus>("idle");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleVerificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setVerficationCode(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setStatus("loading");
      if (isSignedUp) {
        const verifyCredz: VerifyAccountCredz = { email: formData.email, verificationCode: verificationCode };
        await verifyAccount(verifyCredz);
        console.log("Account verified");
        navigate("/account");
      } else {
        await signUp(formData);
        console.log("Sign up successfully");
        setSignedUp(true);
      }
      setStatus("success");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorMessage: string = capitalize(removeAllQuotes(error.response?.data.message));
        console.error("Creation or verification of account failed", error);
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
          {!isSignedUp && (
            <>
              <div>
                <label>
                  Username
                  <input type="text" name="name" value={formData.name} onChange={handleSignUpChange} required />
                </label>
              </div>
              <div>
                <label>
                  Email
                  <input type="email" name="email" value={formData.email} onChange={handleSignUpChange} required />
                </label>
              </div>
              <div>
                <label>
                  Password
                  <input type="password" name="password" value={formData.password} onChange={handleSignUpChange} required />
                </label>
              </div>
            </>
          )}
          {isSignedUp && (
            <div>
              <label>
                Verification code:
                <input type="text" name="verificationCode" value={verificationCode} onChange={handleVerificationChange} />
              </label>
            </div>
          )}
          <p className="errorMessage">{error}</p>
          <button type="submit">{isSignedUp ? "Verify Account" : "Sign Up"}</button>
          <a className="signInLink" href="/signin">
            Already have an account? Sign in here
          </a>
        </form>
      )}
    </>
  );
}
