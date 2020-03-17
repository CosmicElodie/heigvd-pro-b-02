import React, { useState } from 'react';
import Moment from 'react-moment';
import Person from '../../layout/Person';
import Icon from '@material-ui/core/Icon';
import { Typography, Box, List, Grid, ListItem, ListItemText, Badge , Tooltip, Link } from '@material-ui/core';

import { Link as RouterLink } from 'react-router-dom';

const ForumList = ( props ) => {
    const { forums } = props;
    
    const [topics, setTopic] = useState(forums);

    return (
        <List className="forum">
            { 
                forums.map(( { forum_id, name, created, creator, description }, index ) => 
                    <ListItem 
                        key={ forum_id }
                        alignItems = 'flex-start'
                        dense
                        divider
                        className="forum-topic"
                    >
                        <ListItemLink to={'/forum/' + index}>
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
                )
            }
        </List>
    )
}

function ListItemLink(props) {
    const { to } = props;
  
    return (
        <ListItem component={RouterLink} to={to}>
          <ListItemText>{ props.children }</ListItemText>
        </ListItem>
    );
  }

export default ForumList;