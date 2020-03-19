//🍆🍈🍉🍊🍋🍌🍍🍎🍏🍐🍑🍒🍓👤
import React, { useContext, useEffect } from 'react';
import { Typography, Link, Paper, Box } from '@material-ui/core';
import { ForumContext } from '../../context/ForumContext';
import TopicView from './TopicView';
import ForumView from './ForumView';
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
        
    const { breadcrumbs, setBreadcrumbs, setForum } = useContext(ForumContext);
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

    const handleBreadcrumbClick = ( index ) => index >= 0 ? history.push(breadcrumbs[index].path) : history.push('/forum');
    
    return (
      <Route>
            <Paper elevation={0}>
              <Box display="flex" justify="flex-start" alignItems="center" >
                <Icon className="forum-title" />  
                <Typography variant="h5" component="h5" gutterBottom> Forum </Typography>
              </Box>
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
                <Route path="/forum/:forumid" component={() => <TopicView />} />
            </Switch>
        </Route>
    )
}

const LinkRouter = props => <Link {...props} component={RouterLink} />;



export default Forum;