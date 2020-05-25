import React, { useEffect, useContext } from 'react';
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

let imagePath = 'http://localhost:8080/content/404.png';

export default function HouseKeeping() {
    const { user, setUser, setDialog } = useContext(MainContext);
    const classes = useStyles();

    function defineAuth() {

        if (user.access_level < 75) {
            return (<center><img width={'100%'} src={imagePath} alt="err_404" /></center>);
        }
        else {
            return (<main>
                
                    <Card className={classes.card}>
                        <CardContent className={classes.cardContent}>
                            <Typography>
                                {
                                    <h1>Interface administrateur</h1>
                                    //ajouter tableau miche
                                }
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