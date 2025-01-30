import Footer from "./footer/Footer";
import Navbar from "./nav/Navbar";
import PageTransition from "./PageTransition";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  height?: string;
}

export default function AuthLayout({ children, height }: Props) {
  return (
    <PageTransition height={height}>
      <Navbar />
      <main className="grow flex flex-col items-center justify-center overflow-x-hidden w-full">
        {children}
      </main>
      <Footer />
    </PageTransition>
  );
}
