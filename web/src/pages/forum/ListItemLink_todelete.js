import React from 'react';
import { Link as RouterLink } from "react-router-dom";
import { ListItem, Box } from '@material-ui/core';

const ListItemLink = ( props ) => {
    const { to } = props;
    return (
        <ListItem disableGutters={true} className="list-item-link" component={RouterLink} to={to}>
           <Box>{ props.children }</Box>
        </ListItem>
    );
} 

export default ListItemLink;