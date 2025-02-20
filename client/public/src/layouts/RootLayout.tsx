import { Outlet, useLocation } from "react-router";
import Footer from "./footer/Footer";
import PageTransition from "./PageTransition";
import Header from "./header/Header";
import { useEffect } from "react";
import useApi from "../hooks/useApi";

export default function RootLayout() {
  const location = useLocation();
  const { fetchData: trackActivity } = useApi("PUT", "TRACKACTIVITY");

  useEffect(() => {
    (async () => {
      await trackActivity();
    })();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

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
