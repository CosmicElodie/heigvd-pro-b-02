import React, { useContext, useEffect } from 'react';
import { Icon, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Box, FormControl, Select } from '@material-ui/core';
import { useInput } from '../../hooks/input';
import { searchForumByID } from './Utility';
import { ForumContext } from '../../context/ForumContext';
import { MainContext } from '../../context/MainContext';

const ForumAdd = ( { is_open, handleClose } ) => {
    /*
        Le parent "SubjectList" est le gérant de l'état du modal SubjectAdd
    */ 
    const { value:name, setValue:setName, bind:bindName, setError:setErrorName } = useInput('');
    const { value:description, setValue:setDescription, bind:bindDescription, setError:setErrorDescription } = useInput('');
    const { value:house, setValue:setHouse, bind:bindHouse } = useInput('');
    const { current, data, setData } = useContext(ForumContext);
    const { global, setDialog } = useContext(MainContext);

    useEffect(() => {
        setHouse('');
        setName('');
        setDescription('');
    },[current, setHouse, setName, setDescription]);

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
 
        
        let post_body = "name=" + name + "&description=" + description;
        if(current.selected) post_body += "&parent_forum_section_id=" + current.selected.forum_section_id;
        if(house) post_body += "&house_id=" + house; 
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

                        <Box m={2} />
                       { !current.selected && 
                            <FormControl variant="outlined" style={ styles.HouseDropDown }>
                                <Select
                                    native
                                    { ...bindHouse }
                                >
                                    <option value={""}>Toutes les maisons</option>
                                   {
                                    global && global.houses && global.houses.map(( { house_id, name } ) => 
                                        <option value={ house_id }>{ name } </option>
                                    )
                                   } 
                                    
                                </Select>
                            </FormControl> 
                        } 
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

const styles = {
    HouseDropDown : {
        width:'100%'
    }
}



export default ForumAdd;