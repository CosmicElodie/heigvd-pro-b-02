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
import '../../css/Auditoire.css';

const useStyles = makeStyles(theme => ({
    card: { //dans la carte
        maxWidth: 400,
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        height: "100%",
        minHeight: '700px',

    },
    cardMedia: {
        flexDirection: 'row',
        justify: 'space-evenly',
        width: 'auto',
        height: 'auto',
    },
    cardContent: {
        flexGrow: 1
    }
}));

export default function Auditoire() {

    //const {user} = useContext(MainContext);
    const classes = useStyles();

    const [topUserIE, setTopUserIE] = React.useState();
    const [topUserIL, setTopUserIL] = React.useState();
    const [topUserID, setTopUserID] = React.useState();
    const [topUserTR, setTopUserTR] = React.useState();
    const [topUserTS, setTopUserTS] = React.useState();
    //const [ data, setData ] = useState(); //mettre json à la place de useState

    function getTotalPoints(house) {
        var total_points = 0;
        house.map(({ birth, email, house, active, avatar, status, created, user_id, initials, lastname, firstname, last_online, points_year, access_level, points_month }) =>
            total_points += points_year
        )
        return total_points
    }

    var rankIL = 1;


    const getTopUsers = (e) => {
        let post_body =
            "&house_id=" + e;
        fetch('http://localhost:8080/auditoire/yearly', { //pour l'instant yearly envoie tous les users toutes maisons confondues.
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: post_body
        })
            .then(response => response.json())
            .then(response => {

                switch (e) {
                    case 1:
                        setTopUserIE(response)
                        break;
                    case 2:
                        setTopUserTS(response)
                        break;
                    case 3:
                        setTopUserTR(response)
                        break;
                    case 4:
                        setTopUserIL(response)
                        break;
                    case 5:
                        setTopUserID(response)
                        break;

                    default:
                    // code block
                }

            })
    }

    function displayLine(rank, firstname, lastname, points_year) {
        if (rank <= 5) {
            return (<TableRow  >
                <TableCell>{rankIL++}</TableCell>
                <TableCell>{firstname + ' ' + lastname}</TableCell>
                <TableCell>{points_year}</TableCell>
            </TableRow>

            );
        }
    }

    const displayHouse = (name, topUser) => {
        let imagePath = 'http://localhost:8080/content/' + name + '.png';

        return (

            <Card className={classes.card}>
                <h1>{name}</h1>
                <CardMedia
                    className={classes.cardMedia}
                    title="Image title"
                ><img width= {'100%'} src={imagePath} alt="No img"/></CardMedia>
                <CardContent className={classes.cardContent}>
                    <Typography>
                        <TableContainer component={Paper}>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">Membres</TableCell>
                                        <TableCell align="left">Points</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow  >
                                        <TableCell>{topUser && Object.keys(topUser).length}</TableCell>
                                        <TableCell>{topUser && getTotalPoints(topUser)}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Typography>
                </CardContent>

                <CardContent className={classes.cardContent}>
                    <Typography>
                        <TableContainer component={Paper}>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>#</TableCell>
                                        <TableCell align="left">Nom</TableCell>
                                        <TableCell align="left">Points</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody n={rankIL = 1}>
                                    {topUser && topUser.map(({ birth, email, house, active, avatar, status, created, user_id, initials, lastname, firstname, last_online, points_year, access_level, points_month }) =>

                                        displayLine(rankIL, firstname, lastname, points_year)
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
        getTopUsers(1);
        getTopUsers(2);
        getTopUsers(3);
        getTopUsers(4);
        getTopUsers(5);
    }, []);

    return (
        <main>
            <CssBaseline />
            <center>
                <Grid container spacing={5} direction="row" justify="center" alignItems="stretch">
                    <Grid item xs>
                        {displayHouse('Informatique logicielle', topUserIL)}
                    </Grid>

                    <Grid item xs>
                        {displayHouse('Ingénierie des données', topUserID)}
                    </Grid>

                    <Grid item xs>
                        {displayHouse('Réseaux et systèmes', topUserTR)}
                    </Grid>

                    <Grid item xs>
                        {displayHouse('Sécurité informatique', topUserTS)}
                    </Grid>

                    <Grid item xs>
                        {displayHouse('Systèmes informatiques embarqués', topUserIE)}
                    </Grid>
                </Grid>
            </center>

        </main>
    );
}