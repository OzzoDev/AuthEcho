// @ts-ignore
import authechoLogo from "../../assets/images/authechoLogo.svg";
import { useRef, useState } from "react";
import Link from "./Link";
import { NavLink } from "react-router";
import PrimaryBtn from "../btn/PrimaryBtn";
import { NAV_MENU_ITEMS } from "../../constants/contants";
import useOutsideClick from "../../hooks/useOutsideClick";
import { GoPlus } from "react-icons/go";

export default function Navbar() {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const toggleNavRef = useRef<HTMLDivElement | null>(null);

  useOutsideClick(toggleNavRef, () => setIsExpanded(false));

  const navLinks = (
    <ul className="navigation-links">
      {NAV_MENU_ITEMS.map((navItem, index) => {
        return (
          <li key={index}>
            <Link linkText={navItem.linkText} path={navItem.path} />
          </li>
        );
      })}
    </ul>
  );

  return (
    <nav className="bg-gray-950">
      <div className="navigation">
        <Link
          linkText=""
          path="/"
          classNames="logo-link"
          children={<img src={authechoLogo} alt="Authehco logo" className="logo" />}
        />
        <div className={`navigation-controls ${isExpanded ? "extended" : ""}`}>
          {navLinks}
          <div className="controls">
            <NavLink to="/signin">
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
    // <nav>
    //   <div className="navigation">
    //     <Link
    //       linkText=""
    //       path="/"
    //       classNames="logo-link"
    //       children={<img src={authechoLogo} alt="Authehco logo" className="logo" />}
    //     />
    //     <div className="navigation-controls" ref={navigationControlsRef}>
    //       <ul className="navigation-links">
    //         <li>
    //           <Link linkText="Create Account" path="/signup" />
    //         </li>
    //         <li>
    //           <Link linkText="My Account" path="/account" />
    //         </li>
    //         <li>
    //           <Link linkText="Reset Password" path="/resetPassword" />
    //         </li>
    //         <li>
    //           <Link linkText="Unlock Account" path="/unlockaccount" />
    //         </li>
    //       </ul>
    //       <div className="controls">
    //         <Link
    //           linkText="Connect App"
    //           path="/connectapp"
    //           classNames="control-btn btn btn-secondary"
    //           children={<GoPlus size={26} />}
    //         />
    //       </div>
    //     </div>
    //   </div>
    //   <div className="menuToggle icon nav-icon" tabIndex={0} role="button" onClick={toggleMenu}>
    //     <span></span>
    //     <span></span>
    //     <span></span>
    //   </div>
    // </nav>
  );
}
