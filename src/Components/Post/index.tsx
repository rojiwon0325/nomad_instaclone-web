import React from "react";
import styled from "styled-components";
import PostHeader from "./Header";
import Photos from "./Photos";
import { Item } from "./PostPure";
import Buttons from "./Buttons";
import Text from "./Text";
import { seePost_seePost, seePost_seePost_detail, seePost_seePost__count } from "Interfaces/Igql/seePost";

interface IPost extends seePost_seePost {
    _count: seePost_seePost__count;
    detail: seePost_seePost_detail;
}

const Post: React.FC<{ data: IPost }> = ({ data: { id, photo, _count, detail } }) => {
    const date = new Date(Number(detail.createdAt)).toLocaleDateString("ko");
    return (
        <Container>
            <PostHeader user={detail.account} imgPath="test.jpg" />
            <Photos photos={photo} />
            <Bottom>
                <Buttons postId={id} isLiked={detail.isLiked} />
                <LikeWrap>
                    <button>
                        좋아요 {_count.like}개
                    </button>
                </LikeWrap>
                <TextInfo>
                    <Text user={detail.account} text={detail.caption} key={id + "caption"} />
                </TextInfo>
                <CreatedAt>
                    <time dateTime={date}>{date}</time>
                </CreatedAt>
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

const Container = styled.article`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    align-content: stretch;
    justify-content: center;
    flex: 0 0 auto;
    margin: 0;
    padding: 0;
    border: 0 solid ${({ theme }) => theme.border};
    min-width: 335px;
    @media only screen and (max-width:735px){
        margin-bottom: 15px;
    };
    @media only screen and (min-width:640px){
        margin: 0 -1px;
        margin-bottom: 24px;
        border: 1px solid ${({ theme }) => theme.border};
        border-radius: 3px;
    };
`;

export default Post;