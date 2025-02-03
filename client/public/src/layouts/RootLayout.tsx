import { Outlet } from "react-router";
import Footer from "./footer/Footer";
import PageTransition from "./PageTransition";
import Header from "./header/Header";

export default function RootLayout() {
  return (
    <>
      <Header />
      <main className="grow flex flex-col justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-600 text-white pt-[65px] overflow-hidden">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
    </>
  );
}
