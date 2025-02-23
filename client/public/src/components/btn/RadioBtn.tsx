interface Props {
  label: string;
  option: string;
  selectedOption: string;
  onClick: () => void;
}

export default function RadioBtn({ label, option, selectedOption, onClick }: Props) {
  const isSelectd = option === selectedOption;

  return (
    <button onClick={onClick} className="flex flex-col items-center gap-y-2">
      <div
        className={`w-3 h-3 rounded-full border-2 border-gray-300 ${
          isSelectd ? "bg-cyan-400" : ""
        }`}
      />
      <p className="text-gray-400">{label}</p>
    </button>
  );
}
