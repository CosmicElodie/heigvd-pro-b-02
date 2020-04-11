import React, { useContext, Fragment, useState, useEffect } from 'react';
import { Icon, Typography, Grid, Box, Button} from '@material-ui/core';
import { MainContext } from '../../context/MainContext';
import ForumEdit from './ForumEdit';
import ForumDelete from './ForumDelete';

const ForumDetails = ( { selected } ) => {
    const { user } = useContext(MainContext);   
    
    useEffect(()=>{
        let listEl = document.querySelector('.forum-details'); 
        if(listEl){
            setTimeout(() => listEl.classList.add('animated'), 10);
            return () => {
                listEl.classList.remove('animated');
            }
        }
    }, [selected]);


    const [ forumDeleteDialogState, setForumDeleteDialogState ] = useState({ is_open : false });
    const [ forumEditDialogState, setForumEditDialogState ] = useState({ is_open : false });
   
    const handleDeleteForumSectionClick = () => setForumDeleteDialogState({ is_open : true });
    const handleDeleteForumSectionClose = () => setForumDeleteDialogState({ is_open : false });

    const handleEditForumSectionClick = () => setForumEditDialogState({ is_open : true });
    const handleEditForumSectionClose = () => setForumEditDialogState({ is_open : false });

    return (
        selected && 
        <Fragment>      
            <section className="forum-details">
                <Grid container alignItems="center" justify="space-between" className="subjects-header"> 
                    <Grid item>
                        <Grid container direction="row" alignItems="center" spacing={1}> 
                            <Icon className="forum-open-icon" /> 
                            <Typography className="typo-headline" gutterBottom>  { selected.help_section !== 0 && <Icon className="forum-help" /> } { selected.name } </Typography>
                        </Grid>
                    </Grid>
                    <Grid item>
                        { user.access_level >= 75 && <Grid container direction="row" alignItems="center" spacing={1}> 
                            <Grid item><Button size="small" variant="contained" color="primary" onClick={ handleEditForumSectionClick }><Icon className="forum-edit-button"/></Button></Grid>
                            <Grid item><Button size="small" variant="contained" color="secondary" onClick={ handleDeleteForumSectionClick }><Icon className="forum-delete-button"/></Button></Grid>
                        </Grid> }
                    </Grid>
                </Grid>
                <Box mb={1} />
                <Typography className="typo-body-3" gutterBottom>{ selected.description }</Typography>
            </section>     
                    
            <ForumEdit { ...{...forumEditDialogState, ...{ handleClose : handleEditForumSectionClose }} } /> 
            <ForumDelete { ...{...forumDeleteDialogState, ...{ handleClose : handleDeleteForumSectionClose }} } /> 
        </Fragment>   
    )           
}

export default ForumDetails;