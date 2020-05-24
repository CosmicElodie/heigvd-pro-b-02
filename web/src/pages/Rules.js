import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {
    Card, CardContent, CardMedia,
    CssBaseline,
    Grid,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

const ExpansionPanel = withStyles({
    root: {
        border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
    root: {
        backgroundColor: 'rgba(0, 0, 0, .03)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiExpansionPanelDetails);

const useStyles = makeStyles(theme => ({
    card: { //dans la carte
        maxWidth: '1300px',
        minWidth: '450px',
        minHeight: '400px',
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10
    },
    cardMedia: {
        paddingTop: '0%',
        flexDirection: 'row',
        justify: 'space-evenly',
        width: 'auto',
        height: 'auto',
    },
    cardContent: {
        flexGrow: 1
    }
}));

export default function Rules() {

    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    //const {user} = useContext(MainContext);
    const classes = useStyles();

    //const [ data, setData ] = useState(); //mettre json à la place de useState
    const [topUserYearly, setTopUserYearly] = React.useState();
    const [topUserMonthly, setTopUserMonthly] = React.useState();

    return (

        <main>
            <CssBaseline />
            <Grid container direction="row" justify="space-evenly" alignItems="center">
                <Card className={classes.card}>
                    <Typography gutterBottom variant="h6" align="center">
                    </Typography>
                    <CardMedia
                        className={classes.cardMedia}
                        image=""
                        title="Image title"
                    />
                    <CardContent className={classes.cardContent}>
                        <h1>Conditions générales d'utilisation</h1>
                        <ul>
                            <li>Seules les personnes affiliées à la Haute École d’Ingénierie et de Gestion du Canton de Vaud (HEIG-VD) sont admissibles sur l’application ‘Compétition entre Orientations Inter TIC’ (CO-IT)</li>
                            <li>Chaque utilisateur fait partie d’une maison représentant son orientation ou du domaine de ses recherche (professeur), à savoir : Informatique Logiciel (IL), Informatique Systèmes Embarqués (IE), Ingénierie des données (ID), Réseaux & Système (TR), Sécurité Informatique (TS).</li>
                            <li>Si un utilisateur change d’orientation à l’issue de la première année, il en avisera un administrateur afin de procéder au changement de sa maison qui prendra effet dès le 15 septembre de l’année en cours.</li>
                            <li>La maison qui aura rapporté le plus de points en une année sera déclarée la maison vainqueur.</li>
                            <li>Le créateur de l’événement est responsable de la bonne tenue dudit événement.</li>
                            <li>Le créateur d’un événement, ayant organisé un événement entre le premier jour du mois et le dernier jour du mois, a jusqu’au cinquième jour du mois suivant pour donner les résultats. Sans quoi, aucun point ne sera distribué aux gagnants. Si un problème subsiste, il doit en informer un administrateur.</li>
                            <li>Il est interdit de gonfler les points.</li>
                            <li>Tout propos haineux, insultant, raciste ou portant atteinte à l’intégrité et/ou l’honneur d’une personne est interdit, le modérateur ou le préfet peuvent supprimer le post.</li>
                            <li>Tout abus ou comportement ne respectant pas les règles de l’application peut résulter en un malus de points ou en un avertissement.</li>
                            <li>En cas de faute grave, l’utilisateur peut être banni définitivement du site.</li>

                        </ul>

                        <h1>Frequently Asked Questions</h1>

                        <ExpansionPanel square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                            <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header">
                                <Typography>Qui peut créer des événements ?</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography>
                                    Tout le monde ! Mais l’organisateur se doit d’être responsable du bon déroulement de l’événement et de fournir si nécessaire des preuves que l’événement se soit bien déroulé.
                                 </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                            <ExpansionPanelSummary aria-controls="panel2d-content" id="panel2d-header">
                                <Typography>Quelle est la période de compétition pour élir la meilleure orientation ?</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography>
                                    Du 15 septembre au 14 septembre de l’année suivante.
                                </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                            <ExpansionPanelSummary aria-controls="panel3d-content" id="panel3d-header">
                                <Typography>Comment peut-on rapporter des points à son orientation ?</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography>
                                    <p>Vous pouvez gagner des points par le biais de différentes actions, renseignées ci-dessous :</p>
                                    <center>
                                    <TableContainer component={Paper}>
                                        <Table className={classes.table} aria-label="caption table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Action</TableCell>
                                                    <TableCell>Points</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell>Créer un sujet dans la section d’aide.</TableCell>
                                                    <TableCell>1 point / heure</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Répondre à un sujet dans une section d’aide.</TableCell>
                                                    <TableCell>1 point / heure</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Meilleure réponse dans un sujet provenant d’une section d’aide.</TableCell>
                                                    <TableCell>2</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Participer à un événement.</TableCell>
                                                    <TableCell>5</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    </center>
                                    <p>Il est également possible de gagner des points si vous faites partie des trois premiers gagnants d'un événement compétitif :</p>
                                    <center>
                                    <TableContainer component={Paper}>
                                        <Table className={classes.table} aria-label="caption table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell></TableCell>
                                                    <TableCell>1ère place</TableCell>
                                                    <TableCell>2ème place</TableCell>
                                                    <TableCell>3ème place</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell><b>Facile</b></TableCell>
                                                    <TableCell>10 pts</TableCell>
                                                    <TableCell>6 pts</TableCell>
                                                    <TableCell>3 pts </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell><b>Moyen</b></TableCell>
                                                    <TableCell>25 pts</TableCell>
                                                    <TableCell>15 pts</TableCell>
                                                    <TableCell>7 pts </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell><b>Difficile</b></TableCell>
                                                    <TableCell>50 pts</TableCell>
                                                    <TableCell>25 pts</TableCell>
                                                    <TableCell>15 pts </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell><b>Extrême</b></TableCell>
                                                    <TableCell>100 pts</TableCell>
                                                    <TableCell>60 pts</TableCell>
                                                    <TableCell>30 pts </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    </center>
                                </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>

                    </CardContent>
                </Card>
            </Grid>
        </main>
    );
}