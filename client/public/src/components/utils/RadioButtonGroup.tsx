import { useEffect, useState } from "react";
import RadioBtn from "../btn/RadioBtn";

interface Props {
  options: string[];
  onSelect: (option: string) => void;
}

export default function RadioButtonGroup({ options, onSelect }: Props) {
  const [selectedOption, setSelectedOption] = useState<string>(options[0]);

  useEffect(() => {
    onSelect(selectedOption);
  }, [selectedOption, onSelect]);

  return (
    <ul className="flex gap-x-6">
      {options.map((option, index) => {
        return (
          <RadioBtn
            key={index}
            label={option}
            option={option}
            selectedOption={selectedOption}
            onClick={() => setSelectedOption(option)}
          />
        );
      })}
    </ul>
  );
}
