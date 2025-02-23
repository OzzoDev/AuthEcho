interface Props {
  steps: number;
  selectedIndex: number;
}

export default function Stepper({ steps, selectedIndex }: Props) {
  return (
    <div className="flex space-x-4">
      {Array.from({ length: steps }, (_, index) => (
        <div
          key={index}
          className={`w-16 h-2 rounded-lg ${
            index === selectedIndex ? "bg-green-700" : "bg-zinc-500"
          }`}
        />
      ))}
    </div>
  );
}
