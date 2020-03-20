import React from 'react';
import { List, ListItem, ListItemText, Icon, Typography, Grid, Box, Paper} from '@material-ui/core';
import { Spring } from 'react-spring/renderprops';
import Person from '../../layout/Person'
import Moment from 'react-moment';

const styles = {
    List: {
        marginLeft:'28px',
        marginRight:'28px',
        position:'relative'
    },
    ListItem : {
        display:'flex',
        position:'relative'
    }
}

const SubjectList = ( { selected } ) => {

    return (
        <Spring
            from={{ opacity: 0.3, top:'-100vh' }}
            to={{ opacity: 1, top:'0vh' }}>
                { ({opacity, top}) => 
                    <List style={ {
                            ...styles.List,
                                'opacity' : opacity,
                                'top' : top
                            }}>
                        { 
                            selected && selected.subjects && 
                            selected.subjects.length > 0 && selected.subjects.map(( { subject_id, created, creator, creator_id, name, posts }, index ) =>    
                                
                                <Grid container component="div" style={ styles.ListItem } key={ subject_id } justify="space-between"  alignItems="center" spacing={3} direction="row" >
                                    <Grid item>
                                        <Grid container direction="row" >
                                            <Grid item xs={0}>
                                                <Icon className="forum-subject" /> 
                                            </Grid>
                                            <Grid item xs={0}>
                                                <Grid container alignItems="flex-start" direction="column" >
                                                    <Typography variant="h7" noWrap> { name } </Typography>  
                                                    <Typography variant="caption" noWrap><Moment fromNow>{ created }</Moment></Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Grid container alignItems="flex-end" direction="column" >
                                            <Person { ...creator } variant="tiny" />
                                        </Grid>
                                    </Grid>
                                    
                                </Grid>
                                  
                            )
                        }
                    </List>  
          }
        </Spring>
        
    )           
}

export default SubjectList;