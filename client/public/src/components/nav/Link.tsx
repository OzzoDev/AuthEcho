import { ReactNode } from "react";
import { NavLink } from "react-router";

interface Props {
  linkText: string;
  path: string;
  classNames?: string;
  children?: ReactNode;
}

export default function Link({ linkText, path, classNames, children }: Props) {
  return (
    <NavLink
      to={path}
      onMouseLeave={(e) => (e.target as HTMLButtonElement).blur()}
      className={
        classNames ? classNames : ({ isActive }) => `nav-link${isActive ? "-active" : ""}`
      }>
      {linkText}
      {children && children}
    </NavLink>
  );
}
