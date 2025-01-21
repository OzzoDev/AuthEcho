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
    <div className="input-container">
      <input
        type="text"
        ref={inputRef}
        name={name}
        value={(formData[name] as string) || ""}
        onChange={onChange}
        autoComplete="off"
        required
      />
      <label>{labelText}</label>
    </div>
  );
}
