import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useApi from "../../hooks/useApi";
import AuthForm from "../../components/form/AuthForm";
import useFormStore from "../../hooks/useFormStore";
import useAuthStore from "../../hooks/useAuthStore";
import useAuth from "../../hooks/useAuth";

export default function SignUpPage() {
  const navigate = useNavigate();
  const { formData, formState, setFormStatus, setFormError, setFormState, setFormData } =
    useFormStore(true);
  const [securityQuestions, setSecurityQuestions] = useState<string[]>([]);
  const { fetchData: getSecurityQuestions } = useApi("GET", "SECURITYQUESTIONS");
  const { fetchData: signUp } = useApi("POST", "SIGNUP");
  const { fetchData: requestVerificationCode } = useApi("POST", "SENDVERIFICATIONCODE");
  const { fetchData: setQuestion } = useApi("POST", "SETSECURITYQUESTION", true);
  const { updateIsAuthenticated, updateIsAdmin, updateUsername, updateEmail } = useAuthStore();

  useAuth(
    undefined,
    () => navigate("/account"),
    () => navigate("/admin")
  );

  useEffect(() => {
    if (formState === "question") {
      const fetchSecurityQuestions = async () => {
        const response = await getSecurityQuestions(false);
        if (response && response.data.questions) {
          const questions = response.data.questions;
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
        const name = response.data.name;
        const email = response.data.email;
        const isAdmin = response.data.isAdmin;

        if (name) {
          updateUsername(name);
        }

        if (email) {
          updateEmail(email);
        }

        if (isAdmin) {
          updateIsAdmin(true);
        }

        updateIsAuthenticated(true);
      }
    }
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
    <div className="grow flex flex-col justify-center items-center space-y-[80px] pb-[50px]">
      <h1 className="text-4xl">Join Now for Effortless Account Management in 3 Simple Steps!</h1>
      <AuthForm
        formUsage="SIGNUP"
        dropDownItems={securityQuestions}
        onChange={handleFormChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
