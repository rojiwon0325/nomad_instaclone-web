import { useMutation, useQuery } from "@apollo/client";
import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Default } from "Components";
import { deleteFollowing } from "Interfaces/Igql/deleteFollowing";
import { requestFollow } from "Interfaces/Igql/requestFollow";
import { seeFeed } from "Interfaces/Igql/seeFeed";
import { seeProfile } from "Interfaces/Igql/seeProfile";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { DELETEFOLLOWING_MUTATION, GETME_QUERY, REQUESTFOLLOW_MUTATION, SEEPROFILE_QUERY } from "State/Query/account";
import { SEEFEED_QUERY } from "State/Query/post";
import styled from "styled-components";


const Profile: React.FC = () => {
    const { account } = useParams();
    const { data } = useQuery<seeProfile>(SEEPROFILE_QUERY, { variables: { account } });
    const { data: feedData } = useQuery<seeFeed>(SEEFEED_QUERY, { variables: { account } });
    const refetchQueries = [{ query: SEEPROFILE_QUERY, variables: { account } }, { query: GETME_QUERY }];
    const [follow] = useMutation<requestFollow>(REQUESTFOLLOW_MUTATION, { variables: { account }, refetchQueries });
    const [unfollow] = useMutation<deleteFollowing>(DELETEFOLLOWING_MUTATION, { variables: { account }, refetchQueries });

    const getBtn = (prop: { isMe: boolean | null, isFollowing: boolean | null, isRequesting: boolean | null }) => {
        const { isMe, isFollowing, isRequesting } = prop;
        if (isMe === null || isFollowing === null || isRequesting === null) {
            return null;
        }
        if (isMe) {
            return <Btn>프로필 편집</Btn>;
        } else if (isFollowing) {
            return <Btn onClick={() => unfollow()}>팔로우 취소</Btn>;
        } else if (isRequesting) {
            return <Btn disabled>팔로우 요청중</Btn>;
        } else {
            return <Btn onClick={() => follow()}>팔로우 요청</Btn>;
        }

    };

    if (data === undefined || data.seeProfile === null) {
        return <div>USER NOT FOUND</div>;
    }
    const { seeProfile: { avatarUrl, account: user, profile, username, isFollowing, isMe, isRequesting } } = data;
    return (
        <Container>
            <Info>
                <AvatarWrap>
                    <Avatar imgPath={avatarUrl} size={150} />
                </AvatarWrap>
                <UserInfo>
                    <InfoRow>
                        <Account>{user}</Account>
                        {getBtn({ isMe, isFollowing, isRequesting })}
                    </InfoRow>
                    {profile?._count ?
                        <CountSection>
                            <Count>게시물 {profile._count.post}</Count>
                            <Count>팔로워 {profile._count.follower}</Count>
                            <Count>팔로우 {profile._count.following}</Count>
                        </CountSection>
                        : null}
                    <InfoRow>
                        <TextInfo>
                            <h1 style={{ fontWeight: "bold" }}>{username}</h1>
                            {profile?.bio ? <div>{profile.bio}</div> : null}
                        </TextInfo>
                    </InfoRow>
                </UserInfo>
            </Info>
            {profile?._count ?
                <CountInfo>
                    <Count>게시물 {profile._count.post}</Count>
                    <Count>팔로워 {profile._count.follower}</Count>
                    <Count>팔로우 {profile._count.following}</Count>
                </CountInfo>
                : null}
            <Feed>
                {feedData?.seeFeed ?
                    feedData.seeFeed.map((fed) => (
                        <Photo key={fed.id} img={fed.photo[0] ?? ""} to={`/post/${fed.id}`}>
                            <div style={{ paddingBottom: "100%" }} />
                            <FeedInfo>
                                <Icon>
                                    <FontAwesomeIcon icon={faHeart} />
                                    {fed._count?.like ?? 0}
                                </Icon>
                                <Icon>
                                    <FontAwesomeIcon icon={faComment} />
                                    {(fed._count?.comment ?? 0) + (fed._count?.reComment ?? 0)}
                                </Icon>
                            </FeedInfo>
                        </Photo>
                    ))
                    : null}
            </Feed>
        </Container>
    );
};

const Btn = styled(Default.Button)`
    width: auto;
    margin-left: 20px;
    @media only screen and (max-width:735px){
        margin: 7px 0 0;
        width: 80%;
        min-width: 90px;
    };
`;

const Icon = styled.div`
    font-size: 18px;
    display: flex;
    align-items: center;
    margin: 0 5px;
    svg{
        font-size: 14px;
        margin-right: 5px;
    }
`;

const FeedInfo = styled.div`
    margin: 0;
    padding: 0;
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.5);
    color: white;
    opacity: 0;
    pointer-events: auto;
    &:hover{
        opacity: 1;
    }
`;

const TextInfo = styled.div`
    display: flex;
    flex-direction: column;
    h1, div{
        line-height: 24px;
        color: ${({ theme }) => theme.text};
    }
    @media only screen and (max-width:735px){
        display: none;
    };
`;

const Count = styled.div`
    color: ${({ theme }) => theme.text};
    font-size: 16px;
    margin-right: 40px;
`;

const Account = styled.h1`
    color: ${({ theme }) => theme.text};
    font-size: 28px;
    font-weight: 400;
    line-height: 32px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: -6px;
`;

const CountSection = styled.section`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 20px;
    div:last-child{
        margin-right: 0;
    }
    @media only screen and (max-width:735px){
        display: none;
    };
`;

const CountInfo = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 20px;
    div{
        margin: 0;
    }
    @media only screen and (min-width:736px){
        display: none;
    };
`;

const InfoRow = styled.section`
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
    margin-bottom: 20px;
    @media only screen and (max-width:735px){
        flex-direction: column;
        align-items: flex-start;
        margin-bottom: 5px;
    };
`;


const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    flex: 2;
    section:last-child{
        margin-bottom: 0;
    }
`;

const AvatarWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 30px;
    flex: 1;
    a{
        @media only screen and (max-width:735px){
        width: 77px;
        height: 77px;
    };
    }
    @media only screen and (max-width:735px){
        width: 77px;
        flex: 0;
    };
`;

const Photo = styled(Link) <{ img: string }>`
    background: url(${({ img }) => img});
    background-size: cover;
    position: relative;
`;

const Feed = styled.div`
    display: grid;
    grid-auto-rows: auto;
    grid-template-columns: repeat(3, 1fr);
    gap: 3px;
    @media only screen and (min-width:736px){
        gap: 28px;
    };
`;

const Info = styled.header`
    display: flex;
    flex-direction: row;
    margin-bottom: 44px;
    @media only screen and (max-width:735px){
        margin: 16px 16px 24px;
    };
`;

const Container = styled.div`
    margin: 0;
    flex-grow: 1;
    max-width: 935px;
    width: 100%;
    position: absolute;
    top: 0;
    padding: 0;
    @media only screen and (min-width:736px){
        padding: 30px 20px 0;
        box-sizing: content-box;
        width: calc(100% - 40px);
    };
`;

export default Profile;