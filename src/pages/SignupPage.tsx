import { getSecurityQuestions, setSecurityQuestion, signUp } from "../utils/ServerClient";
import ReactLoading from "react-loading";
import Navbar from "../components/Navbar";
import FormInput from "../components/form/FormInput";
import FormPasswordInput from "../components/form/FormPasswordInput";
import FormVerify from "../components/form/FormVerify";
import { FetchStatus } from "../types/apiTypes";
import { FormState, SecurityQuestion, UserFormData } from "../types/types";
import { useEffect, useState } from "react";
import Dropdown from "../components/Dropdown";
import Stepper from "../components/Stepper";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

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
    if (formState === "default") {
      const signUpResponse = await signUp({ name: formData.name || "", email: formData.email || "", password: formData.password || "", confirmPassword: formData.confirmPassword || "" }, setStatus, setError);
      if (signUpResponse) {
        setFormState("verify");
      }
    } else if (formState === "question") {
      if (formData.securityQuestion === "") {
        setError("Select a security question");
        setStatus("error");
      } else {
        const questionResponse = await setSecurityQuestion({ name: formData.name || "", email: formData.email || "", password: formData.password || "", confirmPassword: formData.confirmPassword || "", securityQuestion: formData.securityQuestion || "", securityQuestionAnswer: formData.securityQuestionAnswer || "" }, setStatus, setError, dispatch);
        if (questionResponse) {
          navigate("/account");
        }
      }
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
          <h1 className="page-headline">Join Now for Effortless Account Management and Ultimate Security in 3 Simple Steps!</h1>
          <form onSubmit={handleSubmit}>
            <h2 className="form-headline">Create your account!</h2>
            <FormInput labelText="Username" name="name" value={formData.name || ""} onChange={handleFormChange} required />
            <FormInput labelText="Email" name="email" value={formData.email || ""} onChange={handleFormChange} required />
            <FormPasswordInput labelText="Password" name="password" value={formData.password || ""} onChange={handleFormChange} required />
            <FormPasswordInput labelText="Confirm password" name="confirmPassword" value={formData.confirmPassword || ""} onChange={handleFormChange} required />
            <button type="submit" className="submit-btn btn btn-primary">
              Sign Up
            </button>
          </form>
          <Stepper steps={3} selectedIndex={currentStep} />
          <h2 className="errorMessage">{error}</h2>
        </>
      );
    case "question":
      return (
        <>
          <Navbar />
          <h1 className="page-headline">Join Now for Effortless Account Management and Ultimate Security!</h1>
          <form onSubmit={handleSubmit}>
            <h2 className="form-headline">Select Security Question!</h2>
            <p className="form-info">Implementing a security question significantly enhances your account's protection. Please choose a question that you can easily remember for future reference.</p>
            <Dropdown questions={securityQuestions} onSelect={handleSecurityQuestionSelect} />
            <FormInput labelText="Your answer" name="securityQuestionAnswer" value={formData.securityQuestionAnswer || ""} onChange={handleFormChange} required />
            <button type="submit" className="submit-btn btn btn-primary">
              Verify
            </button>
          </form>
          <Stepper steps={3} selectedIndex={currentStep} />
          <h2 className="errorMessage">{error}</h2>
        </>
      );
    case "verify":
      return (
        <>
          <Navbar />
          <h1 className="page-headline">Join Now for Effortless Account Management and Ultimate Security!</h1>
          <form onSubmit={handleSubmit}>
            <h2 className="form-headline">Verify Email!</h2>
            <p className="form-info">An email has been sent to {formData.email}. Please check your inbox for an 8-character verification code and enter it in the field provided below</p>
            <FormVerify formData={formData} verify="signup" setStatus={setStatus} setError={setError} setFormState={setFormState} />
          </form>
          <Stepper steps={3} selectedIndex={currentStep} />
          <h2 className="errorMessage">{error}</h2>
        </>
      );
  }
}
