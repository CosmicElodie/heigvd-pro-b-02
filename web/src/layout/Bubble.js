import React from 'react';
import { Typography, Box } from '@material-ui/core';
import Moment from 'react-moment';

const Bubble = ( { text, time, className, orientation, updated } ) => {
    let classOrientation = orientation === 'right' ? 'right' : 'left';
    return (
        <Box className={ "speech-bubble " + className + ' ' + classOrientation }> { text } 
            <Box className="speach-moment">
            <Typography variant="caption" noWrap><Moment fromNow>{ time }</Moment> { updated ? ' (modifié) '  : '' } </Typography>
            </Box>
        </Box>
    )
}

export default Bubble;


