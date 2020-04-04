import React, { useContext } from 'react';
import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core';
import { ForumContext } from '../../context/ForumContext';
import { MainContext } from '../../context/MainContext';
import { traverseSubjects, getPostByID, searchForumByID } from './Utility';

const PostDelete = ( { is_open, forum_post_id, handleCloseDeletePost } ) => {
    /*
        Le parent "SubjectList" est le gérant de l'état du modal SubjectAdd
    */ 
    const { current, data, setData } = useContext(ForumContext);
    const { setDialog } = useContext(MainContext);
  
    const handleConfirm = () => {               
        fetch('http://localhost:8080/forum/delete_post', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: "&forum_post_id=" + forum_post_id
        })
        .then(response => response.json())
        .then(({ status, dialog_id }) => {
            if(status === 'ok'){
                let forum = searchForumByID(current.selected.forum_section_id, data);         
                let { subject, index } = traverseSubjects(forum, forum_post_id, 'forum_post_id', getPostByID);
                subject.posts.splice(index, 1);                
                setData(JSON.parse(JSON.stringify(data)));
            }
            setDialog( { [dialog_id] : {
                is_open: true
            }});
            handleCloseDeletePost();
        });   
        
    }
    
    return(
        <Dialog
            open={ is_open }
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            onClose={ handleCloseDeletePost }
        >
            <DialogTitle id="alert-dialog-title">Supprimer le post?</DialogTitle>
            
            <DialogActions>
            <Button onClick={ handleCloseDeletePost } color="primary">
                Non
            </Button>
            <Button onClick={ handleConfirm } color="primary" autoFocus>
                D'accord
            </Button>
            </DialogActions>
    </Dialog>
    )
}

export default PostDelete;