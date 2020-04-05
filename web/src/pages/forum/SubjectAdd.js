import React, { useContext } from 'react';
import { Icon, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { useInput } from '../../hooks/input';
import { searchForumByID } from './Utility';
import { ForumContext } from '../../context/ForumContext';
import { MainContext } from '../../context/MainContext';

const SubjectAdd = ( { is_open, handleClose } ) => {
    /*
        Le parent "SubjectList" est le gérant de l'état du modal SubjectAdd
    */ 
    const { value:subject, bind:bindSubject, setError:setSubjectError } = useInput('');
    const { current, data, setData } = useContext(ForumContext);
    const { setDialog } = useContext(MainContext);

    const handleAddSubjectClick = () => {
        if(subject.length === 0){
            setSubjectError( {
                error:true,
                helperText: 'Le sujet est trop court'
            });
            return;
        }
        
        fetch('http://localhost:8080/forum/insert_subject', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: 'name=' + subject + '&forum_section_id=' + current.selected.forum_section_id 
        })
        .then(response => response.json())
        .then(response => {
            
            if(response.status === 'ok'){
                let forum = searchForumByID(current.selected.forum_section_id, data);
                forum && ( !forum.subjects ? forum.subjects = Array(response.data) : forum.subjects.unshift(response.data));
                setData(JSON.parse(JSON.stringify(data)));
            }
            handleClose();
            setDialog({
                [response.dialog_id]: {
                    is_open: true
                }
            });
        }); 


    }
    
    return(
        <Dialog
            open={ is_open }
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            onClose={ handleClose }
            fullWidth 
            maxWidth = {'sm'}
        >
            <DialogTitle id="alert-dialog-title">{"Ajouter un nouveau sujet"}</DialogTitle>
            <DialogContent>
            
            <TextField
                    multiline
                    fullWidth
                    rows={2}
                    id="filled-required"
                    label="Nouveau Sujet..."
                    defaultValue=""
                    variant="outlined"
                    { ...bindSubject } 
                    />
            </DialogContent>
            <DialogActions>
            
            <Button
                    color="primary"
                    endIcon={<Icon>send</Icon>}
                    onClick={ handleAddSubjectClick }
                >
                    Publier
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default SubjectAdd;