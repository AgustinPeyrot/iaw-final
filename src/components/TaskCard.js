import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { getTareas, deleteTarea } from '../routes/airtable';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function TareasCards() {
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    const fetchTareas = async () => {
      try {
        const tareasData = await getTareas();
        setTareas(tareasData);
      } catch (error) {
        console.error('Error al obtener las tareas:', error);
      }
    };

    fetchTareas();
  }, []);

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

  const handleResolve = (id) => {
    deleteTarea(id);
    //filtrar las tareas para que no incluyan la tarea eliminada
    const nuevasTareas = tareas.filter(tarea => tarea.id !== id);
    //actualizar el estado con las tareas restantes
    setTareas(nuevasTareas);
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
