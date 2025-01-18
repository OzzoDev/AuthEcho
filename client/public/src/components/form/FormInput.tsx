import React, { useEffect, useRef } from "react";

interface Props {
  labelText: string;
  name: string;
  value: string;
  error?: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormInput({ labelText, name, value, error, required, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (error) {
      inputRef.current?.focus();
    }
  }, [error]);

  return (
    <div className="input-container">
      <input type="text" ref={inputRef} name={name} value={value} required={required} onChange={onChange} autoComplete="off" />
      <label>{labelText}</label>
    </div>
  );
}
