import { useEffect, useRef, useState } from "react";
import { FixedSizeList as List } from "react-window";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import useOutsideClick from "../../hooks/useOutsideClick";

interface Props {
  initialValue?: string;
  items: string[];
  onSelect: (item: string) => void | Promise<void>;
}

export default function Dropdown({ initialValue = "Select", items, onSelect }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [displayText, setDisplayText] = useState<string>(initialValue);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setDisplayText(initialValue);
  }, [initialValue]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleQuestionClick = (question: string) => {
    onSelect(question);
    setDisplayText(question);
    setIsOpen(false);
  };

  const renderRow = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <li
      style={style}
      onClick={() => handleQuestionClick(items[index])}
      role="option"
      className="transition-all duration-300 ease-in-out cursor-pointer hover:text-cyan-400 focus:text-cyan-400">
      {items[index]}
    </li>
  );

  useOutsideClick(dropdownRef, () => {
    setIsOpen(false);
  });

  return (
    <div
      className="relative z-[1000] min-h-[45px] flex flex-row-reverse justify-between items-center w-full py-[10px] px-[20px] rounded-[30px] bg-slate-800"
      ref={dropdownRef}>
      <button type="button" onClick={toggleDropdown} className="">
        {isOpen ? (
          <FaChevronUp size={22} color="#fafffd" />
        ) : (
          <FaChevronDown size={22} color="#fafffd" />
        )}
      </button>
      {isOpen ? (
        <div className="absolute w-full min-h-[160px] px-[20px] py-[20px] pr-[10px] rounded-[30px] top-0 left-0 overflow-y-auto bg-slate-800">
          <ul role="listbox" onClick={(e) => e.stopPropagation()} className="w-full">
            <List height={160} itemCount={items.length} itemSize={40} width="100%">
              {renderRow}
            </List>
          </ul>
        </div>
      ) : (
        <p className="drop-down-display">{displayText}</p>
      )}
    </div>
  );
}
