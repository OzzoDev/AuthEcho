import authechoLogo from "../../assets/authechoLogo.svg";
import { AUTHECHO_LINK } from "../../constants/constants";

export default function FormHeader() {
  return (
    <div>
      <div className="flex justify-center border-b-[1px] border-slate-600 pb-4">
        <a href={AUTHECHO_LINK} target="_blank">
          <img src={authechoLogo} alt="Authecho" className="w-[50px]" />
        </a>
      </div>
    </div>
  );
}
