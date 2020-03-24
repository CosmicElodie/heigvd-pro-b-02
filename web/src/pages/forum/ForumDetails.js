import React, { useContext } from 'react';
import { Paper, Icon, Typography, Grid, Box} from '@material-ui/core';
import { Spring } from 'react-spring/renderprops';
import { ForumContext } from '../../context/ForumContext';

const ForumDetails = ( { selected } ) => {
    const { effectActive, forumDetailsEffect } = useContext(ForumContext);    
    return (
        selected && 
        <Spring
            from={ effectActive.active ? forumDetailsEffect.from : forumDetailsEffect.to }
            to={ forumDetailsEffect.to }>
            { ( { opacity, scale } ) => 
                <Paper elevation={0} m={1} className="forum-details" style={ { 
                    'opacity' : opacity,
                    'transform' : 'scale(' + scale + ')'
                 } } >
                    <Grid container direction="row" justify="flex-start" alignItems="center" >
                        <Icon className="forum-open-icon" /> 
                        <Typography className="typo-headline" gutterBottom> { selected.name } </Typography>
                    </Grid>
                    <Box mb={1} />
                    <Typography className="typo-body-3" gutterBottom>{ selected.description }</Typography>
                </Paper>
            }
           
        </Spring>      
    )           
}

export default ForumDetails;