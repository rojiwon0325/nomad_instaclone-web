import styled from "styled-components";
import { Div } from "./pure";

export const AuthLayout = styled.div`
    max-width: 350px;
    width: 100%;
`;

export const FormWrap = styled(Div)`
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 10px 0;
    margin-bottom: 10px;
    form {
        width: 100%;
        display: flex;
        justify-items: center;
        flex-direction: column;
        align-items: center;
        margin-top: 24px;
        margin-bottom: 10px;
    }
`;

export const LogoWrap = styled.div`
    margin-top: 22px;
    margin-bottom: 12px;
`;

export const InputWrap = styled.div`
    width: 100%;
    padding: 0 40px 6px;
    font-size: 12px;
    color: ${({ theme }) => theme.notification};
`;

export const ButtonWrap = styled.div`
    width: 100%;
    padding: 8px 40px;
    font-size: 12px;
    color: ${({ theme }) => theme.notification};
`;

export const LinkWrap = styled.div`
    margin: 15px;
`;