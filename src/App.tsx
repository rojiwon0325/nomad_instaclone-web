import { ApolloProvider } from '@apollo/client';
import React from 'react';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import Provider from 'Providers';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Layout } from 'Components';
import { Home, Join, Login } from 'Routes';

const App: React.FC = () => (
  <Provider>
    <GlobalStyle />
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="join" element={<Join />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Route>
    </Routes>
  </Provider>
);

const GlobalStyle = createGlobalStyle`
  ${reset}
  html{
    background-color: ${props => props.theme.background};
  }
  input{
    all: unset;
  }
  *{
    box-sizing: border-box;
    font-size: 14px;
    font-family: "Open Sans", sans-serif;
    color: ${props => props.theme.text};
  }
  a{
    -webkit-user-drag: none;
    text-decoration: none;
    color: inherit;
  }
  button, input{
    border: none;
    outline: 0;
    box-sizing: border-box;
    cursor: pointer;
    padding: 0;
    margin: 0;
    background-color: inherit;
  }
  img{
    -webkit-user-drag: none;
    user-select: none;
  }
`;

export default App;
