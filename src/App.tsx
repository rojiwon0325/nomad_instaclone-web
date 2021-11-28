import { Layout } from 'Components';
import React, { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { Home, Join, Login } from 'Routes';
import { isDarkMode } from 'State/recoilState';
import { DarkTheme, LightTheme } from 'State/theme';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import reset from 'styled-reset';


function App() {
  const [isDark, setTheme] = useRecoilState(isDarkMode);

  useEffect(() => {
    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches);
    }

    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener("change", handleChange);

    return window.matchMedia('(prefers-color-scheme: dark)')
      .removeEventListener("change", handleChange);
  }, [setTheme]);

  return (
    <ThemeProvider theme={isDark ? DarkTheme : LightTheme}>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="join" element={<Join />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Route>
      </Routes>
    </ThemeProvider>

  );
}

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

export default App as React.FC;
