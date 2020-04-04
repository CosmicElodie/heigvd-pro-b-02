import React, { useContext } from 'react';
import { MainContext } from '../context/MainContext';

import {  Card, Dialog,  CardContent, makeStyles,  Typography, Avatar, Grid } from '@material-ui/core';
import {blue} from '@material-ui/core/colors';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

  
const ShowProfile = () => {
    const { showProfile, setShowProfile } = useContext(MainContext);
    const classes = useStyles();

    const handleClose = () => {
        setShowProfile(null);
    };
    

    /* Displays data (name and corresponding data) */
    function DisplayData(props) {
      return( 
        
        
          <Grid container spacing={3}>
            <Grid item xs>
              <b>{props.name}</b>  
            </Grid>
            <Grid item>
              <span >{props.data}</span>
            </Grid>
          </Grid>
      )
    }

    return (
        <section>
            {
                showProfile &&
                <Dialog
                open={true}
                onClose = { () => handleClose() }
                >
                    <Card >
                      <CardContent >
                            <div className={classes.test}>
                            
                            <Avatar className={classes.contour}> 
                            
                              {
                                showProfile.avatar &&
                                <Avatar className={classes.large} > 
                                  <img className={classes.resize} src={showProfile.avatar} alt="No img"/>
                                </Avatar>
                              }

                              {
                                !showProfile.avatar &&
                                <Avatar className="avatar"> { showProfile.initials } </Avatar> 
                              }
            
                              
                            </Avatar>
                            </div>
                            <br />
                            <br />
                            <h1>blah</h1>

                            <Typography component="h6" >                     
                              <DisplayData name="nom :" data = {showProfile.lastname}/>    
                              <DisplayData name="prenom :" data = {showProfile.firstname}/>    
                              <DisplayData name="Naissance :" data = {showProfile.birth}/>    
                              <DisplayData name="Maison :" data = {showProfile.house && showProfile.house.name}/>    
                              <DisplayData name="Username :" data = {showProfile.username}/>    
                              <DisplayData name="email :" data = {showProfile.email}/>    
                            </Typography>   
                        
                            <IconButton aria-label="edit"  size="small">
                              <EditIcon style={{ fontSize: 10, color: blue[500] }} />  
                            </IconButton>
                         
                      </CardContent>
                    </Card>
      
      </Dialog>
        }
      </section>
    )
}

export default ShowProfile;



const useStyles = makeStyles(theme => ({
    
    

    test:{
      textAlign:  "-moz-center",
    },
    pos: {
      marginBottom: 12,
    },
    resize: {
      scale : 2,
    },

    large: {
      width: theme.spacing(20),
      height: theme.spacing(20),   
    },

    contour: {
      
      position: 'relative',
      marginTop: 0,
      width: theme.spacing(21),
      height: theme.spacing(21),
      backgroundColor: '##99ccff',  
    },

    div: {
      position: 'absolute',
      top: 28,
      right: 0,
      left: 0,
      border: '1px solid',
      padding: theme.spacing(1),
      backgroundColor: theme.palette.background.paper,
    },
  }));
  