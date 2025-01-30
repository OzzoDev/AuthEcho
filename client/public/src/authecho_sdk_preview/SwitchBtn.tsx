interface Props {
  btnText: string;
  active: boolean;
  onClick: () => void;
}

export default function SwitchBtn({ btnText, active, onClick }: Props) {
  return (
    <button
      className={`px-6 py-1 rounded-full ${
        !active ? "hover:text-gray-500 transition duration-300" : ""
      } ${active ? "bg-sky-800" : ""}`}
      onClick={onClick}>
      {btnText}
    </button>
  );
}
