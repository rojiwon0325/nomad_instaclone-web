import React, { useEffect } from 'react';
import { useLazyQuery, useQuery } from "@apollo/client";
import { seePost } from "Interfaces/Igql/seePost";
import { SEEPOST_QUERY } from "State/Query/post";
import Post from 'Components/Post';
import styled from 'styled-components';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getMyAccount, MyAccount } from 'State/recoilState';
import { removeCookie } from 'State/cookie';
import { Header, Title } from 'Components';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { pathname } = useLocation();
    const [account, setAccount] = useRecoilState(MyAccount);
    const getAccount = useRecoilValue(getMyAccount);
    const [QueryStartFn, { data }] = useLazyQuery<seePost>(SEEPOST_QUERY);
    const background = state?.background ?? null;
    useEffect(() => {
        if (getAccount) {
            if (pathname.includes('account')) {
                navigate("/");
            }
            if (data === undefined) {
                QueryStartFn();

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
    }, [navigate, pathname, account, setAccount, getAccount, data, QueryStartFn]);

    return (
        <Container>
            {pathname.includes('account') ? null : <Header />}
            <Title />
            {pathname === "/" || background === 'home' ?
                <HomeContainer>
                    {data?.seePost?.map(({ __typename, id, photo, _count, detail }) =>
                        _count && detail
                            ? (<Post key={id} data={{ __typename, id, photo, _count, detail }} />)
                            : null)}
                </HomeContainer> : null
            }
            <Outlet />
        </Container>
    );
};

const Container = styled.main`
    min-width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    order: 4;
    background-color: ${({ theme }) => theme.background};
    position: relative;
`;

const HomeContainer = styled.div`
    flex-grow: 1;
    flex-shrink: 0;
    align-items: stretch;
    max-width: 600px;
    width: 100vw;
    padding-top: 30px;
`;

export default Home;