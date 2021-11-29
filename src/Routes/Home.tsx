import React, { useEffect, useState } from 'react';
import { useQuery } from "@apollo/client";
import { seePost, seePost_seePost } from "Interfaces/Igql/seePost";
import { SEEPOST_QUERY } from "State/Query/post";
import Post from 'Components/Post';


const Home: React.FC = () => {
    const [posts, setPosts] = useState<seePost_seePost[]>([]);
    const { data } = useQuery<seePost>(SEEPOST_QUERY, {
        variables: { id: 2 }
    });
    useEffect(() => {
        if (data && data.seePost) {
            setPosts(data.seePost);
        }
    }, [data]);

    return (
        <div style={{
            flexGrow: 1,
            flexShrink: 0,
            alignItems: "stretch",
            maxWidth: 600,
            width: "100vw",
        }}>
            <div style={{ paddingTop: 30 }}>
                {posts.map(({ __typename, id, photo, _count, detail }) =>
                    _count && detail
                        ? (<Post key={id} data={{ __typename, id, photo, _count, detail }} />)
                        : null)}
                {posts.map(({ __typename, id, photo, _count, detail }) =>
                    _count && detail
                        ? (<Post key={id} data={{ __typename, id, photo, _count, detail }} />)
                        : null)}
            </div>
        </div >
    );

};

export default Home;