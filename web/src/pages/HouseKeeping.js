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

    }
}));

let imagePath = 'http://localhost:8080/content/404.png';

export default function HouseKeeping() {
    const { user, setUser, setDialog } = useContext(MainContext);
    const [ users, setUsers ]  = useState();
    const classes = useStyles();

    useEffect(() => {   
        
    }, []);

    getUsers()
    
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
                            <h2>Sélectionner user</h2>
                            {users && users.length > 0 && users.map(({ participant }) =>
                                participant
                            )}

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