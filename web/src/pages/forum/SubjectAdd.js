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
    const { user, setDialog } = useContext(MainContext);

    const handleAddSubjectClick = () => {
        if(subject.length < 10){
            setSubjectError( {
                error:true,
                helperText: 'Le sujet est trop court'
            });
            return;
        }
        
        let forum = searchForumByID(current.selected.forum_section_id, data);
                
        let newSubject = {
            "forum_subject_id": Math.random(),
            "name": subject,
            "created": new Date().toISOString().slice(0, 19).replace('T', ' '),
            "creator_id" : user.id,
            "creator" : user
        };

        forum && ( !forum.subjects ? forum.subjects = Array(newSubject) : forum.subjects.unshift(newSubject));

        setData(JSON.parse(JSON.stringify(data)));
        setDialog( { subject_created : {
            is_open: true
        }});
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