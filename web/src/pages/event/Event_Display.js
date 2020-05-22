import React, { useState, useContext, useEffect, useCallback } from 'react';
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { MainContext } from '../../context/MainContext';
import { EventContext } from '../../context/EventContext';
import EventAccountPoints from './EventAccountPoints';

import { makeStyles } from '@material-ui/core/styles';
import '../../css/Event.css';

import Moment from 'react-moment';

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
    extendedIcon: {
        marginRight: theme.spacing(1),
    },

}));



export default function Event() {
    const { user, setDialog } = useContext(MainContext);
    const { data } = useContext(EventContext);
    const location = useLocation();
    const [current, setCurrent] = useState();
    const [accountPointDialogState, setAccountPointDialogState] = useState({ is_open: false });

    useEffect(() => {
        if (data) {
            let eventId = parseInt(location.pathname.split('/')[2]);
            let event = getEventByID(eventId, data);
            setCurrent(event);
        }
    }, [data, setCurrent]);

    const classes = useStyles();
    let history = useHistory();

    //Affiche le bouton "Supprimer"
    function printDeleteButton(permission) {
        if (permission === 75 || permission === 25) {
            return <Button variant="contained" size="small" color="primary" onClick={deleteEvent} className={classes.margin}> Supprimer </Button>
        }

        return;
    }

    function deleteEvent() {
        fetch('http://localhost:8080/event/delete_event', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: "&event_id=" + parseInt(current.event_id)
        })
            .then(response => response.json())
            .then(({ status, dialog_id }) => {
                setDialog({
                    [dialog_id]: {
                        is_open: true
                    }
                });
            })

        return;
    }


    //Affiche les boutons "Modifier" ou "Annuler"
    function printButton(permission, organisator, text, current_event) {
        if (current_event.status === "En attente d'autres participants" || current_event.status === "Planifié") {

            if (permission === 75 || permission === 25 || user.used_id === organisator.user_id) {

                if (text === "Modifier") {
                    return <Button variant="contained" size="small" color="primary" onClick={modifyEvent} className={classes.margin}> {text} </Button>;

                }
                else { //text = Annuler
                    return <Button variant="contained" size="small" color="primary" onClick={cancel} className={classes.margin}> {text} </Button>;

                }
            }

            if (text === "Rejoindre" ) {
                return <Button variant="contained" size="small" color="primary" onClick={joinEvent} className={classes.margin}> Rejoindre </Button>;
            }
        }
        

        return;
    }

    //Met l'état de l'event à "Annulé"
    function cancel() {
        fetch('http://localhost:8080/event/cancel_event', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: "&event_id=" + parseInt(current.event_id)
        })
            .then(response => response.json())
            .then(({ status, dialog_id }) => {
                setDialog({
                    [dialog_id]: {
                        is_open: true
                    }
                });
            })

        return;
    }

    //Permet de modifier les champs de l'événement
    function modifyEvent() {
        history.push("/event_modify/" + current.event_id);
        return;
    }

    function joinEvent() {
        fetch('http://localhost:8080/event/join_event', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: "&user_id=" + parseInt(user.user_id) + "&event_id=" + parseInt(current.event_id)
        })
            .then(response => response.json())
            .then(({ status, dialog_id }) => {
                setDialog({
                    [dialog_id]: {
                        is_open: true
                    }
                });
            })

        return;
    }

    function isParticipating(id_of_user) {
        fetch('http://localhost:8080/event/detail', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: "&user_id=" + parseInt(user.user_id)
        })
            .then(response => response.json())
            .then(({ status, dialog_id }) => {
                setDialog({
                    [dialog_id]: {
                        is_open: true
                    }
                });
            })

        return;
    }


    const getEventByID = (event_id, data) => {
        for (const event of data) if (event.event_id === event_id) return event;
    }

    const printAccountPointsButton = ({ attendees_min, nb_attendees, status, is_competitive, organisator }) => {
        if (is_competitive && organisator.user_id === user.user_id && status === 'En attente de résultats') return <Button variant="contained" size="small" color="secondary" onClick={handleAccountPointDialogClick}> Clôturer les points </Button>
    }

    const handleAccountPointDialogClick = () => setAccountPointDialogState({ is_open: true });
    const handleAccountPointDialogClose = () => setAccountPointDialogState({ is_open: false });

    function displayDifficulty(level) {
        switch (level) {
            case 1: return "Facile";
            case 2: return "Moyen";
            case 3: return "Difficile";
            case 4: return "Extrême";
            default: return "Error";
        }
    }

    function displayLimitation(level) {
        switch (level) {
            case 1: return "Systèmes informatiques embarqués";
            case 2: return "Sécurité informatique";
            case 3: return "Réseaux et systèmes";
            case 4: return "Informatique logicielle";
            case 5: return "Ingénierie des données";
            default: return "Global";
        }
    }

    return (
        <React.Fragment>
            {current && <EventAccountPoints {...{ ...accountPointDialogState, ...current, ...{ handleClose: handleAccountPointDialogClose } }} />}
            <CssBaseline />
            <main>
                {current && <Card className={classes.card}>
                    <CardMedia
                        className={classes.cardMedia}
                        //image="https://heig-vd.ch/images/default-source/img-vie-sur-le-campus/heig-vd-site-web-sm-00075562.jpg?sfvrsn=e01580ea_2"
                        title="Image title"
                    />

                    <CardContent className={classes.cardContent}>
                        {/* Bouton "/modifier/annuler", uniquement visible pour l'admin/modo + l'organiateur de l'event */}
                        {
                            printButton(user.access_level, user.user_id, "Rejoindre", current)
                        }
                        {
                            printButton(user.access_level, user.user_id, "Modifier", current)
                        }

                        {
                            printButton(user.access_level, user.user_id, "Annuler", current)
                        }

                        {/* Bouton "supprimer", uniquement visible pour l'admin/modo */}
                        {printDeleteButton(user.access_level)}

                        {printAccountPointsButton(current)}
                        <h1>{current.name}</h1>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <h2>Description</h2>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableCell align='justify'>
                                    {current.description} </TableCell>
                            </TableBody>
                        </Table>

                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ width: 210 }}>
                                        <h2>Date limite d'inscription</h2>
                                    </TableCell>
                                    <TableCell style={{ width: 210 }}>
                                        <h2>Début de l'événement</h2>
                                    </TableCell>
                                    <TableCell style={{ width: 210 }}>
                                        <h2>Fin de l'événement</h2>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <Moment format="YYYY/MM/DD - HH:mm">
                                            {current.deadline_reservation}
                                        </Moment>
                                    </TableCell>
                                    <TableCell>
                                        <Moment format="YYYY/MM/DD - HH:mm">
                                            {current.date_begin}
                                        </Moment>
                                    </TableCell>
                                    <TableCell>
                                        <Moment format="YYYY/MM/DD - HH:mm">
                                            {current.date_end}
                                        </Moment>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>

                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ width: 210 }}>
                                        <h2>Compétitif</h2>
                                    </TableCell>
                                    <TableCell style={{ width: 210 }}>
                                        <h2>Battle Royal</h2>
                                    </TableCell>
                                    <TableCell style={{ width: 210 }}>
                                        <h2>Difficulté</h2>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        {current.is_competitve ? "Oui" : "Non"}
                                    </TableCell>
                                    <TableCell>
                                        {current.battleroyale ? "Oui" : "Non"}
                                    </TableCell>
                                    <TableCell>
                                        {displayDifficulty(current.difficulty)}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>

                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ width: 210 }}>
                                        <h2>Limitation</h2>
                                    </TableCell>
                                    <TableCell style={{ width: 210 }}>
                                        <h2>Nombre de participants</h2>
                                    </TableCell>
                                    <TableCell style={{ width: 210 }}>
                                        <h2>Prix</h2>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        {displayLimitation(current.limitation)}
                                    </TableCell>
                                    <TableCell>
                                        {current.nb_attendees} / {current.attendees_max}
                                    </TableCell>
                                    <TableCell>
                                        {current.price} CHF
                                            </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <br />
                        <center><h2>Adresse</h2></center>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell align="center">
                                        {current.address}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                }
            </main>
        </React.Fragment>
    );
}