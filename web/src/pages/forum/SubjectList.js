import React from 'react';
import { List, ListItem, ListItemText, Icon, Typography, Grid, Box, Paper} from '@material-ui/core';
import { Spring } from 'react-spring/renderprops';
import Person from '../../layout/Person';
import Bubble from '../../layout/Bubble';
import Moment from 'react-moment';

const styles = {
    List: {
        position:'relative',
        background: '#f4f4f4f0',
	    border: '1px solid #e8e8e8f0',
	    padding: '20px'
    },
    subjectDetails : {
        background:'white',
        minHeight: '60px',
        padding:'10px',
        border: '1px solid #e8e8e8f0'
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
                    <List className="subject-list" style={ {
                            ...styles.List,
                                'opacity' : opacity,
                                'top' : top
                            }}>
                            { selected && selected.subjects && 
                             <Grid container direction="row" alignItems="center" spacing={1}> <Icon className="forum-subject" />  <Typography variant="h7" gutterBottom>Liste des Sujets</Typography></Grid>  }
                            { selected && selected.subjects && selected.subjects.length > 0 
                            && selected.subjects.map(( { subject_id, created, creator, creator_id, name, posts }, index ) =>    
                                <Grid container component="div" style={ styles.ListItem } key={ subject_id } justify="space-between"  alignItems="center" spacing={3} direction="row" >                                    
                                    <Grid item>
                                        <Box mt={2} />
                                        <Grid container direction="row" alignItems="center" spacing={1}>
                                            
                                            <Grid item >
                                                <Typography variant="h7" noWrap>  </Typography>      
                                            </Grid>
                                            <Grid item >
                                                <Person { ...creator } collapsed={true} />
                                            </Grid>
                                            <Grid item >
                                                <Grid container className="subject-details" style={ styles.subjectDetails }  justify="space-around" alignItems="flex-start" direction="column" >
                                                    <Grid container direction="row" spacing={1}> 
                                                        <Grid item>
                                                            <Typography className="typo-headline-4" noWrap> { creator.firstname + ' ' + creator.lastname } </Typography> 
                                                        </Grid>
                                                        <Grid item>
                                                            <Typography className="typo-body-4"  noWrap><Moment fromNow>{ created }</Moment></Typography>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography className="typo-body-3"  noWrap> { name } </Typography>
                                                    </Grid>
                                                    
                                                </Grid>
                                            </Grid>
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