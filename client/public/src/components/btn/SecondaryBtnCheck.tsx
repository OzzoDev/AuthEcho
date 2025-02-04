import { ReactNode, useState } from "react";

interface Props {
  btnText: string;
  fontSize?: string;
  width?: string;
  type?: "button" | "submit";
  icon?: ReactNode;
  checkedIcon: ReactNode;
  onClick?: () => void;
}

export default function SecondaryBtn({
  btnText,
  fontSize = "base",
  width = "w-fit",
  type = "button",
  icon,
  checkedIcon,
  onClick,
}: Props) {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleClick = () => {
    !isChecked && onClick && onClick();
    setIsChecked((prev) => !prev);
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      onMouseLeave={(e) => (e.target as HTMLButtonElement).blur()}
      className={`flex justify-center items-center ${width} h-fit text-white font-semibold py-[10px] px-[25px] rounded-full transition-opacity duration-500 cursor-pointer group bg-gradient-to-r from-purple-500 to-indigo-500 hover:opacity-60`}>
      {!isChecked ? (
        <>
          {icon && (
            <div className="text-white mr-2 transition-transform duration-300 group-hover:translate-x-[5px]">
              {icon}
            </div>
          )}
          <p className={`text-${fontSize} whitespace-nowrap`}>{btnText}</p>
        </>
      ) : (
        <>{checkedIcon}</>
      )}
    </button>
  );
}
