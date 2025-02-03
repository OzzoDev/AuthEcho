import { useNavigate } from "react-router";
import useFormStore from "../hooks/useFormStore";
import useApi from "../hooks/useApi";
import AuthForm from "../components/form/AuthForm";
import { ApiRequest } from "../types/types";

export default function SigninPage() {
  const navigate = useNavigate();
  const { formData, formState, setFormState, setFormData } = useFormStore(true);
  const { fetchData: checkSuspended } = useApi("POST", "ISSUSPENDED");
  const { fetchData: requestUnlockCode } = useApi("POST", "REQUESTUNLOCKCODE");
  const { fetchData: validateQuestion } = useApi("POST", "VALIDATESECURITYQUESTION");
  const { fetchData: unlockAccount } = useApi("POST", "UNLOCKACCOUNT", () => navigate("/signin"));

  const handleRequestVerificationCode = async () => {
    const isSuspended = await checkSuspended(true);
    if (isSuspended) {
      const response = await requestUnlockCode(true);
      if (response) {
        setFormState("verify");
      }
    }
  };

  const handleValidateQuestion = async () => {
    const response = await validateQuestion(true);
    if (response) {
      await unlockAccount(true);
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
        await handleRequestVerificationCode();
        break;
      case "verify":
        await requestUnlockCode(true);
        break;
      case "question":
        await handleValidateQuestion();
        break;
    }
  };

  return (
    <div className="grow flex flex-col justify-center items-center space-y-[80px] pt-[100px] pb-[50px]">
      <h1 className="text-4xl">Unlock Your Account and Take Control of Your Access!</h1>
      <AuthForm
        formUsage="UNLOCKACCOUNT"
        dynamicText={formData.securityQuestion}
        onChange={handleFormChange}
        onRemember={handleRemeberUser}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
