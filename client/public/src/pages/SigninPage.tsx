import { useNavigate } from "react-router";
import useFormStore from "../hooks/useFormStore";
import useApi from "../hooks/useApi";
import AuthForm from "../components/form/AuthForm";
import { ApiRequest } from "../types/types";

export default function SigninPage() {
  const navigate = useNavigate();
  const { formData, formState, setFormState, setFormData } = useFormStore(true);
  const { fetchData: requestVerificationCode } = useApi("POST", "SENDVERIFICATIONCODE");
  const { fetchData: signIn } = useApi("POST", "SIGNIN", () => navigate("/account"));
  const { fetchData: validateQuestion } = useApi("POST", "VALIDATESECURITYQUESTION");

  const handleRequestVerificationCode = async () => {
    const response = await requestVerificationCode(true);
    if (response) {
      setFormState("verify");
    }
  };

  const handleValidateQuestion = async () => {
    const response = await validateQuestion(true);
    if (response) {
      setFormState("verify");
    }
  };

  const handleRemeberUser = () => {
    setFormData({ rememberUser: !formData.rememberUser }, "rememberUser");
  };

  const handleFormChange = (param: React.ChangeEvent<HTMLInputElement> | string) => {
    if (typeof param !== "string") {
      const { name, value } = param.target;
      setFormData(
        (prevData: ApiRequest) => ({ ...prevData, [name]: value }),
        undefined,
        "verifyAccess",
        "SIGNIN"
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    switch (formState) {
      case "default":
        await handleRequestVerificationCode();
        break;
      case "verify":
        await requestVerificationCode(true);
        break;
      case "question":
        await handleValidateQuestion();
        break;
      case "password":
        await signIn(true);
        break;
    }
  };

  return (
    <div className="grow flex flex-col justify-center items-center space-y-[80px] pt-[100px] pb-[50px]">
      <h1 className="text-4xl">Step Inside: Your Account Management Hub Awaits! </h1>
      <AuthForm
        formUsage="SIGNIN"
        dynamicText={formData.securityQuestion}
        onChange={handleFormChange}
        onRemember={handleRemeberUser}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
