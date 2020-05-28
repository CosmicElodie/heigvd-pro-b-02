import React, { useState, useEffect, useContext, useCallback } from 'react';
import { MainContext } from '../../context/MainContext';
import { EventContext } from '../../context/EventContext';
import { useInput } from '../../hooks/input';
import { useLocation } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';

import { useHistory } from "react-router-dom";
import { appConfig } from "../../config/appConfig"
import Button from '@material-ui/core/Button';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';

import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import Moment from 'react-moment';

//TODO : Pour faire l'upload de l'image
//https://www.youtube.com/watch?v=sp9r6hSWH_o

import { makeStyles } from '@material-ui/core/styles';

const titre_créerEvent = "Modifier un événement"

const useStyles = makeStyles(theme => ({
    card: { //dans la carte
        minHeight: '90%',
        minWidth: '650px',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        padding: '10px 10px'
    },
    cardMedia: {
        paddingTop: '55px', //height de l'image
        flexDirection: 'row', //place les cartes en colonne
        justify: 'space-evenly', //assez parlant...
        //borderRadius: '50%' //permet d'arrondir l'image
    },
    cardContent: {
        flexGrow: 1,
    },
    cardActions: {
        alignItems: 'right'
    },
    popover: {
        pointerEvents: 'none',
        width: '250px',
        color: '#ffff99',
    },
    paper: {
        padding: theme.spacing(1),
        width: '250px',
    },

}));

export default function Event_Modify() {
    const { user, setDialog } = useContext(MainContext);
    const { data } = useContext(EventContext);
    const classes = useStyles();
    const location_event = useLocation();
    const [current, setCurrent] = useState();

    let history = useHistory();

    const redirectPage = useCallback((link) => {
        history.push(link);
    }, [history]);

    useEffect(() => {
        if (data) {
            let eventId = parseInt(location_event.pathname.split('/')[2]);
            let event = getEventByID(eventId, data);
            setCurrent(event);
        }
    }, [data, setCurrent]);

    useEffect(() => {
        if (current) {
            setName(current.name);
            setDescription(current.description);
            setCompetitive(current.is_competitive);
            setBattleRoyal(current.battleroyale);
            setDifficulty(current.difficulty);
            setPrice(current.price);
            setAttendeesMin(current.attendees_min);
            setAttendeesMax(current.attendees_max);
            setDeadlineReservation(current.deadline_reservation);
            setDateBegin(current.date_begin);
            setDateEnd(current.date_end);
            setLocation(current.location);
            setAddress(current.address);
            setHouseId(current.house);
        }
    }, [current]);

    //SERT POUR LA BULLE D'INFO SUR LE CHAMP LIMITATION
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const { value: name, bind: bindName, reset: resetName, setValue: setName } = useInput('');
    const { value: description, bind: bindDescription, reset: resetDescription, setValue: setDescription } = useInput('');
    const { value: is_competitive, bind: bindIsCompetitive, reset: resetCompetitive, setValue: setCompetitive } = useInput('');
    const { value: battleroyal, bind: bindBattleRoyal, reset: resetBattleRoyal, setValue: setBattleRoyal } = useInput('');
    const { value: difficulty, bind: bindDifficulty, reset: resetDifficulty, setValue: setDifficulty } = useInput('');
    const { value: price, bind: bindPrice, reset: resetPrice, setValue: setPrice } = useInput('');
    const { value: attendees_min, bind: bindAttendeesMin, reset: resetAttendeesMin, setValue: setAttendeesMin } = useInput('');
    const { value: attendees_max, bind: bindAttendeesMax, reset: resetAttendeesMax, setValue: setAttendeesMax } = useInput('');
    const { value: deadline_reservation, bind: bindDeadlineReservation, reset: resetReservation, setValue: setDeadlineReservation } = useInput('');
    const { value: date_begin, bind: bindDateBegin, reset: resetDateBegin, setValue: setDateBegin } = useInput('');
    const { value: date_end, bind: bindDateEnd, reset: resetDateEnd, setValue: setDateEnd } = useInput('');
    const { value: location, bind: bindLocation, reset: resetLocation, setValue: setLocation } = useInput('');
    const { value: address, bind: bindAddress, reset: resetAddress, setValue: setAddress } = useInput('');
    const { value: house_id, bind: bindHouseId, reset: resetHouseId, setValue: setHouseId } = useInput('');

    function editName() {
        let post_body = "&event_id=" + parseInt(current.event_id) + "&name=" + (name ? name : current.name);
        fetch(appConfig.api_url + 'event/update/setName', {
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

    function editDescription() {
        let post_body = "&event_id=" + parseInt(current.event_id) + "&description=" + (description ? description : current.description);
        fetch(appConfig.api_url + 'event/update/setDescription', {
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

    function editIsCompetitive() {
        let post_body = "&event_id=" + parseInt(current.event_id) + "&is_competitive=" + parseInt((is_competitive ? current.is_competitive : 0));
        fetch(appConfig.api_url + 'event/update/setIsCompetitive', {
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

    function editLimitation() {
        let post_body = "&event_id=" + parseInt(current.event_id) + "&house_id=" + parseInt((house_id ? house_id : current.house_id));
        fetch(appConfig.api_url + 'event/update/setHouseId', {
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

    function editDifficulty() {
        let post_body = "&event_id=" + parseInt(current.event_id) + "&difficulty=" + parseInt((difficulty ? difficulty : current.difficulty));
        fetch(appConfig.api_url + 'event/update/setDifficulty', {
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

    function editBattleRoyal() {
        let post_body = "&event_id=" + parseInt(current.event_id) + "&battleroyal=" + parseInt((battleroyal ? battleroyal : current.battleroyal));
        fetch(appConfig.api_url + 'event/update/setBattleroyale', {
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

    function editAttendeesMin() {
        let post_body = "&event_id=" + parseInt(current.event_id) + "&attendees_min=" + parseInt((attendees_min ? attendees_min : current.attendees_min));
        fetch(appConfig.api_url + 'event/update/setAttendeesMin', {
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

    function editAttendeesMax() {
        let post_body = "&event_id=" + parseInt(current.event_id) + "&attendees_max=" + parseInt((attendees_max ? attendees_max : current.attendees_max));
        fetch(appConfig.api_url + 'event/update/setAttendeesMax', {
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

    function editPrice() {
        let post_body = "&event_id=" + parseInt(current.event_id) + "&price=" + (price ? price : current.price);
        fetch(appConfig.api_url + 'event/update/setPrice', {
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

    function editDeadlineReservation() {
        let post_body = "&event_id=" + parseInt(current.event_id) + "&deadline_reservation=" + deadline_reservation;
        fetch(appConfig.api_url + 'event/update/setDeadlineReservation', {
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

    function editDateBegin() {
        let post_body = "&event_id=" + parseInt(current.event_id) + "&date_begin=" + date_begin;
        fetch(appConfig.api_url + 'event/update/setDateBegin', {
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

    function editDateEnd() {
        let post_body = "&event_id=" + parseInt(current.event_id) + "&date_end=" + date_end;
        fetch(appConfig.api_url + 'event/update/setDateEnd', {
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

    function editLocation() {
        let post_body = "&event_id=" + parseInt(current.event_id) + "&location=" + (location ? location : current.location);
        fetch(appConfig.api_url + 'event/update/setLocation', {
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

    function editAddress() {
        let post_body = "&event_id=" + parseInt(current.event_id) + "&address=" + (address ? address : current.address);
        fetch(appConfig.api_url + 'event/update/setAddress', {
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

    const buttonModifyEvent = (e) => {

        let post_body =
            "&event_id=" + parseInt(current.event_id) +
            "&name=" + (name ? name : current.name) +
            "&description=" + (description ? description : current.description) +
            "&is_competitive=" + (is_competitive ? is_competitive : current.is_competitive) +
            "&battleroyal=" + (battleroyal ? battleroyal : 0) +
            "&difficulty=" + (difficulty ? difficulty : current.difficulty) +
            "&price=" + (price ? price : current.price) +
            "&attendees_min=" + (attendees_min ? attendees_min : current.attendees_min) +
            "&attendees_max=" + (attendees_max ? attendees_max : current.attendees_max) +
            "&date_begin=" + (date_begin ? date_begin : current.date_begin) +
            "&date_end=" + (date_end ? date_end : current.date_end) +
            "&deadline_reservation=" + (deadline_reservation ? deadline_reservation : current.deadline_reservation) +
            "&location=" + (location ? location : current.location) +
            "&address=" + (address ? address : current.address) +
            "&house_id=" + (user.house_id ? user.house_id : 0);

        fetch(appConfig.api_url + 'event/update_event', {
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
            });
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

    const getEventByID = (event_id, data) => {
        for (const event of data) if (event.event_id === event_id) return event;
    }

    function displayDifficulty(id) {
        switch (id) {
            case 2: return "Moyen";
            case 3: return "Difficile";
            case 4: return "Extrême";
            default: return "Facile;"
        }
    }

    return (
        <React.Fragment>
            <main>
                {current && <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                            {titre_créerEvent /*affiche le nom de la maison */}
                        </Typography>


                        <Grid container spacing={3} direction="row" justify="space-between" alignItems="stretch">

                            {/* NAME */}
                            <Grid item xs={12} sm={6}>
                                {<b>{"Nom : "}</b>}{(current == null ? "error" : current.name)}
                            </Grid>
                            <Grid item xs={12}>
                                {current && current.name && <TextField
                                    id="name"
                                    label="Nom événement"
                                    placeholder={current.name}
                                    defaultValue={current.name}
                                    variant="outlined"
                                    required={true}
                                    {...bindName}
                                />}
                            </Grid>
                            <Grid item xs={12}>
                                {current && myCreationButton("Modifier", editName)}
                            </Grid>


                            {/* DESCRIPTION */}

                            <Grid item xs={12} sm={6}>
                                {<b>{"Description : "}</b>}{(current == null ? "error" : current.description)}

                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="description"
                                    label="Description"
                                    placeholder={current.description}
                                    defaultValue={current.description}
                                    multiline
                                    rows={5}
                                    variant="outlined"
                                    required={true}
                                    style={{ minWidth: 600 }}
                                    {...bindDescription}
                                />

                            </Grid>
                            <Grid item xs={12}>
                                {current && myCreationButton("Modifier", editDescription)}
                            </Grid>

                            {/* IS_COMPETITIVE */}
                            <Grid item xs={6} sm={4}>
                                <Grid item xs={12}>
                                    {<b>{"Type : "}</b>}{(current == null ? "error" : (current.is_competitive ? "Compétitif" : "Non-compétitif"))}
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        id="is_competitive"
                                        label="Type"
                                        required="true"
                                        placeholder={current.is_competitive}
                                        defaultValue={current.is_competitive}
                                        style={{ width: 150 }}
                                        {...bindIsCompetitive}
                                        select>
                                        <MenuItem value={1} >Compétitif</MenuItem>
                                        <MenuItem value={0} >Non-compétitif</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item xs={12}>
                                    <br />{current && myCreationButton("Modifier", editIsCompetitive)}
                                </Grid>
                            </Grid>

                            {/* LIMITATION */}
                            <Grid item xs={6} sm={4}>
                                <Grid item xs={12}>
                                    {<b>{"Limitation : "}</b>}{(current == null ? "error" : (current.house_id ? house_id : "Global"))}
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography
                                        aria-owns={open ? 'limitation-popover' : undefined}
                                        aria-haspopup="true"
                                        onMouseEnter={handlePopoverOpen}
                                        onMouseLeave={handlePopoverClose}>
                                        <TextField
                                            id="house_id"
                                            label="Limitation"
                                            required={true}
                                            placeholder={current.limitation}
                                            defaultValue={current.limitation}
                                            style={{ width: 150 }}
                                            {...bindHouseId}
                                            select>
                                            <MenuItem value={user.house && user.house.house_id}>{user.house && user.house.name}</MenuItem>
                                            <MenuItem value={0}>Global</MenuItem>
                                        </TextField>
                                    </Typography>
                                    <Popover
                                        id="limitation-popover"
                                        className={classes.popover}
                                        classes={{
                                            paper: classes.paper,
                                        }}
                                        open={open}
                                        anchorEl={anchorEl}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'left',
                                        }}
                                        onClose={handlePopoverClose}
                                        disableRestoreFocus>
                                        <Typography>Un événement peut être soit adressé aux membres de votre orientation uniquement, ou avoir une portée globale à toutes les orientations.</Typography>
                                    </Popover>
                                </Grid>
                                <Grid item xs={12}>
                                    <br />{current && myCreationButton("Modifier", editLimitation)}
                                </Grid>
                            </Grid>

                            {/* DIFFICULTÉ */}
                            <Grid item xs={6} sm={4}>
                                <Grid item xs={12}>
                                    {<b>{"Type : "}</b>}{(current == null ? "error" : displayDifficulty(current.difficulty))}
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        id="difficulty"
                                        label="Difficulté"
                                        style={{ width: 150 }}
                                        placeholder={current.difficulty}
                                        defaultValue={current.difficulty}
                                        required={true}
                                        {...bindDifficulty}
                                        select>
                                        <MenuItem value={1}>Facile</MenuItem>
                                        <MenuItem value={2}>Moyen</MenuItem>
                                        <MenuItem value={3}>Difficile</MenuItem>
                                        <MenuItem value={4}>Extrême</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item xs={12}>
                                    <br />{current && myCreationButton("Modifier", editDifficulty)}
                                </Grid>
                            </Grid>

                            {/* BATTLE ROYAL */}

                            {!(parseInt(house_id)) && (parseInt(is_competitive) === 1) && <Grid item xs={12}>
                                    {<b>{"Mode Battle Royal : "}</b>}{(current == null ? "error" : (current.battleroyal ? "Oui" : "Non"))}
                                </Grid>}

                                {!(parseInt(house_id)) && (parseInt(is_competitive) === 1) && <Grid item xs={12}>
                                    <TextField
                                        id="battleroyal"
                                        label="Battle Royal Mode"
                                        helperText="All vs All ou affrontement par équipe."
                                        required={false}
                                        placeholder={current.battleroyale}
                                        defaultValue={current.battleroyale}
                                        disabled={false} //{battleRoyalOnorOff}

                                        style={{ width: 150 }}
                                        {...bindBattleRoyal}
                                        select>
                                        <MenuItem value={0}>Non</MenuItem>
                                        <MenuItem value={1}>Oui</MenuItem>
                                    </TextField>
                                </Grid>}
                                {!(parseInt(house_id)) && (parseInt(is_competitive) === 1) && <Grid item xs={12}>
                                    <br />{current && myCreationButton("Modifier", editBattleRoyal)}
                                </Grid>}
                           


                            {/* ATTENDEES_MIN */}
                            <Grid item xs={6} sm={4}>
                                <Grid item xs={12}>
                                    {<b>{"Nb. min. participants : "}</b>}{(current == null ? "error" : current.attendees_min)}
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        id="attendees_min"
                                        label="Nb. min participants"
                                        placeholder={current.attendees_min}
                                        defaultValue={current.attendees_min}
                                        variant="outlined"
                                        defaultValue={0}
                                        required={true}
                                        {...bindAttendeesMin}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <br />{current && myCreationButton("Modifier", editAttendeesMin)}
                                </Grid>
                            </Grid>

                            {/* ATTENDEES_MAX */}
                            <Grid item xs={6} sm={4}>
                                <Grid item xs={12}>
                                    {<b>{"Nb. max. participants : "}</b>}{(current == null ? "error" : current.attendees_max)}
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        id="attendees_max"
                                        label="Nb. max participants"
                                        placeholder={current.attendees_max}
                                        defaultValue={current.attendees_max}
                                        variant="outlined"
                                        defaultValue={0}
                                        required={true}
                                        {...bindAttendeesMax}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <br />{current && myCreationButton("Modifier", editAttendeesMax)}
                                </Grid>
                            </Grid>

                            {/* PRICE */}
                            <Grid item xs={6} sm={4}>
                                <Grid item xs={12}>
                                    {<b>{"Tarif : "}</b>}{(current == null ? "error" : current.price)}
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        id="price"
                                        label="Tarif"
                                        placeholder={current.price}
                                        defaultValue={current.price}
                                        variant="outlined"
                                        required={false}
                                        {...bindPrice}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <br />{current && myCreationButton("Modifier", editPrice)}
                                </Grid>
                            </Grid>

                            {/* DEADLINE_RESERVATION */}
                            <Grid item xs={6} sm={4}>
                                <Grid item xs={12}>
                                    {<b>{"Date limite inscription : "}</b>}{(current == null ? "error" : <Moment format="DD/MM/YYYY - HH:mm">{current.deadline_reservation}</Moment>)}
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        id="deadline_reservation"
                                        label="Date limite inscription"
                                        type="datetime-local"
                                        placeholder={current.deadline_reservation}
                                        defaultValue={current.deadline_reservation}
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        {...bindDeadlineReservation}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <br />{current && myCreationButton("Modifier", editDeadlineReservation)}
                                </Grid>
                            </Grid>

                            {/* DATE_BEGIN */}
                            <Grid item xs={6} sm={4}>
                                <Grid item xs={12}>
                                    {<b>{"Date début : "}</b>}{(current == null ? "error" : <Moment format="DD/MM/YYYY - HH:mm">{current.date_begin}</Moment>)}
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        id="date_begin"
                                        label="Date et heure de l'événement"
                                        type="datetime-local"
                                        placeholder={current.date_begin}
                                        defaultValue={current.date_begin}
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        {...bindDateBegin}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <br />{current && myCreationButton("Modifier", editDateBegin)}
                                </Grid>
                            </Grid>

                            {/* DATE_END */}
                            <Grid item xs={6} sm={4}>
                                <Grid item xs={12}>
                                    {<b>{"Date fin : "}</b>}{(current == null ? "error" : <Moment format="DD/MM/YYYY - HH:mm">{current.date_end}</Moment>)}
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        id="date_end"
                                        label="Date et heure de fin"
                                        type="datetime-local"
                                        placeholder={current.date_end}
                                        defaultValue={current.date_end}
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        {...bindDateEnd}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <br />{current && myCreationButton("Modifier", editDateEnd)}
                                </Grid>
                            </Grid>

                            {/* LOCATION */}
                            <Grid item xs={12}>
                                <Grid item xs={12}>
                                    {<b>{"Lieu : "}</b>}{(current == null ? "error" : current.location)}
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        id="location"
                                        label="Lieu"
                                        placeholder={current.location}
                                        defaultValue={current.location}
                                        variant="outlined"
                                        required={true}
                                        style={{ minWidth: 450 }}
                                        {...bindLocation}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <br />{current && myCreationButton("Modifier", editLocation)}
                                </Grid>
                            </Grid>

                            {/* ADDRESS */}
                            <Grid item xs={12}>
                                <Grid item xs={12}>
                                    {<b>{"Adresse : "}</b>}{(current == null ? "error" : current.address)}
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        id="street"
                                        label="Adresse"
                                        placeholder={current.address}
                                        defaultValue={current.address}
                                        variant="outlined"
                                        required={true}
                                        style={{ minWidth: 450 }}
                                        {...bindAddress}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <br />{current && myCreationButton("Modifier", editAddress)}
                                </Grid>
                            </Grid>
                        </Grid >
                        <center>
                            <Grid item xs={12}>
                                <br />{current && myCreationButton("Modifier tout", buttonModifyEvent)}
                            </Grid>
                        </center>
                    </CardContent>
                </Card>
                }
            </main>
        </React.Fragment>
    );
}
