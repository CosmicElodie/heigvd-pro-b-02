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
    }
}));

export default function Event_List() {
    const {user:{event}} = useContext(MainContext);

    const {data, setData} = useContext(EventContext);
    
    useEffect(() => {console.log('TEST : ' + event);}, [event]);
    const classes = useStyles();
    
    function choosePuce(house)
    {
        switch(house)
        {
            case 'Ingénierie des données' : return "./puce_ID.png";
                break;
            case "Informatique logicielle" : return "./puce_ID.png";
                break;
            case "Systèmes informatiques embarqués" : return "./puce_IE.png";
                break;
            case "Sécurité informatique" : return "./puce_TS.png";
                break;
            case "Réseaux et systèmes" : return "./puce_TR.png";
                break;
            default : return "";
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
                                            <TableCell align="right">Places libres</TableCell>
                                            <TableCell align="right">Date limite d'inscription</TableCell>
                                            <TableCell align="right">Date</TableCell>
                                            <TableCell align="right">Lieu</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {data && data.map(({ name, price, status, date_end,event_id, house_id, location, date_begin, difficulty, house_name, description, nb_attendees, is_competitive, deadline_reservation }) =>
                                        <TableRow>
                                            <TableCell align="right">{name}</TableCell>
                                            <TableCell align="right">
                                                {/*<img src={require(choosePuce(user.house && user.house.name))}/> */}
                                                <img src={require('./puce_IL.png')}/>
                                            </TableCell>
                                            <TableCell align="right">{house_id}</TableCell>
                                            <TableCell align="right">{nb_attendees}</TableCell>
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