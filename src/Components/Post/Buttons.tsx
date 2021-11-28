import { useMutation, gql, ApolloCache } from "@apollo/client";
import { faBookmark, faComment, faHeart, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faHeart as SolidHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { doLike } from "Interfaces/Igql/doLike";
import { doUnLike } from "Interfaces/Igql/doUnike";
import { DOLIKE_MUTATION, DOUNLIKE_MUTATION } from "State/query";
import styled from "styled-components";


const Buttons: React.FC<{ postId: number, isLiked: boolean }> = ({ postId, isLiked }) => {
    const updateFragment = (cache: ApolloCache<any>) => {
        const id = `Post:${postId}`;
        const fragment = gql`
            fragment BSName on Post{
                _count {
                    like
                },
                detail {
                    isLiked
                }
            }
        `;
        cache.updateFragment({ id, fragment }, (data: { _count: { like: number }, detail: { isLiked: boolean } } | null) => {
            if (data) {
                const { _count: { like }, detail: { isLiked } } = data;
                return { _count: { like: isLiked ? like - 1 : like + 1 }, detail: { isLiked: !isLiked } }
            }
            return null;
        });
    };
    const [doLike, { loading: loadingLike }] = useMutation<doLike>(DOLIKE_MUTATION, {
        variables: { id: postId },
        update: (cache, result) => {
            if (result.data?.doLike.ok) {
                updateFragment(cache);
            }
        }
    });
    const [doUnLike, { loading: loadingUnLike }] = useMutation<doUnLike>(DOUNLIKE_MUTATION, {
        variables: { id: postId },
        update: (cache, result) => {
            if (result.data?.doUnLike.ok) {
                updateFragment(cache);
            }
        }
    });
    const ClickHeart = () => {
        if (loadingLike || loadingUnLike) {
            return;
        }
        if (isLiked) {
            doUnLike();
        } else {
            doLike();
        }
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