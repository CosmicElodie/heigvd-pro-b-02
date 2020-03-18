//🍆🍈🍉🍊🍋🍌🍍🍎🍏🍐🍑🍒🍓👤
import React, { Fragment,  useContext, useEffect } from 'react';
import { Typography, Link } from '@material-ui/core';
import { ForumContext } from '../../context/ForumContext';
import TopicView from './TopicView';
import ForumList from './ForumList';
import { spring, AnimatedSwitch } from 'react-router-transition';
import "../../css/icons.css";

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Route } from 'react-router';
import { Link as RouterLink, useLocation, useHistory } from 'react-router-dom';

var fruits = new Map();
fruits.set('🍎', '🍋');  
fruits.set('🍋', '🍇');
console.log(fruits.get('🍎'));
for(var [key, val] of fruits) console.log(key,val);

const Forum = (  ) => {
        
    const { breadcrumbs, setBreadcrumbs } = useContext(ForumContext);
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
    }, [location, setBreadcrumbs]);

    const handleBreadcrumbClick = ( index ) => index >= 0 ? history.push(breadcrumbs[index].path) : history.push('/forum');

    return (
        <Fragment>
            <Typography variant="h5" component="h5" gutterBottom> Forum </Typography>
            <Route>
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
                <Switch>
                    <Route path="/forum" component={() => <ForumList />} />
                    <Route path="/forum/:forumid" component={() => <TopicView />} />
                </Switch>
            </Route>
        </Fragment>
    )
}

const LinkRouter = props => <Link {...props} component={RouterLink} />;

// wrap the `spring` helper to use a bouncy config
function bounce(val) {
    return spring(val, {
      stiffness: 330,
      damping: 22,
    });
  }
  
  // child matches will...
  const bounceTransition = {
    // start in a transparent, upscaled state
    atEnter: {
      opacity: 0,
      scale: 1.2,
    },
    // leave in a transparent, downscaled state
    atLeave: {
      opacity: bounce(0),
      scale: bounce(0.8),
    },
    // and rest at an opaque, normally-scaled state
    atActive: {
      opacity: bounce(1),
      scale: bounce(1),
    },
  };

  // we need to map the `scale` prop we define below
// to the transform style property
function mapStyles(styles) {
    return {
      opacity: styles.opacity,
      transform: `scale(${styles.scale})`,
    };
  }
  

export default Forum;