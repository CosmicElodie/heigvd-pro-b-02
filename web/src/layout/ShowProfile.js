import React, { useContext } from 'react';
import { MainContext } from '../context/MainContext';

import {  Card, Dialog,  CardContent, makeStyles,  Typography, Avatar, Grid } from '@material-ui/core';
import { blue, blueGrey, HUE } from '@material-ui/core/colors';
import EditIcon from '@material-ui/icons/Edit';
import { CssBaseline, Paper } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';

import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab';




const USER_DATA = {
    name: 'Michael Triponez',
    img: 'https://www.cdc.gov/coronavirus/2019-ncov/images/2019-coronavirus.png',
    username: 'Mich'
  }
  const HOUSE_DATA = {
    name: 'Michael Triponez',
    img : 'https://c1-ebgames.eb-cdn.com.au/merchandising/images/packshots/594355e64e564fb6bdcc760f8e2cc8e6_Large.png',
    username: 'Mich'
  }

const ShowProfile = () => {
    const { showProfile, setShowProfile } = useContext(MainContext);
    const classes = useStyles();
    const SPACING = 3;

    const handleClose = (which) => {
        setShowProfile(null);
    };
    
    
    const test = () => {
        console.log("test");
    };


    return (
        <section>
            {
                showProfile &&
                <Dialog
                    open={ true }
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    onClose = { () => handleClose() }
                    >
                <Card className={classes.InfoBox} >
          <CardContent >
             
                        <CssBaseline />
                        <Grid className={classes.InfoBox} item component={Paper} elevation={0}>
                          <div className={classes.paper}>
                            
                            
                            
                          <Avatar className={classes.contour} > 
                            <Avatar className={classes.large} > 
                              <img className={classes.resize} src={USER_DATA.img}>
                              </img>
                            </Avatar>
                          </Avatar>

                            <br />
                            <br />

                          <Typography component="h1" >
                            <Grid container spacing={SPACING}>
                                <Grid item xs>
                                <b>Nom :</b>  
                                </Grid>
                                <Grid item>
                                  <span >{showProfile.lastname}</span>
                                </Grid>
                              </Grid>
                              
                              <Grid container spacing={SPACING}>
                                <Grid item xs>
                                <b>Prenom :</b>
                                </Grid>
                                <Grid item>
                                 <span >{showProfile.firstname}</span>
                                </Grid>
                              </Grid>
                              
                              <Grid container spacing={SPACING}>
                                <Grid item xs>
                                <b>Birthdate :</b>
                                </Grid>
                                <Grid item>
                                <span >{showProfile.created}</span>              
                                </Grid>
                              </Grid>
                              
                              <Grid container spacing={SPACING}>
                                <Grid item xs>
                                <b>Maison :</b> 
                                </Grid>
                                <Grid item>
                                <span >{showProfile.house && showProfile.house.name} </span>
                                </Grid>
                              </Grid>
                              
                              <Grid container spacing={SPACING}>
                                <Grid item xs>
                                <b>Username :</b>  
                                </Grid>
                                <Grid item>

                                  
                                <IconButton aria-label="edit"  size="small">
                                  <EditIcon style={{ fontSize: 10, color: blue[500] }} />  
                                </IconButton>
                                
                                <span >{showProfile.username}</span> 
                                </Grid>
                              </Grid>

                              <Grid container spacing={SPACING}>
                                <Grid item xs>
                                <b>email :</b>
                                </Grid>
                                <Grid item>
                                <span >{showProfile.email}</span>
                                </Grid>
                              </Grid>
                            </Typography>
                          
                       
                          </div>
                        </Grid>
                      
                 


        </CardContent>
      </Card>
      
      </Dialog>
        }
      </section>
    )
}

export default ShowProfile;



const useStyles = makeStyles(theme => ({
    bannerBox: {
      minWidth: 275,
      Height: 300 
    },
    InfoBox: {
      backgroundColor: '#B5D3E7',
      marginTop: 20,
      maxWidth: 400,
      Height: 300 
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      marginLeft: 10,
      fontSize: 30,
      color: blueGrey[50],
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
      marginTop: 0,
      width: theme.spacing(21),
      height: theme.spacing(21),
      backgroundColor: '#ffffff',  
    },
    house:{
      backgroundImage :  `url('https://upload.wikimedia.org/wikipedia/commons/4/48/Epcot_Page_Banner.jpg')`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      alignItems: 'center',
    },
    banner:{
      height: 200,
      width:250,
      alignItems: 'right',
    },
  
    wrapper: {
      position: 'relative',
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
  