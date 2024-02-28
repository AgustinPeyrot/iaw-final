import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

function NavbarComponent() {
  const navbarStyle = {
    backgroundColor: '#3f3557',
    color: 'white',
  };

  return (
    <Navbar style={navbarStyle} fixed="top">
      <Container>
        <Navbar.Brand href="#home">TaskHub</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link style={{ color: 'white' }} href="#home">Tarea Nueva</Nav.Link>
          <Nav.Link style={{ color: 'white' }} href="#features">Registro de tiempo</Nav.Link>
        </Nav>
        <Navbar.Toggle />
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
