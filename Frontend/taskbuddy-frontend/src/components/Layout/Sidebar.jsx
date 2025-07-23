import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar">
      <Navbar.Brand as={Link} to="/" className="p-3">
        <i className="bi bi-check-circle me-2"></i>
        Task Buddy
      </Navbar.Brand>
      
      <Nav className="flex-column px-3">
        <Nav.Link 
          as={Link} 
          to="/" 
          className={isActive('/') ? 'active bg-white bg-opacity-10 rounded' : ''}
        >
          <i className="bi bi-house me-2"></i>
          Home
        </Nav.Link>
        
        <Nav.Link 
          as={Link} 
          to="/projects" 
          className={isActive('/projects') ? 'active bg-white bg-opacity-10 rounded' : ''}
        >
          <i className="bi bi-folder me-2"></i>
          Projects
        </Nav.Link>
        
        <Nav.Link 
          as={Link} 
          to="/tasks" 
          className={isActive('/tasks') ? 'active bg-white bg-opacity-10 rounded' : ''}
        >
          <i className="bi bi-list-task me-2"></i>
          Tasks
        </Nav.Link>
        
        <Nav.Link 
          as={Link} 
          to="/invitations" 
          className={isActive('/invitations') ? 'active bg-white bg-opacity-10 rounded' : ''}
        >
          <i className="bi bi-envelope me-2"></i>
          Invitations
        </Nav.Link>
        
        <Nav.Link 
          as={Link} 
          to="/search" 
          className={isActive('/search') ? 'active bg-white bg-opacity-10 rounded' : ''}
        >
          <i className="bi bi-search me-2"></i>
          Search
        </Nav.Link>
      </Nav>

      <div className="position-absolute bottom-0 w-100 p-3">
        <div className="dropdown">
          <button 
            className="btn btn-link text-white dropdown-toggle w-100 text-start" 
            type="button" 
            data-bs-toggle="dropdown"
          >
            <i className="bi bi-person-circle me-2"></i>
            {user?.firstName} {user?.lastName}
          </button>
          <ul className="dropdown-menu">
            <li>
              <Link className="dropdown-item" to="/profile">
                <i className="bi bi-person me-2"></i>
                Profile
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/settings">
                <i className="bi bi-gear me-2"></i>
                Settings
              </Link>
            </li>
            <li><hr className="dropdown-divider" /></li>
            <li>
              <button className="dropdown-item" onClick={logout}>
                <i className="bi bi-box-arrow-right me-2"></i>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;