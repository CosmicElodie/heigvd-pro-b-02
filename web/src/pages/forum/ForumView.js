import React, { useContext, useEffect } from 'react';
import { ForumContext } from '../../context/ForumContext';
import { useLocation } from "react-router-dom";
import ForumList from './ForumList';
import ForumDetails from './ForumDetails';
import SubjectList from './SubjectList';
import { findCurrentPathForum } from './Utility';

const ForumView = () => {

    const location = useLocation(); 
    const { data, current, setCurrent } = useContext(ForumContext);


    useEffect(() => {
        // ForumView gère le FormContext par rapport au chemin url
        // Permet une navigation multi-niveau dans la hierarchie récursive (parent / enfants) des forums
            let forum = findCurrentPathForum(location, data);
            if(forum === null){
                // Répertoire racine /forums
            !current.rendered && 
                setCurrent((latest) => ({ 
                        ...latest,
                        selected : null,
                        rendered : true,
                        forums : data 
                }));
            }else{
                // Navigation dans un forum

                !current.rendered &&
                setCurrent((latest) => ({
                    ...latest,
                    selected: forum,
                    rendered : true,
                    forums: forum.forums
                }));
            }
        return () => {
            // On unmount
            current.rendered && 
            setCurrent((latest) => ({ 
                    ...latest,
                    rendered : false
            }));
        }
    }, [setCurrent, current, location, data]);

    return (
        <section className="forum">
            <ForumDetails { ...current } />
            <ForumList />
            <SubjectList />
        </section>
    )
}


/*  data browsing helpers */ 

export default ForumView;