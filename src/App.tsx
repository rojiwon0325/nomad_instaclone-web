import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { useRecoilState } from 'recoil';
import { Home } from 'Routes';
import { isDarkMode } from 'State/recoilState';
import { DarkTheme, LightTheme } from 'State/theme';
import { createGlobalStyle, ThemeProvider } from 'styled-components';


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
        <Route path="/" element={<Home />}>

        </Route>
      </Routes>
    </ThemeProvider>

  );
}

const GlobalStyle = createGlobalStyle`
  html{
    background-color: ${props => props.theme.background};
  }
  *{
    font-size: 16px;
    color: ${props => props.theme.text}
  }
`;

export default App as React.FC;
