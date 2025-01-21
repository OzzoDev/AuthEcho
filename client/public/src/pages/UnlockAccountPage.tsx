import { useNavigate } from "react-router-dom";
import useFormStore from "../hooks/useFormStore";
import useApi from "../hooks/useApi";
import AuthForm from "../components/form/AuthForm";
import { AUTH_KEY } from "../constants/contants";
import useSessionStorage from "../hooks/useSessionStorage";

export default function SigninPage() {
  const { formData, formState, setFormState, setFormData } = useFormStore(true);
  const { fetchData: checkSuspended } = useApi("POST", "ISSUSPENDED");
  const { fetchData: requestVerificationCode } = useApi("POST", "SENDVERIFICATIONCODE");
  const { fetchData: validateQuestion } = useApi("POST", "VALIDATESECURITYQUESTION");
  const { fetchData: unlockAccount } = useApi("POST", "UNLOCKACCOUNT");
  const { setSessionValue } = useSessionStorage<boolean>(AUTH_KEY, false);

  const navigate = useNavigate();

  const handleRequestVerificationCode = async () => {
    const isSuspended = await checkSuspended(true);
    if (isSuspended) {
      const response = await requestVerificationCode(true);
      if (response) {
        setFormState("verify");
      }
    }
  };

  const handleValidateQuestion = async () => {
    const response = await validateQuestion(true);
    if (response) {
      const allowPasswordReset = await unlockAccount(true);
      if (allowPasswordReset) {
        setSessionValue(true);
        navigate("/account");
      }
    }
  };

  const handleRemeberUser = () => {
    setFormData({ rememberUser: !formData.rememberUser }, "rememberUser");
  };

  const handleFormChange = (param: React.ChangeEvent<HTMLInputElement> | string) => {
    if (typeof param !== "string") {
      const { name, value } = param.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }), undefined, "verifyPassword");
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
        handleValidateQuestion();
        break;
    }
  };

  return (
    <>
      <h1 className="page-headline">Unlock Your Account and Take Control of Your Access!</h1>
      <AuthForm
        formUsage="UNLOCKACCOUNT"
        dynamicText={formData.securityQuestion}
        onChange={handleFormChange}
        onRemember={handleRemeberUser}
        onSubmit={handleSubmit}
      />
    </>
  );
}
