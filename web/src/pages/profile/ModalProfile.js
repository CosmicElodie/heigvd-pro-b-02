import React, {useContext, useEffect} from 'react';
import { makeStyles, Card,  CardContent,  Typography, Avatar, Grid, Button } from '@material-ui/core';
import { blue, blueGrey } from '@material-ui/core/colors';
import EditIcon from '@material-ui/icons/Edit';
import { MainContext } from '../../context/MainContext';
import ModalProfile from './ModalProfile';
import IconButton from '@material-ui/core/IconButton';

import {DropzoneDialog} from 'material-ui-dropzone'

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

  
  const [img, setImg] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const { user, setUser } = useContext(MainContext);
  const classes = useStyles();
  const SPACING = 3;

  const handleOpen =(user) =>{
    setOpen(true)
  }
  const handleClose =(user) =>{
    setOpen(false)
  }

  const handleSave = (files) => {
    //Saving files to state for further use and closing Modal.

    setImg(files);
    setOpen(false)
    //imageBase64Data
    const currentFile = files[0]
    const reader = new FileReader()
    reader.addEventListener("load", ()=>{
      console.log(reader.result)
      setImg(reader.result)
      setUser({avatar: reader.result})
    },false)   
    reader.readAsDataURL(currentFile)
    
}

  return (
    <div>
      <Card className={classes.bannerBox}>
        <CardContent className={classes.house} >
          <Grid container spacing={3}>
            <Grid item xs>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                TEST PAGE
              </Typography>

              <Avatar className={classes.contour}> 
                {
                  user.avatar &&
                  <Avatar className={classes.large} > 
                    <img height= {'100%'} src={user.avatar} alt="No img"/>
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

    
      <Button onClick={handleOpen}>
                  Add Image
      </Button>
      
      <DropzoneDialog
          open = {open}
          onSave = {handleSave}
          acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
          showPreviews={true}
          maxFileSize={5000000}
          showAlerts ={true}
          onClose={handleClose}
      />
      <br/>
    { <img className={classes.image} src={img} alt="No img" /> }

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