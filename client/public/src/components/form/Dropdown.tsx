import { useRef, useState } from "react";
import { FixedSizeList as List } from "react-window";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import useOutsideClick from "../../hooks/useOutsideClick";

interface Props {
  items: string[];
  onSelect: (question: string) => void | Promise<void>;
}

export default function Dropdown({ items, onSelect }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [displayText, setDisplayText] = useState<string>("Select question");
  const dropdownRef = useRef<HTMLDivElement | null>(null);

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
      className="relative isolate flex flex-row-reverse justify-between items-center w-full py-[10px] px-[20px] rounded-[20px] bg-slate-800"
      ref={dropdownRef}>
      <button type="button" onClick={toggleDropdown} className="">
        {isOpen ? (
          <FaChevronUp size={25} color="#fafffd" />
        ) : (
          <FaChevronDown size={25} color="#fafffd" />
        )}
      </button>
      {isOpen ? (
        <div className="absolute z-1 w-full min-h-[300px] px-[20px] py-[20px] pr-[10px] rounded-[20px] top-0 left-0 overflow-y-auto bg-slate-800">
          <ul role="listbox" onClick={(e) => e.stopPropagation()} className="w-full">
            <List height={300} itemCount={items.length} itemSize={70} width="100%">
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
