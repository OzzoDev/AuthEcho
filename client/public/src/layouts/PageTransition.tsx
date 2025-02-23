import { motion } from "framer-motion";
import { ReactNode } from "react";
import { useLocation } from "react-router";

interface Props {
  children: ReactNode;
}

export default function PageTransition({ children }: Props) {
  const location = useLocation();

  return (
    <motion.div
      key={location.key}
      initial={{ opacity: 0.2 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0.2 }}
      transition={{ duration: 0.5 }}
      className="flex-grow flex flex-col w-full">
      {children}
    </motion.div>
  );
}
