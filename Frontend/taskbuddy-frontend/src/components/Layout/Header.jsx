import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';

const Header = ({ title, actionButton }) => {
  return (
    <Navbar bg="white" className="border-bottom shadow-sm">
      <Container fluid>
        <Navbar.Brand className="text-dark fw-bold fs-4">
          {title}
        </Navbar.Brand>
        {actionButton && (
          <Button 
            variant={actionButton.variant || 'primary'} 
            onClick={actionButton.onClick}
          >
            {actionButton.text}
          </Button>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;