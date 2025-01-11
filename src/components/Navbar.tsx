import { GoPlus } from "react-icons/go";
import { NavLink } from "react-router-dom";
//@ts-ignore
import authechoLogo from "../assets/images/authechoLogo.svg";
import { useRef } from "react";

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
        <NavLink to="/" className="logo-link">
          <img src={authechoLogo} alt="Authehco logo" className="logo" />
        </NavLink>
        <div className="navigation-controls" ref={navigationControlsRef}>
          <ul className="navigation-links">
            <li>
              <NavLink to="/signup" className={({ isActive }) => `nav-link${isActive ? "-active" : ""}`}>
                Sign Up
              </NavLink>
            </li>
            <li>
              <NavLink to="/signin" className={({ isActive }) => `nav-link${isActive ? "-active" : ""}`}>
                Sign In
              </NavLink>
            </li>
            <li>
              <NavLink to="/resetPassword" className={({ isActive }) => `nav-link${isActive ? "-active" : ""}`}>
                Reset Password
              </NavLink>
            </li>
            <li>
              <NavLink to="/unlockaccount" className={({ isActive }) => `nav-link${isActive ? "-active" : ""}`}>
                Unlock Account
              </NavLink>
            </li>
          </ul>
          {/* </div> */}
          <div className="controls">
            <NavLink to="/unlockaccount" className="control-btn btn-primary">
              Connect App
              <GoPlus size={26} />
            </NavLink>
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
