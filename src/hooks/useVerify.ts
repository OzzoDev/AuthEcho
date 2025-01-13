import { UserFormData } from "../types/types";
import { Verify } from "../types/auth";
import { FetchStatus } from "../types/apiTypes";
import { useDispatch } from "react-redux";
import { resetPassword, unlockAccount, verifyAccount } from "../utils/ServerClient";
import { useNavigate } from "react-router-dom";

interface Props {
  formData: UserFormData;
  code: string;
  verify: Verify;
  setStatus: (status: FetchStatus) => void;
  setError: (error: string) => void;
}

const useVerify = ({ formData, code, verify, setStatus, setError }: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const verifyCode = async () => {
    if (code.length === 8) {
      let response;

      console.log("Verification Code: ", formData.verificationCode);

      switch (verify) {
        case "signup":
          response = await verifyAccount({ email: formData.email || "", verificationCode: code }, setStatus, setError);
          break;
        case "reset":
          response = await resetPassword({ userData: formData.userData || "", newPassword: formData.password || "", confirmNewPassword: formData.confirmPassword || "", verificationCode: code }, setStatus, setError, dispatch);
          break;
        case "unlock":
          response = await unlockAccount({ userData: formData.userData || "", verificationCode: code }, setStatus, setError);
          break;
      }

      if (response) {
        switch (verify) {
          case "signup":
            navigate("/account");
            break;
          case "reset":
            navigate("/account");
            break;
          case "unlock":
            navigate("/signin");
            break;
        }
      }
    }
  };

  return verifyCode;
};

export default useVerify;
