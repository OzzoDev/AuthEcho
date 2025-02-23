import { IoSearch } from "react-icons/io5";

interface Props {
  placeholder?: string;
  autofocus?: boolean;
  onChange: (item: string) => void;
}

export default function SearchBar({ placeholder = "Search", autofocus, onChange }: Props) {
  return (
    <div className="flex items-center gap-x-2 p-2 border-[1px] border-white rounded-full">
      <IoSearch size={20} />
      <input
        placeholder={placeholder}
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        autoFocus={autofocus}
        onChange={(e) => onChange(e.target.value.trim().toLowerCase())}
        className="w-full border-0 outline-none bg-transparent"
      />
    </div>
  );
}
