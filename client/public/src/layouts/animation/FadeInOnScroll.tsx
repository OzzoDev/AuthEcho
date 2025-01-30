import { ReactNode, useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";

interface Props {
  children: ReactNode;
}

export default function FadeInOnScroll({ children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0;

        if (inView && currentScrollY > lastScrollY) {
          controls.start({ opacity: 1 });
        }

        if (!inView && currentScrollY > lastScrollY) {
          controls.start({ opacity: 0 });
        }

        if (currentScrollY < lastScrollY) {
          controls.start({ opacity: 1 });
        }
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, controls]);

  useEffect(() => {
    const handleInitialCheck = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0;

        if (inView) {
          controls.set({ opacity: 1 });
        }
      }
    };

    handleInitialCheck();
    window.addEventListener("resize", handleInitialCheck);

    return () => window.removeEventListener("resize", handleInitialCheck);
  }, [controls]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 1 }}
      animate={controls}
      transition={{ duration: 0.5 }}>
      {children}
    </motion.div>
  );
}
