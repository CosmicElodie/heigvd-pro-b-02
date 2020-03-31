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
        let parent_id = current.selected ? current.selected.forum_section_id : null;
        let post_body = "name=" + name + "&description=" + description;
        if(parent_id) post_body += "&parent_forum_section_id=" + parent_id;
        fetch('http://localhost:8080/forum/insert_section', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: post_body
                
        })
        .then(response => response.json())
        .then(response => {
            
            if(response.status === 'ok'){
                if(current.selected){
                    let forum = searchForumByID(current.selected.forum_section_id, data);  
                    forum && ( !forum.forums ? forum.forums = Array(response.data) : forum.forums.unshift(response.data));
                }else{
                    // ajout d'un forum racine
                    data.unshift(response.data);
                }
                setData(JSON.parse(JSON.stringify(data)));
            }

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