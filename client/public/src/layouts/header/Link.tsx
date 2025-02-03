import { ReactNode } from "react";
import { Link as NavLink } from "react-router";

interface Props {
  linkText: string;
  path: string;
  fontSize?: string;
  children?: ReactNode;
}

export default function Link({ linkText, path, fontSize = "base", children }: Props) {
  return (
    <NavLink
      to={path}
      onMouseLeave={(e) => (e.target as HTMLButtonElement).blur()}
      className={`relative px-[10px] py-[5px] whitespace-nowrap transition-all duration-300 ease-in-out text-${fontSize} nav-link`}>
      {linkText}
      {children && children}
    </NavLink>
  );
}
