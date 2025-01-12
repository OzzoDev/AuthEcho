import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FetchStatus } from "../types/userTypes";
import { signUp, verifyAccount } from "../utils/ServerClient";
import ReactLoading from "react-loading";
import { useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import FormInput from "../components/form/FormInput";
import FormPasswordInput from "../components/form/FormPasswordInput";
import { NewAccount } from "../types/auth";
import FormVerify from "../components/form/FormVerify";

export default function SignUpPage() {
  const [formData, setFormData] = useState<NewAccount>({ name: "", email: "", password: "", confirmPassword: "" });
  const [verificationCode, setVerficationCode] = useState<string>("");
  const [verify, setVerify] = useState<boolean>(false);

  const [status, setStatus] = useState<FetchStatus>("idle");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const verifyAccountAsync = async () => {
      if (verificationCode.length === 8) {
        const verifyResponse = await verifyAccount({ email: formData.email, verificationCode: verificationCode }, setStatus, setError);
        if (verifyResponse) {
          navigate("/account");
        }
      }
    };

    verifyAccountAsync();
  }, [verificationCode]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const signUpResponse = await signUp(formData, setStatus, setError, dispatch);
    if (signUpResponse) {
      setVerify(true);
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
        {!verify ? (
          <>
            <h2 className="form-headline">Create your account!</h2>
            <FormInput labelText="Username" name="name" value={formData.name} onChange={handleFormChange} required />
            <FormInput labelText="Email" name="email" value={formData.email} onChange={handleFormChange} required />
            <FormPasswordInput labelText="Password" name="password" value={formData.password} onChange={handleFormChange} required />
            <FormPasswordInput labelText="Confirm password" name="confirmPassword" value={formData.confirmPassword} onChange={handleFormChange} required />
            <button type="submit" className="submit-btn btn btn-primary">
              Sign Up
            </button>
          </>
        ) : (
          <>
            <h2 className="form-headline">Verify Account!</h2>
            <p className="form-info">An email has been sent to {formData.email}. Please check your inbox for an 8-character verification code and enter it in the field provided below</p>
            <FormVerify setVerificationCode={setVerficationCode} />
          </>
        )}
      </form>
      <h2 className="errorMessage">{error}</h2>
    </>
  );
}
