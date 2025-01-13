import { FormState, UserFormData } from "../types/types";
import { Verify } from "../types/auth";
import { FetchStatus } from "../types/apiTypes";
import { useDispatch } from "react-redux";
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
  const dispatch = useDispatch();

  const verifyCode = async () => {
    if (code.length === 8) {
      let response;

      switch (verify) {
        case "signup":
          response = await verifyAccount({ email: formData.email || "", verificationCode: code }, setStatus, setError, dispatch);
          if (response) {
            navigate("/account");
          }
          break;
        case "reset":
          response = await getUserSecurityQuestion({ userData: formData.userData || "", newPassword: formData.password || "", confirmNewPassword: formData.confirmPassword || "", verificationCode: code }, setStatus, setError);
          if (response && setFormData) {
            const updatedFormData = { ...formData, verificationCode: code, securityQuestion: response.data.question };
            console.log("Updated data: ", updatedFormData);

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
