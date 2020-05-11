import React, {useContext, useState} from 'react';
import {MainContext} from '../../context/MainContext';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { 
    Card, CardContent, CardMedia, 
    CssBaseline, 
    Grid, 
    Table, TableBody, TableCell, TableHead, TableContainer, TableRow, 
    Paper} from '@material-ui/core';
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
        justify: 'space-evenly'
    },
    cardContent: {
        flexGrow: 1
    }
}));

export default function Auditoire() {

    //const {user} = useContext(MainContext);
    const classes = useStyles();
    //const [ data, setData ] = useState(); //mettre json à la place de useState

    function createUser(name, lastname, points) {
        return {name, lastname, points};
    }

    function getTotalPoints(house)
    {
        var total_points = 0;
        for (var members = 0; members < house.len; ++members)
        {
            total_points += house.points;
            console.log('total_points : ' + total_points)
        }
        return total_points
    }

    var rankIL = 1;
    var rankIE = 1;

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
            <CssBaseline/>
            <main>
                <Grid container direction="row" justify="space-evenly" alignItems="center">
                    <Grid item xs> 
                        <Card className={classes.card}>
                                    <Typography gutterBottom variant="h6" align="center">
                                        Informatique logicielle
                                    </Typography>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image="https://i.imgur.com/NSM8kNK.png"
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
                                                    {houseIL.map(row => (
                                                        <TableRow >
                                                            <TableCell>{rankIL++}</TableCell>
                                                            <TableCell>{row.name + ' ' + row.lastname}</TableCell>
                                                            <TableCell>{row.points}</TableCell>
                                                        </TableRow>
                                                    ))}
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
                                                    {houseIE.map(row => (
                                                        <TableRow >
                                                            <TableCell>{rankIE++}</TableCell>
                                                            <TableCell>{row.name + ' ' + row.lastname}</TableCell>
                                                            <TableCell>{row.points}</TableCell>
                                                        </TableRow>
                                                    ))}
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
                                                        <TableRow >
                                                        </TableRow>
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
                                                    <TableRow >
                                                    </TableRow>
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
                                                    <TableRow >
                                                    </TableRow>
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