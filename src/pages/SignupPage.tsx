import { signUp } from "../utils/ServerClient";
import ReactLoading from "react-loading";
import { useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import FormInput from "../components/form/FormInput";
import FormPasswordInput from "../components/form/FormPasswordInput";
import FormVerify from "../components/form/FormVerify";
import { FetchStatus } from "../types/apiTypes";
import { FormState, UserFormData } from "../types/types";
import { useState } from "react";

export default function SignUpPage() {
  const [formData, setFormData] = useState<UserFormData>({ name: "", email: "", password: "", confirmPassword: "" });
  const [formState, setFormState] = useState<FormState>("default");
  const [status, setStatus] = useState<FetchStatus>("idle");
  const [error, setError] = useState<string>("");

  const dispatch = useDispatch();

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const signUpResponse = await signUp({ name: formData.name || "", email: formData.email || "", password: formData.password || "", confirmPassword: formData.confirmPassword || "" }, setStatus, setError, dispatch);
    if (signUpResponse) {
      setFormState("verify");
    }
  };

  if (status === "loading") {
    return (
      <>
        <Navbar />
        <ReactLoading type="spin" color="#00f" height={50} width={50} />;
      </>
    );
  }

  return (
    <>
      <Navbar />
      <h1 className="page-headline">Join Now for Effortless Account Management and Ultimate Security!</h1>
      <form onSubmit={handleSubmit}>
        {formState === "default" ? (
          <>
            <h2 className="form-headline">Create your account!</h2>
            <FormInput labelText="Username" name="name" value={formData.name || ""} onChange={handleFormChange} required />
            <FormInput labelText="Email" name="email" value={formData.email || ""} onChange={handleFormChange} required />
            <FormPasswordInput labelText="Password" name="password" value={formData.password || ""} onChange={handleFormChange} required />
            <FormPasswordInput labelText="Confirm password" name="confirmPassword" value={formData.confirmPassword || ""} onChange={handleFormChange} required />
            <button type="submit" className="submit-btn btn btn-primary">
              Sign Up
            </button>
          </>
        ) : (
          <>
            <h2 className="form-headline">Verify Account!</h2>
            <p className="form-info">An email has been sent to {formData.email}. Please check your inbox for an 8-character verification code and enter it in the field provided below</p>
            <FormVerify formData={formData} verify="signup" setStatus={setStatus} setError={setError} setFormData={setFormData} />
          </>
        )}
      </form>
      <h2 className="errorMessage">{error}</h2>
    </>
  );
}
