import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface Props {
  name: string;
  value?: string;
  labelText: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

type InputType = "text" | "password";

export default function FormPasswordInput({ name, value, labelText, onChange }: Props) {
  const [type, setType] = useState<InputType>("password");

  const toggleType = () => {
    setType((prevType) => (prevType === "text" ? "password" : "text"));
  };

  return (
    <div className="mb-[60px]">
      <label className="block mb-2 font-medium text-slate-300">{labelText}</label>
      <div className="flex bg-gray-700 pr-2 rounded-lg shadow-white-s">
        <input
          type={type}
          name={name}
          value={value}
          autoCorrect="off"
          autoComplete="off"
          spellCheck="false"
          autoFocus
          onChange={onChange}
          className="bg-transparent border-0 text-gray-900 text-sm block w-full p-2.5 focus:outline-none focus:border-none focus:ring-0 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
        />
        <button type="button" title={type === "text" ? "Hide" : "Show"} onClick={toggleType}>
          {type === "text" ? <AiOutlineEye size={24} /> : <AiOutlineEyeInvisible size={24} />}
        </button>
      </div>
    </div>
  );
}
