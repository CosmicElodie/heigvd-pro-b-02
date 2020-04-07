import React, { useContext, useEffect, useMemo, useCallback } from 'react';
import { Typography, Grid, List, ListItem, Badge , Tooltip, Icon } from '@material-ui/core';
import { ForumContext } from '../../context/ForumContext';
import { useHistory } from "react-router-dom";
 
const ForumList = ( ) => {
    
    const history = useHistory(); 
    const { current } = useContext(ForumContext);

    useEffect(()=>{
        let listEl = document.querySelector('.forum-list'); 
        setTimeout(()=>listEl.classList.add('animated'), 10);
        return () => {
            listEl.classList.remove('animated');
        }
    }, [current]);

    const handleListItemClick = useCallback(( name ) => history.push(history.location.pathname + '/' + name), [history]);
    
    return useMemo(() => 
        <List className="forum-list">
            { 
            current && current.forums && current.forums.length > 0 && current.forums.map(( forum, index ) =>    
            <ListItem 
                key={ forum.forum_section_id }
                dense
                divider
                className="forum-list-element"
                offset={index}
                onClick={ () => handleListItemClick(forum.name) }
            >
                    <Grid container direction="row" justify="space-between" alignItems="center" wrap="nowrap">
                        <Grid item xs={11}>
                            <Grid container direction="row" alignItems="center" wrap="nowrap" spacing={1}>
                                <Grid item xs={0}><Icon className="forum-icon" /></Grid>
                                <Grid item xs={11}>
                                    <Typography component="h5" className="typo-headline" noWrap>{ forum.name } </Typography>
                                    <Typography component="p" className="typo-body-3" align="justify" noWrap> { forum.description } </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>            
                            <Tooltip title="Nombre total de posts" aria-label="Nombre total de posts">
                                <Badge badgeContent={ forum.nbPosts ? forum.nbPosts : 0 } color="primary" showZero anchorOrigin={{ vertical: 'top', horizontal: 'left', }}>
                                    <Icon className="forum-icon-summary-posts" />
                                </Badge>
                            </Tooltip>
                        </Grid>
                    </Grid>                                         
            </ListItem>        
        )
    }
    </List>, [current, handleListItemClick]  
        
    )
}

export default ForumList;