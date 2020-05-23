import React, { useContext } from 'react';
import { styled } from '@material-ui/core/styles';
import { Button, CssBaseline, Grid } from '@material-ui/core';
import EventWelcomeHouseContainer from './Event_Welcome_House_Container';
import EventWelcomeGlobalContainer from './Event_Welcome_Global_Container';
import { makeStyles } from '@material-ui/core/styles';

import '../../css/Event.css';

const useStyles = makeStyles(theme => ({
    card: { //dans la carte
        height: '750px',
        width: '80%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '200px',
        flexDirection: 'row',
        justify: 'space-evenly'
    },
    cardContent: {
        flexGrow: 1,
    },
    button: {
        align: 'center',
        alignItems: 'center'
    },
    control: {
        padding: theme.spacing(2),
    },
}));

export default function Event() {
    const classes = useStyles();

    const MyButton = styled(Button)({
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0px 20px',
        margin: '30px 30px',
    });

    return (
        <React.Fragment>
            <CssBaseline />
            <main>
                <Grid container direction="row" justify="space-evenly" alignItems="center">
                    <center>
                        <MyButton
                            type="submit"
                            variant="contained"
                            className={classes.submit}>
                            <a href="/event_list">Voir tous les événements</a>
                        </MyButton>
                        <MyButton
                            type="submit"
                            variant="contained"
                            className={classes.submit}>
                            <a href="/event_create">Créer un événement</a>
                        </MyButton>
                    </center>
                </Grid>
                <Grid container direction="row" justify="space-evenly" alignItems="center">
                    <EventWelcomeHouseContainer />
                </Grid>
                <br /><br />
                <Grid container direction="row" justify="space-evenly" alignItems="center">
                    <EventWelcomeGlobalContainer />
                </Grid>
            </main>
        </React.Fragment >
    );
}

