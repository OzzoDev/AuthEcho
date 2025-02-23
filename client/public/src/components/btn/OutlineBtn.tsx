import { ReactNode } from "react";

interface Props {
  btnText: string;
  fontSize?: string;
  width?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  icon?: ReactNode;
}

export default function OutlineBtn({
  btnText,
  fontSize = "base",
  width = "w-fit",
  type = "button",
  icon,
  onClick,
}: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      onMouseLeave={(e) => (e.target as HTMLButtonElement).blur()}
      className={`flex justify-center items-center ${width} h-fit text-white font-semibold py-[10px] px-[25px] rounded-full border-[1px] border-white transition-opacity duration-500 cursor-pointer group hover:opacity-60 bg-transparent`}>
      {icon && (
        <div className="text-white mr-2 transition-transform duration-300 group-hover:translate-x-[5px]">
          {icon}
        </div>
      )}
      <p className={`text-${fontSize} whitespace-nowrap`}>{btnText}</p>
    </button>
  );
}
