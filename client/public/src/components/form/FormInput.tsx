import React, { useEffect, useRef } from "react";

interface Props {
  labelText: string;
  name: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormInput({ labelText, name, error, onChange }: Props) {
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
        onChange={onChange}
        autoComplete="off"
        required
      />
      <label>{labelText}</label>
    </div>
  );
}
