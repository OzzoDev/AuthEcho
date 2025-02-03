import useFormStore from "../../hooks/useFormStore";
import useApi from "../../hooks/useApi";
import AuthForm from "../../components/form/AuthForm";
import { ApiRequest } from "../../types/types";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

export default function SigninPage() {
  const navigate = useNavigate();
  const { formData, formState, setFormState, setFormData, setFormStep, reset, setFormError } =
    useFormStore(true);
  const { fetchData: checkSuspended } = useApi("POST", "ISSUSPENDED");
  const { fetchData: requestUnlockCode } = useApi("POST", "REQUESTUNLOCKCODE");
  const { fetchData: validateQuestion } = useApi("POST", "VALIDATESECURITYQUESTION");
  const { fetchData: unlockAccount } = useApi("POST", "UNLOCKACCOUNT", true);
  const [unlockSuccess, setUnlockSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (unlockSuccess) {
      navigate("/signin");
    }
  }, [unlockSuccess]);

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
      const isBlocked = response.data.isBlocked;
      if (isBlocked) {
        setFormState("verify");
        setFormStep(2);
      } else {
        const result = await unlockAccount(true);
        if (result) {
          setUnlockSuccess(true);
        }
      }
    }
  };

  const handleFormChange = (param: React.ChangeEvent<HTMLInputElement> | string) => {
    setFormError("");
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
      case "resendCode":
        await handleValidateQuestion();
        break;
    }
  };

  return (
    <div className="grow flex flex-col justify-center items-center space-y-[100px] pt-[40px] pb-[50px]">
      <h1 className="text-4xl text-center max-w-[90%]">
        Unlock Your Account and Take Control of Your Access!
      </h1>
      <AuthForm
        formUsage="UNLOCKACCOUNT"
        dynamicText={formData.securityQuestion}
        onChange={handleFormChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
