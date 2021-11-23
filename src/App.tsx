import React from 'react';
import { Route, Routes } from 'react-router';
import { createGlobalStyle, ThemeProvider } from 'styled-components';


function App() {
  return (
    <ThemeProvider theme={null}>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={null}>

        </Route>
      </Routes>
    </ThemeProvider>

  );
}

const GlobalStyle = createGlobalStyle``;

export default App as React.FC;
