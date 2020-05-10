import React, {useContext,useEffect} from 'react';
import { TextField, makeStyles, Card,  CardContent, Button,  Typography, Avatar, Grid,CardMedia } from '@material-ui/core';
import { blue, blueGrey } from '@material-ui/core/colors';
import EditIcon from '@material-ui/icons/Edit';
import { MainContext } from '../../context/MainContext';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import { useHistory } from "react-router-dom";
import "../../css/Houses.css";




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




export default function ModalProfile() {


  let history = useHistory(); // hook that allows URL change -> navigation
  const redirectPage = (link) => {
    history.push(link);    
  }; 
  const [modalStyle] = React.useState(getModalStyle);
  const [openPwdEdit, setOpenPwdEdit] = React.useState(false);
  const [openPPEdit, setOpenPPEdit] = React.useState(false);

  const [img, setImg] = React.useState('');
  const [imgName, setImgName] = React.useState('');
  const { user, setUser, setDialog } = useContext(MainContext);
  const classes = useStyles();
  



  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  const handlePwdEditOpen = () => {
    setOpenPwdEdit(true);
  };

  const handlePPEditOpen = () => {
    setOpenPPEdit(true);
  };

  const handleClose = () => {
    setOpenPwdEdit(false);
    setOpenPPEdit(false);
  };

  const handleSave = (files) => {    
    //Saving files to state for further use and closing Modal.
    
    //setImg(files)
    
    //imageBase64Data
    const currentFile = files[0]
    const reader = new FileReader()
    reader.addEventListener("load", ()=>{        
      setImg({
        name: user.lastname,
        data: reader.result})    
      setUser((latest) => ({ ...latest, avatar: reader.result }))
    },false)   
    reader.readAsDataURL(currentFile)
    setOpenPPEdit(false)
    
  }



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

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
