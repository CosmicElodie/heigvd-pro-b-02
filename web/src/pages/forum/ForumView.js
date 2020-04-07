import React, { useContext, useEffect, useMemo } from 'react';
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
                setCurrent((latest) => ({ 
                    ...latest,
                    selected : null,
                    forums : data 
                }));
            }else{
                
                // Si le forum est un objet vide (sans attr forum_section_id) on remonte l'url d'un niveau, 
                // il s'agit d'une suppression ou de 404
                if(!forum.hasOwnProperty('forum_section_id')) history.push(location.pathname.split('/').slice(0, -1).join("/"));

                // Navigation dans un forum
                
                setCurrent((latest) => ({
                    ...latest,
                    selected: forum,
                    forums: forum.forums
                }));
            }
        }
       
    }, [setCurrent, location, data, history]);

    return useMemo(() => 
        <section className="forum">
            <ForumDetails { ...current } />
            <ForumList />
            <SubjectList />
        </section>
    , [current])
}

export default ForumView;