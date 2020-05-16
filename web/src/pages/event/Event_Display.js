import React , {useState, useContext, useEffect} from 'react';
import { useLocation } from "react-router-dom";
import {MainContext} from '../../context/MainContext';
import Moment from 'react-moment';
import EventAccountPoints from './EventAccountPoints';
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
    TableRow} from '@material-ui/core';

import {makeStyles} from '@material-ui/core/styles';
import { EventContext } from '../../context/EventContext';
import '../../css/Event.css'; 

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
    const { user } = useContext(MainContext);
    const { data } = useContext(EventContext);
    const location = useLocation(); 
    const [ current, setCurrent ] = useState();
    const [ accountPointDialogState, setAccountPointDialogState ] = useState({ is_open : false });

    useEffect(() => {
        if(data){
            let eventId = parseInt(location.pathname.split('/')[2]);
            let event = getEventByID(eventId, data);
            setCurrent(event);
        }
    }, [data, setCurrent]);

    const classes = useStyles();

    
    function printDeleteButton(permission) {
        if (permission === 75 || permission === 25) {
                return <Button variant="contained" size="small" color="primary" className={classes.margin}> Supprimer </Button>
        }
    
        return;
    }


    function printCancelOrModifyButton(permission, organisator, text) {
        if (permission === 75 || permission === 25 || user.used_id === organisator) {
            return <Button variant="contained" size="small" color="primary" className={classes.margin}> {text} </Button>
        }
    
        return;
    } 

    const getEventByID = (event_id, data) => {
        for (const event of data) if(event.event_id === event_id) return event;
    }
    
    const printAccountPointsButton = ( { attendees_min, nb_attendees, status, is_competitive, organisator } ) => {
        if(is_competitive && organisator.user_id === user.user_id && status === 'En attente de résultats' ) return <Button variant="contained" size="small" color="secondary" onClick={ handleAccountPointDialogClick }> Clôturer les points </Button>
    }

    const handleAccountPointDialogClick = () => setAccountPointDialogState({ is_open : true });
    const handleAccountPointDialogClose = () => setAccountPointDialogState({ is_open : false });

    return (
        <React.Fragment>
            { current && <EventAccountPoints { ...{...accountPointDialogState, ...current, ...{ handleClose : handleAccountPointDialogClose }} } /> }
            <CssBaseline/>
            <main>
            { current && <Card className={classes.card}>
                            <CardMedia
                                className={classes.cardMedia}
                                //image="https://heig-vd.ch/images/default-source/img-vie-sur-le-campus/heig-vd-site-web-sm-00075562.jpg?sfvrsn=e01580ea_2"
                                title="Image title"
                            />

                            <CardContent className={classes.cardContent}>
                                {/* Bouton "/modifier/annuler", uniquement visible pour l'admin/modo + l'organiateur de l'event */}

                                {
                                        printCancelOrModifyButton(user.access_level, user.user_id, "Modifier")
                                }

                                {
                                        printCancelOrModifyButton(user.access_level, user.user_id, "Annuler")
                                }

                                {/* Bouton "supprimer", uniquement visible pour l'admin/modo */}
                                { printDeleteButton(user.access_level) }

                                { printAccountPointsButton(current) }
                                <h1>{ current.name }</h1>
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
                                        { current.description } </TableCell>
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
                                                { current.deadline_reservation }
                                            </TableCell>
                                            <TableCell>
                                                { current.date_begin }
                                            </TableCell>
                                            <TableCell>
                                                { current.date_end }
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
                                                { current.is_competitve ? "Oui" : "Non" }
                                            </TableCell>
                                            <TableCell>
                                                { current.battleroyale ? "Oui" : "Non" }
                                            </TableCell>
                                            <TableCell>
                                                Difficile
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
                                                Global
                                            </TableCell>
                                            <TableCell>
                                                14/50
                                            </TableCell>
                                            <TableCell>
                                                2 CHF
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