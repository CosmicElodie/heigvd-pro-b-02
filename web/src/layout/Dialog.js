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
                dialog && dialog.user_created &&
                <Snackbar 
                        open = { dialog.user_created.is_open }
                        onClose = { () => handleClose({ user_created: { is_open : false } }) } 
                        autoHideDuration={6000} >
                    <Alert variant="filled" severity="info">
                        Votre compte a été crée...
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
            dialog && dialog.forum_insert_insufficient_permission &&
                <Snackbar 
                        open = { dialog.forum_insert_insufficient_permission.is_open }
                        onClose = { () => handleClose({ forum_insert_insufficient_permission: { is_open : false } }) } 
                        autoHideDuration={6000} >
                    <Alert variant="filled" severity="error">
                        Vous n'avez pas assez de permission.
                    </Alert>
                </Snackbar> 
            }
            
            { 
                dialog && dialog.forum_updated &&
                <Snackbar 
                        open = { dialog.forum_updated.is_open }
                        onClose = { () => handleClose({ forum_updated: { is_open : false } }) } 
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

            { 
                dialog && dialog.post_updated &&
                <Snackbar 
                        open = { dialog.post_updated.is_open }
                        onClose = { () => handleClose({ post_updated: { is_open : false } }) } 
                        autoHideDuration={6000} >
                    <Alert variant="filled" severity="success">
                        Votre post a été modifié.
                    </Alert>
                </Snackbar> 
            }

            { 
                dialog && dialog.post_deleted &&
                <Snackbar 
                        open = { dialog.post_deleted.is_open }
                        onClose = { () => handleClose({ post_deleted: { is_open : false } }) } 
                        autoHideDuration={6000} >
                    <Alert variant="filled" severity="success">
                        Votre post a été supprimé.
                    </Alert>
                </Snackbar> 
            }
    
            { 
                dialog && dialog.user_password_updated &&
                <Snackbar 
                        open = { dialog.user_password_updated.is_open }
                        onClose = { () => handleClose({ user_password_updated: { is_open : false } }) } 
                        autoHideDuration={6000} >
                    <Alert variant="filled" severity="success">
                        Mot de passe mis à jour.
                    </Alert>
                </Snackbar> 
            }
            { 
                dialog && dialog.user_avatar_updated &&
                <Snackbar 
                        open = { dialog.user_avatar_updated.is_open }
                        onClose = { () => handleClose({ user_avatar_updated: { is_open : false } }) } 
                        autoHideDuration={6000} >
                    <Alert variant="filled" severity="success">
                        Image de profile mis à jour.
                    </Alert>
                </Snackbar> 
            }

            { 
                dialog && dialog.same_winner_in_two_or_more_place &&
                <Snackbar 
                        open = { dialog.same_winner_in_two_or_more_place.is_open }
                        onClose = { () => handleClose({ same_winner_in_two_or_more_place: { is_open : false } }) } 
                        autoHideDuration={6000} >
                    <Alert variant="filled" severity="error">
                        Veuilleu choisir un différent gagnant pour chaque place.
                    </Alert>
                </Snackbar> 
            }

            { 
                dialog && dialog.house_id_out_of_bonds &&
                <Snackbar 
                        open = { dialog.house_id_out_of_bonds.is_open }
                        onClose = { () => handleClose({ house_id_out_of_bonds: { is_open : false } }) } 
                        autoHideDuration={6000} >
                    <Alert variant="filled" severity="error">
                        Veuillez choisir les gagnants.
                    </Alert>
                </Snackbar> 
            }

            { 
                dialog && dialog.no_valid_user_id &&
                <Snackbar 
                        open = { dialog.no_valid_user_id.is_open }
                        onClose = { () => handleClose({ no_valid_user_id: { is_open : false } }) } 
                        autoHideDuration={6000} >
                    <Alert variant="filled" severity="error">
                        Veuillez choisir les gagnants.
                    </Alert>
                </Snackbar> 
            }

            { 
                dialog && dialog.points_from_group_event_added &&
                <Snackbar 
                        open = { dialog.points_from_group_event_added.is_open }
                        onClose = { () => handleClose({ points_from_group_event_added: { is_open : false } }) } 
                        autoHideDuration={6000} >
                    <Alert variant="filled" severity="success">
                        Les points ont été comptabilisés. L'événement est donc terminé.
                    </Alert>
                </Snackbar> 
            }

            { 
                dialog && dialog.points_from_individual_events_added &&
                <Snackbar 
                        open = { dialog.points_from_individual_events_added.is_open }
                        onClose = { () => handleClose({ points_from_individual_events_added: { is_open : false } }) } 
                        autoHideDuration={6000} >
                    <Alert variant="filled" severity="success">
                        Les points ont été comptabilisés. L'événement est donc terminé.
                    </Alert>
                </Snackbar> 
            }

            { 
                dialog && dialog.event_created &&
                <Snackbar 
                        open = { dialog.event_created.is_open }
                        onClose = { () => handleClose({ event_created: { is_open : false } }) } 
                        autoHideDuration={6000} >
                    <Alert variant="filled" severity="success">
                        Événement créé avec succès !
                    </Alert>
                </Snackbar> 
            }

            { 
                dialog && dialog.error_min_max_attendees_length &&
                <Snackbar 
                        open = { dialog.error_min_max_attendees_length.is_open }
                        onClose = { () => handleClose({ error_min_max_attendees_length: { is_open : false } }) } 
                        autoHideDuration={6000} >
                    <Alert variant="filled" severity="error">
                        Le minimum de gens participants à l'événement doit être plus petit que le max.
                    </Alert>
                </Snackbar> 
            }

            { 
                dialog && dialog.error_min_max_between_dateBegin_dateEnd &&
                <Snackbar 
                        open = { dialog.error_min_max_between_dateBegin_dateEnd.is_open }
                        onClose = { () => handleClose({ error_min_max_between_dateBegin_dateEnd: { is_open : false } }) } 
                        autoHideDuration={6000} >
                    <Alert variant="filled" severity="error">
                        La date de début ne peut se dérouler après la date de fin.
                    </Alert>
                </Snackbar> 
            }

            { 
                dialog && dialog.error_min_max_between_dateBegin_deadline &&
                <Snackbar 
                        open = { dialog.error_min_max_between_dateBegin_deadline.is_open }
                        onClose = { () => handleClose({ error_min_max_between_dateBegin_deadline: { is_open : false } }) } 
                        autoHideDuration={6000} >
                    <Alert variant="filled" severity="error">
                        La date limite d'inscription doit être avant le début de l'événement.
                    </Alert>
                </Snackbar> 
            }

        </section>
    )
}

export default Dialog;