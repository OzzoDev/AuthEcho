import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, VerifyAccount } from "../types/userTypes";
//@ts-ignore
import "../styles/SignupPage.css";
import { signUp, verifyAccount } from "../utils/ServerClient";

export default function SignUpPage() {
  const [formData, setFormData] = useState<User>({ name: "", email: "", password: "" });
  const [verificationCode, setVerficationCode] = useState<string>("");
  const [isSignedUp, setSignedUp] = useState<boolean>(false);

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
      if (isSignedUp) {
        const verifyCredz: VerifyAccount = { email: formData.email, verificationCode: verificationCode };
        console.log(verifyCredz);
        await verifyAccount(verifyCredz);
        console.log("Account verified");
      } else {
        await signUp(formData);
        console.log("Sign up successfully");
        setSignedUp(true);
      }
    } catch (error) {
      console.log("Sign up failed", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {!isSignedUp && (
        <>
          <div>
            <label>
              Username:
              <input type="text" name="name" value={formData.name} onChange={handleSignUpChange} required />
            </label>
          </div>
          <div>
            <label>
              Email:
              <input type="email" name="email" value={formData.email} onChange={handleSignUpChange} required />
            </label>
          </div>
          <div>
            <label>
              Password:
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
      <button type="submit">{isSignedUp ? "Verify Account" : "Sign Up"}</button>
    </form>
  );
}
