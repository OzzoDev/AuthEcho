import { useEffect } from "react";
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

  useEffect(() => {
    const verifyCode = async () => {
      const verificationCode = [...code].join("");
      if (verificationCode.length === 8) {
        let response;

        switch (verify) {
          case "signup":
            response = await verifyAccount({ email: formData.email || "", verificationCode: verificationCode || "" }, setStatus, setError);
            break;
          case "reset":
            response = await resetPassword({ userData: formData.userData || "", newPassword: formData.password || "", confirmNewPassword: formData.confirmPassword || "", verificationCode: formData.verificationCode || "" }, setStatus, setError, dispatch);
            break;
          case "unlock":
            response = await unlockAccount({ userData: formData.userData || "", verificationCode: formData.verificationCode || "" }, setStatus, setError);
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

    verifyCode();
  }, [code]);
};

export default useVerify;
