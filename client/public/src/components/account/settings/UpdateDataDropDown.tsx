import { IoMdCheckmark } from "react-icons/io";
import PrimaryBtn from "../../btn/PrimaryBtn";
import Dropdown from "../../form/Dropdown";
import { useEffect, useState } from "react";

interface Props {
  label: string;
  items: string[];
  initialValue: string;
  onSelect: (item: string) => void;
  onSubmit: () => void | Promise<void>;
}

export default function UpdateDataDropDown({
  label,
  items,
  initialValue,
  onSelect,
  onSubmit,
}: Props) {
  const [dropDownValue, setDropDownValue] = useState<string>(initialValue);

  useEffect(() => {
    setDropDownValue(initialValue);
  }, [initialValue]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-6 w-[90%] max-w-[600px]">
      <p className="text-xl">{label}</p>
      <div className="w-full flex flex-col md:flex-row items-center md:items-end gap-4">
        <Dropdown initialValue={dropDownValue} items={items} onSelect={onSelect} />
        <PrimaryBtn btnText="Update" type="submit" icon={<IoMdCheckmark size={24} />} />
      </div>
    </form>
  );
}
