import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {
    Card, CardContent, CardMedia,
    CssBaseline,
    Grid,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';
import { MainContext } from '../context/MainContext';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles(theme => ({
    card: { //dans la carte

    },
    cardMedia: {

    },
    cardContent: {
        width: "100%",

    }
}));

let imagePath = 'http://localhost:8080/content/404.png';
const options = ['Option 1', 'Option 2'];

export default function HouseKeeping() {
    const { user, setUser, setDialog } = useContext(MainContext);
    const [users, setUsers] = useState();
    const [value, setValue] = React.useState(users);
    const classes = useStyles();

    useEffect(() => {
        getUsers()
    }, []);



    function getUsers() {
        fetch('http://localhost:8080/housekeeping/all',
            {
                method: 'GET',
                credentials: 'include'
            })
            .then(response => response.json())
            .then(response => { setUsers(response); }
            )
    }

    function displayAndSetValues(_user)
    {
        setValue(_user);
        return (_user.firstname + ' ' + _user.lastname);
    }



    function defineAuth() {

        if (user.access_level < 75) {
            return (<center><img width={'100%'} src={imagePath} alt="err_404" /></center>);
        }
        else {
            return (<main>

                <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                        <Typography>

                            <h1>Interface administrateur</h1>
                            
                            <Autocomplete
                                value={value}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }}
                                id="select-user"
                                options={users}
                                getOptionLabel={(option) => displayAndSetValues(option.user)}
                                style={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="Sélectionner utilisateur" variant="outlined" />}
                            />
                            <br />
                            {<b>{"Nom : "}</b>}{(value == null ? "Non renseigné" : value.lastname)}
                            <br />
                            {<b>{"Prénom : "}</b>}{(value == null ? "Non renseigné" : value.firstname)}
                            <br />
                            {<b>{"Maison : "}</b>}{(value == null ? "Non renseigné" : (value.house && value.house.name))}
                            <br />
                            {<b>{"Acces level : "}</b>}{(value == null ? "Non renseigné" : value.access_level)}
                            <br />
                            {<b>{"Statut : "}</b>}{(value == null ? "Non renseigné" : (value.status && value.status.name))}
                            <br />
                            {<b>{"Points (mois) : "}</b>}{ (value == null ? "Non renseigné" : value.points_month)}
                            <br />
                            

                        </Typography>
                    </CardContent>
                </Card>

            </main>);
        }
    }

    return (
        defineAuth()
    );
}