import React, { useRef, useState } from "react";
import { FetchStatus, FormState } from "../types/userTypes";
import ReactLoading from "react-loading";
import { sendVerificationCode, unlockAccount } from "../utils/ServerClient";
import { useNavigate } from "react-router-dom";

export default function UnlockAccountPage() {
  const [formState, setFormState] = useState<FormState>("default");
  const [userData, setUserData] = useState<string>("");
  const [verificationCode, setVerficationCode] = useState<string>("");
  const [status, setStatus] = useState<FetchStatus>("idle");
  const [error, setError] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (formState === "default") {
      setUserData(value);
    } else {
      setVerficationCode(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputRef.current) {
      inputRef.current.value = "";
    }

    if (formState === "default") {
      const verificationCodeResponse = await sendVerificationCode({ userData, action: "unlockAccount" }, setStatus, setError);
      if (verificationCodeResponse) {
        setFormState("verify");
      }
    } else {
      const unlockAccountResponse = await unlockAccount({ userData, verificationCode }, setStatus, setError);
      if (unlockAccountResponse) {
        setFormState("default");
        navigate("/signin");
      }
    }
  };

  return (
    <>
      {status === "loading" ? (
        <ReactLoading type="spin" color="#00f" height={50} width={50} />
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              {formState === "default" ? "Email or Username" : "VerificationCode"}
              <input type="text" ref={inputRef} onChange={handleChange} required />
            </label>
          </div>
          <p className="errorMessage">{error}</p>
          <button type="submit">{formState === "default" ? "Continue" : "Verify"}</button>
          <div className="links">
            <a className="signInLink" href="/signup">
              No account? Sign up here
            </a>
            <a className="signInLink" href="/signin">
              Sign in
            </a>
          </div>
        </form>
      )}
    </>
  );
}
