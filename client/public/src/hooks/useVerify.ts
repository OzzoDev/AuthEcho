import { useEffect } from "react";
import useApi from "./useApi";
import useFormStore from "./useFormStore";
import { FormUsage } from "../types/types";

const useVerify = (formUsage: FormUsage, code: string) => {
  const { setFormState, setFormData, setFormStep } = useFormStore();
  const { fetchData: verifyAccount } = useApi("POST", "VERIFYACCOUNT");
  const { fetchData: userSecurityQuestion } = useApi("POST", "GETUSERSECURITYQUESTION");

  useEffect(() => {
    const shouldVerify = code.length === 8;
    const verifyCode = async () => {
      if (shouldVerify) {
        let ensureAuth;

        switch (formUsage) {
          case "SIGNUP":
            ensureAuth = await verifyAccount(true);
            if (ensureAuth) {
              setFormState("question");
              setFormStep(3);
            }
            break;
          case "SIGNIN":
            ensureAuth = await verifyAccount(true);
            if (ensureAuth) {
              setFormState("password");
              setFormStep(3);
            } else {
              const question = await userSecurityQuestion(true);
              if (question) {
                setFormData({ securityQuestion: question.data.question }, "securityQuestion");
                setFormState("question");
                setFormStep(2);
              }
            }
            break;
          case "RESETPASSWORD":
          case "UNLOCKACCOUNT":
            ensureAuth = await verifyAccount(true);
            const question = await userSecurityQuestion(true);
            if (question) {
              setFormData({ securityQuestion: question.data.question }, "securityQuestion");
              if (question.data.isBlocked) {
                setFormStep(2);
              } else {
                setFormStep(3);
              }
              setFormState("question");
            }
            break;
        }
      }
    };

    verifyCode();
  }, [code]);
};

export default useVerify;
