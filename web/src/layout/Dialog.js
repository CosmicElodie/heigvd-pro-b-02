import React, { useContext } from 'react';
import { MainContext } from '../context/MainContext';

import Snackbar from '@material-ui/core/Snackbar';
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        '& > * + *': {
        marginTop: theme.spacing(2),
        },
    }
}));

const Dialog = () => {
    const { dialog, setDialog } = useContext(MainContext);
    const classes = useStyles();
    const handleClose = (which) => {
        setDialog((latest) => { 
            // merge 2 objets JSON, l'attribut de which sera prioritaire
            return {...latest, ...which}; 
        });
    };
    return (
        <section className={classes.root}>
            <Snackbar 
                    open = { dialog.login_success } 
                    onClose = { () => handleClose({ login_success: false }) } 
                    autoHideDuration={6000} >
                <Alert variant="filled" severity="success">
                Welcome on board!
                </Alert>
            </Snackbar>
        </section>
    );
}

export default Dialog;