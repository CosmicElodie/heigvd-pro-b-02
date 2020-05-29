import React, { useState, useEffect, useContext, useCallback } from 'react';
import {appConfig} from "../config/appConfig"
import { useInput } from '../hooks/input';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {
    Card, CardContent, 
    Grid,
    TextField, MenuItem
} from '@material-ui/core';
import Button from '@material-ui/core/Button';

import { MainContext } from '../context/MainContext';

import { useHistory } from "react-router-dom";
import Autocomplete from '@material-ui/lab/Autocomplete';


const useStyles = makeStyles(theme => ({
    card: { //dans la carte
        maxWidth: '1000px',
    },
    cardMedia: {

    },
    cardContent: {

    },
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    }
}));

let imagePath = appConfig.content_url + '404.png';

export default function HouseKeeping() {
    const { user,setUser, setDialog } = useContext(MainContext);
    const [users, setUsers] = useState();
    const [value, setValue] = React.useState(users);
    const classes = useStyles();

    let history = useHistory(); // hook that allows URL change -> navigation

    useEffect(() => {
        getUsers()
    }, []);

    const { value: lastname, bind: bindLastname } = useInput('');
    const { value: house, bind: bindHouse } = useInput('');
    const { value: points, bind: bindPoints } = useInput('');
    const { value: access_level, bind: bindAccessLevel } = useInput('');
    const { value: status, bind: bindStatus } = useInput('');

    const user_logout = useCallback(() => {

        fetch(appConfig.api_url + 'authentication/user_logout', {
             method: 'POST',
             credentials: 'include'
         })
         .then(response => response.json())
         .then(response => {            
             setUser(response.data);
             setDialog({
                 [response.dialog_id]: {
                     is_open: true
                 }
             });  
             localStorage.setItem("User", JSON.stringify(response.data));
             setTimeout(() => history.push("/signin"), 2000);
    
         })
    
     }, [setUser, setDialog, history]);        

    function editLastname() {
        let post_body = "&user_id=" + parseInt(value.user_id) + "&new_lastname=" + lastname;
        fetch(appConfig.api_url + 'housekeeping/editlastname', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: post_body
        })
            .then(response => response.json())
            .then(({ status, dialog_id }) => {
                setDialog({
                    [dialog_id]: {
                        is_open: true
                    }
                });
                if (status === "ok") {
                    window.setTimeout(function () { window.location.reload() }, 3000)
                }
            })

        return;
    }

    function editHouse() {
        let post_body = "&user_id=" + parseInt(value.user_id) + "&new_house_id=" + house;
        fetch(appConfig.api_url + 'housekeeping/edithouse', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: post_body
        })
            .then(response => response.json())
            .then(({ status, dialog_id }) => {
                setDialog({
                    [dialog_id]: {
                        is_open: true
                    }
                });
                if (status === "ok") {
                    window.setTimeout(function () { window.location.reload() }, 3000)
                }
            })

        return;
    }

    function editStatus() {
        let post_body = "&user_id=" + parseInt(value.user_id) + "&new_status_id=" + status;
        fetch(appConfig.api_url + 'housekeeping/setstatus', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: post_body
        })
            .then(response => response.json())
            .then(({ status, dialog_id }) => {
                setDialog({
                    [dialog_id]: {
                        is_open: true
                    }
                });
                if (status === "ok") {
                    window.setTimeout(function () { window.location.reload() }, 3000)
                }
            })

        return;
    }

    function addPoints() {
        let post_body = "&user_id=" + parseInt(value.user_id) + "&points=" + parseInt(points);
        fetch(appConfig.api_url + 'housekeeping/setpoints', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: post_body
        })
            .then(response => response.json())
            .then(({ status, dialog_id }) => {
                setDialog({
                    [dialog_id]: {
                        is_open: true
                    }
                });
                if (status === "ok") {
                    window.setTimeout(function () { window.location.reload() }, 3000)
                }
            })

        return;
    }

    function removePoints() {
        let post_body = "&user_id=" + parseInt(value.user_id) + "&points=" + parseInt(points * -1);
        fetch(appConfig.api_url + 'housekeeping/setpoints', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: post_body
        })
            .then(response => response.json())
            .then(({ status, dialog_id }) => {
                setDialog({
                    [dialog_id]: {
                        is_open: true
                    }
                });
                if (status === "ok") {
                    window.setTimeout(function () { window.location.reload() }, 3000)
                }
            })

        return;
    }

    function editAccessLevel() {
        let post_body = "&user_id=" + parseInt(value.user_id) + "&new_accesslevel=" + access_level;
        fetch(appConfig.api_url + 'housekeeping/setroles', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: post_body
        })
            .then(response => response.json())
            .then(({ status, dialog_id }) => {
                setDialog({
                    [dialog_id]: {
                        is_open: true
                    }
                });
                if (status === "ok") {
                    window.setTimeout(function () { window.location.reload() }, 3000)
                }
            })

        return;
    }

    function desactivate() {
        let post_body = "&user_id=" + parseInt(value.user_id)
        fetch(appConfig.api_url + 'housekeeping/desactivate', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: post_body
        })
            .then(response => response.json())
            .then(({ status, dialog_id }) => {
                setDialog({
                    [dialog_id]: {
                        is_open: true
                    }
                });
                if (status === "ok") {
                    user_logout()
                    window.setTimeout(function () { window.location.reload() }, 3000)
                }
            })

        return;
    }

    function myCreationButton(text, func) {
        return (
            <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={func}>
                {text}
            </Button>
        );
    }

    function getUsers() {
        fetch(appConfig.api_url + 'housekeeping/all',
            {
                method: 'GET',
                credentials: 'include'
            })
            .then(response => response.json())
            .then(response => { 
                let users = [];
                for (const obj of response) users.push(obj.user);
                setUsers(users); 
            }
            )
    }

    function displayAndSetValues(_user) {
        setValue(_user);
        return (_user.lastname + ' ' + _user.firstname);
    }

    function displayAccessLevel(level)
     {
         switch(level) {
             case 0 : return "Utilisateur";
             case 25 : return "Préfet";
             case 50 : return "Modérateur";
             case 75 : return "Administrateur";
             default : return "Erreur niveau accès";
         }
     }

    function defineAuth() {

        if (user.access_level === 75) {
            return (<main>

                <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                        <Typography>

                            <h1>Interface administrateur</h1>

                            <p><Autocomplete
                                value={value}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }}
                                id="select-user"
                                options={users}
                                getOptionLabel={(option) => displayAndSetValues(option)}
                                style={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="Sélectionner utilisateur" variant="outlined" />}
                            /></p>

                            <Grid container spacing={2} direction="row" justify="space-between" alignItems="stretch">
                                <Grid item xs={12} sm={6}>
                                    {/* NOM */}
                                    {<b>{"Nom : "}</b>}{(value == null ? "Veuillez choisir un utilisateur" : value.lastname)}
                                    <br /><br />
                                    {value && value.lastname && <TextField
                                        id="user-lastname"
                                        label="Nom"
                                        defaultValue={String(value.lastname)}
                                        variant="outlined"
                                        {...bindLastname}
                                    />}
                                    <p>
                                        {value && myCreationButton("Modifier", editLastname)}
                                    </p>
                                    <br /><br />

                                </Grid>

                                {/* ACTIF */}
                                {/*
                                <Grid item xs={12} sm={6}>
                                    
                                    {<b>{"Activité : "}</b>}{(value == null ? "Veuillez choisir un utilisateur" : value.active)}

                                    <br /><br />
                                    <p>
                                        {value && value.active === 1 && myCreationButton("Désactiver", desactivate)}
                                    </p>
                                    <br /><br />

                                </Grid>
                                */}

                                <Grid item xs={12} sm={6}>
                                    {/* MAISON */}
                                    {<b>{"Maison : "}</b>}{(value == null ? "Veuillez choisir un utilisateur" : (value.house && value.house.name))}
                                    <br /><br />
                                    {value && value.house && value.house.name && <TextField
                                        style={{ minWidth: 200 }}
                                        id="user-house"
                                        label="Maison"
                                        defaultValue={String(value.house && value.house.name)}
                                        variant="outlined"
                                        {...bindHouse}
                                        select>
                                        <MenuItem value={1}>Systèmes informatiques embarqués</MenuItem>
                                        <MenuItem value={2}>Sécurité informatique</MenuItem>
                                        <MenuItem value={3}>Réseaux et systèmes</MenuItem>
                                        <MenuItem value={4}>Informatique logicielle</MenuItem>
                                        <MenuItem value={5}>Ingénierie des données</MenuItem>
                                    </TextField>
                                    }
                                    <p>
                                        {value && myCreationButton("Modifier", editHouse)}
                                    </p>
                                    <br /><br />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    {/* POINTS */}
                                    {<b>{"Points (mois) : "}</b>}{(value == null ? "Veuillez choisir un utilisateur" : value.points_month)}
                                    <br /><br />
                                    {value && <TextField
                                        id="user-points"
                                        label="Points mensuels"
                                        defaultValue={String(value.points_month)}
                                        variant="outlined"
                                        {...bindPoints}
                                    />}
                                    
                                    <p>
                                    {
                                        value && myCreationButton("Ajouter", addPoints)
                                    }
                                    {
                                        " "
                                    }
                                    {
                                        value && myCreationButton("Enlever", removePoints)
                                    }
                                    </p>
                                    <br /><br />

                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    {/* NIVEAU D'ACCES */}
                                    {<b>{"Acces level : "}</b>}{(value == null ? "Veuillez choisir un utilisateur" : displayAccessLevel(value.access_level))}
                                    <br /><br />
                                    {value && <TextField
                                        style={{ minWidth: 200 }}
                                        id="user-acces-lvl"
                                        label="Niveau d'accès"
                                        defaultValue="Non-renseigné"
                                        variant="outlined"
                                        {...bindAccessLevel}
                                        select>
                                        <MenuItem value={0}>Utilisateur</MenuItem>
                                        <MenuItem value={25}>Préfet</MenuItem>
                                        <MenuItem value={50}>Modérateur</MenuItem>
                                        <MenuItem value={75}>Administrateur</MenuItem>
                                    </TextField>
                                    }
                                    <p>
                                        {value && myCreationButton("Modifier", editAccessLevel)}
                                    </p>
                                    <br /><br />

                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    {/* STATUT */}
                                    {<b>{"Statut : "}</b>}{(value == null ? "Veuillez choisir un utilisateur" : (value.status && value.status.name))}
                                    <br /><br />
                                    {value && value.status && value.status.name && <TextField
                                        style={{ minWidth: 200 }}
                                        id="user-status"
                                        label="Statut"
                                        defaultValue={String(value.status && value.status.name)}
                                        variant="outlined"
                                        {...bindStatus}
                                        select>
                                        <MenuItem value={1}>Étudiant</MenuItem>
                                        <MenuItem value={2}>Délégué</MenuItem>
                                        <MenuItem value={3}>Assistant</MenuItem>
                                        <MenuItem value={4}>Professeur</MenuItem>
                                        <MenuItem value={5}>Collaborateur</MenuItem>
                                    </TextField>}

                                    <p>
                                        { value && myCreationButton("Modifier", editStatus)}
                                    </p>
                                    <br /><br />

                                </Grid>
                            </Grid>

                        </Typography>
                    </CardContent>
                </Card>

            </main>);
        }
        else {
            return (<center><img width={'50%'} src={imagePath} alt="err_404" /></center>);
        }
    }

    return (
        defineAuth()
    );
}