import { useEffect } from "react";
import useApi from "./useApi";
import useFormStore from "./useFormStore";
import { FormUsage } from "../types/auth";

const useVerify = (formUsage: FormUsage, code: string) => {
  const { setFormState, setFormData } = useFormStore();
  const { fetchData: verifyAccount } = useApi("POST", "VERIFYACCOUNT");
  const { fetchData: userSecurityQuestion } = useApi("POST", "GETUSERSECURITYQUESTION");

  useEffect(() => {
    const shouldVerify = code.length === 8;
    const verifyCode = async () => {
      if (shouldVerify) {
        let response;

        switch (formUsage) {
          case "SIGNUP":
            response = await verifyAccount(true);
            if (response) {
              setFormState("question");
            }
            break;
          case "SIGNIN":
            response = await verifyAccount(true);
            if (response) {
              setFormState("password");
            } else {
              const question = await userSecurityQuestion(true);
              if (question) {
                setFormData({ securityQuestion: question.data.question }, "securityQuestion");
                setFormState("question");
              }
            }
            break;
          case "RESETPASSWORD":
          case "UNLOCKACCOUNT":
            const ensureAuth = await verifyAccount(true);
            if (ensureAuth) {
              response = await userSecurityQuestion(true);
              if (response) {
                setFormData({ securityQuestion: response.data.question }, "securityQuestion");
                setFormState("question");
              }
            }
            break;
        }
      }
    };

    verifyCode();
  }, [code]);
};

export default useVerify;
