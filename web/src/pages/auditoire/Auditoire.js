import React, { useContext, useState, useEffect } from 'react';
import { MainContext } from '../../context/MainContext';
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
        width: '30%',
        minWidth: '300px',
        minHeight: '700px',
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10
    },
    cardMedia: {
        paddingTop: '100%',
        flexDirection: 'row',
        justify: 'space-evenly',
        width: 'auto',
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

    function createUser(name, lastname, points) {
        return { name, lastname, points };
    }

    function getTotalPoints(house) {
        var total_points = 0;
        for (var members = 0; members < house.len; ++members) {
            total_points += house.points;
            console.log('total_points : ' + total_points)
        }
        return total_points
    }

    var rankIL = 1;
    var rankIE = 1;


    const getTopUsers = (e) => {
        let post_body =
            "&house_id=" + e +
            "&nbLimit=" + 5;
        fetch('http://localhost:8080/auditoire/yearly', { //pour l'instant yearly envoie tous les users toutes maisons confondues.
            method: 'GET',
            credentials: 'include'
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
    useEffect(() => {

        getTopUsers(1);
        getTopUsers(2);
        getTopUsers(3);
        getTopUsers(4);
        getTopUsers(5);
    }, []);

    const houseIL = [
        createUser('Elodie', 'Lagier', 203),
        createUser('Dalia', 'Maillefer', 164),
        createUser('Guillaume', 'Valvone', 120),
        createUser('Stefan', 'Teofanovic', 100),
        createUser('Christophe', 'Junod', 77)
    ];


    const houseIE = [
        createUser('Michael', 'Triponez', 113),
        createUser('LN', 'Dubuis', 12),
        createUser('Marie', 'Antoinette', 1)
    ];
    /*
        const houseID = [
            createUser('Anne', 'O\'nyme', 27),
            createUser('Sébastien', 'Rosat', 66),
            createUser('Grégoire', 'Decorvet', 89),
            createUser('Pier', 'Donini', 2),
            createUser('Stéfanie', 'Dupont', 43)
        ];
    
        const houseTR = [
            createUser('Nair', 'Alic', 342)
        ];
    
        const houseTS = [
            createUser('Jojo', 'Lémainrouj', 231)
        ];
    
        */

    return (
        <React.Fragment>
            <CssBaseline />
            <main>
                <Grid container direction="row" justify="space-evenly" alignItems="center">
                    <Grid item xs>
                        <Card className={classes.card}>
                            <Typography gutterBottom variant="h6" align="center">
                                Informatique logicielle
                                    </Typography>
                            <CardMedia
                                className={classes.cardMedia}
                                image='http://localhost:8080/content/Informatique logicielle.png'
                                title="Image title"
                            />

                            {getTotalPoints(houseIL)} points
                                    <CardContent className={classes.cardContent}>
                                <Typography>
                                    <TableContainer component={Paper}>
                                        <Table className={classes.table} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>#</TableCell>
                                                    <TableCell align="left">Nom</TableCell>
                                                    <TableCell align="left">Points</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {topUserIL && topUserIL.map(({ birth, email, house, active, avatar, points, status, created, user_id, initials, lastname, firstname, last_online, access_level }) =>
                                                    <TableRow >
                                                        <TableCell>{rankIL++}</TableCell>
                                                        <TableCell>{firstname + ' ' + lastname}</TableCell>
                                                        <TableCell>{points}</TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs>
                        <Card className={classes.card}>
                            <Typography gutterBottom variant="h6" align="center">
                                Ingénierie des données
                                        </Typography>
                            <CardMedia
                                className={classes.cardMedia}
                                image='http://localhost:8080/content/Ingénierie des données.png'
                                title="Image title"
                            />
                                        ... points<br />
                                        ... membres
                                        <CardContent className={classes.cardContent}>
                                <Typography>
                                    <TableContainer component={Paper}>
                                        <Table className={classes.table} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>#</TableCell>
                                                    <TableCell align="left">Nom</TableCell>
                                                    <TableCell align="left">Points</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {topUserID && topUserID.map(({ birth, email, house, active, avatar, points, status, created, user_id, initials, lastname, firstname, last_online, access_level }) =>
                                                    <TableRow >
                                                        <TableCell>{rankIL++}</TableCell>
                                                        <TableCell>{firstname + ' ' + lastname}</TableCell>
                                                        <TableCell>{points}</TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={3}>
                        <Card className={classes.card}>
                            <Typography gutterBottom variant="h6" align="center">
                                Réseaux et systèmes
                                    </Typography>
                            <CardMedia
                                className={classes.cardMedia}
                                image="https://i.imgur.com/NSM8kNK.png"
                                title="Image title"
                            />
                                    ... points<br />
                                    ... membres
                                    <CardContent className={classes.cardContent}>
                                <Typography>
                                    <TableContainer component={Paper}>
                                        <Table className={classes.table} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>#</TableCell>
                                                    <TableCell align="left">Nom</TableCell>
                                                    <TableCell align="left">Points</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {topUserTR && topUserTR.map(({ birth, email, house, active, avatar, points, status, created, user_id, initials, lastname, firstname, last_online, access_level }) =>
                                                    <TableRow >
                                                        <TableCell>{rankIL++}</TableCell>
                                                        <TableCell>{firstname + ' ' + lastname}</TableCell>
                                                        <TableCell>{points}</TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <br />
                <Grid container direction="row" justify="space-evenly" alignItems="center">
                    <Grid item xs={3}>
                        <Card className={classes.card}>
                            <Typography gutterBottom variant="h6" align="center">
                                Sécurité informatique
                                </Typography>
                            <CardMedia
                                className={classes.cardMedia}
                                image='http://localhost:8080/content/Sécurité informatique.png'
                                title="Image title"
                            />
                                ... points<br />
                                ... membres
                                <CardContent className={classes.cardContent}>
                                <Typography>
                                    <TableContainer component={Paper}>
                                        <Table className={classes.table} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>#</TableCell>
                                                    <TableCell align="left">Nom</TableCell>
                                                    <TableCell align="left">Points</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {topUserTS && topUserTS.map(({ birth, email, house, active, avatar, points, status, created, user_id, initials, lastname, firstname, last_online, access_level }) =>
                                                    <TableRow >
                                                        <TableCell>{rankIL++}</TableCell>
                                                        <TableCell>{firstname + ' ' + lastname}</TableCell>
                                                        <TableCell>{points}</TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={3}>
                        <Card className={classes.card}>
                            <Typography gutterBottom variant="h6" align="center">
                                Systèmes informatiques embarqués
                                </Typography>
                            <CardMedia
                                className={classes.cardMedia}
                                image='http://localhost:8080/content/Systèmes informatiques embarqués.png'
                                title="Image title"
                            />
                                ... points<br />
                                ... membres
                                <CardContent className={classes.cardContent}>
                                <Typography>
                                    <TableContainer component={Paper}>
                                        <Table className={classes.table} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>#</TableCell>
                                                    <TableCell align="left">Nom</TableCell>
                                                    <TableCell align="left">Points</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {topUserIE && topUserIE.map(({ birth, email, house, active, avatar, points, status, created, user_id, initials, lastname, firstname, last_online, access_level }) =>
                                                    <TableRow >
                                                        <TableCell>{rankIL++}</TableCell>
                                                        <TableCell>{firstname + ' ' + lastname}</TableCell>
                                                        <TableCell>{points}</TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </main>
        </React.Fragment>
    );
}