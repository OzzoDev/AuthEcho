import { ReactNode, useEffect, useRef, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { LuMinus } from "react-icons/lu";
import useOutsideClick from "../../hooks/useOutsideClick";

interface Props {
  heading: string;
  extended?: boolean;
  children: ReactNode;
}

export default function Accordion({ heading, extended = false, children }: Props) {
  const [isExtended, setIsExtended] = useState<boolean>(extended);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsExtended(extended);
  }, [extended]);

  const close = () => {
    if (isExtended) {
      setIsExtended(false);
    }
  };

  const toggle = () => {
    setIsExtended((prev) => !prev);
  };

  useOutsideClick(ref, close);

  return (
    <div ref={ref} className="flex flex-col gap-y-4 w-full">
      <div className="flex items-center gap-x-10 p-4 bg-gradient-to-l from-gray-700 to-gray-800">
        <p className="text-lg font-medium">{heading}</p>
        <button onClick={toggle}>
          {isExtended ? <LuMinus size={24} /> : <FiPlus size={24} />}
        </button>
      </div>
      {isExtended && <>{children}</>}
    </div>
  );
}
