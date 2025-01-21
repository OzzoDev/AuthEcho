import { useEffect, useRef, useState } from "react";
import { Verify } from "../../types/auth";
import useVerify from "../../hooks/useVerify";
import useClipboard from "../../hooks/useClipboard";
import useFormStore from "../../hooks/useFormStore";
import React from "react";

interface Props {
  verify: Verify;
}

export default function FormVerify({ verify }: Props): JSX.Element {
  const { setFormData } = useFormStore();
  const [code, setCode] = useState<string>("");

  const numberOfInputs = 8;

  const [inputValues, setInputValues] = useState(Array(numberOfInputs).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(numberOfInputs).fill(null));

  useVerify(verify, code);

  const handleAutoPatse = (verificationCode: string) => {
    const updatedVerificationCode = verificationCode.slice(0, 8).split("");
    setInputValues(updatedVerificationCode);
    setCode(updatedVerificationCode.join(""));
    setFormData({ verificationCode: updatedVerificationCode.join("") }, "verificationCode");
  };

  const { lastClipboard } = useClipboard(handleAutoPatse);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, [lastClipboard]);

  useEffect(() => {
    const firstEmptyIndex = inputValues.findIndex((val) => val === "");
    const lastFilledIndex = inputValues.lastIndexOf("");

    if (firstEmptyIndex !== -1) {
      inputRefs.current[firstEmptyIndex]?.focus();
    } else if (lastFilledIndex !== -1) {
      inputRefs.current[lastFilledIndex]?.focus();
    }
  }, [inputValues]);

  const handleChange = (index: number, value: string) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;

    setInputValues(newInputValues);

    const updatedVerificationCode = newInputValues.join("");
    setCode(updatedVerificationCode);
    setFormData({ verificationCode: updatedVerificationCode }, "verificationCode");
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace") {
      if (inputValues[index] === "") {
        if (index > 0) {
          inputRefs.current[index - 1]?.focus();
        }
      }
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pastedData = event.clipboardData.getData("text").trim().slice(0, numberOfInputs);
    const newInputValues = Array.from(pastedData).concat(
      Array(numberOfInputs - pastedData.length).fill("")
    );

    setInputValues(newInputValues);

    const updatedVerificationCode = newInputValues.join("");
    setCode(updatedVerificationCode);
    setFormData({ verificationCode: updatedVerificationCode }, "verificationCode");

    const lastEmptyIndex = newInputValues.findIndex((val) => val === "");
    if (lastEmptyIndex !== -1) {
      inputRefs.current[lastEmptyIndex]?.focus();
    } else {
      inputRefs.current[numberOfInputs - 1]?.focus();
    }
  };

  return (
    <div className="verify-conatiner">
      {Array.from({ length: numberOfInputs }, (_, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          maxLength={1}
          value={inputValues[index]}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className="verify-input"
        />
      ))}
    </div>
  );
}
