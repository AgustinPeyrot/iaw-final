import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

function NavbarComponent() {
  const navbarStyle = {
    backgroundColor: '#136163',
    color: 'white',
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
  };

  const brandStyle = {
    color: 'white',
    fontSize: '30px',
    fontWeight: 'bold',
  };

  return (
    <Navbar style={navbarStyle} fixed="top">
      <Container style={containerStyle}>
        <Navbar.Brand style={brandStyle}>TaskHub</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
