// src/components/Layout/Header.jsx
import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

const Header = ({ title }) => {
  return (
    <Navbar bg="light" className="shadow-sm mb-3">
      <Container fluid>
        <Navbar.Brand className="fw-bold fs-4">{title}</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
