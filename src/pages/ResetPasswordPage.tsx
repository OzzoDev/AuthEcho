import { useState } from "react";
import { sendVerificationCode, validatePassword } from "../utils/ServerClient";
import ReactLoading from "react-loading";
import Navbar from "../components/Navbar";
import FormPasswordInput from "../components/form/FormPasswordInput";
import FormInput from "../components/form/FormInput";
import FormVerify from "../components/form/FormVerify";
import { FetchStatus } from "../types/apiTypes";
import { FormState, UserFormData } from "../types/types";

export default function SigninPage() {
  const [formData, setFormData] = useState<UserFormData>({ userData: "", password: "", confirmPassword: "", verificationCode: "" });
  const [formState, setFormState] = useState<FormState>("default");
  const [status, setStatus] = useState<FetchStatus>("idle");
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validatePasswordResponse = await validatePassword({ userData: formData.userData || "", newPassword: formData.password || "", confirmNewPassword: formData.confirmPassword || "" }, setStatus, setError);
    if (validatePasswordResponse) {
      const verificationCodeResponse = await sendVerificationCode({ userData: formData.userData || "", action: "verifyEmail" }, setStatus, setError);
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
      <h1 className="page-headline">Quickly Reset Your Password and Secure Your Account!</h1>
      <form onSubmit={handleSubmit}>
        {formState === "default" ? (
          <>
            <h2 className="form-headline">Reset your password!</h2>
            <FormInput labelText="Email or username" name="userData" value={formData.userData || ""} onChange={handleChange} required />
            <FormPasswordInput labelText="Password" name="password" value={formData.password || ""} onChange={handleChange} required />
            <FormPasswordInput labelText="Confirm password" name="confirmPassword" value={formData.confirmPassword || ""} onChange={handleChange} required />
            <button type="submit" className="submit-btn btn btn-primary">
              Reset
            </button>
          </>
        ) : (
          <>
            <h2 className="form-headline">Verify to reset!</h2>
            <p className="form-info">Please check your inbox for an 8-character verification code and enter it in the field provided below</p>
            <FormVerify formData={formData} verify="reset" setStatus={setStatus} setError={setError} setFormData={setFormData} />
          </>
        )}
      </form>
      <h2 className="errorMessage">{error}</h2>
    </>
  );
}
