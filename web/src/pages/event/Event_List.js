import React, { useContext, useCallback } from 'react';
import { useHistory } from "react-router-dom";
import { EventContext } from '../../context/EventContext';
import { MainContext } from '../../context/MainContext';

import PropTypes from "prop-types";
import Moment from 'react-moment';
import { styled } from '@material-ui/core/styles';

import {
    Button,
    Card,
    CardContent,
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
    Paper,
    useRadioGroup
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    card: { //dans la carte
        height: '90%',
        minWidth: '700px',
        width: '1100px',
        display: 'flex',
        flexDirection: 'column',
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
    { id: 'organisator.lastname', numeric: false, disablePadding: false, label: 'Organisateur' },
    { id: 'house_id', numeric: true, disablePadding: false, label: 'Limitation' },
    { id: 'nb_attendees', numeric: true, disablePadding: false, label: 'Nb participants' },
    { id: 'deadline_reservation', numeric: false, disablePadding: false, label: 'Date limite inscription' },
    { id: 'date_begin', numeric: false, disablePadding: false, label: 'Date' },
    { id: 'location', numeric: false, disablePadding: false, label: 'Lieu' },
    { id: 'status', numeric: false, disablePadding: false, label: 'Statut' }
];

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
                        align={"right"}
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

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired
};

export default function Event_List() {

    let history = useHistory();
    const classes = useStyles();
    const { user, setDialog } = useContext(MainContext);
    const { data } = useContext(EventContext);

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

    const redirectPage = useCallback((link) => {
        // Will change the URL, behaves like a link
        history.push(link);
    });

    const MyButton = styled(Button)({
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
    });

    //Affiche les events selon les niveaux d'accès
    function displayEveryEvents(index, event_id, name, description, is_competitive, difficulty, battleroyale,
        status, price, attendees_min, attendees_max, created, deadline_reservation,
        date_begin, date_end, location, address, house, organisator, participants, nb_attendees) {
        return (<TableRow tabIndex={-1}>
            <TableCell align="right"
                component="th"
                id={`enhanced-table-checkbox-${index}`}
                scope="row">
                <Button
                    onClick={() => redirectPage("/event_display/" + event_id)}
                >
                    {name}
                </Button>
            </TableCell>
            <TableCell align="right">
                {organisator.firstname + ' ' + organisator.lastname}
            </TableCell>

            <TableCell align="right"> {house == null ? "Global" : house.shortname}</TableCell>
            <TableCell align="right">{nb_attendees + ' / ' + attendees_max}</TableCell>
            <TableCell align="right">
                <Moment format="DD/MM/YYYY HH:mm">
                    {deadline_reservation}
                </Moment>
            </TableCell>
            <TableCell align="right">
                <Moment format="DD/MM/YYYY HH:mm">
                    {date_begin}
                </Moment>
            </TableCell>
            <TableCell align="right">{location}</TableCell>
            <TableCell align="right">{status}</TableCell>
        </TableRow>
        );
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <main>
                <Grid>
                    <Card className={classes.card}>
                        <CardContent className={classes.cardContent}>
                            <center><h1>Liste des événements</h1></center>
                            <p>
                                <MyButton href="event_create" variant="contained" color="secondary">
                                    Créer un événement
                                </MyButton>
                            </p>

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
                                        {data && stableSort(data, getComparator(order, orderBy))
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map(({ event_id, name, description, is_competitive, difficulty, battleroyale,
                                                status, price, attendees_min, attendees_max, created, deadline_reservation,
                                                date_begin, date_end, location, address, house, organisator, participants, nb_attendees }, index) =>

                                                displayEveryEvents(index, event_id, name, description, is_competitive, difficulty, battleroyale,
                                                    status, price, attendees_min, attendees_max, created, deadline_reservation,
                                                    date_begin, date_end, location, address, house, organisator, participants, nb_attendees)
                                            )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={Object.size(data)}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                            />
                        </CardContent>
                    </Card>
                </Grid>
            </main>
        </React.Fragment>
    );
}