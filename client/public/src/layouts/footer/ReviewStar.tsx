interface Props {
  value: number;
  selectedValue: number;
  onClick: () => void;
}

export default function ReviewStar({ value, selectedValue, onClick }: Props) {
  const isIncluded = value <= selectedValue;

  return (
    <button
      onClick={onClick}
      className={`border-0 outline-0 filter transition text-lg ${
        isIncluded ? "" : "hue-rotate-180 brightness-75"
      }`}>
      ⭐
    </button>
  );
}
