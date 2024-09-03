import { NavLink } from "react-router-dom";

export default function NavBarLink({ text, to }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        "navbar-brand mb-0 h1 " + (isActive ? "text-primary" : "")
      }
    >
      {text}
    </NavLink>
  );
}
