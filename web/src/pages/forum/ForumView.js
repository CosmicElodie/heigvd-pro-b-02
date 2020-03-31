import React, { useContext, useEffect } from 'react';
import { ForumContext } from '../../context/ForumContext';
import { useLocation, useHistory } from "react-router-dom";
import ForumList from './ForumList';
import ForumDetails from './ForumDetails';
import SubjectList from './SubjectList';
import { findCurrentPathForum } from './Utility';

const ForumView = () => {

    const location = useLocation(); 
    const history = useHistory(); 
    const { data, current, setCurrent } = useContext(ForumContext);

    useEffect(() => {
        // ForumView gère le FormContext par rapport au chemin url
        // Permet une navigation multi-niveau dans la hierarchie récursive (parent / enfants) des forums
        
        if(data){
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
                
                // Si le forum est un objet vide (sans attr forum_section_id) on remonte l'url d'un niveau, 
                // il s'agit d'une suppression ou de 404
                if(!forum.hasOwnProperty('forum_section_id')) history.push(location.pathname.split('/').slice(0, -1).join("/"));

                // Navigation dans un forum
                !current.rendered &&
                setCurrent((latest) => ({
                    ...latest,
                    selected: forum,
                    rendered : true,
                    forums: forum.forums
                }));
            }
        }
        return () => {
            // On unmount
            current.rendered && 
            setCurrent((latest) => ({ 
                ...latest,
                rendered : false
            }));
        }
    }, [setCurrent, current, location, data, history]);

    return (
        <section className="forum">
            <ForumDetails { ...current } />
            <ForumList />
            <SubjectList />
        </section>
    )
}

export default ForumView;