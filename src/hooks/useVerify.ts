import { FormState, UserFormData } from "../types/types";
import { Verify } from "../types/auth";
import { FetchStatus } from "../types/apiTypes";
import { getUserSecurityQuestion, unlockAccount, verifyAccount } from "../utils/ServerClient";
import { useNavigate } from "react-router-dom";

interface Props {
  formData: UserFormData;
  code: string;
  verify: Verify;
  setStatus: (status: FetchStatus) => void;
  setError: (error: string) => void;
  setFormState: (formState: FormState) => void;
  setFormData?: (formData: UserFormData) => void;
}

const useVerify = ({ formData, code, verify, setStatus, setError, setFormState, setFormData }: Props) => {
  const navigate = useNavigate();

  const verifyCode = async () => {
    if (code.length === 8) {
      let response;

      switch (verify) {
        case "signup":
          response = await verifyAccount({ name: formData.name || "", email: formData.email || "", password: formData.password || "", confirmPassword: formData.confirmPassword || "", verificationCode: code }, setStatus, setError);
          if (response) {
            setFormState("question");
          }
          break;
        case "reset":
          response = await getUserSecurityQuestion({ userData: formData.userData || "", newPassword: formData.password || "", confirmNewPassword: formData.confirmPassword || "", verificationCode: code }, setStatus, setError);
          if (response && setFormData) {
            const updatedFormData = { ...formData, verificationCode: code, securityQuestion: response.data.question };
            setFormData(updatedFormData);
            setFormState("question");
          }
          break;
        case "unlock":
          response = await unlockAccount({ userData: formData.userData || "", verificationCode: code }, setStatus, setError);
          if (response) {
            navigate("/signin");
          }
          break;
      }
    }
  };

  return verifyCode;
};

export default useVerify;
