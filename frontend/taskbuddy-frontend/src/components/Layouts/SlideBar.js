// src/components/Layout/Sidebar.js
import { NavLink } from 'react-router-dom';
export default function Sidebar() {
  return (
    <div className="bg-light vh-100 p-3" style={{ width: '250px' }}>
      <h4 className="mb-4">TaskBuddy</h4>
      <nav className="nav flex-column">
        {['dashboard','projects','tasks','team','requests','settings']
          .map(route => (
            <NavLink
              key={route}
              to={`/${route}`}
              className="nav-link"
              activeClassName="active"
            >
              {route.charAt(0).toUpperCase() + route.slice(1)}
            </NavLink>
        ))}
      </nav>
    </div>
  );
}
