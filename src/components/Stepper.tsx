interface Props {
  steps: number;
  selectedIndex: number;
}

export default function Stepper({ steps, selectedIndex }: Props) {
  return (
    <div className="stepper-container">
      {Array.from({ length: steps }, (_, index) => (
        <div key={index} className={`step ${index === selectedIndex ? "active" : ""}`} />
      ))}
    </div>
  );
}
