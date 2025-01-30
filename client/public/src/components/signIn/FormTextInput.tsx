interface Props {
  name: string;
  labelText: string;
  value?: string;
  onChange:
    | ((e: React.ChangeEvent<HTMLInputElement>) => void)
    | ((e: React.ChangeEvent<HTMLInputElement>) => Promise<void>);
}

export default function FormTextInput({ name, value, labelText, onChange }: Props) {
  return (
    <div className="mb-[60px]">
      <label className="block mb-2 font-medium text-slate-300">{labelText}</label>
      <input
        type="text"
        name={name}
        value={value}
        autoCorrect="off"
        autoComplete="off"
        spellCheck="false"
        autoFocus
        onChange={onChange}
        className="bg-gray-700 border-0 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:border-none focus:ring-0 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white shadow-white-s"
      />
    </div>
  );
}
