import { Link } from "react-router-dom";
import styled from "styled-components";

export const Div = styled.div`
    background-color: ${({ theme }) => theme.bar};
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 3px;
    display: flex;
`;

export const Input = styled.input`
    appearance: none;
    background-color: ${({ theme }) => theme.background};
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 3px;
    color: ${({ theme }) => theme.text};
    padding: 3px 12px;
    font-size: 16px;
    line-height: 18px;
    width: 100%;
    height: 100%;
    &::placeholder{
        font-size: 14px;
        color: ${({ theme }) => theme.subtext};
    }
    &:focus{
        border-color: ${({ theme }) => theme.subtext};
    }
`;

export const Button = styled.button`
    background-color: ${({ theme }) => theme.primary};
    border: 1px solid transparent;
    border-radius: 4px;
    position: relative;
    color: white;
    padding: 5px 12px;
    text-align: center;
    text-overflow: ellipsis;
    cursor: pointer;
    line-height: 18px;
    width: 100%;
    &:disabled{
        opacity: 0.4;
        cursor: inherit;
    }
`;

export const LinkButton = styled(Link)`
    color: ${({ theme }) => theme.primary};
    font-weight: bold;
`;

export const User = styled(Link)`
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    &:hover{
        text-decoration: underline;
    }
`;