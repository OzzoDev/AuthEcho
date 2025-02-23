interface Props {
  label: string;
  data: string;
  value: string;
  currentValue: string;
  onClick: (value: string) => void;
}

export default function AppTrafficTimeBtn({ label, data, value, currentValue, onClick }: Props) {
  const isSelected = value === currentValue;

  return (
    <button
      onClick={() => onClick(value)}
      className={`flex flex-col items-center gap-y-2 ${
        isSelected ? "border-b-[1px] border-cyan-600 text-cyan-400" : ""
      }`}>
      <p className="whitespace-nowrap">{label}</p>
      <p className="whitespace-nowrap">{data}</p>
    </button>
  );
}
