import React, { useContext } from 'react';
import { MainContext } from '../context/MainContext';

import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab';

const Dialog = () => {
    const { dialog, setDialog } = useContext(MainContext);
    const handleClose = (which) => {
        setDialog((latest) => ({ 
            ...latest, ...which 
        }));
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
                        Déconnecté
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

            { 
                dialog && dialog.insufficient_post_length &&
                <Snackbar 
                        open = { dialog.insufficient_post_length.is_open }
                        onClose = { () => handleClose({ insufficient_post_length: { is_open : false } }) } 
                        autoHideDuration={6000} >
                    <Alert variant="filled" severity="error">
                        Votre post n'est pas suffisamment long.
                    </Alert>
                </Snackbar> 
            }

            { 
                dialog && dialog.insufficient_subject_length &&
                <Snackbar 
                        open = { dialog.insufficient_subject_length.is_open }
                        onClose = { () => handleClose({ insufficient_subject_length: { is_open : false } }) } 
                        autoHideDuration={6000} >
                    <Alert variant="filled" severity="error">
                        Votre sujet n'est pas suffisamment long.
                    </Alert>
                </Snackbar> 
            }

            { 
                dialog && dialog.post_posted &&
                <Snackbar 
                        open = { dialog.post_posted.is_open }
                        onClose = { () => handleClose({ post_posted: { is_open : false } }) } 
                        autoHideDuration={6000} >
                    <Alert variant="filled" severity="success">
                        Votre post a été publié
                    </Alert>
                </Snackbar> 
            }

            { 
                dialog && dialog.subject_created &&
                <Snackbar 
                        open = { dialog.subject_created.is_open }
                        onClose = { () => handleClose({ subject_created: { is_open : false } }) } 
                        autoHideDuration={6000} >
                    <Alert variant="filled" severity="success">
                        Le sujet a été crée.
                    </Alert>
                </Snackbar> 
            }

            { 
                dialog && dialog.subject_deleted &&
                <Snackbar 
                        open = { dialog.subject_deleted.is_open }
                        onClose = { () => handleClose({ subject_deleted: { is_open : false } }) } 
                        autoHideDuration={6000} >
                    <Alert variant="filled" severity="success">
                        Le sujet est supprimé.
                    </Alert>
                </Snackbar> 
            }

            { 
                dialog && dialog.subject_updated &&
                <Snackbar 
                        open = { dialog.subject_updated.is_open }
                        onClose = { () => handleClose({ subject_updated: { is_open : false } }) } 
                        autoHideDuration={6000} >
                    <Alert variant="filled" severity="success">
                        Le sujet est modifié.
                    </Alert>
                </Snackbar> 
            }

            { 
                dialog && dialog.forum_created &&
                <Snackbar 
                        open = { dialog.forum_created.is_open }
                        onClose = { () => handleClose({ forum_created: { is_open : false } }) } 
                        autoHideDuration={6000} >
                    <Alert variant="filled" severity="success">
                        Le forum a été ajouté.
                    </Alert>
                </Snackbar> 
            }
            
            { 
                dialog && dialog.forum_edited &&
                <Snackbar 
                        open = { dialog.forum_edited.is_open }
                        onClose = { () => handleClose({ forum_edited: { is_open : false } }) } 
                        autoHideDuration={6000} >
                    <Alert variant="filled" severity="success">
                        Le forum a été modifié.
                    </Alert>
                </Snackbar> 
            }

            { 
                dialog && dialog.forum_deleted &&
                <Snackbar 
                        open = { dialog.forum_deleted.is_open }
                        onClose = { () => handleClose({ forum_deleted: { is_open : false } }) } 
                        autoHideDuration={6000} >
                    <Alert variant="filled" severity="success">
                        Le forum a été supprimé.
                    </Alert>
                </Snackbar> 
            }



        </section>
    )
}

export default Dialog;