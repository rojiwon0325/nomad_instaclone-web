import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PostHeader from "./Header";
import Photos from "./Photos";
import { Item } from "./PostPure";
import Buttons from "./Buttons";
import Text from "./Text";
import { SEECOMMENT_QUERY } from "State/Query/post";
import { useQuery } from "@apollo/client";
import { seeComment, seeComment_seeComment } from "Interfaces/Igql/seeComment";
import CommentInput from "./CommentInput";
import { Feed, Feed__count } from "Interfaces/Igql/Feed";
import { Post_detail } from "Interfaces/Igql/Post_detail";

interface IPost extends Feed {
    _count: Feed__count;
    detail: Post_detail;
}

const Post: React.FC<{ data: IPost, isDetail?: boolean }> = ({ data: { id: postId, photo, _count, detail }, isDetail = false }) => {
    const [comments, setComments] = useState<seeComment_seeComment[]>([]);
    const date = new Date(Number(detail.createdAt)).toLocaleDateString("ko");
    const { data: commentData, refetch } = useQuery<seeComment>(SEECOMMENT_QUERY, {
        variables: { postId, take: isDetail ? 10 : 2 },
    });
    useEffect(() => {
        if (commentData?.seeComment) {
            setComments(isDetail ? commentData.seeComment : commentData.seeComment.slice(0, 2));
        }
        if (isDetail) {
            refetch({ postId, take: 10 });
        }
    }, [commentData, isDetail, refetch, postId]);

    return (
        <Container isDetail={isDetail ?? false}>
            <PostHeader user={detail.account} imgPath={detail.avatarUrl} />
            <Photos photos={photo} />
            <Bottom>
                <Buttons postId={postId} isLiked={detail.isLiked} />
                <LikeWrap>
                    <button>
                        좋아요 {_count.like}개
                    </button>
                </LikeWrap>
                <TextInfo>
                    <Text user={detail.account} text={detail.caption} key={postId + "caption"} />
                    {comments.map(({ account, text, id }) => <Text user={account} text={text} id={id} key={id + "comment"} />)}
                    {detail.comments.map(({ account, text, id }) => <Text user={account} text={text} id={id} key={id + "comment"} />)}
                </TextInfo>
                <CreatedAt>
                    <time dateTime={date}>{date}</time>
                </CreatedAt>
                <CommentInput postId={postId} />
            </Bottom>
        </Container>
    );
};

const Bottom = styled(Item)`
    padding: 0;
    width: 100%;
    pointer-events: auto;
    align-content: stretch;
    justify-content: flex-start;
    @media only screen and (max-width:735px){
        padding: 0 16px;
    };
`;
const LikeWrap = styled.section`
    padding: 6px 16px 8px 16px;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 8px;
    display: flex;
    align-items: stretch;
    justify-content: flex-start;
    @media only screen and (max-width:735px){
        padding: 6px 0 8px 0;
    };
`;

const TextInfo = styled.div`
    min-height: 0;
    overflow: auto;
    flex: 1 1;
    display: flex;
    margin: 0 0 auto;
    margin-bottom: 4px;
    padding: 0 16px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    position: relative;
    @media only screen and (max-width:735px){
        padding: 0;
    };
`;

const CreatedAt = styled.div`
    padding-left: 16px;
    margin-bottom: 16px;
    @media only screen and (max-width:735px){
        padding: 0;
    };
    time{
        font-size: 10px;
        color: ${({ theme }) => theme.subtext};
        line-height: 18px;
        letter-spacing: .2px;
        @media only screen and (max-width:735px){
            line-height: 17px;
        };
    }
`;

const Container = styled.article<{ isDetail: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    align-content: stretch;
    justify-content: center;
    flex: 0 0 auto;
    margin: 0;
    padding: 0;
    border: 0 solid ${({ theme }) => theme.border};
    width: 100%;
    min-width: 335px;
    max-width: 602px;
    @media only screen and (max-width:735px){
        margin-bottom: ${({ isDetail }) => isDetail ? 0 : "15px"};
    };
    @media only screen and (min-width:640px){
        margin: 0 -1px;
        margin-bottom: ${({ isDetail }) => isDetail ? 0 : "24px"};
        border: 1px solid ${({ theme }) => theme.border};
        border-radius: 3px;
    };
`;

export default Post;