import React, { useContext } from 'react';
import { ForumContext } from '../../context/ForumContext';
import Icon from '@material-ui/core/Icon';
import { Typography, Grid, List, ListItem, Badge , Tooltip } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { Spring } from 'react-spring/renderprops';

const ForumList = ( ) => {
    
    const history = useHistory(); 

    const { current, effectActive, setEffectActive, forumListEffect } = useContext(ForumContext);

    const handleListItemClick = ( { name } ) => {
        setEffectActive({ active : true });
        history.push(history.location.pathname + '/' + name);
    }
    
    return (
        <Spring
            from={ effectActive.active ? forumListEffect.from : forumListEffect.to }
            to={ forumListEffect.to }>
            { transition => 
                <List className="forum-list">
                    { 
                    current && current.forums && current.forums.length > 0 && current.forums.map(( { forum_id, name, created, creator, description }, index ) =>    
                    <ListItem 
                        style={ transition } 
                        key={ forum_id }
                        dense
                        divider
                        className="forum-list-element"
                        onClick={ () => handleListItemClick({ name }) }
                    >
                            <Grid container direction="row" justify="space-between" alignItems="center" wrap="nowrap">
                                <Grid item xs={11}>
                                    <Grid container direction="row" alignItems="center" wrap="nowrap" spacing={1}>
                                        <Grid item xs={0}><Icon className="forum-icon" /></Grid>
                                        <Grid item xs={11}>
                                            <Typography component="h5" className="typo-headline" noWrap>{ name } </Typography>
                                            <Typography component="h5" className="typo-body-3" align="justify" noWrap> { description } </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>            
                                    <Tooltip title="Nombre total de posts" aria-label="Nombre total de posts">
                                        <Badge badgeContent={4} color="primary">
                                            <Icon className="forum-icon-summary-posts" />
                                        </Badge>
                                    </Tooltip>
                                </Grid>
                            </Grid>                                         
                    </ListItem>        
                )
            }
            </List>  
          }
        </Spring>  
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

export default ForumList;