import { useState } from "react";
import ReactLoading from "react-loading";
import { isSuspended, sendVerificationCode } from "../utils/ServerClient";
import Navbar from "../components/Navbar";
import FormInput from "../components/form/FormInput";
import FormVerify from "../components/form/FormVerify";
import { FormState, UserFormData } from "../types/types";
import { FetchStatus } from "../types/apiTypes";

export default function UnlockAccountPage() {
  const [formData, setFormData] = useState<UserFormData>({ userData: "", verificationCode: "" });

  const [formState, setFormState] = useState<FormState>("default");
  const [status, setStatus] = useState<FetchStatus>("idle");
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prevData) => ({ ...prevData, ["userData"]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isSuspendedResponse = await isSuspended(formData.userData || "", setStatus, setError);
    if (isSuspendedResponse) {
      const verificationCodeResponse = await sendVerificationCode({ userData: formData.userData || "", action: "unlockAccount" }, setStatus, setError);
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
            <FormInput labelText="Email or username" name="userData" value={formData.userData || ""} onChange={handleChange} required />
            <button type="submit" className="submit-btn btn btn-primary">
              Unlock
            </button>
          </>
        ) : (
          <>
            <h2 className="form-headline">Verify to Unlock!</h2>
            <p className="form-info">Please check your inbox for an 8-character verification code and enter it in the field provided below</p>
            <FormVerify formData={formData} verify="unlock" setStatus={setStatus} setError={setError} setFormState={setFormState} />
          </>
        )}
      </form>
      <h2 className="errorMessage">{error}</h2>
    </>
  );
}
