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
    
    const printAccountPointsButton = ( { attendees_min, nb_attendees, status } ) => {
        if(attendees_min < nb_attendees && status === 'En cours' ) return <Button variant="contained" size="small" color="secondary" onClick={ handleAccountPointDialogClick }> Clôturer les points </Button>
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
                                {data && data.length > 0 && data.map(({event_id, name, description, is_competitive, battleroyale, difficulty, status, price, attendees_min, attendees_max, deadline_reservation, created, date_begin, date_end, location, address, user_id, house_id, limitation}) =>
                                        printCancelOrModifyButton(user.access_level, user_id, "Modifier")
                                )}

                                {data && data.length > 0 && data.map(({event_id, name, description, is_competitive, battleroyale, difficulty, status, price, attendees_min, attendees_max, deadline_reservation, created, date_begin, date_end, location, address, user_id, house_id, limitation}) =>
                                        printCancelOrModifyButton(user.access_level, user_id, "Annuler")
                                )}

                                {/* Bouton "supprimer", uniquement visible pour l'admin/modo */}
                                { printDeleteButton(user.access_level) }

                                { printAccountPointsButton(current) }
                                <h1>{ current.name }</h1>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                            <h2>{ current.description }</h2>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableCell align='justify'>
                                        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
                                        </TableCell>
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
                                               
                                            </TableCell>
                                            <TableCell>
                                                <Moment format="YYYY/MM/DD HH:mm">
                                                    { current.date_begin }
                                                </Moment>
                                            </TableCell>
                                            <TableCell>
                                                <Moment format="YYYY/MM/DD HH:mm">
                                                    { current.date_end }
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
                            </CardContent>
                        </Card>
            }
            </main>
        </React.Fragment>
    );
}