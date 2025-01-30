import { ReactNode } from "react";

interface Props {
  btnText: string;
  color?: string;
  type?: "button" | "submit";
  icon: ReactNode;
  onClick?: () => void;
}

export default function OutlineIconBtn({
  btnText,
  color = "white",
  type = "button",
  icon,
  onClick,
}: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex items-center gap-x-2 text-${color} font-semibold py-[6px] pl-2 pr-6 rounded-full transition duration-200 cursor-pointer group whitespace-nowrap border-[1px] border-${color}`}>
      <div className="text-white mr-2 transition-transform duration-200 group-hover:translate-x-[5px]">
        {icon}
      </div>
      {btnText}
    </button>
  );
}
