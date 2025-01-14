import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../utils/ServerClient";
import ReactLoading from "react-loading";
import { useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import FormInput from "../components/form/FormInput";
import FormPasswordInput from "../components/form/FormPasswordInput";
import { FetchStatus } from "../types/apiTypes";
import { SignIn } from "../types/userTypes";

export default function SigninPage() {
  const [formData, setFormData] = useState<SignIn>({ userData: "", password: "" });
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
    const signInResponse = await signIn(formData, setStatus, setError, dispatch);

    if (signInResponse) {
      navigate("/account");
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

  return (
    <>
      <Navbar />
      <h1 className="page-headline">Step Inside: Your Account Management Hub Awaits!</h1>
      <form onSubmit={handleSubmit}>
        <h2 className="form-headline">Access your account!</h2>
        <FormInput labelText="Username" name="userData" value={formData.userData} onChange={handleChange} required />
        <FormPasswordInput labelText="Password" name="password" value={formData.password} onChange={handleChange} required />
        <div className="error-container">
          <p className="error-message">{error}</p>
        </div>
        <button type="submit" className="submit-btn btn btn-primary">
          Sign In
        </button>
      </form>
    </>
  );
}
