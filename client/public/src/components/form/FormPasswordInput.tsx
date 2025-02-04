import React, { useEffect, useRef, useState } from "react";
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
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const allInputs = document.querySelectorAll("input");
    if (allInputs.length > 0 && allInputs[0] === inputRef.current) {
      console.log("Focusing first input...");
      inputRef.current?.focus();
    }
  }, []);

  return (
    <div className="relative w-full flex border-b-[1px]">
      <input
        ref={inputRef}
        type={inputType}
        name={name}
        value={(formData[name] as string) || ""}
        placeholder=" "
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
