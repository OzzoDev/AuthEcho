import { useState } from "react";

interface Props {
  btnText: string;
  fontSize?: string;
  selected?: boolean;
  onClick: () => void;
}

export default function ToggleBtn({
  btnText,
  fontSize = "base",
  selected = false,
  onClick,
}: Props) {
  const [isSelected, setIsSelected] = useState<boolean>(selected);

  const toggle = () => {
    onClick && onClick();
    setIsSelected((prev) => !prev);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      onMouseLeave={(e) => (e.target as HTMLButtonElement).blur()}
      className="flex items-center space-x-2">
      <p className={`text-${fontSize} whitespace-nowrap`}>{btnText}</p>
      <p className={`${fontSize}`}>{isSelected ? "✅" : "❌"}</p>
    </button>
  );
}
