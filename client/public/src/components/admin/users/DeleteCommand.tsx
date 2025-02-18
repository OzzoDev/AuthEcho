import { FaRegTrashCan } from "react-icons/fa6";
import DangerBtn from "../../btn/DangerBtn";

interface Props {
  command: string;
  name: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => Promise<void>;
}

export default function DeleteCommand({
  command,
  name,
  value,
  placeholder,
  onChange,
  onSubmit,
}: Props) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    await onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-4 items-end">
      <div className="flex gap-x-4">
        <input
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          required
          className="border-0 outline-0 border-b-[1px] border-red-600 color-red-600 bg-transparent"
        />
        <DangerBtn btnText="Delete" type="submit" icon={<FaRegTrashCan size={20} />} />
      </div>
      <p className="text-gray-400">
        Enter <span className="text-red-600 font-semibold">{command}</span> and press delete
      </p>
    </form>
  );
}
