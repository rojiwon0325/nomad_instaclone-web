import React, { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import { removeCookie } from 'State/cookie';
import { getMyAccount, MyAccount } from 'State/recoilState';
import styled from 'styled-components';
import Header from './Header';
import Title from './Title';

const LoginLayout: React.FC = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [account, setAccount] = useRecoilState(MyAccount);
    const getAccount = useRecoilValue(getMyAccount);

    useEffect(() => {
        if (getAccount) {
            if (pathname.includes('account')) {
                navigate("/");
            }
        } else if (account) {
            removeCookie('jwt');
            setAccount(null);
            if (!pathname.includes('account')) {
                navigate("/account");
            }
        } else {
            if (!pathname.includes('account')) {
                navigate("/account");
            }
        }
    }, [navigate, pathname, account, setAccount, getAccount]);

    return (
        <>
            {pathname.includes('account') ? null
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
    background-color: ${({ theme }) => theme.background};
    position: relative;
`;

export default LoginLayout;