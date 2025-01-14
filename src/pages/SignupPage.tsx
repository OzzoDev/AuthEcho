import { getSecurityQuestions, sendVerificationCode, setSecurityQuestion, signUp } from "../utils/ServerClient";
import ReactLoading from "react-loading";
import Navbar from "../components/Navbar";
import FormInput from "../components/form/FormInput";
import FormPasswordInput from "../components/form/FormPasswordInput";
import FormVerify from "../components/form/FormVerify";
import { FetchStatus } from "../types/apiTypes";
import { FormState, SecurityQuestion, UserFormData } from "../types/types";
import { useEffect, useState } from "react";
import Stepper from "../components/Stepper";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Dropdown from "../components/form/Dropdown";

export default function SignUpPage() {
  const [formData, setFormData] = useState<UserFormData>({ name: "", email: "", password: "", confirmPassword: "", securityQuestion: "", securityQuestionAnswer: "" });
  const [formState, setFormState] = useState<FormState>("default");
  const [securityQuestions, setSecurityQuestions] = useState<SecurityQuestion[]>([]);
  const [status, setStatus] = useState<FetchStatus>("idle");
  const [error, setError] = useState<string>("");
  const [currentStep, setCurrentStep] = useState<number>(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setCurrentStep(formState === "default" ? 0 : formState === "verify" ? 1 : 2);
  }, [formState]);

  useEffect(() => {
    if (formState === "question") {
      const fetchSecurityQuestions = async () => {
        const questionsResponse = await getSecurityQuestions(setStatus, setError);
        if (questionsResponse) {
          setSecurityQuestions(questionsResponse.data.questions);
        }
      };
      fetchSecurityQuestions();
    }
  }, [formState]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSecurityQuestionSelect = (question: SecurityQuestion) => {
    setFormData((prevData) => ({ ...prevData, securityQuestion: question.question }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    switch (formState) {
      case "default":
        const signUpResponse = await signUp({ name: formData.name || "", email: formData.email || "", password: formData.password || "", confirmPassword: formData.confirmPassword || "" }, setStatus, setError);
        if (signUpResponse) {
          setFormState("verify");
        }
        break;
      case "verify":
        await sendVerificationCode({ userData: formData.name || formData.email || "", action: "verifyEmail" }, setStatus, setError);
        break;
      case "question":
        if (formData.securityQuestion === "") {
          setError("Select a security question");
          setStatus("error");
        } else {
          const questionResponse = await setSecurityQuestion({ name: formData.name || "", email: formData.email || "", password: formData.password || "", confirmPassword: formData.confirmPassword || "", securityQuestion: formData.securityQuestion || "", securityQuestionAnswer: formData.securityQuestionAnswer || "" }, setStatus, setError, dispatch);
          if (questionResponse) {
            navigate("/account");
          }
        }
        break;
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

  switch (formState) {
    case "default":
      return (
        <>
          <Navbar />
          <h1 className="page-headline">Join Now for Effortless Account Management in 3 Simple Steps!</h1>
          <form onSubmit={handleSubmit}>
            <h2 className="form-headline">Create your account!</h2>
            <FormInput labelText="Username" name="name" value={formData.name || ""} onChange={handleFormChange} required />
            <FormInput labelText="Email" name="email" value={formData.email || ""} onChange={handleFormChange} required />
            <FormPasswordInput labelText="Password" name="password" value={formData.password || ""} onChange={handleFormChange} required />
            <FormPasswordInput labelText="Confirm password" name="confirmPassword" value={formData.confirmPassword || ""} onChange={handleFormChange} required />
            <div className="error-container">
              <p className="error-message">{error}</p>
            </div>
            <button type="submit" className="submit-btn btn btn-primary">
              Sign Up
            </button>
          </form>
          <Stepper steps={3} selectedIndex={currentStep} />
        </>
      );
    case "verify":
      return (
        <>
          <Navbar />
          <h1 className="page-headline">Join Now for Effortless Account Management in 3 Simple Steps!</h1>
          <form onSubmit={handleSubmit}>
            <h2 className="form-headline">Verify Email!</h2>
            <p className="form-info">Please check your inbox for an 8-character verification code and enter it below. For your security, this code is valid for only one attempt. If you require a new code, please use the "Regenerate Code" button to receive a fresh verification code via email.</p>
            <FormVerify formData={formData} verify="signup" setStatus={setStatus} setError={setError} setFormState={setFormState} />
            <div className="error-container">
              <p className="error-message">{error}</p>
            </div>
            <button type="submit" className="submit-btn btn btn-primary">
              Regenerate Code
            </button>
          </form>
          <Stepper steps={3} selectedIndex={currentStep} />
        </>
      );
    case "question":
      return (
        <>
          <Navbar />
          <h1 className="page-headline">Join Now for Effortless Account Management in 3 Simple Steps!</h1>
          <form onSubmit={handleSubmit}>
            <h2 className="form-headline">Select Security Question!</h2>
            <p className="form-info">Implementing a security question significantly enhances your account's protection. Please choose a question that you can easily remember for future reference.</p>
            <Dropdown questions={securityQuestions} onSelect={handleSecurityQuestionSelect} />
            <FormInput labelText="Your answer" name="securityQuestionAnswer" value={formData.securityQuestionAnswer || ""} onChange={handleFormChange} required />
            <div className="error-container">
              <p className="error-message">{error}</p>
            </div>
            <button type="submit" className="submit-btn btn btn-primary">
              Continue
            </button>
          </form>
          <Stepper steps={3} selectedIndex={currentStep} />
        </>
      );
  }
}
