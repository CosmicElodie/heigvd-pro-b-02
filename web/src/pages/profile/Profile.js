import React, {useContext,useEffect} from 'react';
import { makeStyles, Card,  CardContent, Button, Typography, Avatar, Grid } from '@material-ui/core';
import { blue, blueGrey } from '@material-ui/core/colors';
import EditIcon from '@material-ui/icons/Edit';
import { MainContext } from '../../context/MainContext';
import {    CssBaseline,  Paper,   } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';


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

const HOUSE_DATA = {
  name: 'Michael Triponez',
  img : 'https://c1-ebgames.eb-cdn.com.au/merchandising/images/packshots/594355e64e564fb6bdcc760f8e2cc8e6_Large.png',
  username: 'Mich'
}


export default function Profile() {
  const { user, setDialog, setShownUser,setShowProfile } = useContext(MainContext);

  const tst = user ;
  const classes = useStyles();
  const SPACING = 3;
  const [open, setOpen] = React.useState(false);
  const bull = <span className={classes.bullet}>•</span>;

  const handleClick = () => {
    console.log('Le lien a été cliqué.');
    setOpen(prev => !prev);
  };

  const bla =() =>{
    setShowProfile( { show_profile : {
      is_open: true
  }});
  }

  const handleClickAway = () => {
    setOpen(false);
  };
  

  

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

              <Avatar className={classes.contour} > 
                <Avatar className={classes.large} > 
                  <img className={classes.resize} src={user.avatar}>
                  </img>
                </Avatar>
              </Avatar>
            </Grid>
            <Grid item>
              <img className={classes.banner} src={HOUSE_DATA.img}>
              </img>
            </Grid>
            
          </Grid>

        </CardContent>
      </Card>

        <Card className={classes.InfoBox}>
          <CardContent >
                        <Grid className={classes.grid_container} item component={Paper} elevation={0}>
                          <div className={classes.paper}>
                            
                            
                            
                            <Typography component="h1" variant="h4"spacing={10}>
                              Info
                            </Typography>

                            <br />
                            <br />

                          <Typography component="h1" >
                            <Grid container spacing={SPACING}>
                                <Grid item xs>
                                <b>Nom :</b>  
                                </Grid>
                                <Grid item>
                                  <span >{user.lastname}</span>
                                </Grid>
                              </Grid>
                              
                              <Grid container spacing={SPACING}>
                                <Grid item xs>
                                <b>Prenom :</b>
                                </Grid>
                                <Grid item>
                                 <span >{user.firstname}</span>
                                </Grid>
                              </Grid>
                              
                              <Grid container spacing={SPACING}>
                                <Grid item xs>
                                <b>Birthdate :</b>
                                </Grid>
                                <Grid item>
                                <span >{user.birth}</span>              
                                </Grid>
                              </Grid>
                              
                              <Grid container spacing={SPACING}>
                                <Grid item xs>
                                <b>Maison :</b> 
                                </Grid>
                                <Grid item>
                                <span >{user.house && user.house.name} </span>
                                </Grid>
                              </Grid>
                              
                              <Grid container spacing={SPACING}>
                                <Grid item xs>
                                <b>Username :</b>  
                                </Grid>
                                <Grid item>

                                  
                                <IconButton aria-label="edit"  size="small">
                                  <EditIcon style={{ fontSize: 10, color: blue[500] }} onClick={handleClick}/>  
                                </IconButton>
                                
                                <span >{user.username}</span> 
                                </Grid>
                              </Grid>

                              <Grid container spacing={SPACING}>
                                <Grid item xs>
                                <b>email :</b>
                                </Grid>
                                <Grid item>
                                <span >{user.email}</span>
                                </Grid>
                              </Grid>
                            </Typography>
                          
                       
                          </div>
                        </Grid>
                      
                 


        </CardContent>
      </Card>
  </div>
  );
}