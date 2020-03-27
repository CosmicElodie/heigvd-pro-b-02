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
    const { current, data, setData } = useContext(ForumContext);
    const { setDialog } = useContext(MainContext);

    const history = useHistory(); 

    useEffect(() => {
        setNameValue(current.selected.name);
        setDescriptionValue(current.selected.description);
    }, [setNameValue, setDescriptionValue, current]);

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

        let forum = searchForumByID(current.selected.forum_id, data);         
        forum.name = name;
        forum.description = description;
        setData(JSON.parse(JSON.stringify(data)));
        setDialog( { forum_edited : {
            is_open: true
        }});
        history.push(history.location.pathname.split('/').slice(0, -1).join("/") + '/' + name);
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