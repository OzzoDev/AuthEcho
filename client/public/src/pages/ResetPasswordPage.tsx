import { useNavigate } from "react-router-dom";
import useFormStore from "../hooks/useFormStore";
import useApi from "../hooks/useApi";
import AuthForm from "../components/form/AuthForm";
import { AUTH_KEY } from "../constants/contants";
import useSessionStorage from "../hooks/useSessionStorage";

export default function SigninPage() {
  const { formData, formState, setFormState, setFormData } = useFormStore(true);
  const { fetchData: validatePassword } = useApi("POST", "VALIDATEPASSWORD");
  const { fetchData: requestVerificationCode } = useApi("POST", "SENDVERIFICATIONCODE");
  const { fetchData: validateQuestion } = useApi("POST", "VALIDATESECURITYQUESTION");
  const { fetchData: resetPassword } = useApi("POST", "RESETPASSWORD");
  const { setSessionValue } = useSessionStorage<boolean>(AUTH_KEY, false);

  const navigate = useNavigate();

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
      const allowPasswordReset = await resetPassword(true);
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
        await handleValidatePassword();
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
      <h1 className="page-headline">Quickly Reset Your Password and Secure Your Account!</h1>
      <AuthForm
        formUsage="RESETPASSWORD"
        dynamicText={formData.securityQuestion}
        onChange={handleFormChange}
        onRemember={handleRemeberUser}
        onSubmit={handleSubmit}
      />
    </>
  );
}
