import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import useFormStore from "../../hooks/useFormStore";

interface Props {
  labelText: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormPasswordInput({ labelText, name, onChange }: Props) {
  const { formData } = useFormStore();
  const [inputType, setInputType] = useState<"text" | "password">("password");

  return (
    <div className="relative w-full flex border-b-[1px]">
      <input
        type={inputType}
        name={name}
        value={(formData[name] as string) || ""}
        onChange={onChange}
        autoComplete="off"
        required
        className="w-full border-0 outline-none pb-[5px] pt-[8px] bg-transparent z-10"
      />
      <label className="absolute top-0 left-0 text-xl transition-all ease-in-out duration-300">
        {labelText}
      </label>
      <button
        type="button"
        className="ml-10"
        title={inputType === "text" ? "Hide" : "Show"}
        onClick={() => (inputType === "text" ? setInputType("password") : setInputType("text"))}>
        {inputType === "text" ? (
          <FiEyeOff size={25} color="#fafffd" />
        ) : (
          <FiEye size={25} color="#fafffd" />
        )}
      </button>
    </div>
  );
}
