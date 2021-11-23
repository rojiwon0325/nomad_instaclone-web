import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

function Layout() {
    return (
        <Container>
            <Outlet />
        </Container>
    );
};

const Container = styled.div``;

export default Layout as React.FC;