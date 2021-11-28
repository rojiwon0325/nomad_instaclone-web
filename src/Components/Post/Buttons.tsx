import { faBookmark, faComment, faHeart, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faHeart as SolidHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled from "styled-components";


const Buttons: React.FC<{ postId: number }> = () => {
    const [isLike, setLike] = useState(false);
    const ClickHeart = () => { setLike(pre => !pre) };
    const ClickComment = () => { console.log("comment") };
    const ClickShare = () => { console.log("share") };
    const ClickBookmark = () => { console.log("bookmark") };
    return (
        <Btns>
            <button onClick={ClickHeart}>
                <FontAwesomeIcon style={{ color: isLike ? "red" : "inherit" }} icon={isLike ? SolidHeart : faHeart} size="lg" />
            </button>
            <button onClick={ClickComment}>
                <FontAwesomeIcon icon={faComment} size="lg" />
            </button>
            <button onClick={ClickShare}>
                <FontAwesomeIcon icon={faPaperPlane} size="lg" />
            </button>
            <button onClick={ClickBookmark}>
                <FontAwesomeIcon icon={faBookmark} size="lg" />
            </button>
        </Btns>
    );
};

const Btns = styled.section`
    display: flex;
    margin-top: 4px;
    padding: 6px 16px 8px 16px;
    height: 54px;
    @media only screen and (max-width:735px){
        padding: 6px 0 8px 0;
    };
    button{
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        padding: 8px;
        width: 40px;
        height: 40px;
        background-color: transparent;
        &:hover{
            opacity: 0.7;
        }
        path{
            color: inherit;
        }
    }
    button:first-child{
        margin-left: -8px;
    }
    button:last-child{
        margin-left: auto;
        margin-right: -10px;
    }
`;

export default Buttons;