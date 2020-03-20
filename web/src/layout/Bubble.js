import React from 'react';
import { Typography, Box } from '@material-ui/core';
import Moment from 'react-moment';

const Bubble = ( { text, time } ) => {

    return (
        <Box className="speech-bubble"> { text } 
            <Box className="speach-moment">
            <Typography variant="caption" noWrap><Moment fromNow>{ time }</Moment></Typography>
            </Box>
        </Box>
    )
}

export default Bubble;


