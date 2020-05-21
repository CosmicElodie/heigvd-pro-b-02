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
        house.map(({ birth, email, house, active, avatar, status, created, user_id, initials, lastname, firstname, last_online, points_year, access_level,points_month }) =>
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



    const displayHouse = (name,topUser) =>{
        return(

            <Card className={classes.card}>
            <Typography gutterBottom variant="h6" align="center">
                {name}
            </Typography>
            <CardMedia
                className={classes.cardMedia}
                image = {'http://localhost:8080/content/' + name +'.png'}
                title="Image title"
            />

            {topUser && getTotalPoints(topUser)} points <br />
            {topUser && Object.keys(topUser).length} membres
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
                            <TableBody n = {rankIL = 1}>                                            
                                {topUser && topUser.map(({ birth, email, house, active, avatar, status, created, user_id, initials, lastname, firstname, last_online, points_year, access_level,points_month }) =>
                                    
                                    <TableRow  >                                                       
                                        <TableCell>{rankIL++}</TableCell>
                                        <TableCell>{firstname + ' ' + lastname}</TableCell>
                                        <TableCell>{points_year}</TableCell>
                                    </TableRow>
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


    return (
        <React.Fragment>
            <CssBaseline />
            <main>
                <Grid container direction="row" justify="space-evenly" alignItems="center">


                    <Grid item xs>      
                        {displayHouse('Informatique logicielle',topUserIL)}       
                    </Grid>

                    <Grid item xs>
                        {displayHouse('Ingénierie des données',topUserID)}
                    </Grid>

                    <Grid item xs={3}>
                        {displayHouse('Réseaux et systèmes',topUserTR)}
                    </Grid>
                    
                </Grid>


                <br />


                <Grid container direction="row" justify="space-evenly" alignItems="center">
                    <Grid item xs={3}>
                        {displayHouse('Sécurité informatique',topUserTS)}
                    </Grid>

                    <Grid item xs={3}>
                        {displayHouse('Systèmes informatiques embarqués',topUserIE)}
                    </Grid>
                </Grid>
            </main>
        </React.Fragment>
    );
}