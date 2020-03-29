import React, { useContext } from 'react';
import { Button, DialogContentText, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { getForumByID, traverseForums } from './Utility';
import { ForumContext } from '../../context/ForumContext';
import { MainContext } from '../../context/MainContext';

const ForumDelete = ( { is_open, handleClose } ) => {
    /*
        Le parent "SubjectList" est le gérant de l'état du modal SubjectAdd
    */ 
    const { current, data, setData } = useContext(ForumContext);
    const { setDialog } = useContext(MainContext);

    const handleConfirm = () => {
        let { parent, index } = traverseForums('', current.selected.forum_id, data, getForumByID);
        parent && parent.forums && parent.forums.splice(index, 1);
        !parent && data.splice(index, 1); // Est une section root

        setData(JSON.parse(JSON.stringify(data)));
        setDialog( { forum_deleted : {
            is_open: true
        }});
    }
    
    return(
        <Dialog
            open={ is_open }
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            onClose={ handleClose }
        >
            <DialogTitle id="alert-dialog-title">Supprimer le forum?</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Tous les sujets et tous les posts en relation avec ce forum seront supprimés.
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

export default ForumDelete;