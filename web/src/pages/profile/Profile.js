import React, {useContext,useEffect} from 'react';
import { makeStyles, Card,  CardContent,  Typography, Avatar, Grid } from '@material-ui/core';
import { blue, blueGrey } from '@material-ui/core/colors';
import EditIcon from '@material-ui/icons/Edit';
import { MainContext } from '../../context/MainContext';
import {   Paper,   } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';


import { useHistory } from "react-router-dom";




const HOUSE_DATA = {
  name: 'Michael Triponez',
  img : 'https://c1-ebgames.eb-cdn.com.au/merchandising/images/packshots/594355e64e564fb6bdcc760f8e2cc8e6_Large.png',
  inmg : 'https://www.pngkey.com/png/full/19-192944_thanos-head-png-thanos-png.png',
  username: 'Mich'
}


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



export default function Profile() {


  let history = useHistory(); // hook that allows URL change -> navigation
  const redirectPage = (link) => {
    history.push(link);    
  }; 
  
  const { user, setShownUser } = useContext(MainContext);
  const classes = useStyles();
  const SPACING = 3;

useEffect(() => { 
  setShownUser(user);
  },[user,setShownUser]);

  return (
    <div>
      <Card className={classes.bannerBox}>
        <CardContent className={classes.house} >
          <Grid container spacing={3}>
            <Grid item xs>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                Profile
              </Typography>

              <Avatar className={classes.contour}> 
                {
                  user.avatar &&
                  <Avatar className={classes.large} > 
                    <img className={classes.resize} src={user.avatar} alt="No img"/>
                  </Avatar>
                }

                {
                  !user.avatar &&
                  <Avatar className="avatar"> { user.initials } </Avatar> 
                }
              </Avatar>
            </Grid>
            <Grid item>
              <img className={classes.banner} src={HOUSE_DATA.img} alt="No img"/>
            </Grid>
            
          </Grid>

        </CardContent>
      </Card>

      <Card className={classes.InfoBox}>
        <CardContent >
              <div className={classes.test}>
              </div>
              
              <Typography component="h1" variant="h4"spacing={10}>
                Info
              </Typography>
              <br />
              <br />
              <Typography component="h6" >                     
                <DisplayData name="nom :" data = {user.lastname}/>    
                <DisplayData name="prenom :" data = {user.firstname}/>    
                <DisplayData name="Naissance :" data = {user.birth}/>    
                <DisplayData name="Maison :" data = {user.house && user.house.name}/>    
                <DisplayData name="Username :" data = {user.username}/>    
                <DisplayData name="email :" data = {user.email}/>    
              </Typography>   
          
              <IconButton aria-label="edit"  size="small">
                <EditIcon style={{ fontSize: 10, color: blue[500] }} onClick = {() => redirectPage("/test")}>
                  </EditIcon>  
              </IconButton>
            
        </CardContent>
      </Card>
  </div>
  );
}

const useStyles = makeStyles(theme => ({
  bannerBox: {
    minWidth: 275,
    Height: 300 
  },
  InfoBox: {
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