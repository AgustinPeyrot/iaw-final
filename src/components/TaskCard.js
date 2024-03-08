import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { updateEstadoTarea } from '../api/airtable';

function TareasCards({ tareas, handleResolve }) {
  const asignarColorPrioridad = (prioridad) => {
    switch (prioridad) {
      case 'Baja':
        return '#28B463';
      case 'Media':
        return '#D4AC0D';
      case 'Alta':
        return '#BA4A00';
      default:
        return '#76448A';
    }
  };

  const [editedTareas, setEditedTareas] = useState({});

  const handleEstadoChange = (tareaId, estado) => {
    setEditedTareas({
      ...editedTareas,
      [tareaId]: {
        ...editedTareas[tareaId],
        Estado: estado
      }
    });

    updateEstadoTarea(tareaId, estado)
      .then(() => {
        console.log('Estado de la tarea actualizado correctamente');
      })
      .catch(error => {
        console.error('Error al actualizar el estado de la tarea:', error);
      });
  };

  const cardTextStyle = {
    marginBottom: '5px'
  };

  const cardBodyStyle = {
    padding: '10px'
  };

  const cardStyle = {
    marginBottom: '10px',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    transition: '0.3s',
    borderRadius: '5px',
    border: '1px solid black'
  };

  const cardTitleStyle = {
    fontWeight: 'bold'
  };

  return (
    <Container fluid>
      <Row xs={1} sm={2} md={3} lg={4} xl={4}>
        {tareas.map((tarea, index) => (
          <Col key={tarea.id} className="mb-3">
            <Card style={{ ...cardStyle }} className="mb-3">
              <Card.Header style={{ backgroundColor: asignarColorPrioridad(tarea.fields.Prioridad) }}>
                <span style={cardTitleStyle}>{tarea.fields.Nombre}</span>
              </Card.Header>
              <Card.Body style={cardBodyStyle}>
                <Card.Text style={cardTextStyle}>
                  <strong>Descripción:</strong> {tarea.fields.Descripcion}
                </Card.Text>
                <Card.Text style={cardTextStyle}>
                  <strong>Estado:</strong>{' '}
                  <span style={{ float: 'right' }}>
                    <Form.Control
                      as="select"
                      size="sm"
                      value={editedTareas[tarea.id]?.Estado || tarea.fields.Estado}
                      onChange={(e) => handleEstadoChange(tarea.id, e.target.value)}
                    >
                      <option value="Nueva">Nueva</option>
                      <option value="En curso">En curso</option>
                      <option value="Completada">Completada</option>
                    </Form.Control>
                  </span>
                </Card.Text>
                <Card.Text style={cardTextStyle}>
                  <strong>Prioridad:</strong> {tarea.fields.Prioridad}
                </Card.Text>
                <Card.Text style={cardTextStyle}>
                  <strong>Fecha Inicio:</strong> {tarea.fields['Fecha-Inicio']}
                </Card.Text>
                <Card.Text style={cardTextStyle}>
                  <strong>Fecha Vencimiento:</strong> {tarea.fields['Fecha-Vencimiento']}
                </Card.Text>
                <Button variant="secondary" onClick={() => handleResolve(tarea.id)}>
                  Resolver
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default TareasCards;
