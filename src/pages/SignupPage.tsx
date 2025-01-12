import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FetchStatus, User, VerifyAccountCredz } from "../types/userTypes";
import { signUp, verifyAccount } from "../utils/ServerClient";
import ReactLoading from "react-loading";
import { useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import FormInput from "../components/FormInput";
//@ts-ignore
import "../styles/signupPage.css";
import FormPasswordInput from "../components/FormPasswordInput";
import { NewAccount } from "../types/auth";

export default function SignUpPage() {
  const [formData, setFormData] = useState<NewAccount>({ name: "", email: "", password: "", confirmPassword: "" });
  const [verificationCode, setVerficationCode] = useState<string>("");
  const [verify, setVerify] = useState<boolean>(false);

  const [status, setStatus] = useState<FetchStatus>("idle");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (verify) {
      setVerficationCode(value);
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (verify) {
      const verifyResponse = await verifyAccount({ email: formData.email, verificationCode: verificationCode }, setStatus, setError);
      if (verifyResponse) {
        navigate("/account");
      }
      setVerify(false);
    } else {
      const signUpResponse = await signUp(formData, setStatus, setError, dispatch);
      if (signUpResponse) {
        setVerify(true);
      }
    }
  };

  if (status === "loading") {
    return <ReactLoading type="spin" color="#00f" height={50} width={50} />;
  }

  return (
    <>
      <Navbar />
      <h1 className="page-headline">Join Now for Effortless Account Management and Ultimate Security</h1>
      <form onSubmit={handleSubmit}>
        {!verify && (
          <>
            <h2 className="form-headline">Create your account!</h2>
            <FormInput labelText="Username" name="name" value={formData.name} onChange={handleFormChange} required />
            <FormInput labelText="Email" name="email" value={formData.email} onChange={handleFormChange} required />
            <FormPasswordInput labelText="Password" name="password" value={formData.password} onChange={handleFormChange} required />
            <FormPasswordInput labelText="Confirm password" name="confirmPassword" value={formData.confirmPassword} onChange={handleFormChange} required />
          </>
        )}
        {verify && <FormInput labelText=" Verification code" name="verificationCode" value={verificationCode} onChange={handleFormChange} required />}
        <button type="submit" className="submit-btn btn btn-primary">
          {verify ? "Verify Account" : "Sign Up"}
        </button>
      </form>
      <h2 className="errorMessage">{error}</h2>
    </>
  );
}
