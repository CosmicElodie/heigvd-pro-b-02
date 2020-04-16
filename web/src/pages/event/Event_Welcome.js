import React, {useContext} from 'react';
import Typography from '@material-ui/core/Typography';
import {MainContext} from '../../context/MainContext';

import {Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Table, TableBody, TableCell, TableHead, TableContainer, TableRow, Paper} from '@material-ui/core';

import {makeStyles} from '@material-ui/core/styles';
import { EventContext } from '../../context/EventContext';

const useStyles = makeStyles(theme => ({
    card: { //dans la carte
        height: '870px',
        width: '45%',
        display: 'flex',
        flexDirection: 'column'
    },
    cardMedia: {
        paddingTop: '75%',
        flexDirection: 'row',
        justify: 'space-evenly'
    },
    cardContent: {
        flexGrow: 1,
    }
}));

export default function Event() {
    const {user} = useContext(MainContext);
    const {data, setData} = useContext(EventContext);

    const classes = useStyles();

    var daHouse = user.house && user.house.house_id;

    //Permet d'afficher une ligne du tableau selon les données passées
    function printLine(house_id, elementToPrint) {
        if (daHouse == house_id) {
                return <TableCell component="th" scope="row">
                        {elementToPrint}
                        </TableCell>
        }
        return;
      }

    function printLineGlobal(house_id, elementToPrint) {
        if (house_id == null) {
              return <TableCell component="th" scope="row">
              {elementToPrint}
          </TableCell>
        }
        return;
      }

    return (
        <React.Fragment>
            <CssBaseline/>
            <main>
                <Grid container direction="row" justify="space-evenly" alignItems="center"> 
                        <Card className={classes.card}>
                            
                            <CardMedia
                                className={classes.cardMedia}
                                image="https://heig-vd.ch/images/default-source/img-vie-sur-le-campus/heig-vd-site-web-sm-00075562.jpg?sfvrsn=e01580ea_2"
                                title="Image title"
                            />
                            <CardContent className={classes.cardContent}>
                                <Typography gutterBottom variant="h5" component="h2">
                                Événements {user.house && user.house.name}
                                </Typography>
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
                                            {data && data.length > 0 && data.map(({event_id, name, description, is_competitive, difficulty, status, price, deadline_reservation, date_begin, date_end, location, house_id, house_name, nb_attendees}) =>
                                                    <TableRow /* key={name} */>
                                                        {printLine(house_id,name)}
                                                        {printLine(house_id,date_begin)}
                                                        {printLine(house_id,nb_attendees)}
                                                    </TableRow>
                                            )}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary">
                                    <a href="/event_list">Voir plus...</a>
                                </Button>
                            </CardActions>
                        </Card>
                    
                        <Card className={classes.card}>
                            
                            <CardMedia
                                className={classes.cardMedia}
                                image="https://heig-vd.ch/images/default-source/img-vie-sur-le-campus/heig-vd-site-web-sm-00075562.jpg?sfvrsn=e01580ea_2"
                                title="Image title"
                            />
                            <CardContent className={classes.cardContent}>
                                <Typography gutterBottom variant="h5" component="h2">
                                Événements Globaux
                                </Typography>
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
                                            {data && data.length > 0 && data.map(({event_id, name, description, is_competitive, difficulty, status, price, deadline_reservation, date_begin, date_end, location, house_id, house_name, nb_attendees}) =>
                                                    <TableRow /* key={name} */>
                                                        {printLineGlobal(house_id,name)}
                                                        {printLineGlobal(house_id,date_begin)}
                                                        {printLineGlobal(house_id,nb_attendees)}
                                                    </TableRow>
                                            )}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary">
                                    <a href="/event_list">Voir plus...</a>
                                </Button>
                            </CardActions>
                        </Card>
                </Grid>
            </main>
        </React.Fragment>
    );
}