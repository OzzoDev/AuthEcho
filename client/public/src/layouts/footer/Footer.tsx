//@ts-ignore
import authechoLogo from "../../assets/images/authechoLogo.svg";
import { NavLink } from "react-router";
import { FOOTER_LINKS } from "../../constants/contants";
import Link from "../header/Link";
import ReviewManager from "./ReviewManager";
import useAuthStore from "../../hooks/useAuthStore";

export default function Footer() {
  const { isAuthenticated, isAdmin, hasReviewed } = useAuthStore();
  const currentYear = new Date().getFullYear();

  const footerLinks = (
    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0">
      {FOOTER_LINKS.map((footerLink, index) => {
        return (
          <li key={index}>
            <Link linkText={footerLink.linkText} path={footerLink.path} />
          </li>
        );
      })}
    </ul>
  );

  const renderReviewManager = isAuthenticated && !isAdmin && !hasReviewed;

  return (
    <footer className="bg-black">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between pb-4 mb-6 border-b-[1px] border-gray-700">
          <NavLink to="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <img src={authechoLogo} className="h-8" alt="Authecho Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Autecho
            </span>
          </NavLink>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0">
            {footerLinks}
          </ul>
        </div>
        {renderReviewManager && <ReviewManager />}
        <span className="block text-sm text-gray-500">
          © {currentYear}
          Authecho™ . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
