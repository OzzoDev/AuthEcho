import FormHeader from "./FormHeader";
import FormTextInput from "./FormTextInput";
import PrimaryBtn from "../btn/PrimaryBtn";
import FormError from "./FormError";
import FormFooter from "./FormFooter";
import useAuthechoApi from "../../hooks/authecho/useAuthechoApi";
import useAuthechoApiStore from "../../hooks/authecho/useAuthechoApiStore";
import { AuthehcoRequest } from "../../types/types";

export default function UserForm() {
  const { requestData, error, updateRequestData, updateError, updateQuestion, updateSignInState } =
    useAuthechoApiStore();
  const { callApi: requestCode } = useAuthechoApi("POST", "REQUESTCODE");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateRequestData((prevState: AuthehcoRequest) => ({ ...prevState, [name]: value }));
    updateError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await requestCode(true);
    if (response) {
      const receivedQuestion = response.data.question || "";
      updateQuestion(receivedQuestion);
      updateSignInState("code");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full max-w-[400px] px-8 pt-8 py-8 bg-gray-800 bg-opacity-80 rounded-2xl shadow-white-l text-white">
      <FormHeader />
      <h2 className="text-center text-[1.2rem] font-semibold my-4">
        Sign in with your Authecho account!
      </h2>
      <FormError error={error} />
      <FormTextInput
        name="user"
        value={requestData.user}
        labelText="Username or email"
        onChange={handleChange}
      />
      <PrimaryBtn btnText="Continue" type="submit" />
      <FormFooter />
    </form>
  );
}
