import { useState } from "react";
import { FiEyeOff, FiEye } from "react-icons/fi";

interface Props {
  text: string;
}

export default function SecretText({ text }: Props) {
  const [isVisible, setIsVisble] = useState<boolean>(false);

  const toggleVisiblility = () => {
    setIsVisble((prev) => !prev);
  };

  return (
    <div className="flex items-center gap-x-2 w-full">
      <input
        type={isVisible ? "text" : "password"}
        value={text}
        disabled
        style={{ width: `${text.length + 1}ch` }}
        className=" boder-0 outline-none bg-transparent"
      />
      <button onClick={toggleVisiblility}>
        {isVisible ? <FiEyeOff size={25} color="#fafffd" /> : <FiEye size={25} color="#fafffd" />}
      </button>
    </div>
  );
}
