import { useRef, useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import useClipboard from "../../hooks/useClipboard";

interface Props {
  text: string;
  order: number;
}

export default function ConnectCommand({ text, order }: Props) {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const { copyToClipboard } = useClipboard();

  useOutsideClick(buttonRef, () => setIsCopied(false));

  const handleCopy = (): void => {
    setIsCopied((prev) => !prev);
    copyToClipboard(text);
  };

  return (
    <li className="flex flex-col gap-y-6 w-[90%] max-w-[700px] px-6 py-4 rounded-lg bg-gray-900">
      <div className="flex justify-between">
        <p className="text-cyan-300 text-lg">{order}.</p>
        <button ref={buttonRef} onClick={handleCopy} className="transition-all duration-300 ease">
          {isCopied ? "Copied" : "Copy"}
        </button>
      </div>
      <p className="border-t-[1px] pt-4 text-center text-xl font-semibold">{text}</p>
    </li>
  );
}
