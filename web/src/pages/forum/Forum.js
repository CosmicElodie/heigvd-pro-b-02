//🍆🍈🍉🍊🍋🍌🍍🍎🍏🍐🍑🍒🍓👤💦
import React, { useContext, useEffect, useState, Fragment, useMemo, useCallback } from 'react';
import { Typography, Link, Paper, Box, Button, Grid } from '@material-ui/core';
import { ForumContext } from '../../context/ForumContext';
import { MainContext } from '../../context/MainContext';
import ForumView from './ForumView';
import ForumAdd from './ForumAdd';
import Icon from '@material-ui/core/Icon';
import "../../css/forum.css";

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Route } from 'react-router';
import { Link as RouterLink, useLocation, useHistory, Switch } from 'react-router-dom';

var fruits = new Map();
fruits.set('🍎', '🍋');  
fruits.set('🍋', '🍇');
console.log(fruits.get('🍎'));
for(var [key, val] of fruits) console.log(key,val);

const Forum = (  ) => {
  
    const { breadcrumbs, setBreadcrumbs, setForum } = useContext(ForumContext);
    const { user } = useContext(MainContext);
    const [ forumAddDialogState, setForumAddDialogState ] = useState({
        is_open : false
    });

    const location = useLocation(); 
    const history = useHistory(); 

    useEffect(() => {
      // Preparer les crumbs
      let path = location.pathname.split('/');
      let crumbs = [];
      if(path.length > 2){
        for(let i = 2; i < path.length; ++i){
          crumbs.push({ 
            name : path[i],
            path: path.slice(0,i+1).join('/')
          });
        }
      }
      setBreadcrumbs(crumbs);
    }, [location, setBreadcrumbs, setForum, user]);

    const handleBreadcrumbClick = useCallback(( index ) => index >= 0 ? history.push(breadcrumbs[index].path) : history.push('/forum'), [breadcrumbs, history]);
    
    const handleAddForumSectionClick = () => setForumAddDialogState({ is_open : true }); 
    const handleAddForumSectionClose = () => setForumAddDialogState({ is_open : false });

    return useMemo(() => 
      <Fragment>
      <Route>
            <Paper elevation={0}>
              <Grid container direction="row" alignItems="center" justify="space-between" spacing={1}> 
                <Grid item style={ { display: 'flex' } }>
                  <Icon className="forum-title" />  
                  <Typography variant="h5" component="h5" gutterBottom>Forum</Typography>
                </Grid>
                <Grid item>
                  { user && user.access_level >= 75 && <Button variant="outlined" size="small" color="primary" onClick={ handleAddForumSectionClick }>Nouvelle section</Button> }
                </Grid>
              </Grid>
              <Box mb={1} />
              <Breadcrumbs aria-label="breadcrumb" maxItems={3} >
                  <LinkRouter color="primary" onClick = { () => handleBreadcrumbClick(-1) }  to="/forum">
                      Forums
                  </LinkRouter>
                  {
                    breadcrumbs.map(( { name }, index ) =>  
                        <LinkRouter color="primary" onClick = { () => handleBreadcrumbClick(index) } >
                            { name } 
                        </LinkRouter>
                    )
                  }
              </Breadcrumbs>
            </Paper>
            <Switch>
                <Route path="/forum" component={() => <ForumView />} />
            </Switch>
        </Route>
        <ForumAdd { ...{...forumAddDialogState, ...{ handleClose : handleAddForumSectionClose }} } /> 
        </Fragment>, 
        [breadcrumbs, forumAddDialogState, user, handleBreadcrumbClick]
    )
}

const LinkRouter = props => <Link {...props} component={RouterLink} />;

export default Forum;