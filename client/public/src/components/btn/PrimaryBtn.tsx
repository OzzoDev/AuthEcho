import { ReactNode } from "react";

interface Props {
  btnText: string;
  fontSize?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  icon?: ReactNode;
}

export default function PrimaryBtn({
  btnText,
  fontSize = "base",
  type = "button",
  icon,
  onClick,
}: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="flex justify-center items-center w-fit text-white font-semibold py-[10px] px-[25px] bg-cyan-600 rounded-[50px] hover:bg-cyan-700 transition duration-200 cursor-pointer group">
      {icon && (
        <div className="text-white mr-2 transition-transform duration-200 group-hover:translate-x-[5px]">
          <>{icon}</>
        </div>
      )}
      <p className={`text-${fontSize} pb-1 whitespace-nowrap`}>{btnText}</p>
    </button>
  );
}
