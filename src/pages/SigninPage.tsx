import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FetchStatus, SignIn } from "../types/userTypes";
import { signIn } from "../utils/ServerClient";
import ReactLoading from "react-loading";
import { useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import FormInput from "../components/form/FormInput";
import FormPasswordInput from "../components/form/FormPasswordInput";

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
    console.log("Res: ", signInResponse);

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
        <p className="errorMessage">{error}</p>
        <button type="submit" className="submit-btn btn btn-primary">
          Sign In
        </button>
      </form>
      <h2 className="errorMessage">{error}</h2>
    </>
  );
}
