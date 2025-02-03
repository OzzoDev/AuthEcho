import React, { useEffect, useRef } from "react";
import useFormStore from "../../hooks/useFormStore";

interface Props {
  labelText: string;
  name: string;
  type?: "text" | "email";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormInput({ labelText, name, type = "text", onChange }: Props) {
  const { formData } = useFormStore();
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
        type={type}
        ref={inputRef}
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
    </div>
  );
}
