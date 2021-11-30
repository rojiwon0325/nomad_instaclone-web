import React, { Suspense, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from "react-router-dom";
import { useRecoilState } from "recoil";
import { isDarkMode } from 'State/recoilState';
import { DarkTheme, LightTheme } from 'State/theme';
import { ApolloProvider } from '@apollo/client';
import { client } from 'State/apollo';
import { CookiesProvider } from 'react-cookie';
import { ThemeProvider } from 'styled-components';


const Provider: React.FC = ({ children }) => {
    const [isDark, setTheme] = useRecoilState(isDarkMode);
    useEffect(() => {
        const handleChange = (e: MediaQueryListEvent) => { setTheme(e.matches); }
        window.matchMedia('(prefers-color-scheme: dark)')
            .addEventListener("change", handleChange);
        return window.matchMedia('(prefers-color-scheme: dark)')
            .removeEventListener("change", handleChange);
    }, [setTheme]);
    return (
        <HelmetProvider>
            <BrowserRouter>
                <ApolloProvider client={client}>
                    <CookiesProvider>
                        <ThemeProvider theme={isDark ? DarkTheme : LightTheme}>
                            <Suspense fallback={<div>suspending...</div>}>
                                {children}
                            </Suspense>
                        </ThemeProvider>
                    </CookiesProvider>
                </ApolloProvider>
            </BrowserRouter>
        </HelmetProvider>
    )
};

export default Provider;