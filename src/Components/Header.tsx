import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Header: React.FC = () => {
    return (
        <Absolute>
            <HeaderContainer>
                <HeaderContent>
                    Header
                    <Left />
                    <Center />
                    <Right>
                        <Link to="/">
                            <FontAwesomeIcon icon={faHome} size="lg" />
                        </Link>
                    </Right>
                </HeaderContent>
            </HeaderContainer>
        </Absolute>
    );
};

const Absolute = styled.div`
    width: 100vw;
    height: 54px;
    position: absolute;
    top:0;
    order: 0;
`;

const HeaderContainer = styled.div`
    background-color: ${({ theme }) => theme.bar};
    color: ${({ theme }) => theme.text};
    border-bottom: 1px solid ${({ theme }) => theme.border};
    width: 100vw;
    height: 54px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top:0;
    z-index: 100;
`;

const HeaderContent = styled.div`
    max-width: 975px;
    padding: 0 20px;
    height: 54px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const Left = styled.div`
    flex: 1 9999 0%;
`;
const Center = styled.div`
    flex: 0 1 auto;
`;
const Right = styled.div`
    flex: 1 0 0%;
`;

export default Header;