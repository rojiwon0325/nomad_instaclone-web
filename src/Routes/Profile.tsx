import { useApolloClient, useQuery } from "@apollo/client";
import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar } from "Components";
import { seeFeed } from "Interfaces/Igql/seeFeed";
import { seeProfile } from "Interfaces/Igql/seeProfile";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { SEEPROFILE_QUERY } from "State/Query/account";
import { SEEFEED_QUERY } from "State/Query/post";
import styled from "styled-components";


const Profile: React.FC = () => {
    const { account } = useParams();
    const client = useApolloClient();
    const { data } = useQuery<seeProfile>(SEEPROFILE_QUERY, { variables: { account } });
    const { data: feedData } = useQuery<seeFeed>(SEEFEED_QUERY, { variables: { account } });
    //console.log(data);
    if (data === undefined || data.seeProfile === null) {
        return null;
    }
    const { seeProfile: { avatarUrl, account: user, profile, username } } = data;
    return (
        <Container>
            <Info>
                <AvatarWrap>
                    <Avatar imgPath={avatarUrl} size={150} />
                </AvatarWrap>
                <UserInfo>
                    <InfoRow>
                        <Account>{user}</Account>
                    </InfoRow>
                    {profile?._count ?
                        <CountSection>
                            <Count>게시물 {profile._count.post}</Count>
                            <Count>팔로워 {profile._count.follower}</Count>
                            <Count>필로우 {profile._count.following}</Count>
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
                    <Count>필로우 {profile._count.following}</Count>
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
    flex-direction: row;
    align-items: center;
    margin-bottom: 20px;
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
`;

const Container = styled.div`
    margin: 0;
    flex-grow: 1;
    max-width: 935px;
    width: 100%;
    position: absolute;
    top: 0;
    padding: 30px 0 0;
    @media only screen and (min-width:736px){
        padding: 30px 20px 0;
        box-sizing: content-box;
        width: calc(100% - 40px);
    };
`;

export default Profile;