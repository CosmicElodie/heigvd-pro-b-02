import React, { useContext } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { ForumContext } from '../../context/ForumContext';
import { MainContext } from '../../context/MainContext';
import { getSubjectByID, traverseForums } from './Utility';

const SubjectDelete = ( { is_open, forum_subject_id, handleClose } ) => {
    
    const { data, setData } = useContext(ForumContext);
    const { setDialog } = useContext(MainContext);

    const handleConfirm = () => {
        // L'utilisateur a cliquer sur ok dans le dialog de confirmation

        let { reference, index } = traverseForums('subjects', forum_subject_id, data, getSubjectByID);
        reference.subjects.splice(index, 1);
        
        setData(JSON.parse(JSON.stringify(data)));
        setDialog( { subject_deleted : {
            is_open: true
        }});
        handleClose();
       
    }

    return (
        <Dialog
            open={ is_open }
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            onClose={ handleClose }
        >
            <DialogTitle id="alert-dialog-title">{"Supprimer le sujet?"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Tous les posts en relation avec ce sujet seront supprimés.
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={ handleClose } color="primary">
                Non
            </Button>
            <Button onClick={ handleConfirm } color="primary" autoFocus>
                D'accord
            </Button>
            </DialogActions>
        </Dialog>
    )
}

export default SubjectDelete;