import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import NavbarComponent from './components/Navbar';
import SidebarComponent from './components/Sidebar';
import CardComponent from './components/TaskCard';
import { getTareas, deleteTarea } from './api/airtable';

const AppContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContentArea = styled.div`
  background-color: #f3b578;
  padding: 80px 20px 20px;
  height: 100vh;
  overflow-y: auto;
  position: absolute;
  down: 0;
  right: 0;
  width: 80%;
`;

function App() {
  const [tareas, setTareas] = useState([]);

  const agregarTarea = (nuevaTarea) => {
    setTareas([...tareas, nuevaTarea]);
  };

  const handleResolve = async (id) => {
    try {
      await deleteTarea(id);
      const nuevasTareas = tareas.filter(tarea => tarea.id !== id);
      setTareas(nuevasTareas);
    } catch (error) {
      console.error('Error al resolver la tarea:', error);
    }
  };

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

  return (
    <AppContainer className="App">
      <NavbarComponent />
      <div className="split-screen">
        <SidebarComponent agregarTarea={agregarTarea}/>
        <MainContentArea>
          <h2>Tareas</h2>
          <CardComponent tareas={tareas} handleResolve={handleResolve} />
        </MainContentArea>
      </div>
    </AppContainer>
  );
}

export default App;
