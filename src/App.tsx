import React from 'react';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import Provider from 'Providers';
import { Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { Home, Join, Login, Profile, Post } from 'Routes';
import { Modal } from 'Components';

const App: React.FC = () => (
  <Provider>
    <GlobalStyle />
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="account" element={<Outlet />}>
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="join" element={<Join />} />
        </Route>
        <Route path=":account" element={<Profile />}>
          <Route path=":postId" element={<Modal><Post /></Modal>} />
        </Route>

        <Route path="post" element={<Outlet />}>
          <Route index element={<Navigate replace to="/" />} />
          <Route path=":postId" element={<Modal><Post /></Modal>} />
        </Route>

        <Route path="*" element={<Navigate replace to="/" />} />
      </Route>
    </Routes >
  </Provider >
);

const GlobalStyle = createGlobalStyle`
  ${reset}
  html{
    background-color: ${props => props.theme.bar};
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
