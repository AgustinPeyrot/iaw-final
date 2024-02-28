import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import { createTarea } from '../api/airtable';

import DatePicker from 'react-datepicker';
import es from 'date-fns/locale/es';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Sidebar = styled.div`
  width: 20%;
  background-color: #f78376;
  padding: 80px 20px 20px;
  height: 100vh;
  position: fixed;
  left: 0;
`;

function SidebarComponent() {
  const [startDate, setStartDate] = useState(new Date());
  const [prioridad, setPrioridad] = useState("");
  const [prioridadError, setPrioridadError] = useState(false); // Estado para el error de prioridad

  const handleSubmit = (event) => {
    event.preventDefault();

    const titulo = event.target.elements.titulo.value;
    const descripcion = event.target.elements.descripcion.value;
    const fechaVencimiento = startDate.toISOString().split('T')[0];

    if (!prioridad) {
      setPrioridadError(true); //muestra error sino se selecciona prioridad
      return;
    }

    createTarea(titulo, descripcion, prioridad, fechaVencimiento, 0, "Nueva")
    .then(idTarea => {
      console.log('ID de la tarea creada:', idTarea);
    })
    console.log("Formulario enviado");
  };

  return (
    <Sidebar>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="titulo">Titulo</label>
          <input className="form-control form-control-sm" type="text" placeholder="Escribe un titulo..." id="titulo" />
          <div className="form-group">
            <label htmlFor="descripcion">Descripcion</label>
            <textarea className="form-control" rows="3" placeholder="Descripcion" id="descripcion"></textarea>
          </div>
          <label htmlFor="prioridad">Prioridad</label>
          <select
            className={`form-control form-control-sm ${prioridadError ? 'is-invalid' : ''}`}
            id="prioridad"
            value={prioridad}
            onChange={(e) => {
              setPrioridad(e.target.value);
              setPrioridadError(false);
            }}
          >
            <option value="">Seleccione una prioridad</option>
            <option value="Baja" style={{ backgroundColor: 'green' }}>Baja</option>
            <option value="Media" style={{ backgroundColor: 'yellow' }}>Media</option>
            <option value="Alta" style={{ backgroundColor: 'red' }}>Alta</option>
          </select>
          {prioridadError && <div className="invalid-feedback">Por favor, seleccione una prioridad.</div>}
          <div className="form-group">
            <label htmlFor="fechaVencimiento">Fecha de vencimiento</label><br />
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="form-control"
              id="fechaVencimiento"
              locale={es}
            />
          </div>
          <Button type="submit" variant="primary" style={{ marginTop: '10px' }}>Crear Tarea</Button>
        </form>
      </div>
    </Sidebar>
  );
}

export default SidebarComponent;