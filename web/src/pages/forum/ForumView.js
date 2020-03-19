import React, { useContext, useEffect } from 'react';
import { ForumContext } from '../../context/ForumContext';
import { useLocation } from "react-router-dom";
import ForumList from './ForumList';

const ForumView = () => {

    const location = useLocation(); 
    const { data, display, setDisplay } = useContext(ForumContext);

    useEffect(() => {
        // ForumView gère le FormContext par rapport au chemin url
        // Permet une navigation multi-niveau dans la hierarchie récursive (parent / enfants) des forums
        let forum = findCurrentPathForum(location, data);
        
        if(forum === null){
            // Répertoire racine /forums
           !display.rendered && 
            setDisplay((latest) => ({ 
                    ...latest,
                    selected : null,
                    rendered : true,
                    forums : data 
            }));
        }else{
            // Navigation dans un forum
            !display.rendered && 
            setDisplay((latest) => ({
                ...latest,
                selected: forum,
                rendered : true,
                forums: forum.forums
            }));
        }

        return () => {
            // On unmount
            display.rendered && 
            setDisplay((latest) => ({ 
                    ...latest,
                    rendered : false
            }));
        }
    }, [setDisplay, display, location]);

    return (
        <ForumList />
    )
}

/*  data browsing helpers */ 

const findIndexByName = (what, list) => {
    for (var i = 0; i < list.length; i++){
        if(list[i].name === what) return i;
    }
    return -1;
};

const findCurrentPathForum = (location, data) => {
    let path = location.pathname.trim("/").split("/");
    let next = data;
    let forum = null;
    if(path.length > 2){
        for (var i = 2; i < path.length; i++){
            let where = findIndexByName(path[i], next);
            if(where >= 0){
                forum = next[where];
                next = next[where].forums;
            }else{
                return [];
            }
        }
    }
    return forum;
}

export default ForumView;