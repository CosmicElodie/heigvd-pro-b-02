import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

import {withStyles, makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { ForumContext } from '../../context/ForumContext';

const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const Title = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        fontSize: 20
    },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
}))(TableRow);

function createData(name, date, nbParticipants) {
    return {name, date, nbParticipants};
}

//DEBUT data pour tests

//TODO : faire en sorte que cet élément récupère la maison de l'utilisateur
const houseName = "Maison Logicielle"

//TODO : faire en sorte que ces données s'affichent selon la maison de l'utilisateur
const houseRows = [
    createData('Coding jam IL', '12/04/2020', 8),
    createData('Workshop - Comment coder avec classe', '15/04/2020', 23),
    createData('Séance révisions POO2', '19/04/2020', 12),
    createData('Workshop - How to make a sandwich', '03/05/2020', 8),
    createData('Workshop - To log or not to log ?', '12/05/2020', 4)
];

//TODO : il s'agit des événements globaux à toutes les maisons. Il faut simplement récupérer les données qui sont
//censées être accessibles à tout le monde
const globalRows = [
  createData('À venir', '00/00/0000', 0),
  createData('À venir', '00/00/0000', 0),
    createData('À venir', '00/00/0000', 0)
];
//FIN data pour tests

const useStyles = makeStyles(theme => ({
    card: { //dans la carte
        minHeight: '620px',
        width: '45%',
        display: 'flex',
        flexDirection: 'column'
    },
    cardMedia: {
        paddingTop: '20%', //height de l'image
        flexDirection: 'row', //place les cartes en colonne
        justify: 'space-evenly', //assez parlant...
        //borderRadius: '50%' //permet d'arrondir l'image
    },
    cardContent: {
        flexGrow: 1,
    }
}));

export default function Event_bienvenue() {
    const classes = useStyles();
    
    return (
        <React.Fragment>
            <CssBaseline/>
            <main>
                <Grid container direction="row" justify="space-evenly" alignItems="flex-start">

                    <Card className={classes.card}>
                        <CardMedia
                            className={classes.cardMedia}
                            image="https://i.imgur.com/VDRkKqw.png"
                            title="Image title"
                        />
                        <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="h5" component="h2">
                              { houseName /*affiche le nom de la maison */} 
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
                                            {houseRows.map(row => (
                                                <TableRow key={row.name}>
                                                    <TableCell component="th" scope="row">
                                                        {row.name}
                                                    </TableCell>
                                                    <TableCell align="right">{row.date}</TableCell>
                                                    <TableCell align="right">{row.nbParticipants}</TableCell>
                                                </TableRow>
                                            ))}
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
                    <br/><br/>
                    <Card className={classes.card}>
                        <CardMedia
                            className={classes.cardMedia}
                            image="https://heig-vd.ch/images/default-source/img-vie-sur-le-campus/heig-vd-site-web-sm-00075562.jpg?sfvrsn=e01580ea_2"
                            title="Image title"
                        />
                        <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="h5" component="h2">
                                Événements globaux
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
                                            {globalRows.map(row => (
                                                <TableRow key={row.name}>
                                                    <TableCell component="th" scope="row">
                                                        {row.name}
                                                    </TableCell>
                                                    <TableCell align="right">{row.date}</TableCell>
                                                    <TableCell align="right">{row.nbParticipants}</TableCell>
                                                </TableRow>
                                            ))}
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
                </Grid>
            </main>
        </React.Fragment>
    );
}
