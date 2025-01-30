import { useState } from "react";
import { IoMdCheckmark, IoMdClose } from "react-icons/io";

interface Props {
  labelText: string;
  onClick: () => void;
}

export default function FormCheckbox({ labelText, onClick }: Props) {
  const [isChecked, setIsChecked] = useState<boolean>(true);

  const handleClick = () => {
    setIsChecked((prev) => !prev);
    onClick();
  };

  return (
    <div className="flex items-center space-x-2 mt-[-30px] mb-6">
      <label htmlFor="cb" className="font-medium text-slate-300">
        {labelText}
      </label>
      <div className="relative">
        <input
          type="checkbox"
          id="cb"
          checked={isChecked}
          onChange={handleClick}
          className="sr-only"
        />
        <div onClick={handleClick} className="cursor-pointer">
          {isChecked ? (
            <IoMdCheckmark color="cyan" size={22} />
          ) : (
            <IoMdClose color="red" size={22} />
          )}
        </div>
      </div>
    </div>
  );
}
