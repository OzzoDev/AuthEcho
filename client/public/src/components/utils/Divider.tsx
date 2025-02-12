interface Props {
  dividerText: string;
  color?: string;
}

export default function Divider({ dividerText, color = "red" }: Props) {
  return (
    <fieldset style={{ borderColor: color }} className="mb-10 w-full border-t-2">
      <legend
        style={{ borderColor: color }}
        className="text-xl font-semibold ml-10 py-1 px-4 rounded-full border-2">
        {dividerText}
      </legend>
    </fieldset>
  );
}
