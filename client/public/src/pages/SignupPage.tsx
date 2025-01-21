import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../hooks/useApi";
import useSessionStorage from "../hooks/useSessionStorage";
import { AUTH_KEY } from "../constants/contants";
import AuthForm from "../components/form/AuthForm";
import useFormStore from "../hooks/useFormStore";

export default function SignUpPage() {
  const { formData, formState, setFormStatus, setFormError, setFormState, setFormData } =
    useFormStore(true);
  const [securityQuestions, setSecurityQuestions] = useState<string[]>([]);
  const { fetchData: getSecurityQuestions } = useApi("GET", "SECURITYQUESTIONS");
  const { fetchData: signUp } = useApi("POST", "SIGNUP");
  const { fetchData: requestVerificationCode } = useApi("POST", "SENDVERIFICATIONCODE");
  const { fetchData: setQuestion } = useApi("POST", "SETSECURITYQUESTION");
  const { setSessionValue } = useSessionStorage<boolean>(AUTH_KEY, false);
  const navigate = useNavigate();

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

  const handleRemeberUser = () => {
    setFormData({ rememberUser: !formData.rememberUser }, "rememberUser");
  };

  const handleFormChange = (param: React.ChangeEvent<HTMLInputElement> | string) => {
    if (typeof param === "string") {
      setFormData({ securityQuestion: param }, "securityQuestion");
    } else {
      const { name, value } = param.target;
      setFormData({ [name]: value }, name);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    switch (formState) {
      case "default":
        await handleSignUp();
        break;
      case "verify":
        await requestVerificationCode();
        break;
      case "question":
        await handleSetQuestion();
        break;
    }
  };

  return (
    <>
      <h1 className="page-headline">
        Join Now for Effortless Account Management in 3 Simple Steps!
      </h1>
      <AuthForm
        formUsage="SIGNUP"
        dropDownItems={securityQuestions}
        onChange={handleFormChange}
        onRemember={handleRemeberUser}
        onSubmit={handleSubmit}
      />
    </>
  );
}
