interface Props {
  btnText: string;
  type?: "button" | "submit";
  onClick?: () => void;
}

export default function PrimaryBtn({ btnText, type = "button", onClick }: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="rounded-full py-2 px-10 bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-70 transition-opacity duration-300 whitespace-nowrap ">
      {btnText}
    </button>
  );
}
