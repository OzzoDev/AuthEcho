import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FetchStatus, SignIn } from "../types/userTypes";
// @ts-ignore
import "../styles/signupPage.css";
import { capitalize, removeAllQuotes } from "../utils/utils";
import axios from "axios";
import { signIn } from "../utils/ServerClient";
import ReactLoading from "react-loading";

export default function SigninPage() {
  const [formData, setFormData] = useState<SignIn>({ userData: "", password: "" });
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

      await signIn(formData);
      navigate("/account");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorMessage: string = capitalize(removeAllQuotes(error.response?.data.message || error.message));
        console.error("Sign in failed", error);
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
          <div>
            <label>
              Email or Username
              <input type="text" name="userData" value={formData.userData} onChange={handleChange} required />
            </label>
          </div>
          <div>
            <label>
              Password
              <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            </label>
          </div>
          <p className="errorMessage">{error}</p>
          <button type="submit">Sign In</button>
          <div className="links">
            <a className="signInLink" href="/signup">
              No account? Sign up here
            </a>
            <a className="signInLink" href="/resetpassword">
              Reset password
            </a>
          </div>
        </form>
      )}
    </>
  );
}
