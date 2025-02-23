import { NavLink } from "react-router";

interface Props {
  path: string;
  name: string;
}

export default function PageLink({ path, name }: Props) {
  return (
    <NavLink
      end
      to={path}
      className={({ isActive }) =>
        isActive
          ? "border-b-[1px] border-cyan-600 pb-1 text-cyan-300 font-semibold"
          : "text-cyan-300"
      }>
      {name}
    </NavLink>
  );
}
