//@ts-ignore
import authechoLogo from "../../assets/images/authechoLogo.svg";
import { NavLink } from "react-router";
import { FOOTER_LINKS } from "../../constants/contants";
import Link from "../header/Link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = (
    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
      {FOOTER_LINKS.map((footerLink, index) => {
        return (
          <li key={index}>
            <Link linkText={footerLink.linkText} path={footerLink.path} />
          </li>
        );
      })}
    </ul>
  );

  return (
    <footer className="bg-white shadow-sm dark:bg-black">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <NavLink to="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <img src={authechoLogo} className="h-8" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Autecho
            </span>
          </NavLink>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            {footerLinks}
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © {currentYear}
          <NavLink to="/" className="hover:underline">
            Authecho™
          </NavLink>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
