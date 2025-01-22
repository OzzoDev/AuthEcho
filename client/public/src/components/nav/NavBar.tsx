// @ts-ignore
import authechoLogo from "../../assets/images/authechoLogo.svg";
import { GoPlus } from "react-icons/go";
import { useRef } from "react";
import Link from "./Link";

export default function Navbar() {
  const navigationControlsRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    navigationControlsRef.current?.classList.toggle("extended");
    document.querySelectorAll(".menuToggle span").forEach((span) => {
      span.classList.toggle("open");
    });
  };

  return (
    <nav>
      <div className="navigation">
        <Link
          linkText=""
          path="/"
          classNames="logo-link"
          children={<img src={authechoLogo} alt="Authehco logo" className="logo" />}
        />
        <div className="navigation-controls" ref={navigationControlsRef}>
          <ul className="navigation-links">
            <li>
              <Link linkText="Create Account" path="/signup" />
            </li>
            <li>
              <Link linkText="My Account" path="/account" />
            </li>
            <li>
              <Link linkText="Reset Password" path="/resetPassword" />
            </li>
            <li>
              <Link linkText="Unlock Account" path="/unlockaccount" />
            </li>
          </ul>
          <div className="controls">
            <Link
              linkText="Connect App"
              path="/connectapp"
              classNames="control-btn btn btn-secondary"
              children={<GoPlus size={26} />}
            />
          </div>
        </div>
      </div>
      <div className="menuToggle icon nav-icon" tabIndex={0} role="button" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
}
