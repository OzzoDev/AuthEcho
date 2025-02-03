import { useEffect, useState } from "react";

interface Props {
  min: number;
  max: number;
  delay: number;
}

export default function TimerCounter({ min, max, delay }: Props) {
  const [count, setCount] = useState<number>(min);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount < max) {
          return prevCount + 1;
        } else {
          clearInterval(intervalId);
          return prevCount;
        }
      });
    }, delay);

    return () => clearInterval(intervalId);
  }, [max, delay]);

  return <span className="color-accent">{count}</span>;
}
