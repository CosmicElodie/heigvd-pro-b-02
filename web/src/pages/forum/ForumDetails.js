import React from 'react';
import { Paper, Icon, Typography, Grid} from '@material-ui/core';
import { Spring } from 'react-spring/renderprops';

const ForumDetails = ( { selected } ) => {
    
    return (
        selected && 
        <Spring
            from={{ opacity: 0.5, scale: 0.85 }}
            to={{ opacity: 1, scale: 1 }}>
            { ( { opacity, scale } ) => 
                <Paper elevation={0} m={1} className="forum-details" style={ { 
                    'opacity' : opacity,
                    'transform' : 'scale(' + scale + ')'
                 } } >
                    <Grid container direction="row" justify="flex-start" alignItems="center" >
                        <Icon className="forum-open-icon" /> 
                        <Typography variant="h6" gutterBottom noWrap> { selected.name } </Typography>
                    </Grid>
                    <Typography variant="body2" gutterBottom noWrap>{ selected.description }</Typography>
                </Paper>
            }
        </Spring>      
    )           
}

export default ForumDetails;