import React, {useContext, useEffect} from 'react';
import {MainContext} from '../../context/MainContext';
import { EventContext } from '../../context/EventContext';
import Typography from '@material-ui/core/Typography';

import {Button, 
    Card, 
    CardActions, 
    CardContent, 
    CardMedia, 
    CssBaseline, 
    Grid, 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableContainer, 
    TableRow, 
    Paper} from '@material-ui/core';

import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    card: { //dans la carte
        height: '90%',
        minWidth: '80%',
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
    }
}));

export default function Event_List() {
    const {user:{event}} = useContext(MainContext);

    const {data, setData} = useContext(EventContext);
    
    useEffect(() => {console.log('TEST : ' + event);}, [event]);
    const classes = useStyles();
    
    /*
    function choosePuce(house)
    {
        switch(house)
        {
            case 5 : return "./puce_ID.png";
                break;
            case 4 : return "./puce_IL.png";
                break;
            case 1 : return "./puce_IE.png";
                break;
            case 2 : return "./puce_TS.png";
                break;
            case 3 : return "./puce_TR.png";
                break;
            default : return "";
        }
    } */

    function displayRightHouse(noHouse)
    {
        switch(noHouse)
        {
            case 1 : return "IE";
                break;
            case 2 : return "TS";
                break;
            case 3 : return "TR";
                break;
            case 4 : return "IL";
                break;
            case 5 : return "ID";
                break;
            default : return "Globale";
                break;
        }
    }
    
    return (
        <React.Fragment>
            <CssBaseline/>
            <main>
                <Grid>
                    <Card className={classes.card}>
                        <CardContent className={classes.cardContent}>
                            <TableContainer component={Paper}>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="right">Nom</TableCell>
                                            <TableCell align="right">Organisateur</TableCell>
                                            <TableCell align="right">Limitation</TableCell>
                                            <TableCell align="right">Nb participants</TableCell>
                                            <TableCell align="right">Date limite d'inscription</TableCell>
                                            <TableCell align="right">Date</TableCell>
                                            <TableCell align="right">Lieu</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {data && data.map(({ name, price, status, address, created, date_end, event_id, house_id, location, date_begin, difficulty, house_name, description, organisator, battleroyale, nb_attendees, participants, attendees_max, attendees_min, is_competitive, deadline_reservation }) =>
                                        <TableRow>
                                            <TableCell align="right">{name}</TableCell>
                                            <TableCell align="right">
                                                {/*<img src={require(choosePuce(user.house && user.house.name))}/> */}
                                                {organisator.firstname + ' ' + organisator.lastname + ' '}<img src={require('./puce_IL.png')}/>
                                            </TableCell>
                                            <TableCell align="right">{displayRightHouse(house_id)}</TableCell>
                                            <TableCell align="right">{nb_attendees + ' / ' + attendees_max}</TableCell>
                                            <TableCell align="right">{deadline_reservation}</TableCell>
                                            <TableCell align="right">{date_begin}</TableCell>
                                            <TableCell align="right">{location}</TableCell>
                                        </TableRow>
                                    )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                </Grid>
            </main>
        </React.Fragment>
    );
}