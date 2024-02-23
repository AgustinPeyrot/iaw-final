import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import NavbarComponent from './components/Navbar';
import SidebarComponent from './components/Sidebar';
import CardComponent from './components/TaskCard';
import { getTareas, deleteTarea } from './routes/airtable';

const AppContainer = styled.div`
  .split-screen {
    display: flex;
    height: 100vh;
  }

  .main-content {
    flex: 1;
    padding: 20px;
    display: flex;
  }
`;

const MainContentArea = styled.div`
  flex: 1;
  padding: 20px;
`;

function App() {
  const [tareas, setTareas] = useState([]);

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
        <SidebarComponent />
        <MainContentArea>
          <CardComponent tareas={tareas} handleResolve={handleResolve} />
        </MainContentArea>
      </div>
    </AppContainer>
  );
}

export default App;
