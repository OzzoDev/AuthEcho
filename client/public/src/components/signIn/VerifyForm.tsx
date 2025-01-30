import { useEffect, useState } from "react";
import PrimaryBtn from "../btn/PrimaryBtn";
import FormError from "./FormError";
import FormFooter from "./FormFooter";
import FormHeader from "./FormHeader";
import FormTextInput from "./FormTextInput";
import useAuthechoApi from "../../hooks/authecho/useAuthechoApi";
import useAuthechoApiStore from "../../hooks/authecho/useAuthechoApiStore";
import { AuthehcoRequest } from "../../types/types";

export default function VerifyForm() {
  const { error, updateRequestData, updateError, updateSignInState } = useAuthechoApiStore();
  const { callApi: verifyCode } = useAuthechoApi("POST", "VERIFYCODE");
  const [code, setCode] = useState<string>("");

  const verify = async () => {
    const response = await verifyCode(true);
    if (response) {
      updateSignInState("password");
    } else {
      updateSignInState("question");
    }
  };

  useEffect(() => {
    const shouldVerify = code.length === 8;
    if (shouldVerify) {
      verify();
    }
  }, [code]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const normalizedCode = value.trim();
    setCode(normalizedCode);
    updateRequestData((prevState: AuthehcoRequest) => ({ ...prevState, [name]: normalizedCode }));
    updateError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await verify();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full max-w-[400px] px-8 pt-8 py-8 bg-gray-800 bg-opacity-80 rounded-2xl shadow-white-l text-white">
      <FormHeader />
      <h2 className="my-4">
        Please check your inbox for an 8-character verification code and enter it below. For your
        security, this code is valid for a single use only. If an incorrect code is entered, you
        will be required to answer your security question
      </h2>
      <FormError error={error} />
      <FormTextInput
        name="verificationCode"
        labelText="Verification code"
        onChange={handleChange}
      />
      <PrimaryBtn btnText="Verify" type="submit" />
      <FormFooter />
    </form>
  );
}
