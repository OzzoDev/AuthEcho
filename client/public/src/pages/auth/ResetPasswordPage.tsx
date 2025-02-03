import { useNavigate } from "react-router";
import useFormStore from "../../hooks/useFormStore";
import useApi from "../../hooks/useApi";
import AuthForm from "../../components/form/AuthForm";
import { ApiRequest } from "../../types/types";
import useAuth from "../../hooks/useAuth";
import useAuthStore from "../../hooks/useAuthStore";

export default function SigninPage() {
  const navigate = useNavigate();
  const { formData, formState, setFormState, setFormData, setFormStep } = useFormStore(true);
  const { fetchData: validatePassword } = useApi("POST", "VALIDATEPASSWORD");
  const { fetchData: requestVerificationCode } = useApi("POST", "SENDVERIFICATIONCODE");
  const { fetchData: validateQuestion } = useApi("POST", "VALIDATESECURITYQUESTION");
  const { fetchData: resetPassword } = useApi("POST", "RESETPASSWORD", true);
  const { updateIsAuthenticated, updateIsAdmin, updateUsername, updateEmail } = useAuthStore();

  useAuth(
    undefined,
    () => navigate("/account"),
    () => navigate("/admin")
  );

  const handleValidatePassword = async () => {
    const response = await validatePassword(true);
    if (response) {
      const allowverify = await requestVerificationCode(true);
      if (allowverify) {
        setFormState("verify");
        setFormStep(2);
      }
    }
  };

  const handleValidateQuestion = async () => {
    const response = await validateQuestion(true);
    if (response) {
      const isBlocked = response.data.isBlocked;

      if (isBlocked) {
        setFormState("verify");
      } else {
        const result = await resetPassword(true);
        if (result) {
          const name = result.data.name;
          const email = result.data.email;
          const isAdmin = result.data.isAdmin;

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
    }
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
        onSubmit={handleSubmit}
      />
    </div>
  );
}
