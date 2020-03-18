import React, { useState } from 'react';
import { makeStyles, Card, CardActions, CardContent, Button, Typography, Avatar, Grid } from '@material-ui/core';
import { indigo, blueGrey, HUE } from '@material-ui/core/colors';
import EditIcon from '@material-ui/icons/Edit';



const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 275,
    Height: 300 
  },
  root2: {
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
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <div>
      <Card className={classes.root}>
        <CardContent className={classes.house} >
          <Grid container spacing={3}>
            <Grid item xs={10}>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                Profile
              </Typography>

              <Avatar className={classes.contour} classes > 
                <Avatar className={classes.large} classes > 
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
        <Card className={classes.root2}>
          <CardContent >
            <Typography variant="h5" component="h2">
              {bull}Info 
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              whesh gros
            </Typography>

            <Typography variant="body2" component="p">
              
              <b>Nom:</b>
              <br />
              <span class={classes.margin}>Triponez</span>
              <br />
              <b>Prenom:</b>
              <br />
              <span class={classes.margin}>Michael</span>
              <br />
              <b>Username:</b>
              <br />
              <span class={classes.margin}>Mich</span> <EditIcon style={{ fontSize: 10 }} />     
              <br />
              <b>Maison:</b>
              <br />
              <span class={classes.margin}>embedded computing</span>
              <br />
              <b>Passions:</b>
              <br />
              <span class={classes.margin}>Bulles de savon</span> <EditIcon style={{ fontSize: 10 }} /> 
              
              <br />
              <b>Truc:</b>
              <br />
              <span class={classes.margin}>machin</span> <EditIcon style={{ fontSize: 10 }} />          
              <br />
              <b>Bidule:</b>
              <br />
              <span class={classes.margin}>blabla</span> <EditIcon style={{ fontSize: 10 }} /> 
              
            </Typography>

        </CardContent>
      </Card>
  </div>
  );
}

