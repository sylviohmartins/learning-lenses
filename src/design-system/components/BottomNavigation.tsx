import { NavLink } from "react-router-dom";
import { Icon, type IconName } from "@/design-system/primitives/Icon";

const links = [
  { to: "/", label: "Início", icon: "home" },
  { to: "/learn", label: "Aprender", icon: "learn" },
  { to: "/review", label: "Revisar", icon: "review" },
  { to: "/dossier", label: "Dossiê", icon: "dossier" },
] satisfies Array<{ to: string; label: string; icon: IconName }>;

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
          <Icon className="nav-icon" name={link.icon} />
          <span className="nav-label">{link.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
