import { useNavigate } from "react-router";
import useFormStore from "../hooks/useFormStore";
import useApi from "../hooks/useApi";
import AuthForm from "../components/form/AuthForm";
import { ApiRequest } from "../types/types";

export default function SigninPage() {
  const navigate = useNavigate();
  const { formData, formState, setFormState, setFormData } = useFormStore(true);
  const { fetchData: validatePassword } = useApi("POST", "VALIDATEPASSWORD");
  const { fetchData: requestVerificationCode } = useApi("POST", "SENDVERIFICATIONCODE");
  const { fetchData: validateQuestion } = useApi("POST", "VALIDATESECURITYQUESTION");
  const { fetchData: resetPassword } = useApi("POST", "RESETPASSWORD", () => navigate("/account"));

  const handleValidatePassword = async () => {
    const response = await validatePassword(true);
    if (response) {
      const allowverify = await requestVerificationCode(true);
      if (allowverify) {
        setFormState("verify");
      }
    }
  };

  const handleValidateQuestion = async () => {
    const response = await validateQuestion(true);
    if (response) {
      await resetPassword(true);
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
        "verifyPassword"
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    switch (formState) {
      case "default":
        await handleValidatePassword();
        break;
      case "verify":
        await requestVerificationCode(true);
        break;
      case "question":
        await handleValidateQuestion();
        break;
    }
  };

  return (
    <div className="grow flex flex-col justify-center items-center space-y-[80px] pt-[100px] pb-[50px]">
      <h1 className="text-4xl">Quickly Reset Your Password and Secure Your Account!</h1>
      <AuthForm
        formUsage="RESETPASSWORD"
        dynamicText={formData.securityQuestion}
        onChange={handleFormChange}
        onRemember={handleRemeberUser}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
