import React, { useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { Icon, Box, TextField, Button, Menu, MenuItem } from '@material-ui/core';
import Bubble from '../../layout/Bubble';
import Person from '../../layout/Person';
import PostEdit from './PostEdit';
import PostDelete from './PostDelete';
import { useInput } from '../../hooks/input';
import { ForumContext } from '../../context/ForumContext';
import { MainContext } from '../../context/MainContext';
import { traverseForums, getSubjectByID  } from './Utility';

const SubjectView = ( { creator:subject_creator, resolved:subject_resolved, forum_subject_id, posts, isOpen } ) => {
    
    const { data, setData, current }     = useContext(ForumContext);
    const { user, setDialog }           = useContext(MainContext);
    
    const [ action, setAction ]         = useState();
    const [ anchorEl, setAnchorEl ]     = useState(null);
    const [ post, setPost ]             = useState({ forum_post_id: -1 });
    const [ editPost, setEditPost ]     = useState({ is_open : false });
    const [ deletePost, setDeletePost ] = useState({ is_open : false });

    useEffect(() => {
        // previent le scroll back to top au moment de render en gardant la taille précédente du contenu
        document.querySelector('.main').style.height = document.querySelector('.main').offsetHeight  + 'px';
        return ( ) => {    
            document.querySelector('.main').style.height = 'auto';    
        }
    }, [data, setAction]);

    const buttonSendPost = useCallback((e, message) => {
        e.preventDefault();
        
        if(message.length === 0){
            setDialog( { insufficient_post_length : {
                is_open: true
            }});
            return;
        }

        fetch('http://localhost:8080/forum/insert_post', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: "&message=" + message + "&forum_subject_id=" + forum_subject_id 
        })
        .then(response => response.json())
        .then(({ status, dialog_id, data : new_post }) => {
            if(status === 'ok'){
                let { reference, index } = traverseForums('subjects', forum_subject_id, data, getSubjectByID);
                if(!reference.subjects[index].posts) reference.subjects[index].posts = [];
                reference.subjects[index].posts.unshift(new_post);
                setData(JSON.parse(JSON.stringify(data)));
                setAction('add-post');
            }
            setDialog( { [dialog_id] : {
                is_open: true
            }});
        });        
    }, [forum_subject_id, data, setData, setAction, setDialog]);
    
    const handleActionsClick = (event, post, index) => {
        setAnchorEl(event.currentTarget);
        setPost({ ...post, index: index });
    };

    const handleActionsClose = useCallback(() => setAnchorEl(null), [setAnchorEl]);

    const handleOpenEditPost = useCallback(() => {
        setEditPost({ is_open: true });
        handleActionsClose();
    }, [setEditPost, handleActionsClose]);

    const handleOpenDeletePost = useCallback(() => {
        setDeletePost({ is_open: true });
        handleActionsClose();
    }, [setDeletePost, handleActionsClose]);

    const handleCloseEditPost   = useCallback(() => setEditPost({ is_open: false }), [setEditPost]);
    const handleCloseDeletePost = useCallback(() => setDeletePost({ is_open: false }), [setDeletePost]);

    const handleSetAnswer   = useCallback((post) => {
        let { reference, index } = traverseForums('subjects', forum_subject_id, data, getSubjectByID);
        let subjectToResolve = reference.subjects[index];
        let postToEdit = subjectToResolve.posts[post.index];
        subjectToResolve.resolved = 1;
        postToEdit.subject_answer = 1;
        subjectToResolve.posts.splice(post.index, 1);  
        subjectToResolve.posts.unshift(postToEdit);
        setData(JSON.parse(JSON.stringify(data)));
        handleActionsClose();
    });
    
    const handleUnsetAnswer = useCallback((post) => {
        let { reference, index } = traverseForums('subjects', forum_subject_id, data, getSubjectByID);
        let subjectToUnResolve = reference.subjects[index];
        let postToEdit = subjectToUnResolve.posts[post.index];
        subjectToUnResolve.resolved = 0;
        postToEdit.subject_answer = 0;
        subjectToUnResolve.posts.sort((a,b) => { return new Date(b.created) - new Date(a.created) });
        setData(JSON.parse(JSON.stringify(data)));
        handleActionsClose();
    }, [setDeletePost]);

    return useMemo(() => 
        <section className={ "view-subject-posts " + ( isOpen ? 'open' : '' )}> 
            <NewPost buttonSendPost = { buttonSendPost } />
            <section className="posts-list">{
                posts && posts.length > 0 && posts.map((post, index) => 
                    <section className={ "post-item " + ( action === 'add-post' && index === 0 ? 'is_new' : '' ) + ( post.subject_answer ? 'subject-answer' : '' ) }>
                        <section class="line between clickable">
                            <Person user = { post.creator } />
                            {( 
                                    post.creator.user_id === user.user_id || 
                                    user.access_level >= 50 || 
                                    ( user.access_level === 25 && user.house.house_id === current.selected.house_id )
                             ) && <section class="post-actions forum-post-actions" onClick={ (event) => handleActionsClick(event, post, index) }></section> }
                        </section>
                        <section className="subject-answer-icon">Meilleure Réponse</section>
                        <Bubble orientation="left" className={ "post-bubble " + ( post.creator.user_id === user.user_id ? 'mine' : 'not-mine' ) } text={ post.message } time={ post.created } updated={ post.created !== post.last_update }/>
                    </section>
                ) 
            }
            </section>
            { post && post.creator && <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleActionsClose}
                >
                    { current.selected.help_section !== 0 && subject_creator.user_id === user.user_id && post.subject_answer === 0 && !subject_resolved
                    && <MenuItem onClick={ () => handleSetAnswer(post) }>Définir comme réponse</MenuItem> }
                    { current.selected.help_section !== 0 && subject_creator.user_id === user.user_id && post.subject_answer !== 0
                    && <MenuItem onClick={ () => handleUnsetAnswer(post) }>Supprimer le status de réponse</MenuItem> }
                { (
                    post.creator.user_id === user.user_id ||
                    user.access_level >= 75
                )
                && <MenuItem onClick={ handleOpenEditPost }>Modifier</MenuItem> }
                
                <MenuItem onClick={ handleOpenDeletePost }>Supprimer</MenuItem>
            </Menu> }
            <PostEdit { ...{ ...editPost, ...post, handleCloseEditPost } } />
            <PostDelete { ...{ ...deletePost, ...post, handleCloseDeletePost } } />
        </section>, [ 
            posts, 
            editPost, 
            deletePost, 
            anchorEl, 
            action, 
            buttonSendPost, 
            handleOpenDeletePost, 
            handleOpenEditPost, 
            handleActionsClose, 
            handleCloseDeletePost,
            handleCloseEditPost,
            isOpen, 
            post, 
            user,
            current.selected.house_id
        ])
}

const NewPost = ({ buttonSendPost }) => {
    const { value:message, bind:bindPost } = useInput('');
    return (
        <section className="post-new">
            <TextField fullWidth id="filled-required" label="Nouveau Post..." defaultValue="" variant="standard" { ...bindPost } />
                <Box m={1} />
                <Button variant="contained" color="primary" endIcon={<Icon>send</Icon>} onClick= { (event) => buttonSendPost(event, message) } >
                    Publier
                </Button>
        </section>  
    )
}

export default SubjectView;