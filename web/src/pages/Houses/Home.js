import React, {useContext} from 'react';
import {  makeStyles, Card,  CardContent,  Typography, Avatar, Grid } from '@material-ui/core';
import { MainContext } from '../../context/MainContext';
import "../../css/Houses.css";



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




export default function ModalProfile() {


  const { user, } = useContext(MainContext);
  const classes = useStyles();
  

  return (

    <div class="parent">
            <div class="div1" > 
            <Card  class="banner" >
                <CardContent  >
                    
                </CardContent>
            </Card>

            </div>
            <div class="div2">
            
                <Typography component="h1" variant="h1"spacing={10}>
                    MY HOUSE
                </Typography>
            </div>
            <div class="div3">
             </div>
            <div class="div4">             
                <Card className="points" >
                    <CardContent  > 
                                        
                        <Typography component="h1" variant="h4"spacing={10}>
                            Points
                        </Typography>
                    <Avatar className={classes.large}> 
                    <Typography component="h1" variant="h4"spacing={10}>
                            2580 pts 
                        </Typography>

                    </Avatar>   
                    </CardContent>
                </Card>       
                           
                <Card className="points" >
                <CardContent  >
                    <Typography component="h1" variant="h4"spacing={10}>
                        Top Contributeur
                        <br/>
                        520 Pts
                    </Typography>
                </CardContent> 

                    <Avatar className={classes.large}> 
            
                    </Avatar>   
                        
                </Card>     
            </div>
            <div class="div5">             
            <Card className="info" >
                    <CardContent >
                        
                        <Typography text-align="left" component="h1" variant="h4">
                            Info
                        </Typography>
                        <br />
                        <br />
                        <Typography  >                     
                               
                            <DisplayData name="# Membres :" data = {user.email}/>   
                            <DisplayData name="# d'évenements :" data = {user.firstname}/>    
                            <DisplayData name="# victoires :" data = {user.birth}/>    
                            <DisplayData name="# Sujets" data = {user.house && user.house.name}/>  
                            <DisplayData name="# Messages générés :" data = {user.lastname}/>  
                            
                        </Typography>   
                    </CardContent>
                </Card>  
                <Card >
                    <CardContent >
                        <Typography component="h1" variant="h4"spacing={10}>
                            Messages Récents
                        </Typography>
                        <br />
                        <br />
                        
                    </CardContent>
                </Card>      
            </div>            
        </div> 
  );
}

const useStyles = makeStyles(theme => ({




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
    backgroundImage :  `url()`,
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
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

