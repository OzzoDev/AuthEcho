import { ReactNode } from "react";
import { IoMdClose } from "react-icons/io";

interface Props {
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ onClose, children }: Props) {
  return (
    <div className="absolute flex flex-col w-full max-w-[400px] top-0 right-0 gap-6 bg-gray-900 p-8 pt-12 rounded-lg shadow-[0_0px_10px_rgb(255,255,255,0.2)]">
      <button onClick={() => onClose()} className="absolute top-4 right-4">
        <IoMdClose size={28} color="red" />
      </button>
      {children}
    </div>
  );
}
