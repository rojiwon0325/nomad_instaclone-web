import { User } from "../pure";
import styled from "styled-components";
import { useState } from "react";


const More: React.FC = () => {
    const handler = {
        onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.currentTarget.parentElement?.firstElementChild?.setAttribute("style", 'width: 80%; white-space: pre-line');
            e.currentTarget.remove();
        }
    };
    return <Btn {...handler}>더 보기</Btn>;
};

const Text: React.FC<{ user: string, text: string }> = ({ user, text }) => {
    const [over, setOver] = useState(false);

    return (
        <TextWrap>
            <Content ref={(ref) => {
                if (ref && ref.offsetWidth < ref.scrollWidth) {
                    setOver(true);
                }
            }}>
                <User to={`/${user}`}>{user}</User>
                {" " + text}
            </Content>
            {over ? <More /> : null}
        </TextWrap>
    );
};

const TextWrap = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
`;

const Content = styled.div`
    flex: 0 0 flex;
    align-items: stretch;
    align-content: stretch;
    justify-content: flex-start;
    line-height: 18px;
    margin-bottom: 4px;
    width: 60%;
    overflow: hidden;
    white-space: nowrap;
    word-break: keep-all;
    text-overflow: ellipsis;
    page-break-inside: avoid;
`;

const Btn = styled.button`
    width: 50px;
    background-color: transparent;
    line-height: 18px;
    margin-bottom: 4px;
    color: ${({ theme }) => theme.subtext};
    @media only screen and (max-width:735px){
        padding-right: 0;
    };
`;

export default Text;