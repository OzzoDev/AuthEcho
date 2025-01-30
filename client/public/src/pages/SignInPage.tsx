import UserForm from "../components/signIn/UserForm";
import VerifyForm from "../components/signIn/VerifyForm";
import QuestionForm from "../components/signIn/QuestionForm";
import PasswordForm from "../components/signIn/PasswordForm";
import { HashLoader } from "react-spinners";
import useAuthechoApiStore from "../hooks/authecho/useAuthechoApiStore";
import useAuthechoAuthStore from "../hooks/authecho/useAuthechoAuthStore";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function SignInPage() {
  const navigate = useNavigate();
  const { status, signInState } = useAuthechoApiStore(true);
  const { isAuthenticated, isAdmin } = useAuthechoAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/account");

      if (isAdmin) {
        navigate("/admin");
      }
    }
  }, [isAuthenticated]);

  return (
    <div className="grow flex flex-col items-center justify-center">
      {status === "loading" ? (
        <HashLoader color="#d8dbe3" size={60} />
      ) : signInState === "user" ? (
        <UserForm />
      ) : signInState === "code" ? (
        <VerifyForm />
      ) : signInState === "question" ? (
        <QuestionForm />
      ) : (
        <PasswordForm />
      )}
    </div>
  );
}
