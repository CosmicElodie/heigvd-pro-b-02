import React, { createContext, useState, useEffect  } from 'react';
import { countPosts } from '../pages/forum/Utility';

export const ForumContext = createContext();
/*
ForumProvider is a data repository intended to contain the states to be shared 
between all Forum the components.
*/
export const ForumProvider = ( props ) => {
    // useState can only handle 1 object
    // it can be a list of objects

    const [ breadcrumbs, setBreadcrumbs ] = useState([]);
    const [ data, setData ] = useState();
    
    const [ current, setCurrent ] = useState({
        selected : null, 
        rendered: false,
        forums : []
    });

    useEffect(() => {
        fetch('http://localhost:8080/forum/all', {
            method: 'GET',
            credentials: 'include' // mandatory for every JSON fetch
        })
        .then(data => data.json())
        .then(data => { 
            countPosts(data);
            setData(data);
            localStorage.removeItem('forum-subjects-open');
        });
    }, [setData, countPosts]);


    const [ effectActive, setEffectActive] = useState({
        active:true
    });

    const [ forumListEffect, setForumListEffect ] = useState({
        from    : { opacity: 0.3, top:'-100vh' },
        to      : { opacity: 1, top:'0vw' }
    });

    const [ forumDetailsEffect, setForumDetailsEffect ] = useState({
        from    : { opacity: 0.5, scale: 0.85 },
        to      : { opacity: 1, scale: 1 }
    });

    const context = {
        breadcrumbs, 
        setBreadcrumbs,
        data,
        setData,
        current,
        setCurrent,
        forumListEffect,
        setForumListEffect,
        forumDetailsEffect,
        setForumDetailsEffect,
        effectActive,
        setEffectActive
    }

    return (
        <ForumContext.Provider value = { { ...context } }>
            { props.children }
        </ForumContext.Provider>
    );

}

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