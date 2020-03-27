//🍆🍈🍉🍊🍋🍌🍍🍎🍏🍐🍑🍒🍓👤
import React, { useContext, useEffect, useState, Fragment } from 'react';
import { Typography, Link, Paper, Box, Button, Grid } from '@material-ui/core';
import { ForumContext } from '../../context/ForumContext';
import ForumView from './ForumView';
import ForumAdd from './ForumAdd';
import Icon from '@material-ui/core/Icon';
import "../../css/icons.css";

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Route } from 'react-router';
import { Link as RouterLink, useLocation, useHistory, Switch } from 'react-router-dom';

var fruits = new Map();
fruits.set('🍎', '🍋');  
fruits.set('🍋', '🍇');
console.log(fruits.get('🍎'));
for(var [key, val] of fruits) console.log(key,val);

const Forum = (  ) => {
        
    const { breadcrumbs, setBreadcrumbs, setForum, setEffectActive } = useContext(ForumContext);
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
    }, [location, setBreadcrumbs, setForum]);

    const handleBreadcrumbClick = ( index ) => { 
      setEffectActive({ active : true });
      index >= 0 ? history.push(breadcrumbs[index].path) : history.push('/forum');
    }
    
    const handleAddForumSectionClick = () => {
      setForumAddDialogState({ is_open : true });
      setEffectActive({ active : false });
    }
    const handleAddForumSectionClose = () => { 
      setForumAddDialogState({ is_open : false });
    }

    return (
      <Fragment>
      <Route>
            <Paper elevation={0}>
              <Grid container direction="row" alignItems="center" justify="space-between" spacing={1}> 
                <Grid item style={ { display: 'flex' } }>
                  <Icon className="forum-title" />  
                  <Typography variant="h5" component="h5" gutterBottom>Forum</Typography>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary" onClick={ handleAddForumSectionClick }>Nouvelle section</Button>
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
        </Fragment>
    )
}

const LinkRouter = props => <Link {...props} component={RouterLink} />;



export default Forum;