import { useEffect } from "react";
import PrimaryBtn from "../btn/PrimaryBtn";
import FormError from "./FormError";
import FormHeader from "./FormHeader";
import FormFooter from "./FormFooter";
import FormPasswordInput from "./FormPasswordInput";
import { AuthehcoRequest } from "../../types/types";
import useAuthechoApi from "../../hooks/authecho/useAuthechoApi";
import useAuthechoApiStore from "../../hooks/authecho/useAuthechoApiStore";

export default function QuestionForm() {
  const { requestData, error, question, updateRequestData, updateError, updateSignInState } =
    useAuthechoApiStore();
  const { callApi: validateQuestion } = useAuthechoApi("POST", "VALIDATEQUESTION");

  useEffect(() => {
    const isVerificationCodeError = error.toLowerCase().includes("verification code");
    if (isVerificationCodeError) {
      updateError("");
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateRequestData((prevState: AuthehcoRequest) => ({ ...prevState, [name]: value }));
    updateError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await validateQuestion(true);
    if (response) {
      updateSignInState("code");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full max-w-[400px] px-8 pt-8 py-8 bg-gray-800 bg-opacity-80 rounded-2xl shadow-white-l text-white">
      <FormHeader />
      <h2 className="my-4">
        To verify your identity, please respond to your security question,
        <span className="text-red-500"> as the verification code provided was incorrect. </span>
        Enter the answer to your security question below to proceed with the sign-in process
      </h2>
      <p className="mt-4 font-bold">{question}</p>
      <FormError error={error} />
      <FormPasswordInput
        name="questionAnswer"
        value={requestData.questionAnswer || ""}
        labelText="Answer"
        onChange={handleChange}
      />
      <PrimaryBtn btnText="Verify" type="submit" />
      <FormFooter />
    </form>
  );
}
