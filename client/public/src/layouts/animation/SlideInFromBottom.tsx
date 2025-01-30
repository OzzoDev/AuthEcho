import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function ({ children }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 500 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 500 }}
      transition={{ duration: 0.5 }}
      className="flex-grow flex flex-col w-full">
      {children}
    </motion.div>
  );
}
