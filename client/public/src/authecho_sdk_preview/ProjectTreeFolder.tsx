import { ReactNode, useState } from "react";
import { IoMdFolderOpen } from "react-icons/io";
import { IoChevronDown, IoChevronUp, IoFolderOpenOutline } from "react-icons/io5";
import FadeInOnScroll from "../layouts/animation/FadeInOnScroll";

interface Props {
  name: string;
  desc: string;
  size?: number;
  children?: ReactNode;
}

export default function ProjectTreeFolder({ name, size = 24, desc, children }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const color = "white";

  return (
    <FadeInOnScroll>
      <div className="flex relative space-x-2">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          title={isOpen ? "Hide" : "Show"}
          className="h-fit absolute left-[10px] top-[18px]">
          {isOpen ? (
            <IoChevronUp color={color} size={size - 4} />
          ) : (
            <IoChevronDown color={color} size={size - 4} />
          )}
        </button>
        <div className="flex flex-col space-y-1 text-white">
          <div className="flex ml-[-8px] my-4 pb-4 border-b-[1px] border-gray-400 px-10">
            <div className="min-w-[140px] flex space-x-1">
              {isOpen ? (
                <IoFolderOpenOutline color={color} size={size} />
              ) : (
                <IoMdFolderOpen color={color} size={size} />
              )}
              <p>{name}</p>
            </div>
            <p className="">{desc}</p>
          </div>
          <div className="flex space-x-4">
            {isOpen && children && (
              <div className="flex flex-col items-start space-y-4">{children}</div>
            )}
          </div>
        </div>
      </div>
    </FadeInOnScroll>
  );
}
