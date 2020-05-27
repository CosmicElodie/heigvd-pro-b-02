import React, { useContext } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { ForumContext } from '../../context/ForumContext';
import { MainContext } from '../../context/MainContext';
import { getSubjectByID, traverseForums } from './Utility';import {appConfig} from "../../config/appConfig"


const SubjectDelete = ( { is_open, forum_subject_id, handleClose } ) => {
    
    const { data, setData } = useContext(ForumContext);
    const { setDialog } = useContext(MainContext);

    const handleConfirm = () => {
        fetch(appConfig.api_url + 'forum/delete_subject', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: "&forum_subject_id=" + forum_subject_id
        })
        .then(response => response.json())
        .then(({ status, dialog_id }) => {
            if(status === 'ok'){
                let { reference, index } = traverseForums('subjects', forum_subject_id, data, getSubjectByID);
                reference.subjects.splice(index, 1);
                setData(JSON.parse(JSON.stringify(data)));
                handleClose();
            }
            setDialog( { [dialog_id] : {
                is_open: true
            }});
        });  
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