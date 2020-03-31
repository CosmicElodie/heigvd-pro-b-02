import React, { useContext } from 'react';
import { Icon, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Box } from '@material-ui/core';
import { useInput } from '../../hooks/input';
import { searchForumByID } from './Utility';
import { ForumContext } from '../../context/ForumContext';
import { MainContext } from '../../context/MainContext';

const ForumAdd = ( { is_open, handleClose } ) => {
    /*
        Le parent "SubjectList" est le gérant de l'état du modal SubjectAdd
    */ 
    const { value:name, bind:bindName, setError:setErrorName } = useInput('');
    const { value:description, bind:bindDescription, setError:setErrorDescription } = useInput('');
    const { current, data, setData } = useContext(ForumContext);
    const { setDialog } = useContext(MainContext);

    const handleAddForumClick = () => {
        if(name.length < 10){
            setErrorName({
                error:true,
                helperText: 'Le title est trop court'
            });
            return;
        }
        if(description.length < 10){
            setErrorDescription({
                error:true,
                helperText: 'La description est trop courte'
            });
            return;
        }

        let newForum = {
            "forum_section_id": Math.random(),
            "name": name,
            "description": description,
            "created": new Date().toISOString().slice(0, 19).replace('T', ' '),
        };

        if(current.selected){
            let forum = searchForumByID(current.selected.forum_section_id, data);  
            forum && ( !forum.forums ? forum.forums = Array(newForum) : forum.forums.unshift(newForum));
        }else{
            // ajout d'un forum racine
            data.unshift(newForum);
        }

        setData(JSON.parse(JSON.stringify(data)));
        setDialog( { forum_created : {
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
            <DialogTitle id="alert-dialog-title">Ajouter un nouveau forum</DialogTitle>
            <DialogContent>
                <TextField
                        fullWidth
                        id="filled-required"
                        label="Titre de la section forum..."
                        defaultValue=""
                        variant="outlined"
                        { ...bindName } 
                        />
                        <Box m={2} />
                <TextField
                        multiline
                        fullWidth
                        rows={8}
                        id="filled-required"
                        label="Description..."
                        defaultValue=""
                        variant="outlined"
                        { ...bindDescription } 
                        />
            </DialogContent>
            <DialogActions>
            
            <Button
                    color="primary"
                    endIcon={<Icon>send</Icon>}
                    onClick={ handleAddForumClick }
                >
                    Publier
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ForumAdd;