import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { User } from "../pure";
import Avatar from "Components/Avatar";
import styled from "styled-components";
import { Item } from "./PostPure";


const PostHeader: React.FC<{ imgPath: string, user: string }> = ({ imgPath, user }) => {

    return (
        <Header>
            <header>
                <Avatar imgPath={imgPath} userId={user} size={32} />
                <div style={{ paddingLeft: 14 }} />
                <User to={`/${user}`}>
                    {user}
                </User>
            </header>
            <Setting>
                <button>
                    <FontAwesomeIcon icon={faEllipsisH} />
                </button>
            </Setting>
        </Header>
    );
};

const Header = styled(Item)`
    width: 100%;
    border-bottom: 1px solid ${({ theme }) => theme.border};
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    align-content: stretch;
    header{
        display: flex;
        align-items: center;
        flex: 1 1;
        width: calc(100% - 48px);
        padding: 14px 4px 14px 16px;
        position: relative;
        background-color: ${({ theme }) => theme.bar};
    }
`;
const Setting = styled.div`
    display: flex;
    align-items: stretch;
    flex-direction: column;
    justify-content: center;
    padding-right: 8px;
    flex-shrink: 0;
    button{
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: transparent;
        border: none;
        cursor: pointer;
        padding: 8px;
        width: 40px;
        height: 40px;
        background-color: transparent;
    }
`;

export default PostHeader;