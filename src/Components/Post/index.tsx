import React from "react";
import styled from "styled-components";
import PostHeader from "./Header";
import Photos from "./Photos";
import { Item } from "./PostPure";
import Buttons from "./Buttons";
import Text from "./Text";

const Post: React.FC = () => {
    const info = [{
        user: "welovecreativeteam",
        text: `내 손으로 직접 만드는 피자.
        우주인 피자키트 어벤져스 에디션
        
        혼자만의 시간, 가족과의 시간을 보낼 때,
        그리고 캠핑 갈 때도 좋습니다.`
    }, {
        user: "welovecreativeteam",
        text: `내 손으로 직접`
    }];
    return (
        <Container>
            <PostHeader user="welovecreativeteam" imgPath="test.jpg" />
            <Photos photos={["test.jpg", "test.jpg", "test.jpg", "test.jpg"]} />
            <Bottom>
                <Buttons postId={1} />
                <LikeWrap>
                    <button>
                        좋아요 {10}개
                    </button>
                </LikeWrap>
                <TextInfo>
                    {info.map(({ user, text }, idx) => <Text user={user} text={text} key={user + idx} />)}
                </TextInfo>
                <CreatedAt>
                    <time>21시간전</time>
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