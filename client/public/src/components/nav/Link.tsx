import { ReactNode } from "react";
import { Link as NavLink } from "react-router";

interface Props {
  linkText: string;
  path: string;
  classNames?: string;
  children?: ReactNode;
}

export default function Link({ linkText, path, children }: Props) {
  return (
    <NavLink
      to={path}
      onMouseLeave={(e) => (e.target as HTMLButtonElement).blur()}
      className="nav-link">
      {linkText}
      {children && children}
    </NavLink>
  );
}
