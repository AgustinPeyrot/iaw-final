import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function NavbarComponent() {
  return (
    <Navbar className="bg-body-tertiary">
      <Container>
      <Navbar.Brand href="#home">TaskHub</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Tarea Nueva</Nav.Link>
          <Nav.Link href="#features">Registro de tiempo</Nav.Link>
        </Nav>
        <Navbar.Toggle />
        {/* 
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="#login">Agus Pey</a>
          </Navbar.Text>
        </Navbar.Collapse>
        */}
      </Container>
    </Navbar>
  );
  //<Outlet/>
}

export default NavbarComponent;