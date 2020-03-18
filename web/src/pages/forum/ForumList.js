import React, { useContext, useEffect } from 'react';
import { ForumContext } from '../../context/ForumContext';
import Moment from 'react-moment';
import Person from '../../layout/Person';
import Icon from '@material-ui/core/Icon';
import { Typography, Box, List, Grid, ListItem, ListItemText, Badge , Tooltip } from '@material-ui/core';
import { Link as RouterLink, useHistory, useLocation } from "react-router-dom";
import { Spring } from 'react-spring/renderprops';

const ForumList = ( ) => {
    const history = useHistory(); 
    const location = useLocation(); 
    const { data, display, setDisplay } = useContext(ForumContext);

    useEffect(() => setDisplay(prepareDisplay(location, data)), [location, data, setDisplay]);
    const handleListItemClick = (name) => history.push(location.pathname + '/' + name);
    
    return (
        
                <List className="forum" >
                    { 
                        display.map(( { forum_id, name, created, creator, description }, index ) =>    
                        <Spring
                            from={{ opacity: 0.7, right:'-100vw' }}
                            to={{ opacity: 1, right:'0vw' }}>
                            { transition => 
                                <ListItem 
                                    style={ transition } 
                                    key={ forum_id }
                                    alignItems = 'flex-start'
                                    dense
                                    divider
                                    className="forum-topic"
                                    onClick={ () => handleListItemClick(name) }
                                >
                                
                                    <ListItemLink>
                                        <ListItemText>
                                        <Grid
                                            container
                                            direction="row"
                                            justify="space-between"
                                            alignItems="center"
                                            >
                                            <Typography>
                                            <Grid container direction="row"> <Icon className="forum-icon" /> <Typography variant="h6" gutterBottom noWrap>{ name } </Typography></Grid>
                                            </Typography>
                                            <Typography variant="overline" gutterBottom>
                                                <Moment fromNow >{ created }</Moment>
                                            </Typography>
                                        </Grid>
                                        </ListItemText>
                                        <ListItemText>
                                            <Grid
                                                container
                                                direction="row"
                                                justify="space-between"
                                                alignItems="center"
                                                >
                                            <Box m="25">
                                                <Person { ...creator } />
                                            </Box>
                                            <Tooltip title="Nombre total de posts" aria-label="Nombre total de posts">
                                            <Badge badgeContent={4} color="primary">
                                                <Icon className="forum-icon-summary-posts" />
                                            </Badge>
                                            </Tooltip>
                                            </Grid>
                                        </ListItemText>
                                        <ListItemText>
                                            <Typography variant="body2" align="justify" gutterBottom> { description  } </Typography>
                                        </ListItemText>                                                    
                                    </ListItemLink>                      
                                </ListItem>   
                                }
                            </Spring>                 
                        )
                    }
                </List>
        
        
    )
}
/*
*/ 
function ListItemLink(props) {
    const { to } = props;
    return (
        <ListItem component={RouterLink} to={to}>
            <ListItemText>{ props.children }</ListItemText>
        </ListItem>
    );
} 

const findIndexByName = (what, list) => {
    for (var i = 0; i < list.length; i++){
        if(list[i].name === what) return i;
    }
    return -1;
};

const prepareDisplay = (location, data) => {
    let path = location.pathname.trim("/").split("/");
    let newData = data;
    if(path.length > 2){
        for (var i = 2; i < path.length; i++){
            let where = findIndexByName(path[i], newData);
            if(where >= 0){
                newData = newData[where].forums;
            }else{
                return [];
            }
        }
    }
    return newData;
}

export default ForumList;