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
  const { fetchData: checkSuspended } = useApi("POST", "ISSUSPENDED");
  const { fetchData: requestUnlockCode } = useApi("POST", "REQUESTUNLOCKCODE");
  const { fetchData: validateQuestion } = useApi("POST", "VALIDATESECURITYQUESTION");
  const { fetchData: unlockAccount } = useApi("POST", "UNLOCKACCOUNT", true);
  const { updateIsAuthenticated, updateIsAdmin, updateUsername, updateEmail } = useAuthStore();

  useAuth(
    undefined,
    () => navigate("/account"),
    () => navigate("/admin")
  );

  const handleRequestVerificationCode = async () => {
    const isSuspended = await checkSuspended(true);
    if (isSuspended) {
      const response = await requestUnlockCode(true);
      if (response) {
        setFormState("verify");
        setFormStep(2);
      }
    }
  };

  const handleValidateQuestion = async () => {
    const response = await validateQuestion(true);
    if (response) {
      const result = await unlockAccount(true);
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
        onSubmit={handleSubmit}
      />
    </div>
  );
}
