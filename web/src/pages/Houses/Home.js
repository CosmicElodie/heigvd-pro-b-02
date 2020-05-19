import React, {useContext,useEffect} from 'react';
import {  makeStyles, Card,  CardContent,   Typography, Avatar, Grid, Button, Table, TableBody,TableCell, TableHead, TableContainer, TableRow, Paper } from '@material-ui/core';
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

  const classes = useStyles();
  const { user, setShowProfile } = useContext(MainContext);
  const [houseInfo, setHouseInfo] = React.useState();
  const [latestPost, setLatestPost] = React.useState();
  const [topContributor, setTopContributor] = React.useState();

  const handlePersonClick =(user) =>{
    setShowProfile(user);
  }

  const getHouseInfo = (e) => {
    let post_body = 
    "&house_id=" + e;
    fetch('http://localhost:8080/house/detail', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: post_body
        })
    .then(response => response.json())
    .then(response =>{

    setHouseInfo(response)    
  
    })
  }

  const getLatestPost = (e) => {
    let post_body = 
    "&house_id=" + e +
    "&nbPosts= " + 5; 
    
    fetch('http://localhost:8080/house/latestPost', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: post_body
        })
    .then(response => response.json())
    .then(response =>{

      setLatestPost(response)  
  
    })
  }

  var limit_house = 0;
  var limit_global = 0;
  function printLineGlobal( elementToPrint) {
    if ( limit_global < 15) {
        limit_global++;
          return <TableCell component="th" scope="row">
          {elementToPrint}
      </TableCell>
    }
    return;
  }

  useEffect(() => { 
    {user && user.house && getHouseInfo(user.house.house_id);}
    {user && user.house && getLatestPost(user.house.house_id);}
  }, [user]); 

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
                    {houseInfo && houseInfo.name}
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
                        {houseInfo && houseInfo.total_pts} 
                    </Typography>

                    </Avatar>   
                    </CardContent>
                </Card>       
                           
                <Card className="points" >
                      {
                        houseInfo && houseInfo.top_user[0] &&
                        <CardContent>
                            <Typography component="h1" variant="h4"spacing={10}>
                                Top Contributeur
                                <br/>
                              {houseInfo.top_user[0].points}
                            </Typography>
                        </CardContent> 
                      }

                      {
                      houseInfo && houseInfo.top_user[0] &&
                      <Button  size="small"onClick = { () => handlePersonClick(houseInfo.top_user[0])} >
                        <Avatar className={classes.large}> 
                          {<img height= {'100%'} src={houseInfo.top_user[0].avatar} alt= {houseInfo.top_user[0].initials}/> }
                        </Avatar>    
                      </Button>
                      }  
    
                      {
                      houseInfo && !houseInfo.top_user[0] &&
                        <Typography text-align="left" component="h1" variant="h4">
                          Aucun meilleur contributeur
                        </Typography>
                      } 
                  
                 
                    
                        
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
                               
                            <DisplayData name="Nombre de membres :" data = {houseInfo && houseInfo.nb_members}/>   
                            <DisplayData name="Nombre d'évenements :" data = {houseInfo && houseInfo.nb_events}/>    
                            <DisplayData name="Nombre de victoires :" data = {"????"}/>    
                            <DisplayData name="Nombre de sujets" data = {houseInfo && houseInfo.nb_subjects}/>  
                            <DisplayData name="Nombre de messages générés :" data = {houseInfo && houseInfo.nb_posts}/>  
                            
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

                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Sujet</TableCell>
                                        <TableCell align="left">Autheur</TableCell>
                                        <TableCell align="left">message</TableCell>
                                        <TableCell align="left">Date</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {latestPost && latestPost.map(({created,creator,message,last_update,name_subject,forum_post_id,subject_answer}) =>
                                        <TableRow /* key={name} */>
                                          {printLineGlobal(name_subject)}                                          
                                          {printLineGlobal(creator.firstname)}    
                                          {printLineGlobal(message)}        
                                          {printLineGlobal(last_update)}
                                        </TableRow>
                                )}
                                </TableBody>
                            </Table>
                        </TableContainer>

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

