import { useRef, useState } from "react";
import { FixedSizeList as List } from "react-window";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import useOutsideClick from "../../hooks/useOutsideClick";

interface Props {
  items: string[];
  onSelect: (question: string) => void;
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
      className="drop-down-list-item">
      {items[index]}
    </li>
  );

  useOutsideClick(dropdownRef, () => {
    setIsOpen(false);
  });

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button type="button" onClick={toggleDropdown} className="dropdown-toggle">
        {isOpen ? (
          <FaChevronUp size={25} color="#fafffd" />
        ) : (
          <FaChevronDown size={25} color="#fafffd" />
        )}
      </button>
      {isOpen ? (
        <div className="dropdown-list-wrapper">
          <ul role="listbox" onClick={(e) => e.stopPropagation()} className="drop-down-list">
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
