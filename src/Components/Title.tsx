import React from 'react';
import { Helmet } from 'react-helmet-async';

const Title: React.FC<{ title?: string }> = ({ title: text }) => {
    return (
        <Helmet>
            <title>{text ? `${text} • ` : ""}Instaclone</title>
        </Helmet>
    );
};


export default Title;