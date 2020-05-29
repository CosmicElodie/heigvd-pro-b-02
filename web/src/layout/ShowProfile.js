import React, { useContext } from 'react';
import { MainContext } from '../context/MainContext';

import {appConfig} from '../config/appConfig'
import {  Card, Dialog,  CardContent, makeStyles,  Typography, Avatar, Grid } from '@material-ui/core';
import Moment from 'react-moment';
import 'moment/locale/fr';  // without this line it didn't work


  
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

    function DisplayDate(props) {
      return( 
          <Grid container spacing={3}>
            <Grid item xs>
              <b>{props.name}</b>  
            </Grid>
            <Grid item>
              <Moment locale="fr" format="DD MMMM YYYY">
                  {props.data}
              </Moment>
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
                                <Avatar className={classes.large} src={appConfig.content_url + showProfile.avatar}  > 
                                </Avatar>
                              }

                              {
                                !showProfile.avatar &&
                                <Avatar className="avatar"> {appConfig.content_url +  showProfile.initials } </Avatar> 
                              }
                              
                            </Avatar>
                            </div>
                            <br />
                            <section className={classes.status}>
                            
                            { showProfile.access_level === 25 && <section className={ classes.personStatus + " person-status person-access-prefet" } />  }
                            { showProfile.access_level === 50 && <section className={ classes.personStatus + " person-status person-access-moderator" } />  }
                            { showProfile.access_level === 75 && <section className={ classes.personStatus + " person-status person-access-admin" } />  }

                            { showProfile.access_level === 0 && "Utilisateur" }
                            { showProfile.access_level === 25 && "Préfet" }
                            { showProfile.access_level === 50 && "Modérateur" }
                            { showProfile.access_level === 75 && "Administrateur" }

                            </section>
                            <Typography >  
                              {console.log(showProfile)}                   
                              <DisplayData name="Nom :" data = {showProfile.lastname}/>    
                              <DisplayData name="Prénom :" data = {showProfile.firstname}/>    
                              <DisplayDate name="Naissance :" data = {showProfile.birth}/>                             
                              <DisplayData name="Points :" data = {showProfile.points_year}/>  
                              <DisplayData name="Forum post :" data = {showProfile.nb_subject_participate }/> 
                              <DisplayData name="Victoires :" data = {showProfile.nb_victory }/>  
                              <DisplayData name="Maison :" data = {showProfile.house && showProfile.house.name}/>    
                              <DisplayData name="E-mail :" data = {showProfile.email}/>    
                            </Typography>   
                      </CardContent>
                    </Card>
      
      </Dialog>
        }
      </section>
    )
}

export default ShowProfile;



const useStyles = makeStyles(theme => ({
    
    
    status: {
      position: "relative",
      display:"flex",
      alignItems: "center",
      justifyContent: "center"
    },
    personStatus: {
      width:"24px",
      height: "24px",
      backgroundRepeat: "no-repeat",
      marginTop:"4px"
    },
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
  