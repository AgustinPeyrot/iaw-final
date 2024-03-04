import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import { createTarea, getTarea } from '../api/airtable';

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

function SidebarComponent({ agregarTarea }) {
  const [startDate, setStartDate] = useState(new Date());
  const [prioridad, setPrioridad] = useState("");
  const [prioridadError, setPrioridadError] = useState(false); // Estado para el error de prioridad
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!prioridad) {
      setPrioridadError(true); // Muestra error si no se selecciona prioridad
      return;
    }

    try {
      const fechaVencimiento = startDate.toISOString().split('T')[0];
      const idTarea = await createTarea(titulo, descripcion, prioridad, fechaVencimiento, 0, "Nueva");
      const nuevaTarea = await getTarea(idTarea);
      agregarTarea(nuevaTarea);

      // Reiniciar campos después de crear la tarea
      setTitulo("");
      setDescripcion("");
      setPrioridad("");
      setStartDate(new Date());
      setPrioridadError(false);
    } catch (error) {
      console.error('Error al crear o obtener la tarea:', error);
    }
  };

  return (
    <Sidebar>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="titulo">Titulo</label>
          <input
            className="form-control form-control-sm"
            type="text"
            placeholder="Escribe un titulo..."
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
          <div className="form-group">
            <label htmlFor="descripcion">Descripcion</label>
            <textarea
              className="form-control"
              rows="3"
              placeholder="Descripcion"
              id="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            ></textarea>
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
            <option value="Baja" style={{ backgroundColor: '#3CE467' }}>Baja</option>
            <option value="Media" style={{ backgroundColor: '#E4D73C' }}>Media</option>
            <option value="Alta" style={{ backgroundColor: '#DC5656' }}>Alta</option>
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