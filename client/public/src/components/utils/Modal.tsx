import { ReactNode, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

interface Props {
  show: boolean;
  closeDependency?: string;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ show, closeDependency, onClose, children }: Props) {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(show);

  const closeModal = () => {
    onClose();
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (show) {
      setIsModalVisible(true);
    }
  }, [show]);

  useEffect(() => {
    if (show && closeDependency) {
      closeModal();
    }
  }, [closeDependency]);

  if (isModalVisible) {
    return (
      <div className="flex flex-col absolute top-[65px] right-0 gap-6 m-auto bg-gray-900 p-8 pt-12 rounded-lg">
        <button onClick={closeModal} className="absolute top-4 right-4">
          <IoMdClose size={28} color="red" />
        </button>
        {children}
      </div>
    );
  }

  return null;
}
