import React, {useContext, useEffect} from 'react';
import {MainContext} from '../../context/MainContext';
import { EventContext } from '../../context/EventContext';
import Typography from '@material-ui/core/Typography';

import PropTypes from "prop-types";

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
    TablePagination,
    TableRow,
    TableSortLabel,
    Paper} from '@material-ui/core';

import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    card: { //dans la carte
        height: '90%',
        minWidth: '700px',
        width: '1000px',
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
    { id: 'house_id', numeric: false, disablePadding: false, label: 'Limitation' },
    { id: 'nb_attendees', numeric: true, disablePadding: false, label: 'Nb participants' },
    { id: 'deadline_reservation', numeric: false, disablePadding: false, label: 'Date limite inscription' },
    { id: 'date_begin', numeric: false, disablePadding: false, label: 'Date' },
    { id: 'location', numeric: false, disablePadding: false, label: 'Lieu' }
];

function EnhancedTableHead(props) 
{
    const { classes, order, orderBy, onRequestSort } = props;
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
    const classes = useStyles();
    const {user:{event}} = useContext(MainContext);
    const {data, setData} = useContext(EventContext);

    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState();
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
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

    Object.size = function(obj) {
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };
    
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
                            <center><h1>Liste des événements</h1></center>
                            <TableContainer component={Paper}>
                                <Table  className={classes.table}
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
                                        .map(({     name, price, status, address, created, date_end, event_id, house_id, 
                                                    location, date_begin, difficulty, house_name, description, organisator, 
                                                    battleroyale, nb_attendees, participants, attendees_max, attendees_min,
                                                    is_competitive, deadline_reservation }, index) =>
                                                    
                                                <TableRow tabIndex={-1}>
                                                    <TableCell component="th"
                                                        id={`enhanced-table-checkbox-${index}`}
                                                        scope="row">{name}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {/*<img src={require(choosePuce(user.house && user.house.name))}/> 
                                                        <img src={require('./puce_IL.png')}/> */}
                                                        {(organisator.firstname + ' ' + organisator.lastname + ' ')}
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