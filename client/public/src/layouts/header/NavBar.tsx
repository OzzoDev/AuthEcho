// @ts-ignore
import authechoLogo from "../../assets/images/authechoLogo.svg";
import { useRef, useState } from "react";
import { Link as NavLink } from "react-router";
import PrimaryBtn from "../../components/btn/PrimaryBtn";
import { NAV_LINKS } from "../../constants/contants";
import useOutsideClick from "../../hooks/useOutsideClick";
import { GoPlus } from "react-icons/go";
import Link from "./Link";

export default function Navbar() {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const toggleNavRef = useRef<HTMLDivElement | null>(null);

  useOutsideClick(toggleNavRef, () => setIsExpanded(false));

  const navLinks = (
    <ul className="navigation-links">
      {NAV_LINKS.map((navLink, index) => {
        return (
          <li key={index}>
            <Link linkText={navLink.linkText} path={navLink.path} fontSize="lg" />
          </li>
        );
      })}
    </ul>
  );

  return (
    <nav className="bg-gray-950">
      <div className="navigation">
        <NavLink to="/">
          <img
            src={authechoLogo}
            alt="Authehco logo"
            className="w-[50px] transition duration-300 ease hover:scale-[1.04]"
          />
        </NavLink>
        <div className={`navigation-controls ${isExpanded ? "extended" : ""}`}>
          {navLinks}
          <div className="controls">
            <NavLink to="/connectapp">
              <PrimaryBtn btnText="Connect app" icon={<GoPlus size={26} />} fontSize="lg" />
            </NavLink>
          </div>
        </div>
      </div>
      <div
        ref={toggleNavRef}
        className="menuToggle icon nav-icon"
        tabIndex={0}
        role="button"
        onClick={() => setIsExpanded((prev) => !prev)}>
        <span className={`${isExpanded ? "open" : ""}`}></span>
        <span className={`${isExpanded ? "open" : ""}`}></span>
        <span className={`${isExpanded ? "open" : ""}`}></span>
      </div>
    </nav>
  );
}
