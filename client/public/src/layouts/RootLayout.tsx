import PageTransition from "./PageTransition";
import Footer from "./footer/Footer";
import Navbar from "./nav/Navbar";
import { Outlet } from "react-router";

export default function RootLayout() {
  return (
    <>
      <Navbar />
      <main className="grow flex flex-col justify-center h-full bg-gradient-to-b from-gray-900 to-gray-600 overflow-hidden">
        <PageTransition>
          <Outlet />
        </PageTransition>
        <Footer />
      </main>
    </>
  );
}
