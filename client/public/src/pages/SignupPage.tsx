import ReactLoading from "react-loading";
import Navbar from "../components/Navbar";
import FormInput from "../components/form/FormInput";
import FormPasswordInput from "../components/form/FormPasswordInput";
import FormVerify from "../components/form/FormVerify";
import { ApiRequest, FetchStatus } from "../types/apiTypes";
import { FormState, SecurityQuestion } from "../types/types";
import { useEffect, useState } from "react";
import Stepper from "../components/Stepper";
import { useNavigate } from "react-router-dom";
import Dropdown from "../components/form/Dropdown";
import useApi from "../hooks/useApi";
import useSessionStorage from "../hooks/useSessionStorage";
import { AUTH_KEY } from "../constants/contants";

export default function SignUpPage() {
  const [formData, setFormData] = useState<ApiRequest>({});
  const [formState, setFormState] = useState<FormState>("default");
  const [securityQuestions, setSecurityQuestions] = useState<SecurityQuestion[]>([]);
  const [status, setStatus] = useState<FetchStatus>("idle");
  const [error, setError] = useState<string>("");
  const [currentStep, setCurrentStep] = useState<number>(0);
  const { fetchData: getSecurityQuestions } = useApi("GET", "SECURITYQUESTIONS");
  const { fetchData: signUp } = useApi("POST", "SIGNUP");
  const { fetchData: verify } = useApi("POST", "SENDVERIFICATIONCODE");
  const { fetchData: setQuestion } = useApi("POST", "SETSECURITYQUESTION");
  const { setSessionValue } = useSessionStorage<boolean>(AUTH_KEY, false);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentStep(formState === "default" ? 0 : formState === "verify" ? 1 : 2);
  }, [formState]);

  useEffect(() => {
    if (formState === "question") {
      const fetchSecurityQuestions = async () => {
        const response = await getSecurityQuestions(setStatus, setError);
        if (response && response.data.questions) {
          setSecurityQuestions(response.data.questions);
        }
      };
      fetchSecurityQuestions();
    }
  }, [formState]);

  const handleSignUp = async () => {
    const response = await signUp(setStatus, setError, formData);

    if (response) {
      setFormState("verify");
    }
  };

  const handleVerify = async () => {
    (formData.action = "verifyEmail"), await verify(setStatus, setError, formData);
  };

  const handleSetQuestion = async () => {
    if (formData.securityQuestion === "") {
      setError("Select a security question");
      setStatus("error");
    } else {
      const response = await setQuestion(setStatus, setError, formData);

      if (response) {
        setSessionValue(true);
        navigate("/account");
      }
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSecurityQuestionSelect = (question: SecurityQuestion) => {
    setFormData((prevData) => ({
      ...prevData,
      securityQuestion: question.question,
    }));
  };

  const handleRemeberUser = () => {
    setFormData((prevData) => ({
      ...prevData,
      rememberUser: !prevData.rememberUser,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    switch (formState) {
      case "default":
        await handleSignUp();
        break;
      case "verify":
        await handleVerify();
        break;
      case "question":
        await handleSetQuestion();
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
          <h1 className="page-headline">
            Join Now for Effortless Account Management in 3 Simple Steps!
          </h1>
          <form onSubmit={handleSubmit}>
            <h2 className="form-headline">Create your account!</h2>
            <FormInput
              labelText="Username"
              name="name"
              value={formData.name || ""}
              onChange={handleFormChange}
              required
            />
            <FormInput
              labelText="Email"
              name="email"
              value={formData.email || ""}
              onChange={handleFormChange}
              required
            />
            <FormPasswordInput
              labelText="Password"
              name="password"
              value={formData.password || ""}
              onChange={handleFormChange}
              required
            />
            <FormPasswordInput
              labelText="Confirm password"
              name="confirmPassword"
              value={formData.confirmPassword || ""}
              onChange={handleFormChange}
              required
            />
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
          <h1 className="page-headline">
            Join Now for Effortless Account Management in 3 Simple Steps!
          </h1>
          <form onSubmit={handleSubmit}>
            <h2 className="form-headline">Verify Email!</h2>
            <p className="form-info">
              Please check your inbox for an 8-character verification code and enter it below. For
              your security, this code is valid for only one attempt. If you require a new code,
              please use the "Regenerate Code" button to receive a fresh verification code via
              email.
            </p>
            <FormVerify
              formData={formData}
              verify="signup"
              setStatus={setStatus}
              setError={setError}
              setFormState={setFormState}
            />
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
          <h1 className="page-headline">
            Join Now for Effortless Account Management in 3 Simple Steps!
          </h1>
          <form onSubmit={handleSubmit}>
            <h2 className="form-headline">Select Security Question!</h2>
            <p className="form-info">
              Implementing a security question significantly enhances your account's protection.
              Please choose a question that you can easily remember for future reference.
            </p>
            <Dropdown questions={securityQuestions} onSelect={handleSecurityQuestionSelect} />
            <FormInput
              labelText="Your answer"
              name="securityQuestionAnswer"
              value={formData.securityQuestionAnswer || ""}
              onChange={handleFormChange}
              required
            />
            <div className="error-container">
              <p className="error-message">{error}</p>
            </div>
            <button
              type="button"
              onClick={handleRemeberUser}
              onMouseLeave={(e) => (e.target as HTMLButtonElement).blur()}
              className={
                formData.rememberUser
                  ? `remeber-btn btn btn-check btn-check-selected`
                  : `remeber-btn btn btn-check`
              }>
              Remember me
            </button>
            <button type="submit" className="submit-btn btn btn-primary">
              Continue
            </button>
          </form>
          <Stepper steps={3} selectedIndex={currentStep} />
        </>
      );
  }
}
