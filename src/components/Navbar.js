import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function NavbarComponent() {
  return (
    <Navbar className="bg-body-tertiary">
      <Container>
      <Navbar.Brand href="#home">DoItHub</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Tareas</Nav.Link>
          <Nav.Link href="#features">Registro de tiempo</Nav.Link>
        </Nav>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="#login">Agus Pey</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
  <Outlet/>
}

export default NavbarComponent;