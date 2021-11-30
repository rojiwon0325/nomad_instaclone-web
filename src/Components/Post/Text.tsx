import { User } from "../pure";
import styled from "styled-components";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { useRecoilValue } from "recoil";
import { getMyAccount } from "State/recoilState";
import { useMutation } from "@apollo/client";
import { deleteComment } from "Interfaces/Igql/deleteComment";
import { DELETECOMMENT_MUTATION } from "State/Query/post";


const More: React.FC = () => {
    const handler = {
        onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.currentTarget.parentElement?.firstElementChild?.setAttribute("style", 'width: 80%; white-space: pre-line');
            e.currentTarget.remove();
        }
    };
    return <Btn {...handler}>더 보기</Btn>;
};

const Text: React.FC<{ user: string, text: string[], id?: number }> = ({ user, text, id }) => {
    const [over, setOver] = useState(false);
    const account = useRecoilValue(getMyAccount);
    const [deleteComment] = useMutation<deleteComment>(DELETECOMMENT_MUTATION, {
        variables: { id },
        update: (cache, result) => {
            if (result.data?.deleteComment.ok) {
                cache.evict({ id: `Comment:${id}` });
            }
        },
    });

    return (
        <TextWrap>
            <Content ref={(ref) => {
                if (ref && ref.offsetWidth < ref.scrollWidth) {
                    setOver(true);
                }
            }}>
                <User to={`/user/${user}`}>{user}</User>
                &nbsp;
                {text.join('\n')}
            </Content>
            {over ? <More /> : null}
            {account === user && id ?
                <Setting onClick={() => { deleteComment() }}>
                    <FontAwesomeIcon icon={faEllipsisH} />
                </Setting>
                : null}
        </TextWrap>
    );
};

const TextWrap = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    position: relative;
    &:hover{
        button{
            opacity: 1;
        }
    }
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

const Setting = styled.button`
    position: absolute;
    width: 18px;
    height: 18px;
    margin-bottom: 6px;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
`;

export default Text;
