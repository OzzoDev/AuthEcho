import PageTransition from "./PageTransition";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function SimplifiedLayout({ children }: Props) {
  return (
    <PageTransition>
      <div className="grow flex flex-col items-center justify-center">{children}</div>
    </PageTransition>
  );
}
