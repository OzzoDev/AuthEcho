import React from "react";
import FormHeader from "./FormHeader";
import PrimaryBtn from "../btn/PrimaryBtn";
import FormError from "./FormError";
import FormFooter from "./FormFooter";
import FormCheckbox from "./FormCheckbox";
import FormPasswordInput from "./FormPasswordInput";
import useAuthechoApi from "../../hooks/authecho/useAuthechoApi";
import useAuthechoApiStore from "../../hooks/authecho/useAuthechoApiStore";
import useAuthechoAuthStore from "../../hooks/authecho/useAuthechoAuthStore";
import { AuthehcoRequest, User } from "../../types/types";
import useApi from "../../hooks/useApi";

export default function PasswordForm() {
  const { requestData, error, updateRequestData, updateError } = useAuthechoApiStore();
  const { callApi: signIn } = useAuthechoApi("POST", "SIGNIN", true);
  const { callApi: addUser } = useApi("POST", "ADDUSER");
  const { updateIsAuthenticated, updateIsAdmin, updateUsername, updateEmail } =
    useAuthechoAuthStore();

  const toggleRememberUser = () => {
    updateRequestData((prevState: AuthehcoRequest) => ({
      ...prevState,
      rememberUser: !prevState.rememberUser,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateRequestData((prevState: AuthehcoRequest) => ({ ...prevState, [name]: value }));
    updateError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await signIn(true);

    if (response) {
      const name = response.data.name;
      const email = response.data.email;
      const isAppAdmin = response.data.isAppAdmin;

      const user: User = { email, name };
      await addUser({ user });

      if (name) {
        updateUsername(name);
      }
      if (email) {
        updateEmail(email);
      }

      if (isAppAdmin) {
        updateIsAdmin(true);
      }
      updateIsAuthenticated(true);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full max-w-[400px] px-8 pt-8 py-8 bg-gray-800 bg-opacity-80 rounded-2xl shadow-white-l text-white">
      <FormHeader />
      <h2 className="text-center text-[1.2rem] font-semibold my-4">Final step!</h2>
      <FormError error={error} />
      <FormPasswordInput
        name="password"
        value={requestData.password || ""}
        labelText="Password"
        onChange={handleChange}
      />
      <FormCheckbox labelText="Remember me" onClick={toggleRememberUser} />
      <PrimaryBtn btnText="Sign in" type="submit" />
      <FormFooter />
    </form>
  );
}
