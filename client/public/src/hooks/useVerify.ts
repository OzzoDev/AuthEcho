import { useEffect } from "react";
import { Verify } from "../types/auth";
import useApi from "./useApi";
import useFormStore from "./useFormStore";

const useVerify = (verify: Verify, code: string) => {
  const { formData, setFormState, setFormData } = useFormStore();
  const { fetchData: verifyAccount } = useApi("POST", "VERIFYACCOUNT");
  const { fetchData: userSecurityQuestion } = useApi("POST", "GETUSERSECURITYQUESTION");

  useEffect(() => {
    const shouldVerify = code.length === 8;
    const verifyCode = async () => {
      if (shouldVerify) {
        let response;

        switch (verify) {
          case "signup":
            response = await verifyAccount(true);

            if (response) {
              setFormData({ verificationCode: "" }, "verificationCode");
              setFormState("question");
            }
            break;
          case "signin":
            response = await verifyAccount(true);
            if (response) {
              setFormState("password");
            }
            break;
          case "reset":
          case "unlock":
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
