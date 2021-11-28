import Post from 'Components/Post';
import React from 'react';

const Home: React.FC = () => {
    return (
        <div style={{
            flexGrow: 1,
            flexShrink: 0,
            alignItems: "stretch",
            maxWidth: 600,
            width: "100vw",
        }}>
            <div style={{ paddingTop: 30 }}>
                <Post />
                <Post />
                <Post />
            </div>
        </div >
    );

};

export default Home;