import React, {useContext} from 'react';
import {MainContext} from '../../context/MainContext';
import Typography from '@material-ui/core/Typography';

import {Button, 
    Card, CardActions, CardContent, CardMedia, 
    CssBaseline, 
    Grid, 
    Table, TableBody, TableCell, TableHead, TableContainer, TableRow, 
    Paper} from '@material-ui/core';

import {makeStyles} from '@material-ui/core/styles';

import '../../css/Auditoire.css'; 

const useStyles = makeStyles(theme => ({
    card: { //dans la carte
        width: '30%',
        minWidth: '300px',
        minHeight: '700px',
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10
    },
    cardMedia: {
        paddingTop: '100%',
        flexDirection: 'row',
        justify: 'space-evenly'
    },
    cardContent: {
        flexGrow: 1
    }
}));

export default function Auditoire() {

    const {user} = useContext(MainContext);
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline/>
            <main>
                <Grid container direction="row" justify="space-evenly" alignItems="center">
                    <Grid item xs> 
                        <Card className={classes.card}>
                                    <Typography gutterBottom variant="h6" align="center">
                                        Informatique logicielle
                                    </Typography>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image="https://i.imgur.com/NSM8kNK.png"
                                        title="Image title"
                                    />
                                    ... points<br />
                                    ... membres
                                    <CardContent className={classes.cardContent}>
                                        <Typography>
                                            <TableContainer component={Paper}>
                                                <Table className={classes.table} aria-label="simple table">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>#</TableCell>
                                                            <TableCell align="left">Nom</TableCell>
                                                            <TableCell align="left">Points</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        <TableRow >
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </Typography>
                                    </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs>
                                    <Card className={classes.card}>
                                        <Typography gutterBottom variant="h6" align="center">
                                            Ingénierie des données
                                        </Typography>
                                        <CardMedia
                                            className={classes.cardMedia}
                                            image="https://i.imgur.com/NSM8kNK.png"
                                            title="Image title"
                                        />
                                        ... points<br />
                                        ... membres
                                        <CardContent className={classes.cardContent}>
                                            <Typography>
                                                <TableContainer component={Paper}>
                                                    <Table className={classes.table} aria-label="simple table">
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell>#</TableCell>
                                                                <TableCell align="left">Nom</TableCell>
                                                                <TableCell align="left">Points</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            <TableRow >
                                                            </TableRow>
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={3}>
                                <Card className={classes.card}>
                                    <Typography gutterBottom variant="h6" align="center">   
                                        Réseaux et systèmes
                                    </Typography>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image="https://i.imgur.com/NSM8kNK.png"
                                        title="Image title"
                                    />
                                    ... points<br />
                                    ... membres
                                    <CardContent className={classes.cardContent}>
                                        <Typography>
                                            <TableContainer component={Paper}>
                                                <Table className={classes.table} aria-label="simple table">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>#</TableCell>
                                                            <TableCell align="left">Nom</TableCell>
                                                            <TableCell align="left">Points</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        <TableRow >
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </Typography>
                                    </CardContent>
                                </Card>
                                </Grid>
                            </Grid>
                            <br />
                    <Grid container direction="row" justify="space-evenly" alignItems="center">
                        <Grid item xs={3}> 
                            <Card className={classes.card}>
                                <Typography gutterBottom variant="h6" align="center">
                                    Sécurité informatique
                                </Typography>
                                <CardMedia
                                    className={classes.cardMedia}
                                    image="https://i.imgur.com/NSM8kNK.png"
                                    title="Image title"
                                />
                                ... points<br />
                                ... membres
                                <CardContent className={classes.cardContent}>
                                    <Typography>
                                        <TableContainer component={Paper}>
                                            <Table className={classes.table} aria-label="simple table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>#</TableCell>
                                                        <TableCell align="left">Nom</TableCell>
                                                        <TableCell align="left">Points</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <TableRow >
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Typography>
                                </CardContent>
                            </Card>
                            </Grid>

                            <Grid item xs={3}>
                            <Card className={classes.card}>
                                <Typography gutterBottom variant="h6" align="center">
                                    Systèmes informatiques embarqués
                                </Typography>
                                <CardMedia
                                    className={classes.cardMedia}
                                    image="https://i.imgur.com/NSM8kNK.png"
                                    title="Image title"
                                />
                                ... points<br />
                                ... membres
                                <CardContent className={classes.cardContent}>
                                    <Typography>
                                        <TableContainer component={Paper}>
                                            <Table className={classes.table} aria-label="simple table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>#</TableCell>
                                                        <TableCell align="left">Nom</TableCell>
                                                        <TableCell align="left">Points</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <TableRow >
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
            </main>
        </React.Fragment>
    );
}