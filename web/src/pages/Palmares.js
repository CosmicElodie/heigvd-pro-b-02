import React, { useEffect } from 'react';
import { appConfig } from "../config/appConfig"
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {
    Card, CardContent, CardMedia,
    TablePagination,
    Grid,
    Table, TableBody, TableCell, TableHead, TableContainer, TableRow,
    Paper
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    card: { //dans la carte
        minWidth: '450px',
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        height: "100%",
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

export default function Palmares() {

    //const {user} = useContext(MainContext);
    const classes = useStyles();

    //const [ data, setData ] = useState(); //mettre json à la place de useState
    const [topUserYearly, setTopUserYearly] = React.useState();
    const [topUserMonthly, setTopUserMonthly] = React.useState();
    const [topHouses, setTopHouses] = React.useState();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    var rankIL = 1;


    const getTopUsersYearly = (e) => {
        let post_body =
            "&house_id=" + e;
        fetch(appConfig.api_url + 'auditoire/yearly',
            { //pour l'instant yearly envoie tous les users toutes maisons confondues.
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: post_body
            })
            .then(response => response.json())
            .then(response => { setTopUserYearly(response) })
    }

    const getTopUsersMonthly = (e) => {
        let post_body =
            "&house_id=" + e;
        fetch(appConfig.api_url + 'auditoire/monthly', { //pour l'instant yearly envoie tous les users toutes maisons confondues.
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: post_body
        })
            .then(response => response.json())
            .then(response => { setTopUserMonthly(response) })
    }

    const getTopHouses = (e) => {
        fetch(appConfig.api_url + 'auditoire/palmares', { //pour l'instant yearly envoie tous les users toutes maisons confondues.
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
            .then(response => response.json())
            .then(response => { setTopHouses(response) })
    }

    function displayLine(rank, firstname, lastname, house, points_year) {
        if (rank <= 5) {
            return (<TableRow  >
                <TableCell>{rankIL++}</TableCell>
                <TableCell>{firstname + ' ' + lastname}</TableCell>
                <TableCell>{house.name}</TableCell>
                <TableCell>{points_year}</TableCell>
            </TableRow>

            );
        }
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    function displayHouseLine(annee, premier, deuxieme, troisieme, quatrieme, cinquieme, premier_pts, deuxieme_pts, troisieme_pts, quatrieme_pts, cinquieme_pts) {
        return (<TableRow  >
            <TableCell>{annee}</TableCell>
            <TableCell>{premier}<br />{' (' + premier_pts + ' pts)'}</TableCell>
            <TableCell>{deuxieme}<br />{' (' + deuxieme_pts + ' pts)'}</TableCell>
            <TableCell>{troisieme}<br />{' (' + troisieme_pts + ' pts)'}</TableCell>
            <TableCell>{quatrieme}<br />{' (' + quatrieme_pts + ' pts)'}</TableCell>
            <TableCell>{cinquieme}<br />{' (' + cinquieme_pts + ' pts)'}</TableCell>
        </TableRow>

        );
    }

    const displayAnnualRank = (name, topUser) => {

        return (
            <Card className={classes.card}>
                <h1>{name}</h1>
                <CardMedia
                    className={classes.cardMedia}
                    image=""
                    title="Image title"
                />

                <CardContent className={classes.cardContent}>
                    <Typography>
                        <TableContainer component={Paper}>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>#</TableCell>
                                        <TableCell align="left">Nom</TableCell>
                                        <TableCell align="left">Orientation</TableCell>
                                        <TableCell align="left">Points</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody n={rankIL = 1}>
                                    {topUser && topUser.map(({ birth, email, house, active, avatar, status, created, user_id, initials, lastname, firstname, last_online, points_year, access_level, points_month }) =>
                                        displayLine(rankIL, firstname, lastname, house, points_year)
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Typography>
                </CardContent>
            </Card>

        )
    }

    const displayMonthlyRank = (name, topUser) => {

        return (
            <Card className={classes.card}>
                <h1>{name}</h1>
                <CardMedia
                    className={classes.cardMedia}
                    image=""
                    title="Image title"
                />

                <CardContent className={classes.cardContent}>
                    <Typography>
                        <TableContainer component={Paper}>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>#</TableCell>
                                        <TableCell align="left">Nom</TableCell>
                                        <TableCell align="left">Orientation</TableCell>
                                        <TableCell align="left">Points</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody n={rankIL = 1}>
                                    {topUser && topUser.map(({ birth, email, house, active, avatar, status, created, user_id, initials, lastname, firstname, last_online, points_year, access_level, points_month }) =>
                                        displayLine(rankIL, firstname, lastname, house, points_month)
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Typography>
                </CardContent>
            </Card>

        )
    }

    const displayHouseRank = (name, topHouses) => {
        return (

            <Card className={classes.card}>
                <h1>{name}</h1>
                <CardMedia
                    className={classes.cardMedia}
                    image=""
                    title="Image title"
                />

                <CardContent className={classes.cardContent}>
                    <Typography>
                        <TableContainer component={Paper}>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Année</TableCell>
                                        <TableCell align="left">1ère</TableCell>
                                        <TableCell align="left">2ème</TableCell>
                                        <TableCell align="left">3ème</TableCell>
                                        <TableCell align="left">4ème</TableCell>
                                        <TableCell align="left">5ème</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody n={rankIL = 1}>
                                    {topHouses && topHouses.map(({ annee, premier, deuxieme, cinquieme, quatrieme, troisieme, premier_pts, deuxieme_pts, cinquieme_pts, quatrieme_pts, troisieme_pts }) =>
                                        displayHouseLine(annee, premier, deuxieme, troisieme, quatrieme, cinquieme, premier_pts, deuxieme_pts, troisieme_pts, quatrieme_pts, cinquieme_pts)
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        {topHouses &&
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={topHouses.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                            />
                        }
                    </Typography>
                </CardContent>
            </Card>

        )
    }

    useEffect(() => {
        getTopUsersMonthly(0);
        getTopUsersYearly(0);
        getTopHouses();
    }, []);

    return (
        <main>
            <Grid container spacing={2} direction="row" justify="space-evenly" alignItems="stretch">
                    <Grid item xs={12} sm={6}>
                        {displayMonthlyRank('Top utilisateur (mensuel)', topUserMonthly)}
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        {displayAnnualRank('Top utilisateur (annuel)', topUserYearly)}
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    {displayHouseRank('Coupe des 5 maisons', topHouses)}
                </Grid>
    
        </main>
    );
}