import React, { useContext, useEffect, useState } from 'react';
import { Icon, Box, TextField, Button, Menu, MenuItem   } from '@material-ui/core';
import Bubble from '../../layout/Bubble';
import Person from '../../layout/Person';
import PostEdit from './PostEdit';
import PostDelete from './PostDelete';
import { useInput } from '../../hooks/input';
import { ForumContext } from '../../context/ForumContext';
import { MainContext } from '../../context/MainContext';
import { traverseForums, getSubjectByID  } from './Utility';

const SubjectView = ( { forum_subject_id, posts, isOpen } ) => {
    
    const { data, setData, setEffectActive } = useContext(ForumContext);
    const { user, setDialog } = useContext(MainContext);
    const { value:message, bind:bindPost } = useInput('');

    const [anchorEl, setAnchorEl] = useState(null);

    const [post, setPost] = useState({
        forum_post_id: -1
    });

    const [editPost, setEditPost] = useState({
        is_open : false,
    });

    const [deletePost, setDeletePost] = useState({
        is_open : false
    });

    useEffect(() => {
        setTimeout(() => {
            document.querySelector('.main').style.height = 'auto';
        }, 300);
    }, [data]);

    const buttonSendPost = (e) => {
        e.preventDefault();
        
        // previent le scroll back to top au moment de render
        document.querySelector('.main').style.height = document.querySelector('.main').offsetHeight  + 'px';
        setEffectActive( { active : false });
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
            if(status == 'ok'){
                let { reference, index } = traverseForums('subjects', forum_subject_id, data, getSubjectByID);
                if(!reference.subjects[index].posts) reference.subjects[index].posts = [];
                reference.subjects[index].posts.unshift(new_post);
                setData(JSON.parse(JSON.stringify(data)));
            }
            setDialog( { [dialog_id] : {
                is_open: true
            }});
        });        
    }
    
    const handleActionsClick = (event, forum_post_id) => {
        setAnchorEl(event.currentTarget);
        setPost((latest) => ({
            ...latest,
            forum_post_id:forum_post_id
        }));
    };

    const handleActionsClose = () => {
        setAnchorEl(null);
    };
    
    const handleOpenEditPost = ( ) => {
        setEditPost({ is_open: true });
        handleActionsClose();
    }

    const handleCloseEditPost = () => {
        setEditPost({ is_open: false });
    }

    const handleOpenDeletePost = () => {
        setDeletePost({ is_open: true });
        handleActionsClose();
    }

    const handleCloseDeletePost = () => {
        setDeletePost({ is_open: false });
    }

    return (
            <section className={ "view-subject-posts " + ( isOpen ? 'open' : '' )}> 
                <section className="post-new">
                    <TextField
                        fullWidth
                        id="filled-required"
                        label="Nouveau Post..."
                        defaultValue=""
                        variant="standard"
                        { ...bindPost } 
                        />
                        <Box m={1} />
                        <Button
                            variant="contained"
                            color="primary"
                            endIcon={<Icon>send</Icon>}
                            onClick= { buttonSendPost }
                        >
                            Publier
                        </Button>
                </section>    
                <section className="posts-list">{
                    posts && posts.length > 0 && posts.map(({forum_post_id, creator, created, last_update, message}, index) => 
                        <section className="post-item">
                            <section class="line between clickable">
                                <Person user = { creator } />
                                { creator.user_id === user.user_id && <section class="post-actions forum-post-actions" onClick={ (event) => handleActionsClick(event, forum_post_id) }></section> }
                            </section>
                            <Bubble orientation="left" className={ "post-bubble " + ( creator.user_id === user.user_id ? 'mine' : 'not-mine' ) } text={ message } time={ created } updated={ created != last_update }/>
                        </section>
                    ) 
                }
                </section>
                <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleActionsClose}
                >
                    <MenuItem onClick={ handleOpenEditPost }>Update</MenuItem>
                    <MenuItem onClick={ handleOpenDeletePost }>Delete</MenuItem>
                </Menu>
                <PostEdit { ...{ ...editPost, ...post, handleCloseEditPost } } />
                <PostDelete { ...{ ...deletePost, ...post, handleCloseDeletePost } } />
            </section>
    )
}

export default SubjectView;