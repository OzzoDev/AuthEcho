import { useEffect, useState } from "react";
import { FetchStatus, FormState } from "../types/userTypes";
import ReactLoading from "react-loading";
import { isSuspended, sendVerificationCode, unlockAccount } from "../utils/ServerClient";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import FormInput from "../components/form/FormInput";
import FormVerify from "../components/form/FormVerify";

export default function UnlockAccountPage() {
  const [formState, setFormState] = useState<FormState>("default");
  const [userData, setUserData] = useState<string>("");
  const [verificationCode, setVerficationCode] = useState<string>("");
  const [status, setStatus] = useState<FetchStatus>("idle");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    const verifyAccountAsync = async () => {
      if (verificationCode.length === 8) {
        const unlockAccountResponse = await unlockAccount({ userData, verificationCode }, setStatus, setError);
        if (unlockAccountResponse) {
          navigate("/signin");
        }
      }
    };

    verifyAccountAsync();
  }, [verificationCode]);

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

    const isSuspendedResponse = await isSuspended(userData, setStatus, setError);
    if (isSuspendedResponse) {
      const verificationCodeResponse = await sendVerificationCode({ userData, action: "unlockAccount" }, setStatus, setError);
      if (verificationCodeResponse) {
        setFormState("verify");
      }
    }
  };

  if (status === "loading") {
    return (
      <>
        <ReactLoading type="spin" color="#00f" height={50} width={50} />
        <Navbar />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <h1 className="page-headline">Unlock Your Account and Take Control of Your Access!</h1>
      <form onSubmit={handleSubmit}>
        {formState === "default" ? (
          <>
            <h2 className="form-headline">Unlock your account!</h2>
            <FormInput labelText="Email or username" name="userData" value={userData} onChange={handleChange} required />
            <button type="submit" className="submit-btn btn btn-primary">
              Unlock
            </button>
          </>
        ) : (
          <>
            <h2 className="form-headline">Verify Account!</h2>
            <p className="form-info">Please check your inbox for an 8-character verification code and enter it in the field provided below</p>
            <FormVerify setVerificationCode={setVerficationCode} />
          </>
        )}
      </form>
      <h2 className="errorMessage">{error}</h2>
    </>
  );
}
