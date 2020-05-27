import React, { useContext, useEffect } from 'react';
import { makeStyles, Card, CardContent, Typography, Avatar, Grid, Button, } from '@material-ui/core';
import { MainContext } from '../../context/MainContext';
import "../../css/Houses.css";
import {appConfig} from "../../config/appConfig"


import MUIDataTable from "mui-datatables";
import moment from 'moment';

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

const columns = [
  { name: 'name_section', label: 'Section', options: { filter: false, sort: true, } },
  { name: 'name_subject', label: 'Sujet', options: { filter: false, sort: true, } },
  { name: 'creator', label: 'Auteur', options: { filter: false, sort: true, } },
  { name: 'message', label: 'message', options: { filter: true, sort: true, } },
  { name: 'last_update', label: 'Nb Date', options: { filter: false, sort: true, } },
];

export default function ModalProfile() {

  const classes = useStyles();
  const { user, setShowProfile } = useContext(MainContext);
  const [houseInfo, setHouseInfo] = React.useState();
  const [houseBanner, setHouseBanner] = React.useState();
  const [houseColor, setHouseColor] = React.useState();
  const [houseBgColor, setHouseBgColor] = React.useState();
  const [latestPost, setLatestPost] = React.useState();
  let root = document.documentElement;

  const handlePersonClick = (user) => {
    setShowProfile(user);
  }

  var reformatData = function (data) {
    return data.map(function (data) {
      // create a new object to store full name.
      var newObj = {};

      newObj["name_section"] = data.name_section
      newObj["creator"] = data.creator.firstname + ' ' + data.creator.lastname
      newObj["message"] = data.message
      newObj["last_update"] = moment(data.last_update).format('DD/MM/YYYY HH:mm')
      newObj["name_subject"] = data.name_subject
      // return our new object.
      return newObj;
    });
  };

  const options = {

    filterType: 'checkbox',
    print: "",
    selectableRows: 'none',
    filter: "",
    search: "",
    download: "",
    viewColumns: "",
    pagination: "",
  };

  const getHouseInfo = (e) => {
    let post_body =
      "&house_id=" + e;
    fetch(appConfig.api_url + 'house/detail', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: post_body
    })
      .then(response => response.json())
      .then(response => {

        setHouseInfo(response)

      })
  }

  const getLatestPost = (e) => {
    let post_body =
      "&house_id=" + e +
      "&nbPosts= " + 5;

    fetch(appConfig.api_url + 'house/latestPost', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: post_body
    })
      .then(response => response.json())
      .then(response => {

        setLatestPost(response)

      })
  }
  useEffect(() => {
    if (user && user.house) {
      getHouseInfo(user.house.house_id);
      getLatestPost(user.house.house_id);
      setHouseBanner('url(\''+ appConfig.content_url + user.house.name + '.png\')');
      setHouseColor(chooseFontHouseColor(user.house.house_id));
      setHouseBgColor(chooseBackgroundHouseColor(user.house.house_id));
    }
  }, [user]);

  if (user && user.house) {
    houseBanner && root.style.setProperty('--house-banner', houseBanner);
    houseColor && root.style.setProperty('--house-color', houseColor);
    houseBgColor && root.style.setProperty('--house-bg-color', houseBgColor);
  }

  function chooseFontHouseColor(idOfHouse) {
    switch (idOfHouse) {
      case 1: return "#8dcbc1";
      case 2: return "#f0abbe";
      case 3: return "#af92c7";
      case 4: return "#8bd0eb";
      case 5: return "#f0dd8d";
      default: return "";
    }
  }

  function chooseBackgroundHouseColor(idOfHouse) {
    switch (idOfHouse) {
      case 1: return "#EEFFFC";
      case 2: return "#FEEBF0";
      case 3: return "#F7EEFF";
      case 4: return "#EBF9FF";
      case 5: return "#FFFCF2";
      default: return "";
    }
  }

  return (
    <Grid container spacing={2} alignItems="stretch" direction="row" justify="space-evenly">
      {/*IMAGE ORIENTATION + TITRE */}
      <Grid item xs={12}>
        <h1 class="house-title">
          {user && user.house && <img src={appConfig.content_url  + user.house.name + ".png"} width="450px" alt="" />}
          <br />
          {houseInfo && houseInfo.name.toUpperCase()}
          <br />
          <br />

        </h1>
      </Grid>
      {/* INFORMATIONS GÉNÉRALES */}
      <Grid item xs={12}>
        <Card className="info" >
          <CardContent >
            <h2 class="house-subtitle">Informations générales</h2>
            <Typography>
              <DisplayData name="Nombre de membres :" data={houseInfo && houseInfo.nb_members} />
              <DisplayData name="Nombre d'évenements :" data={houseInfo && houseInfo.nb_events} />
              <DisplayData name="Nombre de victoires :" data={houseInfo && houseInfo.nb_victory} />
              <DisplayData name="Nombre de sujets" data={houseInfo && houseInfo.nb_subjects} />
              <DisplayData name="Nombre de messages générés :" data={houseInfo && houseInfo.nb_posts} />
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* POINTS */}
      <Grid item xs={12} sm={6}>
        <Card style={{ height: "100%" }}>
          <CardContent>
            <h2 class="house-subtitle">Points</h2>
            <center>
              {
                /*
                              <Avatar className={classes.large}>
                  {houseInfo && houseInfo.points_month}
              </Avatar>
                */
              }
              <h3 class="points-font">{houseInfo && houseInfo.points_month}</h3>
            </center>
          </CardContent>
        </Card>
      </Grid>

      {/* TOP CONTRIBUTEUR */}
      <Grid item xs={12} sm={6}>
        <Card>
          <CardContent  >
            {
              houseInfo && houseInfo.top_user &&
              <h2 class="house-subtitle">Top contributeur</h2>
            }
            {
              houseInfo && houseInfo.top_user &&
              <center>
                <Button size="small" onClick={() => handlePersonClick(houseInfo.top_user)} >
                  <Avatar className={classes.large}>
                    {<img height={'100%'} src={appConfig.content_url + houseInfo.top_user.avatar} alt={houseInfo.top_user.initials} />}
                  </Avatar>
                </Button></center>
            }

            {
              houseInfo && !houseInfo.top_user &&
              <Typography text-align="left" component="h1" variant="h4">
                Aucun meilleur contributeur
              </Typography>
            }

            {
              houseInfo && houseInfo.top_user && 
              <h3 class="points-font">{houseInfo.top_user.points_month} pts</h3>

            }

          </CardContent>
        </Card>
      </Grid>

      {/* MESSAGES RECENTS */}
      <Grid item xs={12}>
        <Card >
          <CardContent >
            <h2 class="house-subtitle">Messages Récents</h2>
            <br /><br />
            {
              latestPost && <MUIDataTable
                data={reformatData(latestPost)}
                columns={columns}
                options={options}
              />
            }
          </CardContent>
        </Card>
        <center><h1>Événements créés </h1></center>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles(theme => ({

  blason: {
    width: '100%',
    height: '100%',
    ObjectFit: 'cover',
    overflow: 'hidden',
  },
  pos: {
    marginBottom: 12,
  },
  resize: {
    scale: 2,
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
  house: {
    backgroundImage: `url(hou)`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    alignItems: 'center',
  },
  banner: {
    height: 200,
    width: 250,
    alignItems: 'right',
  },

  wrapper: {
    position: 'relative',
  },

  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  card: {
    height: "100%",
    display: 'flex',
    flexDirection: 'column',
  },
}));