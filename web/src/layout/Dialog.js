import React, { useContext } from 'react';
import { MainContext } from '../context/MainContext';

import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab';

const Dialog = () => {
    const { dialog, setDialog } = useContext(MainContext);
    const handleClose = (which) => {
        setDialog((latest) => { 
            // merge 2 objets JSON, l'attribut de which sera prioritaire
            return {...latest, ...which}; 
        });
    };
    
    return (
        <section>
           { 
                dialog && dialog.login_success &&
                <Snackbar 
                        open = { dialog.login_success.is_open }
                        onClose = { () => handleClose({ login_success: { is_open : false } }) } 
                        autoHideDuration={6000} >
                    <Alert variant="filled" severity="success">
                        Bienvenu { dialog.login_success.data && ( dialog.login_success.data.firstname + " " + dialog.login_success.data.lastname ) }!
                    </Alert>
                </Snackbar> 
            }

{ 
                dialog && dialog.logout_success &&
                <Snackbar 
                        open = { dialog.logout_success.is_open }
                        onClose = { () => handleClose({ logout_success: { is_open : false } }) } 
                        autoHideDuration={6000} >
                    <Alert variant="filled" severity="info">
                        Au revoir...
                    </Alert>
                </Snackbar> 
            }

            { 
                dialog && dialog.login_failed &&
                <Snackbar 
                        open = { dialog.login_failed.is_open }
                        onClose = { () => handleClose({ login_failed: { is_open : false } }) } 
                        autoHideDuration={6000} >
                    <Alert variant="filled" severity="error">
                        Echec de la connexion
                    </Alert>
                </Snackbar> 
            }
        </section>
    );
}

export default Dialog;