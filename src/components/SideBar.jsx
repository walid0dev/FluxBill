import {
  FiCommand,
  FiFileText,
  FiGrid,
  FiLogOut,
  FiTruck,
} from "react-icons/fi";
import { useState } from "react";
import { NavLink } from "react-router";
import userAuthContext from "../contexts/UserAuthContext";
import { useContext } from "react";

const links = [
  { to: "/", label: "Dashboard", icon: FiGrid },
  { to: "/suppliers", label: "Suppliers", icon: FiTruck },
  { to: "/invoices", label: "Invoices", icon: FiFileText },
];

const SideBar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const user = useContext(userAuthContext);
  return (
    <aside
      onPointerEnter={() => setIsExpanded(true)}
      onPointerLeave={() => setIsExpanded(false)}
      className="relative w-full lg:h-screen lg:w-20 lg:shrink-0"
    >
      <div
        className={`flex h-full w-full flex-col border border-sidebar-border bg-sidebar p-3 shadow-sm transition-[width] duration-200 lg:sticky lg:top-0 lg:z-10 ${
          isExpanded ? "lg:w-64" : "lg:w-20"
        }`}
      >
        <div className="flex items-center gap-3 border-b border-sidebar-border px-2 pb-3">
          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
            <FiCommand className="text-base" />
          </span>
          {isExpanded && (
            <div className="min-w-0 overflow-hidden">
              <p className="truncate whitespace-nowrap text-xs uppercase tracking-wider text-muted-foreground">
                Personal
              </p>
              <p className="truncate whitespace-nowrap text-sm font-medium text-sidebar-foreground">
                {user?.name}
              </p>
            </div>
          )}
        </div>

        <nav className="mt-3 grid content-start gap-2 lg:flex-1">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `group flex min-w-0 items-center overflow-hidden rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                } ${isExpanded ? "gap-3" : "justify-center"}`
              }
            >
              <Icon className="text-base opacity-80 transition group-hover:opacity-100" />
              {isExpanded && (
                <span className="truncate whitespace-nowrap">{label}</span>
              )}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className={`mt-auto flex w-full min-w-0 items-center overflow-hidden rounded-lg border border-sidebar-border px-3 py-2.5 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
            isExpanded ? "gap-3" : "justify-center"
          }`}
        >
          <FiLogOut className="text-base opacity-80" />
          {isExpanded && (
            <span className="truncate whitespace-nowrap">Logout (soon)</span>
          )}
        </button>
      </div>
    </aside>
  );
};

export default SideBar;
