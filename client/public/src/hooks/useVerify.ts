import { useEffect } from "react";
import useApi from "./useApi";
import useFormStore from "./useFormStore";
import { FormUsage } from "../types/auth";

const useVerify = (formUsage: FormUsage, code: string) => {
  const { formData, setFormState, setFormData } = useFormStore();
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
              setFormData({ verificationCode: "" }, "verificationCode");
              setFormState("question");
            }
            break;
          case "SIGNIN":
            response = await verifyAccount(true);
            if (response) {
              setFormState("password");
            }
            break;
          case "RESETPASSWORD":
          case "UNLOCKACCOUNT":
            response = await userSecurityQuestion(true);
            if (response) {
              const updatedFormData = {
                ...formData,
                securityQuestion: response.data.question,
              };
              setFormData(updatedFormData);
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
