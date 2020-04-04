import React, { useContext, useEffect } from 'react';
import { Icon, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Box } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { useInput } from '../../hooks/input';
import { searchForumByID } from './Utility';
import { ForumContext } from '../../context/ForumContext';
import { MainContext } from '../../context/MainContext';

const ForumEdit = ( { is_open, handleClose } ) => {
    /*
        Le parent "SubjectList" est le gérant de l'état du modal SubjectAdd
    */ 
    const { value:name, setValue:setNameValue, bind:bindName, setError:setErrorName } = useInput('');
    const { value:description, setValue:setDescriptionValue, bind:bindDescription, setError:setErrorDescription } = useInput('');
    const { current, setCurrent, data, setData } = useContext(ForumContext);
    const { setDialog } = useContext(MainContext);

    const history = useHistory(); 

    useEffect(() => {
        setNameValue(current.selected.name);
        setDescriptionValue(current.selected.description);
    }, [setNameValue, setDescriptionValue, current]);

    const handleAddForumClick = () => {
        let hasError = false;
        if(name.length === 0){
            setErrorName({
                error:true,
                helperText: 'Le title est trop court'
            });
            hasError = true;
        }
        if(description.length === 0){
            setErrorDescription({
                error:true,
                helperText: 'La description est trop courte'
            });
            hasError = true;   
        }
        if(hasError) return;
 

        let pathAfterUpdate = history.location.pathname.split('/').slice(0, -1).join("/") + '/' + name;
        let dialogTimeout = 0;
        fetch('http://localhost:8080/forum/update_section', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: "&name=" + name + "&description=" + description + "&forum_section_id=" + current.selected.forum_section_id
        })
        .then(response => response.json())
        .then(({ status, dialog_id }) => {
            if(status === 'ok'){
                let forum = searchForumByID(current.selected.forum_section_id, data);         
                forum.name = name;
                forum.description = description;
                setData(JSON.parse(JSON.stringify(data)));
                setCurrent({
                    selected : forum,
                    rendered : false,
                    forums : forum.forums
                });
                dialogTimeout = 500;
                history.push(pathAfterUpdate);
            }
            setTimeout(() => setDialog( { [dialog_id] : {
                    is_open: true
            }}), dialogTimeout);
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
            <DialogTitle id="alert-dialog-title">Modifier la section forum</DialogTitle>
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

export default ForumEdit;