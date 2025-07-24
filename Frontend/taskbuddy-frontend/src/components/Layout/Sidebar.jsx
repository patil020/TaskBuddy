// src/components/Layout/Sidebar.jsx
import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar bg-dark text-white vh-100 d-flex flex-column justify-content-between" style={{ width: '250px' }}>
      <div>
        <Nav className="flex-column p-3">
          <Nav.Link
            as={Link}
            to="/"
            className={`text-white ${isActive('/') ? 'bg-primary rounded' : ''}`}
          >
            Home
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/projects"
            className={`text-white ${isActive('/projects') ? 'bg-primary rounded' : ''}`}
          >
            Projects
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/tasks"
            className={`text-white ${isActive('/tasks') ? 'bg-primary rounded' : ''}`}
          >
            Tasks
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/invitations"
            className={`text-white ${isActive('/invitations') ? 'bg-primary rounded' : ''}`}
          >
            Invitations
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/search"
            className={`text-white ${isActive('/search') ? 'bg-primary rounded' : ''}`}
          >
            Search Members
          </Nav.Link>
        </Nav>
      </div>

      <div className="p-3 border-top">
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <strong>{user?.firstName} {user?.lastName}</strong>
            <br />
            <small>{user?.email}</small>
          </div>
          <button className="btn btn-outline-light btn-sm" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
