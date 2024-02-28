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

  const cardTextStyle = {
    marginBottom: '5px'
  };

  const cardBodyStyle = {
    padding: '10px'
  };

  const cardStyle = {
    marginBottom: '10px'
  };

  return (
    <Container fluid>
      <Row xs={1} sm={2} md={3} lg={4} xl={4}>
        {tareas.map((tarea, index) => (
          <Col key={tarea.id} className="mb-3">
            <Card
              bg={asignarColorPrioridad(tarea.fields.Prioridad)}
              style={{ ...cardStyle }}
              className="mb-3"
            >
              <Card.Header>{tarea.fields.Nombre}</Card.Header>
              <Card.Body style={cardBodyStyle}>
                <Card.Text style={cardTextStyle}>
                  <strong>Descripción:</strong> {tarea.fields.Descripcion}
                </Card.Text>
                <Card.Text style={cardTextStyle}>
                  <strong>Estado:</strong> {tarea.fields.Estado}
                </Card.Text>
                <Card.Text style={cardTextStyle}>
                  <strong>Prioridad:</strong> {tarea.fields.Prioridad}
                </Card.Text>
                <Card.Text style={cardTextStyle}>
                  <strong>Fecha de Inicio:</strong> {tarea.fields['Fecha-Inicio']}
                </Card.Text>
                <Card.Text style={cardTextStyle}>
                  <strong>Fecha de Vencimiento:</strong> {tarea.fields['Fecha-Vencimiento']}
                </Card.Text>
                <Card.Text style={cardTextStyle}>
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
