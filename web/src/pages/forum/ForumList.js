import React, { useContext } from 'react';
import { ForumContext } from '../../context/ForumContext';
import Moment from 'react-moment';
import Person from '../../layout/Person';
import Icon from '@material-ui/core/Icon';
import { Typography, List, Grid, ListItem, ListItemText, Badge , Tooltip, Box } from '@material-ui/core';
import { Link as RouterLink, useHistory } from "react-router-dom";
import { Spring } from 'react-spring/renderprops';


const ForumList = ( ) => {
    
    const history = useHistory(); 

    const { display } = useContext(ForumContext);

    const handleListItemClick = ( forum ) => history.push(history.location.pathname + '/' + forum.name);
    
    return (
        <List>
            { 
                display && display.forums && display.forums.length > 0 && display.forums.map(( { forum_id, name, created, creator, description }, index ) =>    
                <Spring
                    from={{ opacity: 0.3, top:'-100vh' }}
                    to={{ opacity: 1, top:'0vw' }}>
                    { transition => 
                        <ListItem 
                            style={ transition } 
                            key={ forum_id }
                            alignItems = 'flex-start'
                            dense
                            divider
                            className="forum-topic"
                            onClick={ () => handleListItemClick({ forum_id, name, created, creator, description }) }
                        >
                            <ListItemLink>
                                <ListItemText>
                                    <Grid container direction="row" justify="space-between" alignItems="center" >
                                        <Box display="flex" container direction="row" justify="flex-start" alignItems="center">
                                            <Icon className="forum-icon" /> <Typography variant="h6" gutterBottom noWrap>{ name } </Typography>
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
*/ 
function ListItemLink(props) {
    const { to } = props;
    return (
        <ListItem component={RouterLink} to={to}>
            <ListItemText>{ props.children }</ListItemText>
        </ListItem>
    );
} 


export default ForumList;