import React, { useContext, useEffect, useState } from 'react';
import { Icon, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Box } from '@material-ui/core';
import { useInput } from '../../hooks/input';
import { ForumContext } from '../../context/ForumContext';
import { MainContext } from '../../context/MainContext';
import { traverseSubjects, getPostByID, searchForumByID } from './Utility';

const PostEdit = ( { is_open, forum_post_id , handleCloseEditPost } ) => {
    /*
        Le parent "SubjectList" est le gérant de l'état du modal SubjectAdd
    */ 
    const { value:message, setValue:setMessageValue, bind:bindMessage, setError:setErrorMessage } = useInput('');
    const { current, data, setData } = useContext(ForumContext);
    const { setDialog } = useContext(MainContext); 
    const [ post, setPost ] = useState();

    const handleClose = () => {
        setMessageValue('');
        setPost(null);
        handleCloseEditPost();
    };

    const handleEditPostClick = () => {

        if(message.length == 0){
            setErrorMessage({
                error:true,
                helperText: 'Veuillez écrire un message'
            });
            return;
        }

        fetch('http://localhost:8080/forum/update_post', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: "&forum_post_id=" + forum_post_id + "&message=" + message 
        })
        .then(response => response.json())
        .then(({ status, dialog_id }) => {
            if(status == 'ok'){
                post.message = message;
                post.last_update = new Date().toLocaleString();
                setData(JSON.parse(JSON.stringify(data)));
            }
            setDialog( { [dialog_id] : {
                is_open: true
            }});
            handleClose();
        });   
    };

    useEffect(() => {
        if(is_open && current){
            let forum = searchForumByID(current.selected.forum_section_id, data);         
            let { post } = traverseSubjects(forum, forum_post_id, 'forum_post_id', getPostByID);
            setPost(post);
            setMessageValue(post.message);
        }
    }, [is_open, current]);

    return(
        <Dialog
            open={ Boolean(post) && is_open }
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            onClose={ handleClose }
            fullWidth 
            maxWidth = {'sm'}
        >
            <DialogTitle id="alert-dialog-title">Modifier votre post</DialogTitle>
            <DialogContent>
            
                <TextField
                        fullWidth
                        id="filled-required"
                        label="Votre message..."
                        defaultValue=""
                        variant="outlined"
                        { ...bindMessage } 
                        />
            </DialogContent>
            <DialogActions>
            
            <Button
                    color="primary"
                    endIcon={<Icon>send</Icon>}
                    onClick={ handleEditPostClick }
                >
                    Publier
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default PostEdit;