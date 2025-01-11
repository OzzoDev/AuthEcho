//@ts-ignore
import "../styles/signupPage.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FetchStatus, User, VerifyAccountCredz } from "../types/userTypes";
import { signUp, verifyAccount } from "../utils/ServerClient";
import ReactLoading from "react-loading";
import { useDispatch } from "react-redux";

export default function SignUpPage() {
  const [formData, setFormData] = useState<User>({ name: "", email: "", password: "" });
  const [verificationCode, setVerficationCode] = useState<string>("");
  const [isSignedUp, setSignedUp] = useState<boolean>(false);

  const [status, setStatus] = useState<FetchStatus>("idle");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    if (isSignedUp) {
      const verifyCredz: VerifyAccountCredz = { email: formData.email, verificationCode: verificationCode };
      const verifyResponse = await verifyAccount(verifyCredz, setStatus, setError);
      if (verifyResponse) {
        navigate("/account");
      }
    } else {
      const signUpResponse = await signUp(formData, setStatus, setError, dispatch);
      if (signUpResponse) {
        setSignedUp(true);
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
          <a href="/signin">Already have an account? Sign in here</a>
        </form>
      )}
    </>
  );
}
