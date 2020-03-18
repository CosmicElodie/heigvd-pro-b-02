import React from 'react';
import TopicPost from './TopicPost';
import { useParams, useLocation } from 'react-router-dom'

const TopicView = ( props ) => {
    let { forumid } = useParams();
    let location = useLocation();
    console.log(forumid);
    console.log(location);
    return (
        <section className="topic-view">
            { forumid } <TopicPost />
        </section>
    )

}


export default TopicView;