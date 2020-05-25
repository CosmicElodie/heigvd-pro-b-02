import React, { useContext, useEffect } from 'react';
import { makeStyles, Card, CardContent, Typography, Avatar, Grid, Button, Table, TableBody, TablePagination, TableCell, TableHead, TableContainer, TableRow, Paper } from '@material-ui/core';
import { MainContext } from '../../context/MainContext';
import "../../css/Houses.css";





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




export default function ModalProfile() {

  const classes = useStyles();
  const { user, setShowProfile } = useContext(MainContext);
  const [houseInfo, setHouseInfo] = React.useState();
  const [houseBanner, setHouseBanner] = React.useState();
  const [houseColor, setHouseColor] = React.useState();
  const [latestPost, setLatestPost] = React.useState();
  const [size, setSize] = React.useState();
  const [topContributor, setTopContributor] = React.useState();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  let root = document.documentElement;

  const handlePersonClick = (user) => {
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
      .then(response => {

        setHouseInfo(response)

      })
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
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
      .then(response => {

        setLatestPost(response)

      })
  }

  var limit_global = 0;
  function printLineGlobal(elementToPrint) {

    limit_global++;
    return <TableCell component="th" scope="row">
      {elementToPrint}
    </TableCell>

    return;
  }

  useEffect(() => {
    { user && user.house && getHouseInfo(user.house.house_id); }
    { user && user.house && getLatestPost(user.house.house_id); }
    { user && user.house && setHouseBanner('url(\'http://localhost:8080/content/' + user.house.name + '.png\')') }
    { user && user.house && setHouseColor(chooseHouseColor(user.house.house_id)) }
  }, [user]);

  { houseBanner && root.style.setProperty('--house-banner', houseBanner) };
  { houseColor && root.style.setProperty('--house-color', houseColor) };

  function chooseHouseColor(idOfHouse) {
    switch (idOfHouse) {
      case 1: return "#8dcbc1";
      case 2: return "#f0abbe";
      case 3: return "#af92c7";
      case 4: return "#8bd0eb";
      case 5: return "#f0dd8d";
      default: return "";
    }
  }

  return (
    <Grid container spacing={2} alignItems="stretch" direction="row" justify="space-evenly">
      {/*IMAGE ORIENTATION + TITRE */}
      <Grid item xs={12}>
        <h1 class="house-title">
          {user && user.house && <img src={"http://localhost:8080/content/" + user.house.name + ".png"} width="450px" />}
          <br />
          {houseInfo && houseInfo.name.toUpperCase()}
          <br/>
          <br/>
          C'est moche :)
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
              <DisplayData name="Nombre de victoires :" data={"????"} />
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
              <Avatar className={classes.large}>
                <Typography component="h1" variant="h4" spacing={10}>
                  {houseInfo && houseInfo.points_month}
                </Typography>
              </Avatar>
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
                    {<img height={'100%'} src={houseInfo.top_user.avatar} alt={houseInfo.top_user.initials} />}
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
              <Typography component="h1" variant="h4" spacing={10}>
                {houseInfo.top_user.points_month} pts
              </Typography>
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
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Sujet</TableCell>
                    <TableCell align="left">Auteur</TableCell>
                    <TableCell align="left">message</TableCell>
                    <TableCell align="left" style={{ minWidth: 110 }}>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {latestPost && latestPost
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(({ created, creator, message, last_update, name_subject, forum_post_id, subject_answer }) =>
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

            {latestPost &&
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                count={latestPost.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            }

          </CardContent>
        </Card>
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

