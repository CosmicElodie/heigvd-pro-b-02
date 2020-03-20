import React, { createContext, useState  } from 'react';

export const ForumContext = createContext();
/*
MainContext is a global data repository intended to contain the states to be shared 
between all the components.
*/
export const ForumProvider = ( props ) => {
    // useState can only handle 1 object
    // it can be a list of objects
    const [ breadcrumbs, setBreadcrumbs ] = useState([]);

    const [ data, setData ] = useState(static_data);
    const [ display, setDisplay ] = useState({
        selected : null, 
        rendered: false,
        forums : []
    });

    let context = {
        breadcrumbs, 
        setBreadcrumbs,
        data,
        setData,
        display,
        setDisplay
    }

    return (
        <ForumContext.Provider value = { { ...context } }>
            { props.children }
        </ForumContext.Provider>
    );

}


const static_data = [
    {
        "forum_id": 1,
        "name": "1Lorem ipsum dolor sit amet",
        "description": "In hac habitasse platea dictumst. Sed sollicitudin bibendum nisi, eu porttitor nulla convallis sed. Proin finibus dignissim leo, at varius erat eleifend et. Suspendisse velit dui, commodo eget hendrerit faucibus, rhoncus in dui. Nullam suscipit nec mi eget maximus. Quisque id lorem quam. Sed ultrices facilisis convallis. Nam cursus fringilla est, non faucibus justo porta sit amet. Duis molestie ut tortor id ornare. Curabitur non ante vitae ligula dapibus semper.",
        "forums" : [{
            "forum_id": 2,
            "name": "2Lorem ipsum dolor sit amet",
            "description": "In hac habitasse platea dictumst. Sed sollicitudin bibendum nisi, eu porttitor nulla convallis sed. Proin finibus dignissim leo, at varius erat eleifend et. Suspendisse velit dui, commodo eget hendrerit faucibus, rhoncus in dui. Nullam suscipit nec mi eget maximus. Quisque id lorem quam. Sed ultrices facilisis convallis. Nam cursus fringilla est, non faucibus justo porta sit amet. Duis molestie ut tortor id ornare. Curabitur non ante vitae ligula dapibus semper.",
            
            "forums": [{
                "forum_id": 3,
                "name": "3Lorem ipsum dolor sit amet",
                "description": "In hac habitasse platea dictumst. Sed sollicitudin bibendum nisi, eu porttitor nulla convallis sed. Proin finibus dignissim leo, at varius erat eleifend et. Suspendisse velit dui, commodo eget hendrerit faucibus, rhoncus in dui. Nullam suscipit nec mi eget maximus. Quisque id lorem quam. Sed ultrices facilisis convallis. Nam cursus fringilla est, non faucibus justo porta sit amet. Duis molestie ut tortor id ornare. Curabitur non ante vitae ligula dapibus semper.",
                
                "forums" : [{
                    "forum_id": 4,
                    "name": "4Lorem ipsum dolor sit amet",
                    "description": "In hac habitasse platea dictumst. Sed sollicitudin bibendum nisi, eu porttitor nulla convallis sed. Proin finibus dignissim leo, at varius erat eleifend et. Suspendisse velit dui, commodo eget hendrerit faucibus, rhoncus in dui. Nullam suscipit nec mi eget maximus. Quisque id lorem quam. Sed ultrices facilisis convallis. Nam cursus fringilla est, non faucibus justo porta sit amet. Duis molestie ut tortor id ornare. Curabitur non ante vitae ligula dapibus semper.",
                    
                    "forums": []
                }],
                "subjects" : [
                    {
                        "subject_id": 1,
                        "name": "5Aenean vel neque egestas.",
                        "created": "2020-03-16 18:52:45",
                        "creator_id" : 1,
                        "creator" : {
                            "user_id": 1,
                            "initials": "ST",
                            "username": "Ovich",
                            "firstname": "Stefan",
                            "lastname": "Teofanovic",
                            "email": "stefan.teofanovic@heig-vd.com"
                        },
                        "posts" : [
                            {
                                "post_id": 1,
                                "message": 1,
                                "created": "2020-03-15 15:52:45",
                                "last_update": "2020-03-15 16:52:45"
                            }
                        ]
                    }
                ]
            },{
                "forum_id": 3,
                "name": "3Lorem ipsum dolor sit amet",
                "description": "In hac habitasse platea dictumst. Sed sollicitudin bibendum nisi, eu porttitor nulla convallis sed. Proin finibus dignissim leo, at varius erat eleifend et. Suspendisse velit dui, commodo eget hendrerit faucibus, rhoncus in dui. Nullam suscipit nec mi eget maximus. Quisque id lorem quam. Sed ultrices facilisis convallis. Nam cursus fringilla est, non faucibus justo porta sit amet. Duis molestie ut tortor id ornare. Curabitur non ante vitae ligula dapibus semper.",
                
                "forums" : [{
                    "forum_id": 4,
                    "name": "4Lorem ipsum dolor sit amet",
                    "description": "In hac habitasse platea dictumst. Sed sollicitudin bibendum nisi, eu porttitor nulla convallis sed. Proin finibus dignissim leo, at varius erat eleifend et. Suspendisse velit dui, commodo eget hendrerit faucibus, rhoncus in dui. Nullam suscipit nec mi eget maximus. Quisque id lorem quam. Sed ultrices facilisis convallis. Nam cursus fringilla est, non faucibus justo porta sit amet. Duis molestie ut tortor id ornare. Curabitur non ante vitae ligula dapibus semper.",
                    
                    "forums": []
                }],
                "subjects" : [
                    {
                        "subject_id": 1,
                        "name": "5Aenean vel neque egestas.",
                        "created": "2020-03-16 18:52:45",
                        "creator_id" : 1,
                        "creator" : {
                            "user_id": 1,
                            "initials": "ST",
                            "username": "Ovich",
                            "firstname": "Stefan",
                            "lastname": "Teofanovic",
                            "email": "stefan.teofanovic@heig-vd.com"
                        },
                        "posts" : [
                            {
                                "post_id": 1,
                                "message": 1,
                                "created": "2020-03-15 15:52:45",
                                "last_update": "2020-03-15 16:52:45"
                            }
                        ]
                    }
                ]
            }]
        }],
        "subjects" : [
            {
                "subject_id": 1,
                "name": "7Aenean vel neque egestas.",
                "created": "2020-03-16 18:52:45",
                "creator_id" : 1,
                "creator" : {
                    "user_id": 1,
                    "username": "Ovich",
                    "firstname": "Stefan",
                    "lastname": "Teofanovic",
                    "email": "stefan.teofanovic@heig-vd.com"
                },
                "posts" : [
                    {
                        "post_id": 1,
                        "message": 1,
                        "created": "2020-03-15 15:52:45",
                        "last_update": "2020-03-15 16:52:45"
                    }
                ]
            }
        ]
    },{
        "forum_id": 5,
        "name": "8Lorem ipsum dolor sit amet",
        "description": "In hac habitasse platea dictumst. Sed sollicitudin bibendum nisi, eu porttitor nulla convallis sed. Proin finibus dignissim leo, at varius erat eleifend et. Suspendisse velit dui, commodo eget hendrerit faucibus, rhoncus in dui. Nullam suscipit nec mi eget maximus. Quisque id lorem quam. Sed ultrices facilisis convallis. Nam cursus fringilla est, non faucibus justo porta sit amet. Duis molestie ut tortor id ornare. Curabitur non ante vitae ligula dapibus semper.",
       
        "forums" : [{
            "forum_id": 6,
            "name": "9Lorem ipsum dolor sit amet",
            "description": "In hac habitasse platea dictumst. Sed sollicitudin bibendum nisi, eu porttitor nulla convallis sed. Proin finibus dignissim leo, at varius erat eleifend et. Suspendisse velit dui, commodo eget hendrerit faucibus, rhoncus in dui. Nullam suscipit nec mi eget maximus. Quisque id lorem quam. Sed ultrices facilisis convallis. Nam cursus fringilla est, non faucibus justo porta sit amet. Duis molestie ut tortor id ornare. Curabitur non ante vitae ligula dapibus semper.",
           
            "forums": []
        }],
        "subjects" : [
            {
                "subject_id": 1,
                "name": "10Aenean vel neque egestas.",
                "created": "2020-03-16 18:52:45",
                "creator_id" : 1,
                "creator" : {
                    "user_id": 1,
                    "username": "Ovich",
                    "firstname": "Stefan",
                    "lastname": "Teofanovic",
                    "email": "stefan.teofanovic@heig-vd.com"
                },
                "posts" : [
                    {
                        "post_id": 1,
                        "message": 1,
                        "created": "2020-03-15 15:52:45",
                        "last_update": "2020-03-15 16:52:45"
                    }
                ]
            }
        ]
    }
    

];


/*

Dialog Object example : 
{
    login_success: {
        is_open: true,
        data : { 
            firstname: "Stefan",
            lastname: "Teofanovic"
        }
    }
}

*/