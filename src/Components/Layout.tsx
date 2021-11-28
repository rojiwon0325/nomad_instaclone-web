import useAccount from 'Hooks/useAccount';
import React, { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';
import Title from './Title';

const Layout: React.FC = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const token = useAccount();

    useEffect(() => {
        if (pathname.includes('login') || pathname.includes('join')) {
            if (token) {
                navigate("/");
            }
        } else {
            if (!token) {
                navigate("/login");
            }
        }
    }, [navigate, pathname, token]);

    return (
        <>
            {pathname.includes('login') || pathname.includes('join') ? null
                : <><div style={{ paddingTop: 54 }} /><Header /></>}
            <Container>
                <Title />
                <Outlet />
            </Container>
        </>
    );

};

const Container = styled.main`
    min-width: 100vw;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    order: 4;
`;

export default Layout;