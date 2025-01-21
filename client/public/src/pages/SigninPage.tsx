import { useNavigate } from "react-router-dom";
import useFormStore from "../hooks/useFormStore";
import useApi from "../hooks/useApi";
import AuthForm from "../components/form/AuthForm";
import { AUTH_KEY } from "../constants/contants";
import useSessionStorage from "../hooks/useSessionStorage";

export default function SigninPage() {
  const { formData, formState, setFormState, setFormData } = useFormStore(true);
  const { fetchData: requestVerificationCode } = useApi("POST", "SENDVERIFICATIONCODE");
  const { fetchData: signIn } = useApi("POST", "SIGNIN");
  const { setSessionValue } = useSessionStorage<boolean>(AUTH_KEY, false);

  const navigate = useNavigate();

  const handleVerificationCode = async () => {
    const response = await requestVerificationCode(true);
    if (response) {
      setFormState("verify");
    }
  };

  const handleSignIn = async () => {
    const response = await signIn(true);
    if (response) {
      setSessionValue(true);
      navigate("/account");
    }
  };

  const handleRemeberUser = () => {
    setFormData({ rememberUser: !formData.rememberUser }, "rememberUser");
  };

  const handleFormChange = (param: React.ChangeEvent<HTMLInputElement> | string) => {
    if (typeof param !== "string") {
      const { name, value } = param.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }), undefined, "verifyAccess");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    switch (formState) {
      case "default":
        await handleVerificationCode();
        break;
      case "verify":
        await requestVerificationCode(true);
        break;
      case "password":
        await handleSignIn();
        break;
    }
  };

  return (
    <>
      <h1 className="page-headline">Step Inside: Your Account Management Hub Awaits! </h1>
      <AuthForm
        formUsage="SIGNIN"
        onChange={handleFormChange}
        onRemember={handleRemeberUser}
        onSubmit={handleSubmit}
      />
    </>
  );
}
