import React, { useState, useContext, useEffect, useCallback } from 'react';
import {appConfig} from "../../config/appConfig"
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { MainContext } from '../../context/MainContext';
import { EventContext } from '../../context/EventContext';
import EventAccountPoints from './EventAccountPoints';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import { makeStyles } from '@material-ui/core/styles';
import '../../css/Event.css';

import Moment from 'react-moment';

import {
    Button,
    Card,
    CardContent,
    CardMedia,
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
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },

}));

export default function Event() {
    const { user, setDialog, setShowProfile } = useContext(MainContext);
    const [open, setOpen] = React.useState(false);
    const { data } = useContext(EventContext);
    const location = useLocation();
    const [current, setCurrent] = useState();
    const [attendees, setAttendees] = useState();
    let history = useHistory();
    const [accountPointDialogState, setAccountPointDialogState] = useState({ is_open: false });

    useEffect(() => {
        if (data) {
            let eventId = parseInt(location.pathname.split('/')[2]);
            let event = getEventByID(eventId, data);
            setCurrent(event);
        }
    }, [data,location.pathname,getParticipants]);

    const classes = useStyles();

    const redirectPage = useCallback((link) => {
        history.push(link);
    }, [history]);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    //Affiche le bouton "Supprimer"
    function printDeleteButton(permission) {
        if (permission === 75 || permission === 25) {
            return <Button variant="contained" size="small" color="primary" onClick={deleteEvent} className={classes.margin}> Supprimer </Button>
        }

        return;
    }

    function deleteEvent() {
        fetch(appConfig.api_url + 'event/delete_event', {
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
                redirectPage("/event_list") 
            })

        return;
    }


    //Affiche les boutons "Modifier" ou "Annuler"
    function printButton(permission, IDutilisateurCourant, IDorganisateur, statutEvent, text) {

        if (statutEvent === "En attente d'autres participants" || statutEvent === "Planifié") {

            if (permission === 75 || permission === 25 || IDutilisateurCourant === IDorganisateur) {

                if (text === "Modifier") {
                    return <Button variant="contained" size="small" color="primary" onClick={modifyEvent} className={classes.margin}> {text} </Button>;

                }
                else if (text === "Annuler") { //text = Annuler
                    return <Button variant="contained" size="small" color="primary" onClick={cancel} className={classes.margin}> {text} </Button>;

                }
            }

            if (text === "Rejoindre") {
                return <Button variant="contained" size="small" color="primary" onClick={joinEvent} className={classes.margin}> {text} </Button>;
            }
            else if (text === "Quitter") {
                return <Button variant="contained" size="small" color="primary" onClick={quitEvent} className={classes.margin}> {text} </Button>;
            }

        }


        return;
    }

    //Met l'état de l'event à "Annulé"
    function cancel() {
        fetch(appConfig.api_url + 'event/cancel_event', {
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
                if (status === "ok") {
                    window.location.reload(false) 
               }
            })

        return;
    }

    //Permet de modifier les champs de l'événement
    function modifyEvent() {
        history.push("/event_modify/" + current.event_id);
        return;
    }

    function joinEvent() {
        fetch(appConfig.api_url + 'event/join_event', {
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
                if (status === "ok") {
                    window.location.reload(false) 
               }
            })

        return;
    }

    function quitEvent() {
        fetch(appConfig.api_url + 'event/quit_event', {
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
                if (status === "ok") {
                    window.location.reload(false) 
               }
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
            case 2: return "Moyen";
            case 3: return "Difficile";
            case 4: return "Extrême";
            default: return "Facile"; //si pas de difficulté mentionnée, ça met à 'facile'.
        }
    }

    function getParticipants() {
        fetch(appConfig.api_url + 'event/get_user_participants',
            {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: "&event_id=" + parseInt(current.event_id)
            })
            .then(response => response.json())
            .then(response => { setAttendees(response); }
            )
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

    useEffect(() => {   
        current && getParticipants()
    }, [current]);

    const handlePersonClick = (user) => {
        setShowProfile(user);
    }

    function printAttendee(participant) {
        return ( <p align="center"><button color="primary" onClick={() => handlePersonClick(participant)}>
            {participant && participant.firstname + " " + participant && participant.lastname}
        </button></p>);
    }

    return (

        <main>
            {current && <EventAccountPoints {...{ ...accountPointDialogState, ...current, ...{ handleClose: handleAccountPointDialogClose } }} />}

            {current &&
                <center>
                    <Card className={classes.card}>
                        <CardMedia
                            className={classes.cardMedia}
                            //image="https://heig-vd.ch/images/default-source/img-vie-sur-le-campus/heig-vd-site-web-sm-00075562.jpg?sfvrsn=e01580ea_2"
                            title="Image title"
                        />

                        <CardContent className={classes.cardContent}>
                            {/* Bouton "/modifier/annuler", uniquement visible pour l'admin/modo + l'organisateur de l'event */}
                            {
                                printButton(user.access_level, user.user_id, current.organisator.user_id, current.status, "Rejoindre")
                            }
                            {
                                printButton(user.access_level, user.user_id, current.organisator.user_id, current.status, "Quitter")
                            }
                            {
                                printButton(user.access_level, user.user_id, current.organisator.user_id, current.status, "Modifier")
                            }
                            {
                                printButton(user.access_level, user.user_id, current.organisator.user_id, current.status, "Annuler")
                            }

                            {/* Bouton "supprimer", uniquement visible pour l'admin/modo */}
                            {printDeleteButton(user.access_level)}

                            {printAccountPointsButton(current)}
                            <h1 className="h1-title">{current.name}</h1>
                            <center><i>{current.status}</i></center>

                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <h2 className="h2-title">Description</h2>
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
                                            <h2 className="h2-title">Date limite d'inscription</h2>
                                        </TableCell>
                                        <TableCell style={{ width: 210 }}>
                                            <h2 className="h2-title">Début de l'événement</h2>
                                        </TableCell>
                                        <TableCell style={{ width: 210 }}>
                                            <h2 className="h2-title">Fin de l'événement</h2>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            <Moment format="DD/MM/YYYY - HH:mm">
                                                {current.deadline_reservation}
                                            </Moment>
                                        </TableCell>
                                        <TableCell>
                                            <Moment format="DD/MM/YYYY - HH:mm">
                                                {current.date_begin}
                                            </Moment>
                                        </TableCell>
                                        <TableCell>
                                            <Moment format="DD/MM/YYYY - HH:mm">
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
                                            <h2 className="h2-title">Compétitif</h2>
                                        </TableCell>
                                        <TableCell style={{ width: 210 }}>
                                            <h2 className="h2-title">Battle Royal</h2>
                                        </TableCell>
                                        <TableCell style={{ width: 210 }}>
                                            <h2 className="h2-title">Difficulté</h2>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            {current.is_competitive ? "Oui" : "Non"}
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
                                            <h2 className="h2-title">Limitation</h2>
                                        </TableCell>
                                        <TableCell style={{ width: 210 }}>
                                            <h2 className="h2-title">Nombre de participants</h2>
                                        </TableCell>
                                        <TableCell style={{ width: 210 }}>
                                            <h2 className="h2-title">Prix</h2>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            {displayLimitation(current.limitation)}
                                        </TableCell>
                                        <TableCell>
                                            <div>
                                                <button type="button" onClick={handleOpen}>
                                                    {current.nb_attendees} / {current.attendees_max}
                                                </button>

                                                <Modal
                                                    aria-labelledby="transition-modal-title"
                                                    aria-describedby="transition-modal-description"
                                                    className={classes.modal}
                                                    open={open}
                                                    onClose={handleClose}
                                                    closeAfterTransition
                                                    BackdropComponent={Backdrop}
                                                    BackdropProps={{
                                                        timeout: 500,
                                                    }}
                                                >

                                                    <Fade in={open}>
                                                        <div className={classes.paper}>
                                                            <h2 id="transition-modal-title">Liste des participants</h2>
                                                            {attendees && attendees.length > 0 && attendees.map((participant) =>
                                                                printAttendee(participant)
                                                            )}
                                                        </div>
                                                    </Fade>
                                                </Modal>
                                            </div>

                                        </TableCell>
                                        <TableCell>
                                            {current.price} CHF
                                            </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <br />
                            <center><h2 className="h2-title">Adresse</h2></center>
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
                </center>
            }

        </main>
    );
}