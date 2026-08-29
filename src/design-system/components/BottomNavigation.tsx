import { NavLink } from "react-router-dom";
const links = [
  { to: "/", label: "Início", icon: "⌂" },
  { to: "/learn", label: "Aprender", icon: "◫" },
  { to: "/review", label: "Revisar", icon: "↻" },
  { to: "/dossier", label: "Dossiê", icon: "≡" },
];
export function BottomNavigation() {
  return (
    <nav className="bottom-nav" aria-label="Navegação principal">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.to === "/"}
          className={({ isActive }) => (isActive ? "is-active" : "")}
        >
          <span aria-hidden="true">{link.icon}</span>
          <span>{link.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
