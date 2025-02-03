import React, { useEffect, useRef } from "react";
import useFormStore from "../../hooks/useFormStore";

interface Props {
  labelText: string;
  name: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormInput({ labelText, name, error, onChange }: Props) {
  const { formData } = useFormStore();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (error) {
      inputRef.current?.focus();
    }
  }, [error]);

  return (
    <div className="relative w-full flex border-b-[1px]">
      <input
        type="text"
        ref={inputRef}
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
    </div>
  );
}
