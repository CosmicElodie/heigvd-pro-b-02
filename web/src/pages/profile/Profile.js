import React, { useContext, useEffect } from 'react';
// nodejs library that concatenates classes
import classNames from "classnames";


import { TextField, makeStyles, Card, CardContent, Button, Typography, Avatar, Grid } from '@material-ui/core';

import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import Parallax from "../../components/Parallax/Parallax.js";

import styles from "../../assets/jss/material-kit-react/views/profilePage.js";
import profile from "../../assets/img/faces/christian.jpg"

import { blue, blueGrey } from '@material-ui/core/colors';
import EditIcon from '@material-ui/icons/Edit';
import { MainContext } from '../../context/MainContext';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import { useInput } from '../../hooks/input';
import { DropzoneDialog } from 'material-ui-dropzone'
import "../../css/Profile.css";
import { appConfig } from "../../config/appConfig"


const useStyles = makeStyles(styles);



/* Displays data (name and corresponding data) */
function DisplayData(props) {
  return (
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




export default function ProfilePage(props) {
  const classes = useStyles();
  const [openPwdEdit, setOpenPwdEdit] = React.useState(false);
  const [openPPEdit, setOpenPPEdit] = React.useState(false);


  const { value: oldPassword, bind: bindOldPassword, setError: setErrorOldPassword } = useInput('');
  const { value: newPassword, bind: bindNewPassword, setError: setErrorNewPassword } = useInput('');
  const { value: verifyPassword, bind: bindVerifyPassword, setError: setErrorVerifyPassword } = useInput('');

  const [img, setImg] = React.useState('');
  const { user, setUser, setDialog } = useContext(MainContext);
  const [houseBanner, setHouseBanner] = React.useState();
  const [userInfo, setUserInfo] = React.useState();
  let root = document.documentElement;


  useEffect(() => {
    if (img) {
      submitImage();
      getUserInfo();
    }
  }, [img]);

  useEffect(() => {
    if (user) {
      user.house && setHouseBanner('url(\'' + appConfig.content_url + user.house.name + '.png\')')
      user.user_id && getUserInfo()
    }
  }, [user]);


  houseBanner && root.style.setProperty('--house-banner', houseBanner);

  const getUserInfo = (e) => {
    let post_body =
      "&user_id=" + user.user_id;
    fetch(appConfig.api_url + 'profile/all', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: post_body
    })
      .then(response => response.json())
      .then(response => {

        setUserInfo(response)
      })
  }

  const submitImage = (e) => {
    let post_body =
      "&user_id=" + user.user_id  +
      "&img_name=" + img.name +
      "&avatar=" + img.data;


    fetch(appConfig.api_url + 'profile/update_avatar', {
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
            [response.dialog_id]: { is_open: true }
          }));
        }
      })

  }


  const submitPassword = (e) => {

    if (newPassword !== verifyPassword) {
      setErrorNewPassword({
        error: true,
        helperText: 'Les mots de passe ne correspondent pas'
      });
      setErrorVerifyPassword({
        error: true,
      });
      return
    }

    let post_body =
      "&user_id=" + user.user_id +
      "&old_password=" + oldPassword +
      "&new_password=" + newPassword

    fetch(appConfig.api_url + 'profile/update_password', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: post_body
    })
      .then(response => response.json())
      .then(response => {
        if (response.status === 'error') {
          response.dialog_id === 'old_password_invalid' && setErrorOldPassword({
            error: true,
            helperText: 'Mot de passe incorrect'
          });
          response.dialog_id === 'empty_password' && setErrorNewPassword({
            error: true,
            helperText: 'Le mot de passe ne peut etre vide'
          });
          response.dialog_id === 'empty_password' && setErrorVerifyPassword({
            error: true,
            helperText: 'Le mot de passe ne peut etre vide'
          });
        }
        if (response.status === 'ok') {
          setOpenPwdEdit(false)
          setDialog((latest) => ({
            ...latest,
            [response.dialog_id]: { is_open: true }
          }));

        }
      })
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
    reader.addEventListener("load", () => {
      setImg({
        name: user.firstname + '_' +user.lastname,
        data: reader.result
      })
      setUser((latest) => ({ ...latest, avatar: reader.result }))
    }, false)
    reader.readAsDataURL(currentFile)
    setOpenPPEdit(false)

  }

  const body = (
    <Grid>
      <Card>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Ancien mot de passe"
          {...bindOldPassword}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="nouveau mot de passe"
          {...bindNewPassword}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Confimez votre nouveau mot de passe"
          {...bindVerifyPassword}
        />
        <br /> <br />
        <Button
          type="submit"
          variant="text"
          color="primary"
          className={classes.submit}
          onClick={submitPassword}
        >
          Valider
            </Button>
      </Card>
    </Grid>
  );


  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid,
  );





  return (

    <main>

      <Parallax /*small */ filter image={require("../../assets/img/profile-bg.jpg")} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div>
                    <IconButton aria-label="edit" size="medium" onClick={handlePPEditOpen}>
                      {userInfo && userInfo.avatar && <img src={appConfig.content_url + userInfo.avatar} alt="..." className={imageClasses} />}
                    </IconButton>
                  </div>
                  <div className={classes.name}>
                    <h3 className={classes.title}>{user.firstname + ' ' + user.lastname}</h3>
                    <h6><section className={classes.status}>
                      {user.access_level === 25 && <section className={classes.personStatus + " person-status person-access-prefet"} />}
                      {user.access_level === 50 && <section className={classes.personStatus + " person-status person-access-moderator"} />}
                      {user.access_level === 75 && <section className={classes.personStatus + " person-status person-access-admin"} />}
                      {user.access_level === 0 && "Utilisateur"}
                      {user.access_level === 25 && "Préfet"}
                      {user.access_level === 50 && "Moderateur"}
                      {user.access_level === 75 && "Administrateur"}
                    </section></h6>
                    <Grid container spacing={2} direction="row" justify="space-between" alignItems="stretch">
                      {/* INFORMATIONS */}
                      <Grid item xs={12}>
                        <p align="justify">
                          <DisplayData name="Nom :" data={user.lastname} />
                          <DisplayData name="Prénom :" data={user.firstname} />
                          <DisplayData name="Statut :" data={userInfo && userInfo.status.name} />
                          <DisplayData name="Naissance :" data={user.birth} />
                          <DisplayData name="Maison :" data={user.house && user.house.name} />
                          <DisplayData name="E-mail :" data={user.email} />
                          <DisplayData name="Mot de passe :" data={
                            <IconButton aria-label="edit" size="small" onClick={handlePwdEditOpen}>
                              Modifier
                                  <EditIcon style={{ fontSize: 10, color: blue[500] }} />

                            </IconButton>
                          } />
                          <DisplayData name="Points (mensuel) :" data={userInfo && userInfo.points_month} />
                          <DisplayData name="Points (Annuel) :" data={userInfo && userInfo.points_year} />
                        </p>

                        <Modal
                          open={openPwdEdit}
                          onClose={handleClose}
                          aria-labelledby="simple-modal-title"
                          aria-describedby="simple-modal-description"
                        >
                          {body}
                        </Modal>

                        <DropzoneDialog
                          open={openPPEdit}
                          filesLimit={1}
                          onSave={handleSave}
                          acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                          showPreviews={true}
                          maxFileSize={5000000}
                          showAlerts={true}
                          onClose={handleClose}
                        />
                        <br />
                      </Grid>
                    </Grid>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      </main>
    
  );
}
