import { AUTHECHO_LINK } from "../../constants/constants";

export default function FormFooter() {
  return (
    <a
      href={`${AUTHECHO_LINK}/unlockaccount`}
      target="_blank"
      className="text-center text-purple-500 underline pt-2 mt-4">
      Unable to sign in? Manage your account here.
    </a>
  );
}
