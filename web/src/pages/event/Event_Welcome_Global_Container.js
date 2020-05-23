import React, { useState, useContext, useEffect, useCallback } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { MainContext } from '../../context/MainContext';
import Moment from 'react-moment';
import Typography from '@material-ui/core/Typography';

import {
    Button,
    Card,
    CardContent,
    CardMedia,
    CssBaseline,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableContainer,
    Paper,
    TableRow
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    card: { //dans la carte
        height: '90%',
        width: '80%',
        display: 'flex',
        flexDirection: 'column'
    },
    cardMedia: {
        //paddingTop: '75%',
        flexDirection: 'row',
        justify: 'space-evenly'
    },
    cardContent: {
        flexGrow: 1,
    },

    margin: {
        margin: theme.spacing(1),
        align: "left",
    },
    padding: {
        padding: theme.spacing(2),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },

}));




const EventWelcomeGlobalContainer = () => {
    const { user } = useContext(MainContext);
    const classes = useStyles();
    const [events, setEvents] = useState();
    let counterGlobal = 1;

    let history = useHistory();

    function printGlobalEvent(houseEvent, name, date_begin, nb_attendees, event_id) {
        if (counterGlobal <= 5) {
            counterGlobal++;
            return (<TableRow>

                <TableCell component="th" scope="row"  >
                    <Button
                        onClick={() => redirectPage("/event_display/" + event_id)}
                    >
                        {name}
                    </Button>
                </TableCell>

                <TableCell component="th" scope="row">
                    <Moment format="DD/MM/YYYY - HH:mm">
                        {date_begin}
                    </Moment>
                </TableCell>
                <TableCell component="th" scope="row">
                    {nb_attendees}
                </TableCell>
            </TableRow>);
        }
    }

    const redirectPage = useCallback((link) => {
        // Will change the URL, behaves like a link
        history.push(link);
    });

    //remplit l'état
    useEffect(() => {
        user && user.house && fetch('http://localhost:8080/event/from_house', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: "&house_id=" + parseInt(0) + "&limit_nb=" + parseInt(5)
        })
            .then(response => response.json())
            .then(response => {
                setEvents(response);
            })
    }
        , [user, setEvents]);

    return (<Card className={classes.card}>

        <CardMedia
            className={classes.cardMedia}
            image="https://heig-vd.ch/images/default-source/img-vie-sur-le-campus/heig-vd-site-web-sm-00075562.jpg?sfvrsn=e01580ea_2"
            title="Image title"
        />
        <CardContent className={classes.cardContent}>
            <h1>Derniers événements Globaux</h1>
            <Typography>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Nom événement</TableCell>
                                <TableCell align="left">Date</TableCell>
                                <TableCell align="left">Nb participants</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {events && events.length > 0 && events.map(({ event_id, name, description, is_competitive, difficulty, battleroyale,
                                status, price, attendees_min, attendees_max, created, deadline_reservation,
                                date_begin, date_end, location, address, house, organisator, participants, nb_attendees }, index) =>
                                printGlobalEvent(house, name, date_begin, nb_attendees, event_id)
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Typography>
        </CardContent>
    </Card>);
}
export default EventWelcomeGlobalContainer;