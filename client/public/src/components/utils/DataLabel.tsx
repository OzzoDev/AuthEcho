interface Props {
  label: string;
  data: string;
}

export default function DataLabel({ label, data }: Props) {
  return (
    <div className="flex gap-x-2">
      <p className="text-gray-400">{label}</p>
      <p>{data}</p>
    </div>
  );
}
