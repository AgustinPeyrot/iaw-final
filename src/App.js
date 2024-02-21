import React from 'react';
import styled from 'styled-components';

import NavbarComponent from './components/Navbar';
import SidebarComponent from './components/Sidebar';
import CardComponent from './components/TaskCard'

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
  return (
    <AppContainer className="App">
      <NavbarComponent />
      <div className="split-screen">
        <SidebarComponent />
        <MainContentArea>
          <CardComponent />
        </MainContentArea>
      </div>
    </AppContainer>
  );
}

export default App;
