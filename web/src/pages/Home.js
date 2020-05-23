import React, { useEffect, useContext } from 'react';
import { MainContext } from '../context/MainContext';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {
    Card, CardContent, CardMedia,
    CssBaseline,
    Grid,
    Table, TableBody, TableCell, TableHead, TableContainer, TableRow,
    Paper
} from '@material-ui/core';

import Moment from 'react-moment';


const useStyles = makeStyles(theme => ({
    card: { //dans la carte
        minWidth: '350px',
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
    const { user } = useContext(MainContext);

    //const {user} = useContext(MainContext);
    const classes = useStyles();

    //const [ data, setData ] = useState(); //mettre json à la place de useState
    const [events, setEvents] = React.useState();


    const getCreatedEvents = () => {
        let post_body = "&user_id=" + parseInt(user.user_id);
            console.log("CREATED");
            console.log(post_body);
            
        fetch('http://localhost:8080/event/created_by_user',
            { 
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: post_body
            })
            .then(response => response.json())
            .then(response => { setEvents(response) })
    }

    const getJoinedEvents = () => {
        let post_body = "&user_id=" + parseInt(user.user_id);
            console.log("PARTICIPATED");
            console.log(post_body);
        fetch('http://localhost:8080/event/participated_by_user', { 
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: post_body
        })
            .then(response => response.json())
            .then(response => { setEvents(response) })
    }

    function displayLine(name, date_begin, limitation, nb_attendees, status) {
        return (<TableRow>
            <TableCell>{NamedNodeMap}</TableCell>
            <TableCell align="left"><Moment format="DD/MM/YYYY - HH:mm">{date_begin}</Moment></TableCell>
            <TableCell align="left">{limitation}</TableCell>
            <TableCell align="left">{nb_attendees}</TableCell>
            <TableCell align="left">{status}</TableCell>
        </TableRow>

        );
    }

    const displayHouse = (name, events) => {
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
                                        <TableCell>Nom</TableCell>
                                        <TableCell align="left">Date début</TableCell>
                                        <TableCell align="left">Limitation</TableCell>
                                        <TableCell align="left">Nb participants</TableCell>
                                        <TableCell align="left">Statut</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {events && events.length > 0 && events.map(({ index, event_id, name, description, is_competitive, difficulty, battleroyale,
                                        status, price, attendees_min, attendees_max, created, deadline_reservation,
                                        date_begin, date_end, location, address, house, organisator, participants, nb_attendees }) =>

                                        displayLine(name, date_begin, location, nb_attendees, status)
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
        getJoinedEvents();
        getCreatedEvents();
    }, []);

    return (
        <React.Fragment>
            <CssBaseline />
            <main>
                <h1>Bienvenue, {user.firstname} !</h1>
                <Grid spacing={2} container direction="row" justify="space-evenly" alignItems="center">

                    <Grid item xs>
                        {displayHouse('Événements rejoints par ' + user.firstname, events)}
                    </Grid>

                    <Grid item xs>
                        {displayHouse('Événements créés par ' + user.firstname, events)}
                    </Grid>

                </Grid>
            </main>
        </React.Fragment>
    );
}