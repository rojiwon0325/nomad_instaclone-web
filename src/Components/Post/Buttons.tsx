import { useMutation, ApolloCache } from "@apollo/client";
import { faBookmark, faComment, faHeart, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faHeart as SolidHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { doLike } from "Interfaces/Igql/doLike";
import { doUnLike } from "Interfaces/Igql/doUnLike";
import { seePost_seePost_detail, seePost_seePost__count } from "Interfaces/Igql/seePost";
import { DOLIKE_MUTATION, DOUNLIKE_MUTATION } from "State/Query/post";
import styled from "styled-components";


const Buttons: React.FC<{ postId: number, isLiked: boolean }> = ({ postId, isLiked }) => {
    const updateCache = (cache: ApolloCache<any>, type: boolean | null) =>
        cache.modify({
            id: `Post:${postId}`, fields: {
                _count: (prev: seePost_seePost__count) => ({
                    ...prev,
                    like: type === null ? prev.like : type ? prev.like + 1 : prev.like - 1
                }),
                detail: (prev: seePost_seePost_detail) => ({ ...prev, isLiked: type ?? prev.isLiked }),

            }
        });

    const [doLike, { loading: loadingLike }] = useMutation<doLike>(DOLIKE_MUTATION, {
        variables: { id: postId },
        update: (cache, result) => {
            if (result.data?.doLike.ok || result.data?.doLike.error === "P2002") {
                updateCache(cache, result.data.doLike.type);
            }
        }
    });
    const [doUnLike, { loading: loadingUnLike }] = useMutation<doUnLike>(DOUNLIKE_MUTATION, {
        variables: { id: postId },
        update: (cache, result) => {
            if (result.data?.doUnLike.ok || result.data?.doUnLike.error === "P2025") {
                updateCache(cache, result.data.doUnLike.type);
            }
        }
    });
    const ClickHeart = () => {
        if (loadingLike || loadingUnLike) { return; }
        return isLiked ? doUnLike() : doLike();
    };
    const ClickComment = () => { console.log("comment") };
    const ClickShare = () => { console.log("share") };
    const ClickBookmark = () => { console.log("bookmark") };

    return (
        <Btns>
            <button onClick={ClickHeart}>
                <FontAwesomeIcon style={{ color: isLiked ? "red" : "inherit" }} icon={isLiked ? SolidHeart : faHeart} size="lg" />
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