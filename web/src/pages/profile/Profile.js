import React, {useContext,useEffect} from 'react';
import { TextField, makeStyles, Card,  CardContent, Button,  Typography, Avatar, Grid } from '@material-ui/core';
import { blue, blueGrey } from '@material-ui/core/colors';
import EditIcon from '@material-ui/icons/Edit';
import { MainContext } from '../../context/MainContext';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import { useInput } from '../../hooks/input';
import {DropzoneDialog} from 'material-ui-dropzone'
import { useHistory } from "react-router-dom";
import "../../css/Profile.css";



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

  
  const { value:oldPassword,      bind:bindOldPassword,      setError:setErrorOldPassword}                  = useInput('');
  const { value:newPassword,      bind:bindNewPassword,      setError:setErrorNewPassword}                  = useInput('');
  const { value:verifyPassword,   bind:bindVerifyPassword,   setError:setErrorVerifyPassword}               = useInput('');

  const [img, setImg] = React.useState('');
  const [imgName, setImgName] = React.useState('');
  const { user, setUser, setDialog } = useContext(MainContext);
  const [houseBanner, setHouseBanner] = React.useState();  
  const [userInfo, setUserInfo] = React.useState();
  const classes = useStyles();
  let root = document.documentElement;
  

  useEffect(() => { 
    { img && submitImage()}
    { img && getUserInfo()}
  }, [img]); 
   
  useEffect(() => { 
    {user && user.house && setHouseBanner('url(\'http://localhost:8080/content/' + user.house.name + '.png\')')}
    {user && user.user_id && getUserInfo()}
  }, [user]); 


{houseBanner && root.style.setProperty('--house-banner', houseBanner)};

const getUserInfo = (e) => {
  let post_body = 
  "&user_id=" + user.user_id;
  fetch('http://localhost:8080/profile/all', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: post_body
      })
  .then(response => response.json())
  .then(response =>{

    setUserInfo(response)    
  })
}

const submitImage = (e) => {
  let post_body = 
  "&user_id=" + user.user_id +
  "&img_name=" + img.name +
  "&avatar=" + img.data;


  fetch('http://localhost:8080/profile/update_avatar', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: post_body
      })
  .then(response => response.json())
  .then(response => {
      if (response.status === 'ok') {
        setDialog((latest) => ({
          ...latest,
          [response.dialog_id] : { is_open : true }
        }));
      } 
  })

}


const submitPassword = (e) => {

  if(newPassword !== verifyPassword){
    setErrorNewPassword({
      error:true,
      helperText: 'Les mots de passe ne correspondent pas'
    });        
    setErrorVerifyPassword({
      error:true,
    });  
    return
  }

  let post_body = 
  "&user_id=" + user.user_id +
  "&old_password=" + oldPassword +
  "&new_password=" + newPassword 

  fetch('http://localhost:8080/profile/update_password', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: post_body
      })
  .then(response => response.json())
  .then(response => {
      if (response.status === 'error') {
        response.dialog_id === 'old_password_invalid' && setErrorOldPassword({
          error:true,
          helperText: 'Mot de passe incorrect'
        });        
        response.dialog_id === 'empty_password' && setErrorNewPassword({
          error:true,
          helperText: 'Le mot de passe ne peut etre vide'
        });    
        response.dialog_id === 'empty_password' && setErrorVerifyPassword({
          error:true,
          helperText: 'Le mot de passe ne peut etre vide'
        }); 
      } 
      if(response.status === 'ok') {
        setOpenPwdEdit(false)
        setDialog((latest) => ({
          ...latest,
          [response.dialog_id] : { is_open : true }
        }));
        
      }
  })
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

  const body = (
    <div style={modalStyle} className={classes.paper}>
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Ancien mot de passe"
            { ...bindOldPassword }
        />
        <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="nouveau mot de passe"
              { ...bindNewPassword }
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Confimez votre nouveau mot de passe"
            { ...bindVerifyPassword }
          />
          <br/>
          <br/>
          <div align = "right">
            <Button
                type="submit"
                variant="text"
                color="primary"
                className={classes.submit}
                onClick= { submitPassword }
            >
              Valider
            </Button>
          </div>
          
    </div>
  );


  return (
    <div>
        <Card class="TopBanner">
          <CardContent className={classes.house} >
            <Grid container spacing={3}>
              <Grid item xs>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  Profile
                </Typography>

                <IconButton aria-label="edit"  size="small"onClick = {handlePPEditOpen}>
                             
                      {
                        userInfo && userInfo.avatar &&
                        <Avatar className={classes.contour} src = {userInfo.avatar}> 
                        </Avatar>
                      }

                      {
                        !user.avatar &&
                        <Avatar className="avatar"> { user.initials } </Avatar> 
                      }
                </IconButton>
              </Grid>
              <Grid item>
                
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
              <Typography  >                     
                <DisplayData name="Nom :" data = {user.lastname}/>    
                <DisplayData name="Prenom :" data = {user.firstname}/>    
                <DisplayData name="Naissance :" data = {user.birth}/>    
                <DisplayData name="Maison :" data = {user.house && user.house.name}/>    
                <DisplayData name="Email :" data = {user.email}/>    
                <DisplayData name="Mot de passe :" data = {
                <IconButton aria-label="edit"  size="small"onClick = {handlePwdEditOpen}>
                  Modifier        
                    <EditIcon style={{ fontSize: 10, color: blue[500] }} /> 
                      
                  </IconButton>
                }/> 
                <DisplayData name="Points (mensuel) :" data = {userInfo && userInfo.points_month}/>                   
                <DisplayData name="Points (Annuel) :" data = {userInfo && userInfo.points_year}/>
              </Typography>   
              
              <Modal
                    open={openPwdEdit}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    >
                    {body}
              </Modal>

              <DropzoneDialog
                  open = {openPPEdit}
                  filesLimit = {1}
                  onSave = {handleSave}
                  acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                  showPreviews={true}
                  maxFileSize={5000000}
                  showAlerts ={true}
                  onClose={handleClose}
              />
            
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
