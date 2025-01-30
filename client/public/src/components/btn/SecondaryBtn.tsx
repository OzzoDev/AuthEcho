interface Props {
  btnText: string;
  type?: "button" | "submit";
  onClick?: () => void;
}

export default function SecondarBtn({ btnText, type = "button", onClick }: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="rounded-full py-2 px-10 bg-gradient-to-l from-gray-500 to-gray-700 hover:opacity-70 transition-opacity duration-300">
      {btnText}
    </button>
  );
}
