import ReactLoading from "react-loading";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../hooks/useApi";
import useSessionStorage from "../hooks/useSessionStorage";
import { AUTH_KEY } from "../constants/contants";
import AuthForm from "../components/form/AuthForm";
import Stepper from "../components/Stepper";
import useFormStore from "../hooks/useFormStore";

export default function SignUpPage() {
  const {
    formData,
    formStatus,
    formState,
    setFormStatus,
    setFormError,
    setFormState,
    setFormData,
  } = useFormStore(true);
  const [securityQuestions, setSecurityQuestions] = useState<string[]>([]);
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
        const response = await getSecurityQuestions(false);
        if (response && response.data.questions) {
          const questions = response.data.questions.map((ques) => ques.question);
          setSecurityQuestions(questions);
        }
      };
      fetchSecurityQuestions();
    }
  }, [formState]);

  const handleSignUp = async () => {
    const response = await signUp(true);

    if (response) {
      setFormState("verify");
    }
  };

  const handleVerify = async () => {
    (formData.action = "verifyEmail"), await verify(true);
  };

  const handleSetQuestion = async () => {
    if (formData.securityQuestion === "") {
      setFormError("Select a security question");
      setFormStatus("error");
    } else {
      const response = await setQuestion(true);

      if (response) {
        setSessionValue(true);
        navigate("/account");
      }
    }
  };

  const handleChange = (param: React.ChangeEvent<HTMLInputElement> | string) => {
    if (typeof param === "string") {
      setFormData({ securityQuestion: param }, "securityQuestion");
    } else {
      const { name, value } = param.target;
      setFormData({ [name]: value }, name);
    }
  };

  const handleRemeberUser = () => {
    setFormData({ rememberUser: !formData.rememberUser }, "rememberUser");
    console.log("remember ", formData.rememberUser);
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

  if (formStatus === "loading") {
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
      <h1 className="page-headline">
        Join Now for Effortless Account Management in 3 Simple Steps!
      </h1>
      <AuthForm
        formUsage="SIGNUP"
        verifyType="signup"
        dropDownItems={securityQuestions}
        btnTexts={["Sign up", "Verify", "Continue"]}
        onChange={handleChange}
        onRemember={handleRemeberUser}
        onSubmit={handleSubmit}
      />
      <Stepper steps={3} selectedIndex={currentStep} />
    </>
  );
}
