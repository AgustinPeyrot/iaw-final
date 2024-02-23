import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function TareasCards({ tareas, handleResolve }) {
  const asignarColorPrioridad = (prioridad) => {
    switch (prioridad) {
      case 'Baja':
        return 'success';
      case 'Media':
        return 'warning';
      case 'Alta':
        return 'danger';
      default:
        return 'light';
    }
  };

  return (
    <Container fluid>
      <Row xs={1} md={2} lg={3} xl={4}>
        {tareas.map((tarea, index) => (
          <Col key={tarea.id} className="mb-2">
            <Card
              bg={asignarColorPrioridad(tarea.fields.Prioridad)}
              style={{ width: '18rem' }}
              className="mb-3"
            >
              <Card.Header>{tarea.fields.Nombre}</Card.Header>
              <Card.Body>
                <Card.Text>
                  <strong>Descripción:</strong> {tarea.fields.Descripcion}
                </Card.Text>
                <Card.Text>
                  <strong>Estado:</strong> {tarea.fields.Estado}
                </Card.Text>
                <Card.Text>
                  <strong>Prioridad:</strong> {tarea.fields.Prioridad}
                </Card.Text>
                <Card.Text>
                  <strong>Fecha de Inicio:</strong> {tarea.fields['Fecha-Inicio']}
                </Card.Text>
                <Card.Text>
                  <strong>Fecha de Vencimiento:</strong> {tarea.fields['Fecha-Vencimiento']}
                </Card.Text>
                <Card.Text>
                  <strong>Duración:</strong> {tarea.fields.Duracion} segundos
                </Card.Text>
                <Button variant="primary" onClick={() => handleResolve(tarea.id)}>Resolver</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default TareasCards;
