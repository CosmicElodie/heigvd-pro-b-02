import React, { Fragment, useState } from 'react';
import { Typography, Link } from '@material-ui/core';
import TopicView from './TopicView';
import ForumList from './ForumList';
import "../../css/icons.css";


import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Route } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';

const breadcrumbNameMap = {
    '/forum': 'Forum'
  };

const Forum = (  ) => {
    const forums = data;
    
    const [topics, setTopic] = useState(forums);

    const [path, setPath] = useState({
        visit_forum:0,
        visit_subject:-1
    });

    const LinkRouter = props => <Link {...props} component={RouterLink} />;

    return (
        <Fragment>
            <Typography variant="h5" component="h5" gutterBottom> Forum </Typography>
            <Route>
                <Breadcrumbs aria-label="breadcrumb">
                    <LinkRouter color="primary" to="/forum">
                        Forums
                    </LinkRouter>
                    {
                        path.visit_forum >= 0 && (
                            <LinkRouter color="primary" to={'/forum/' + path.visit_forum } >
                                { topics[path.visit_forum].name }
                            </LinkRouter>
                        )  
                    } {                  
                        path.visit_subject >= 0 && (
                            <LinkRouter color="primary" to={'/forum/' + path.visit_forum + '/' + path.visit_subject }>
                                { topics[path.visit_forum].subjects[path.visit_subject].name }
                            </LinkRouter>
                        )                              
                    }
                </Breadcrumbs>
                <ForumList forums={forums} />
            </Route>
            <TopicView />
        </Fragment>
    )

}

const data = [
    {
        "id": 1,
        "name": "Lorem ipsum dolor sit amet",
        "description": "In hac habitasse platea dictumst. Sed sollicitudin bibendum nisi, eu porttitor nulla convallis sed. Proin finibus dignissim leo, at varius erat eleifend et. Suspendisse velit dui, commodo eget hendrerit faucibus, rhoncus in dui. Nullam suscipit nec mi eget maximus. Quisque id lorem quam. Sed ultrices facilisis convallis. Nam cursus fringilla est, non faucibus justo porta sit amet. Duis molestie ut tortor id ornare. Curabitur non ante vitae ligula dapibus semper.",
        "created": "2020-03-16 18:52:45",
        "creator_id" : 1,
        "creator": {
            "id": 1,
            "username": "Ovich",
            "firstname": "Stefan",
            "lastname": "Teofanovic",
            "initials" : "ST",
            "email": "stefan.teofanovic@heig-vd.com"
        },
        "subjects" : [
            {
                "id": 1,
                "name": "Aenean vel neque egestas.",
                "created": "2020-03-16 18:52:45",
                "creator_id" : 1,
                "creator" : {
                    "id": 1,
                    "username": "Ovich",
                    "firstname": "Stefan",
                    "lastname": "Teofanovic",
                    "email": "stefan.teofanovic@heig-vd.com"
                },
                "posts" : [
                    {
                        "id": 1,
                        "message": 1,
                        "created": "2020-03-15 15:52:45",
                        "last_update": "2020-03-15 16:52:45"
                    }
                ]
            },{
                "id": 2,
                "name": "Nam finibus semper ipsum vitae mattis. In tempor ligula et imperdiet posuere.",
                "created": "2020-03-15 15:52:45",
                "creator_id" : 1,
                "creator" : {
                    "id": 1,
                    "username": "Ovich",
                    "firstname": "Stefan",
                    "lastname": "Teofanovic",
                    "email": "stefan.teofanovic@heig-vd.com"
                }
            }
        ]
        }

];


export default Forum;