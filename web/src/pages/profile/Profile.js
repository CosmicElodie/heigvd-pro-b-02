import React, {useContext} from 'react';
import { makeStyles, Card, CardActions, CardContent, Button, Typography, Avatar, Grid } from '@material-ui/core';
import { blue, blueGrey, HUE } from '@material-ui/core/colors';
import EditIcon from '@material-ui/icons/Edit';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { MainContext } from '../../context/MainContext';


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
  margin:{
    marginLeft: 100,
  },
  edit:{
    marginLeft: 100,
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


export default function SimpleCard() {
  const { user } = useContext(MainContext);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const bull = <span className={classes.bullet}>•</span>;

  const handleClick = () => {
    console.log('Le lien a été cliqué.');
    setOpen(prev => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };
  
  return (
    <div>
      <Card className={classes.bannerBox}>
        <CardContent className={classes.house} >
          <Grid container spacing={3}>
            <Grid item xs={10}>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                Profile
              </Typography>

              <Avatar className={classes.contour} > 
                <Avatar className={classes.large} > 
                  <img className={classes.resize} src={USER_DATA.img}>
                  </img>
                </Avatar>
              </Avatar>
            </Grid>
            <Grid item xs={1}>
              <img className={classes.banner} src={HOUSE_DATA.img}>
              </img>
            </Grid>
            
          </Grid>

        </CardContent>
  

      </Card>
        <Card className={classes.InfoBox}>
          <CardContent >
            <Typography variant="h5" component="h2">
              {bull}Info 
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              whesh gros
            </Typography>

            <Typography variant="body2" >
              
              <b>Nom :</b>
              <br />
              <span className={classes.margin}>{user.lastname}</span>
              <br />
              <b>Prenom :</b>
              <br />
              <span className={classes.margin}>{user.firstname}</span>
              <br />             
              <b>Birthdate :</b>
              <br />
              <span className={classes.margin}>{user.birth}</span>
              <br />
              <b>Created on :</b>
              <br />
              <span className={classes.margin}>{user.created}</span>
              <br />
              <b>Maison :</b>
              <br />
              <span className={classes.margin}>embedded computing</span>{/* faire que le json renvois aussi le nom de la maison*/}
              <br />       
              <ClickAwayListener onClickAway={ handleClickAway }>
                <div className={classes.wrapper}>
                  <b>Username :</b>
                  <br />
                  <span className={classes.margin} >{user.username}</span> <EditIcon style={{ fontSize: 10, color: blue[500] }} onClick={handleClick}/>     
                  <br />
                  <b>email :</b>
                  <br />
                  <span className={classes.margin}>{user.email}</span>/>
                </div>
              </ClickAwayListener>
              
            </Typography>

        </CardContent>
      </Card>
  </div>
  );
}

