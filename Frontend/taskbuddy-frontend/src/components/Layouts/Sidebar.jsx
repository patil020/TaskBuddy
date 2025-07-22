import React from "react";
import { NavLink } from "react-router-dom";

const menu = [
  { to: "/projects", label: "Projects" },
  { to: "/tasks", label: "Tasks" },
  { to: "/requests", label: "Requests" },
  { to: "/settings", label: "Settings" },
];

export default function Sidebar() {
  return (
    <div
      className="bg-dark text-light d-flex flex-column justify-content-between"
      style={{ width: 220, minHeight: "100vh" }}
    >
      <div>
        <div className="text-center py-4 fs-4 fw-bold border-bottom">
          TaskBuddy
        </div>
        <nav className="nav flex-column mt-4">
          {menu.map((item) => (
            <NavLink
              className={({ isActive }) =>
                "nav-link px-4 py-2 " +
                (isActive ? "active bg-light text-dark rounded" : "text-light")
              }
              to={item.to}
              key={item.to}
              end
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="p-3 small border-top text-center">
        <div>
          <span className="me-2">👤</span> Ajinkya
        </div>
      </div>
    </div>
  );
}
