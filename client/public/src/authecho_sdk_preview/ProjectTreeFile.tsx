import { FaRegFile } from "react-icons/fa";
import { findFileColor } from "./previewHelper";

interface Props {
  name: string;
  size?: number;
  desc?: string;
}

export default function ProjectTreeFile({ name, size = 18, desc }: Props) {
  const color = findFileColor(name);

  return (
    <div className="flex gap-x-4 text-[0.95rem] text-white px-2">
      <div className="flex space-x-1 min-w-[200px]">
        <div className="pt-1">
          <FaRegFile color={color} size={size} />
        </div>
        <p>{name}</p>
      </div>
      <div className="mb-4]">{desc && <p className="text-gray-400 text-left">{desc}</p>}</div>
    </div>
  );
}
