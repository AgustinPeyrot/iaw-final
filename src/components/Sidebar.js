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
  background-color: #F9C770;
  padding: 80px 20px 20px;
  height: 100vh;
  position: fixed;
  left: 0;
`;

const Label = styled.label`
  font-size: 20px;
  font-weight: bold;
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
          <Label htmlFor="titulo">Titulo</Label>
          <input
            className="form-control form-control-sm"
            type="text"
            placeholder="Escribe un titulo..."
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
          <div className="form-group">
            <Label htmlFor="descripcion">Descripcion</Label>
            <textarea
              className="form-control"
              rows="3"
              placeholder="Descripcion"
              id="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            ></textarea>
          </div>
          <Label htmlFor="prioridad">Prioridad</Label>
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
            <option value="Baja" style={{ backgroundColor: '#28B463' }}>Baja</option>
            <option value="Media" style={{ backgroundColor: '#D4AC0D' }}>Media</option>
            <option value="Alta" style={{ backgroundColor: '#BA4A00' }}>Alta</option>
          </select>
          {prioridadError && <div className="invalid-feedback">Por favor, seleccione una prioridad.</div>}
          <div className="form-group">
            <Label htmlFor="fechaVencimiento">Fecha de vencimiento</Label><br />
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="form-control"
              id="fechaVencimiento"
              locale={es}
            />
          </div>
          <Button type="submit" variant="light" style={{ marginTop: '10px' }}>Crear Tarea</Button>
        </form>
      </div>
    </Sidebar>
  );
}

export default SidebarComponent;