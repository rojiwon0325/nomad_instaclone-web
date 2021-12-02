import { useQuery } from '@apollo/client';
import { seePost } from 'Interfaces/Igql/seePost';
import React from 'react';
import { useParams } from 'react-router-dom';
import { SEEPOST_QUERY } from 'State/Query/post';
import PostDetail from 'Components/Post';

const Post: React.FC = () => {
    const { postId } = useParams();

    const { data } = useQuery<seePost>(SEEPOST_QUERY, { variables: { id: Number(postId) }, skip: !postId });

    if (postId && data?.seePost) {
        const { __typename, id, photo, _count, detail } = data.seePost[0];

        if (_count && detail) {
            return <PostDetail key={id} data={{ __typename, id, photo, _count, detail }} isDetail={true} />;
        }
    }
    return null;
};

export default Post;