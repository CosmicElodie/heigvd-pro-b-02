import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {
    Card, CardContent, CardMedia,
    CssBaseline,
    Grid,
    Table, TableBody, TableCell, TableHead, TableContainer, TableRow,
    Paper
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    card: { //dans la carte
        minWidth: '450px',
        minHeight: '400px',
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10
    },
    cardMedia: {
        paddingTop: '0%',
        flexDirection: 'row',
        justify: 'space-evenly',
        width: 'auto',
        height: 'auto',
    },
    cardContent: {
        flexGrow: 1
    }
}));

export default function Home() {

    //const {user} = useContext(MainContext);
    const classes = useStyles();

    //const [ data, setData ] = useState(); //mettre json à la place de useState
    const [topUserYearly, setTopUserYearly] = React.useState();
    const [topUserMonthly, setTopUserMonthly] = React.useState();

    var rankIL = 1;


    const getTopUsersYearly = (e) => {
      let post_body =
          "&house_id=" + e;
      fetch('http://localhost:8080/auditoire/yearly', 
      { //pour l'instant yearly envoie tous les users toutes maisons confondues.
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: post_body
      })
          .then(response => response.json())
          .then(response => { setTopUserYearly(response)})
  }

  const getTopUsersMonthly = (e) => {
    let post_body =
        "&house_id=" + e;
    fetch('http://localhost:8080/auditoire/monthly', { //pour l'instant yearly envoie tous les users toutes maisons confondues.
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: post_body
    })
        .then(response => response.json())
        .then(response => { setTopUserMonthly(response)})
}

    function displayLine(rank, firstname, lastname, house, points_year)
    {
        if(rank <= 5)
        {
            return(<TableRow  >
                <TableCell>{rankIL++}</TableCell>
                <TableCell>{firstname + ' ' + lastname}</TableCell>
                <TableCell>{house.name}</TableCell>
                <TableCell>{points_year}</TableCell>
            </TableRow>

            );
        }
    }

    const displayHouse = (name, topUser) => {
        return (

            <Card className={classes.card}>
                <Typography gutterBottom variant="h6" align="center">
                    {name}
                </Typography>
                <CardMedia
                    className={classes.cardMedia}
                    image=""
                    title="Image title"
                />

                <CardContent className={classes.cardContent}>
                    <Typography>
                        <TableContainer component={Paper}>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>#</TableCell>
                                        <TableCell align="left">Nom</TableCell>
                                        <TableCell align="left">Orientation</TableCell>
                                        <TableCell align="left">Points</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody n={rankIL = 1}>
                                    {topUser && topUser.map(({ birth, email, house, active, avatar, status, created, user_id, initials, lastname, firstname, last_online, points_year, access_level, points_month }) =>

                                        displayLine(rankIL, firstname, lastname, house, points_year)
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Typography>
                </CardContent>
            </Card>

        )
    }

    useEffect(() => {
      getTopUsersMonthly(0);
      getTopUsersYearly(0);
  }, []);

    return (
        <React.Fragment>
            <CssBaseline />
            <main>
                <Grid container direction="row" justify="space-evenly" alignItems="center">

                    <Grid item xs={4}>
                        {displayHouse('Ranking mensuel', topUserMonthly)}
                    </Grid>

                    <Grid item xs={4}>
                        {displayHouse('Ranking annuel', topUserYearly)}
                    </Grid>

                </Grid>
            </main>
        </React.Fragment>
    );
}