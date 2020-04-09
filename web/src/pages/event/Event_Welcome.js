import React, {useContext} from 'react';
import Typography from '@material-ui/core/Typography';

import {Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Table, TableBody, TableCell, TableHead, TableContainer, TableRow, Paper} from '@material-ui/core';

import {makeStyles} from '@material-ui/core/styles';
import { EventContext } from '../../context/EventContext';

//DEBUT data pour tests

//TODO : faire en sorte que cet élément récupère la maison de l'utilisateur
const houseName = "Événements Maison Logicielle"


//TODO : faire en sorte que ces données s'affichent selon la maison de l'utilisateur


//TODO : il s'agit des événements globaux à toutes les maisons. Il faut simplement récupérer les données qui sont
//censées être accessibles à tout le monde
/*const globalRows = [
  createData('À venir', '00/00/0000', 0),
  createData('À venir', '00/00/0000', 0),
    createData('À venir', '00/00/0000', 0)
];*/
//FIN data pour tests

const useStyles = makeStyles(theme => ({
    card: { //dans la carte
        height: '90%',
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
    const classes = useStyles();

    const {data, setData} = useContext(EventContext);

    return (
        <React.Fragment>
            <CssBaseline/>
            <main>
                <Grid container direction="row" justify="space-evenly" alignItems="center">
                    {data && data.lenght > 0 && data.map(({event_id, name, description, is_competitive, difficulty, status, price, deadline_reservation, date_begin, date_end, location, house_id, house_name, nb_attendees}) =>
                        <Card className={classes.card}>
                            <CardMedia
                                className={classes.cardMedia}
                                image="https://heig-vd.ch/images/default-source/img-vie-sur-le-campus/heig-vd-site-web-sm-00075562.jpg?sfvrsn=e01580ea_2"
                                title="Image title"
                            />
                            <CardContent className={classes.cardContent}>
                                <Typography gutterBottom variant="h5" component="h2">
                                {(house_id == null ? "Aucune maison" : house_name) /*affiche le nom de la maison */} 
                                </Typography>
                                <Typography>

                                    <TableContainer component={Paper}>
                                        <Table className={classes.table} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Nom événement</TableCell>
                                                    <TableCell align="right">Date</TableCell>
                                                    <TableCell align="right">Nb personnes</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                    <TableRow key={name}>
                                                        <TableCell component="th" scope="row">
                                                            {name}
                                                        </TableCell>
                                                        <TableCell align="right">{date_begin}</TableCell>
                                                        <TableCell align="right">{nb_attendees}</TableCell>
                                                    </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary">
                                    Voir plus...
                                </Button>
                            </CardActions>
                        </Card>
                    )}
                </Grid>
            </main>
        </React.Fragment>
    );
}