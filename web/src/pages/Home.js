import React, { useEffect, useContext, useCallback } from 'react';
import { useHistory } from "react-router-dom";
import { MainContext } from '../context/MainContext';
import { EventContext } from '../context/EventContext';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from "prop-types";
import {
    Button,
    Card, CardContent, CardMedia,
    CssBaseline,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableContainer,
    TablePagination,
    TableRow,
    TableSortLabel,
    Paper
} from '@material-ui/core';

import Moment from 'react-moment';

const useStyles = makeStyles(theme => ({
    card: { //dans la carte
        minWidth: '350px',
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

export default function Home() {
    const { user } = useContext(MainContext);

    //const {user} = useContext(MainContext);
    const classes = useStyles();


    let history = useHistory();

    const redirectPage = useCallback((link) => {
        // Will change the URL, behaves like a link
        history.push(link);
    });


    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState();
    const [selected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    Object.size = function (obj) {
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };

    //const [ data, setData ] = useState(); //mettre json à la place de useState
    const [joinedEvents, setJoinedEvents] = React.useState();
    const [createdEvents, setCreatedEvents] = React.useState();

    useEffect(() => {
        { user.user_id && getJoinedEvents(); }
        { user.user_id && getCreatedEvents(); }
    }, [user.user_id]);

    const getCreatedEvents = () => {
        let post_body = "&user_id=" + parseInt(user.user_id);
        console.log("CREATED");
        console.log(post_body);

        fetch('http://localhost:8080/event/created_by_user',
            {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: post_body
            })
            .then(response => response.json())
            .then(response => { setCreatedEvents(response) })
    }

    const getJoinedEvents = () => {
        let post_body = "&user_id=" + parseInt(user.user_id);
        console.log("PARTICIPATED");
        console.log(post_body);
        fetch('http://localhost:8080/event/participated_by_user', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: post_body
        })
            .then(response => response.json())
            .then(response => { setJoinedEvents(response) })
    }

    function displayLine(index, event_id, name, date_begin, location, nb_attendees, status) {
        return (<TableRow tabIndex={-1}>
            <TableCell align="right"
                component="th"
                id={`enhanced-table-checkbox-${index}`}
                scope="row">
                <Button
                    onClick={() => redirectPage("/event_display/" + event_id)}>
                    {name}
                </Button>
            </TableCell>
            <TableCell align="left"><Moment format="DD/MM/YYYY - HH:mm">{date_begin}</Moment></TableCell>
            <TableCell align="left">{location}</TableCell>
            <TableCell align="left">{nb_attendees}</TableCell>
            <TableCell align="left">{status}</TableCell>
        </TableRow>
        );
    }

    const displayCreatedEvents = (name, events) => {
        return (

            <Card className={classes.card}>
                <center><h2>{name}</h2></center>
                <CardMedia
                    className={classes.cardMedia}
                    image=""
                    title="Image title"
                />

                <CardContent className={classes.cardContent}>
                    <Typography>
                        <TableContainer component={Paper}>
                            <Table className={classes.table}
                                aria-labelledby="tableTitle"
                                size={dense ? "small" : "medium"}
                                aria-label="enhanced table"
                            >
                                <EnhancedTableHead
                                    classes={classes}
                                    numSelected={selected.length}
                                    order={order}
                                    orderBy={orderBy}
                                    onRequestSort={handleRequestSort}
                                    rowCount={7}
                                />
                                <TableBody>
                                    {createdEvents && createdEvents.length > 0 && stableSort(createdEvents, getComparator(order, orderBy))
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(({ index, event_id, name, description, is_competitive, difficulty, battleroyale,
                                            status, price, attendees_min, attendees_max, created, deadline_reservation,
                                            date_begin, date_end, location, address, house, organisator, participants, nb_attendees }) =>

                                            displayLine(index, event_id, name, date_begin, location, nb_attendees, status)
                                        )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={Object.size(createdEvents)}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </Typography>
                </CardContent>
            </Card>
        )
    }

    const displayJoinedEvents = (name, events) => {
        return (

            <Card className={classes.card}>
                <center><h2>{name}</h2></center>

                <CardMedia
                    className={classes.cardMedia}
                    image=""
                    title="Image title"
                />

                <CardContent className={classes.cardContent}>
                    <Typography>
                        <TableContainer component={Paper}>
                            <Table className={classes.table}
                                aria-labelledby="tableTitle"
                                size={dense ? "small" : "medium"}
                                aria-label="enhanced table"
                            >

                                <EnhancedTableHead
                                    classes={classes}
                                    numSelected={selected.length}
                                    order={order}
                                    orderBy={orderBy}
                                    onRequestSort={handleRequestSort}
                                    rowCount={7}
                                />

                                <TableBody>
                                    {joinedEvents && joinedEvents.length > 0 && stableSort(joinedEvents, getComparator(order, orderBy))
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(({ index, event_id, name, description, is_competitive, difficulty, battleroyale,
                                            status, price, attendees_min, attendees_max, created, deadline_reservation,
                                            date_begin, date_end, location, address, house, organisator, participants, nb_attendees }) =>

                                            displayLine(index, event_id, name, date_begin, location, nb_attendees, status)
                                        )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={Object.size(joinedEvents)}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </Typography>
                </CardContent>
            </Card>

        )
    }

    function EnhancedTableHead(props) {
        const { order, orderBy, onRequestSort } = props;
        const createSortHandler = property => event => {
            onRequestSort(event, property);
        };

        return (
            <TableHead>
                <TableRow>
                    {headCells.map(headCell => (
                        <TableCell
                            key={headCell.id}
                            align={"left"}
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : "asc"}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    }

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    function getComparator(order, orderBy) {
        return order === "desc"
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map(el => el[0]);
    }

    //Titre des colonnes
    const headCells = [
        { id: 'name', numeric: false, disablePadding: false, label: 'Nom' },
        { id: 'date_begin', numeric: true, disablePadding: false, label: 'Date début' },
        { id: 'location', numeric: false, disablePadding: false, label: 'Lieu' },
        { id: 'nb_attendees', numeric: true, disablePadding: false, label: 'Nb participants' },
        { id: 'status', numeric: false, disablePadding: false, label: 'Statut' }
    ];



    EnhancedTableHead.propTypes = {
        classes: PropTypes.object.isRequired,
        onRequestSort: PropTypes.func.isRequired,
        order: PropTypes.oneOf(["asc", "desc"]).isRequired,
        orderBy: PropTypes.string.isRequired,
        rowCount: PropTypes.number.isRequired
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <main>
                <h1>Bienvenue, {user.firstname} !</h1>
                <Grid spacing={2} container direction="row" justify="space-evenly" alignItems="stretch">

                    <Grid item xs>
                        {displayJoinedEvents('Événements rejoints par ' + user.firstname, joinedEvents)}
                    </Grid>

                    <Grid item xs>
                        {displayCreatedEvents('Événements créés par ' + user.firstname, createdEvents)}
                    </Grid>

                </Grid>
            </main>
        </React.Fragment>
    );
}