import React from "react";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
      <div className="container-fluid">
        <span className="navbar-brand">Dashboard</span>
        <div>
          {/* Placeholder for notifications, user icon, etc. */}
          <span className="me-3">🔔</span>
          <span className="me-3">🇮🇳</span>
          <span className="fw-bold">Ajinkya</span>
        </div>
      </div>
    </nav>
  );
}
