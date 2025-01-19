import ReactLoading from "react-loading";
import Navbar from "../components/Navbar";
import { ApiRequest, FetchStatus } from "../types/apiTypes";
import { FormState } from "../types/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../hooks/useApi";
import useSessionStorage from "../hooks/useSessionStorage";
import { AUTH_KEY } from "../constants/contants";
import AuthForm from "../components/form/AuthForm";

export default function SignUpPage() {
  const [formData, setFormData] = useState<ApiRequest>({});
  const [formState, setFormState] = useState<FormState>("default");
  const [securityQuestions, setSecurityQuestions] = useState<string[]>([]);
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
          const questions = response.data.questions.map((ques) => ques.question);
          setSecurityQuestions(questions);
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

  const handleChange = (param: React.ChangeEvent<HTMLInputElement> | string) => {
    if (typeof param === "string") {
      setFormData((prevData) => ({
        ...prevData,
        securityQuestion: param,
      }));
    } else {
      const { name, value } = param.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
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

  return (
    <AuthForm
      formUsage="SIGNUP"
      formState={formState}
      formData={formData}
      verifyType="signup"
      dropDownItems={securityQuestions}
      btnTexts={["Sign up", "Verify", "Continue"]}
      error={error}
      steps={3}
      currentStep={currentStep}
      setStatus={setStatus}
      setError={setError}
      setFormState={setFormState}
      setFormData={setFormData}
      onChange={handleChange}
      onRemember={handleRemeberUser}
      onSubmit={handleSubmit}
    />
  );
}
