import { useNavigate } from "react-router";
import useFormStore from "../../hooks/useFormStore";
import useApi from "../../hooks/useApi";
import AuthForm from "../../components/form/AuthForm";
import { ApiRequest } from "../../types/types";
import useAuth from "../../hooks/useAuth";
import useAuthStore from "../../hooks/useAuthStore";

export default function SigninPage() {
  const navigate = useNavigate();
  const { formData, formState, setFormState, setFormData } = useFormStore(true);
  const { fetchData: requestVerificationCode } = useApi("POST", "SENDVERIFICATIONCODE");
  const { fetchData: signIn } = useApi("POST", "SIGNIN", true);
  const { fetchData: validateQuestion } = useApi("POST", "VALIDATESECURITYQUESTION");
  const { updateIsAuthenticated, updateIsAdmin, updateUsername, updateEmail } = useAuthStore();

  useAuth(
    undefined,
    () => navigate("/account"),
    () => navigate("/admin")
  );

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

  const handleSignIn = async () => {
    const response = await signIn(true);
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
        await handleSignIn();
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
        onSubmit={handleSubmit}
      />
    </div>
  );
}
