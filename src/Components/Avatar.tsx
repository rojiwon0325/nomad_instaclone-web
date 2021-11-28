import styled from "styled-components";
import React from 'react';
import { Link } from "react-router-dom";

const Avatar: React.FC<{ imgPath: string, userId?: string, size?: number }> = ({ imgPath, size, userId }) => {

    return (
        <Container to={`/${userId ?? ""}`} size={size}>
            <Img src={imgPath} alt="avatar" />
        </Container>
    );
};

const Container = styled(Link) <{ size?: number }>`
    width: ${({ size }) => size ? size + "px" : 50 + "px"};
    height: ${({ size }) => size ? size + "px" : 50 + "px"};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
    flex: none;
    &::after{
        content:'';
        border: 1px solid ${({ theme }) => theme.border};
        border-radius: 50%;
        position: absolute;
        top:0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
    }
`;

const Img = styled.img`
    width: 100%;
    height: 100%;
    touch-action: none;
`;

export default Avatar;