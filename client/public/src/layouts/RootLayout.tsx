import { useEffect } from "react";
import useAuthechoApi from "../hooks/authecho/useAuthechoApi";
import PageTransition from "./PageTransition";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import { Outlet, useLocation } from "react-router";

export default function RootLayout() {
  const location = useLocation();
  const { callApi: trackActivity } = useAuthechoApi("PUT", "TRACKACTIVITY");

  useEffect(() => {
    (async () => {
      await trackActivity();
    })();
  }, [location]);

  return (
    <>
      <Header />
      <main className="grow flex flex-col justify-center h-full bg-gradient-to-b from-gray-900 to-gray-600 overflow-hidden">
        <PageTransition>
          <Outlet />
        </PageTransition>
        <Footer />
      </main>
    </>
  );
}
