interface Props {
  error: string;
}

export default function FormError({ error }: Props) {
  return (
    <div className="flex justify-center items-center text-lg font-medium min-h-[40px] my-2">
      {error && <p className="text-center text-red-500">{error}</p>}
    </div>
  );
}
