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

    },
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
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

    function displayAndSetValues(_user) {
        setValue(_user);
        return (_user.lastname + ' ' + _user.firstname);
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
                            {<b>{"Points (mois) : "}</b>}{(value == null ? "Non renseigné" : value.points_month)}
                            <br />
                            {<b>{"Activité : "}</b>}{(value == null ? "Non renseigné" : value.active)}
                            <br /><br />
                            {/* PRENOM */}
                            {value && <TextField
                                id="user-firstname"
                                label="Prénom"
                                defaultValue={String(value.firstname)}
                                helperText="Prénom de l'utilisateur"
                                variant="outlined"
                            />}
                            {!value && <TextField
                                id="user-firstname"
                                label="Prénom"
                                defaultValue="Non renseigné"
                                helperText="Prénom de l'utilisateur"
                                variant="outlined"
                            />}

                            <br /><br />
                            {/* NOM */}
                            {value && <TextField
                                id="user-lastname"
                                label="Nom"
                                defaultValue={String(value.lastname)}
                                helperText="Nom de l'utilisateur"
                                variant="outlined"
                            />}
                            {!value && <TextField
                                id="user-lastname"
                                label="Nom"
                                defaultValue="Non renseigné"
                                helperText="Nom de l'utilisateur"
                                variant="outlined"
                            />}

                            <br /><br />
                            {/* MAISON */}
                            {value && <TextField
                                id="user-house"
                                label="Maison"
                                defaultValue={String(value.house && value.house.name)}
                                helperText="Maison de l'utilisateur"
                                variant="outlined"
                            />}
                            {!value && <TextField
                                id="user-house"
                                label="Nom"
                                defaultValue="Non renseigné"
                                helperText="Maison de l'utilisateur"
                                variant="outlined"
                            />}

                            <br /><br />
                            {/* POINTS */}
                            {value && <TextField
                                id="user-points"
                                label="Points mensuels"
                                defaultValue={String(value.points_month)}
                                helperText="Points récoltés pendant le mois en cours"
                                variant="outlined"
                            />}
                            {!value && <TextField
                                id="user-points"
                                label="Points mensuels"
                                defaultValue="Non renseigné"
                                helperText="Points récoltés pendant le mois en cours"
                                variant="outlined"
                            />}

                            <br /><br />
                            {/* NIVEAU D'ACCES */}
                            {value && <TextField
                                id="user-acces-lvl"
                                label="Niveau d'accès"
                                defaultValue={String(value.access_level)}
                                helperText="75 : Admin | 50 : Modérateur | 25 : Préfet | 0 : Utilisateur"
                                variant="outlined"
                            />}
                            {!value && <TextField
                                id="user-acces-lvl"
                                label="Niveau d'accès"
                                defaultValue="Non renseigné"
                                helperText="75 : Admin | 50 : Modérateur | 25 : Préfet | 0 : Utilisateur"
                                variant="outlined"
                            />}


                            <br /><br />
                            {/* STATUT */}
                            {value && <TextField
                                id="user-status"
                                label="Statut"
                                defaultValue={String(value.status && value.status.name)}
                                helperText="1 : Étudiant | 2 : Délégué | 3 : Assistant | 4 : Professeur | 5 : Collaborateur"
                                variant="outlined"
                            />}
                            {!value && <TextField
                                id="user-status"
                                label="Statut"
                                defaultValue="Non renseigné"
                                helperText="1 : Étudiant | 2 : Délégué | 3 : Assistant | 4 : Professeur | 5 : Collaborateur"
                                variant="outlined"
                            />}

                            <br /><br />
                            {/* ACTIF */}
                            {value && <TextField
                                id="user-active"
                                label="Actif"
                                defaultValue={String(value.active)}
                                helperText="0 : inactif, 1 : actif"
                                variant="outlined"
                            />}
                            {!value && <TextField
                                id="user-active"
                                label="Actif"
                                defaultValue="Non renseigné"
                                helperText="0 : inactif, 1 : actif"
                                variant="outlined"
                            />}

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