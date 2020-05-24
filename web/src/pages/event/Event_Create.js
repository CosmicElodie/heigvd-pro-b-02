import React, { useContext, useCallback } from 'react';
import { MainContext } from '../../context/MainContext';
import { useInput } from '../../hooks/input';
import { styled } from '@material-ui/core/styles';
import {
    Typography, Popover, Button,
    Card, CardActions, CardContent, CardMedia,
    CssBaseline, Grid, FormControl, TextField, MenuItem
} from '@material-ui/core';

import { useHistory } from "react-router-dom";


//TODO : Pour faire l'upload de l'image
//https://www.youtube.com/watch?v=sp9r6hSWH_o

import { makeStyles } from '@material-ui/core/styles';

const titre_créerEvent = "Créer un événement"

const useStyles = makeStyles(theme => ({
    card: { //dans la carte
        minHeight: '90%',
        minWidth: '650px',
        alignItems: 'center',
        width: '60%',
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

export default function Event_Create() {
    let history = useHistory();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    //user n'est plus accessible si on accède à ses sous-composants
    //on peut autrement faire user.house ou user.id si on extrait pas les deux données
    const { user, setDialog } = useContext(MainContext);
    const classes = useStyles();

    const [inputMin, setInputMin] = React.useState(0);

    const handleChange = (event) => {
        setInputMin(event.target.value);
    };

    const { value: name, bind: bindName, reset: resetName } = useInput('');
    const { value: description, bind: bindDescription, reset: resetDescription } = useInput('');
    const { value: is_competitive, bind: bindIsCompetitive, reset: resetCompetitive } = useInput('');
    const { value: battleroyal, bind: bindBattleRoyal, reset: resetBattleRoyal } = useInput('');
    const { value: difficulty, bind: bindDifficulty, reset: resetDifficulty } = useInput('');
    const { value: price, bind: bindPrice, reset: resetPrice } = useInput('');
    const { value: attendees_min, bind: bindAttendeesMin, reset: resetAttendeesMin } = useInput('');
    const { value: attendees_max, bind: bindAttendeesMax, reset: resetAttendeesMax } = useInput('');
    const { value: deadline_reservation, bind: bindDeadlineReservation, reset: resetReservation } = useInput('');
    const { value: date_begin, bind: bindDateBegin, reset: resetDateBegin } = useInput('');
    const { value: date_end, bind: bindDateEnd, reset: resetDateEnd } = useInput('');
    const { value: location, bind: bindLocation, reset: resetLocation } = useInput('');
    const { value: street, bind: bindStreet, reset: resetStreet } = useInput('');
    const { value: no, bind: bindNo, reset: resetNo } = useInput('');
    const { value: postal_code, bind: bindPostalCode, reset: resetPostalCode } = useInput('');
    const { value: city, bind: bindCity, reset: resetCity } = useInput('');
    const { value: house_id, bind: bindHouseId } = useInput('');

    const buttonCreateEvent = (e) => {

        let post_body =
            "&name=" + name +
            "&description=" + description +
            "&is_competitive=" + is_competitive +
            "&battleroyal=" + (is_competitive ? battleroyal : 0) +
            "&difficulty=" + difficulty +
            "&price=" + ((price == null || price == 0) ? 0 : price) +
            "&attendees_min=" + attendees_min +
            "&attendees_max=" + attendees_max +
            "&date_begin=" + date_begin +
            "&date_end=" + date_end +
            "&deadline_reservation=" + deadline_reservation +
            "&location=" + location +
            "&no=" + no +
            "&street=" + street +
            "&postal_code=" + postal_code +
            "&city=" + city +
            "&house_id=" + house_id;

        fetch('http://localhost:8080/event/insert_event', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: post_body
        })
            .then(response => response.json())
            .then(({ status, dialog_id }) => {

                if (status === "ok") {
                    resetName();
                    resetDescription();
                    resetCompetitive();
                    resetBattleRoyal();
                    resetDifficulty();
                    resetPrice();
                    resetAttendeesMin();
                    resetAttendeesMax();
                    resetReservation();
                    resetDateBegin();
                    resetDateEnd();
                    resetLocation();
                    resetStreet();
                    resetNo();
                    resetPostalCode();
                    resetCity();
                }

                setDialog
                    ({
                        [dialog_id]: {
                            is_open: true
                        }
                    });
                    //{ window.location.reload(false)}
                    //{ redirectPage("/event_list") }
            });


    }
    const redirectPage = useCallback((link) => {
        history.push(link);
    }, [history]);

    function battleRoyalOn() {
        return (
            battleRoyalOn = true
        );
    }

    function battleRoyalOff() {
        return (
            battleRoyalOn = false
        );
    }

    let battleRoyalOnorOff = true;

    const MyButton = styled(Button)({
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
    });


    return (

        <main>
            <CssBaseline />
            <Card className={classes.card}>
                <CardMedia
                    className={classes.cardMedia}
                    image="https://i.imgur.com/VDRkKqw.png"
                    title="Titre_event_create"
                />
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {titre_créerEvent /*affiche le nom de la maison */}
                    </Typography>
                    <FormControl className={classes.formControl}>
                        <TextField
                            id="name"
                            label="Nom événement"
                            placeholder="Veuillez indiquer le nom de votre événement."
                            variant="outlined"
                            required={true}
                            {...bindName}
                        />
                        <br />
                        <TextField
                            id="description"
                            label="Description"
                            placeholder="En quoi consiste votre événement ?"
                            multiline
                            variant="outlined"
                            required={true}
                            style={{ minWidth: 600 }}
                            {...bindDescription}
                        />
                        <br />
                        <Grid container >
                            <Grid item xs>
                                <TextField
                                    id="is_competitive"
                                    label="Type"
                                    required="true"
                                    defaultValue={0}
                                    style={{ width: 150 }}
                                    {...bindIsCompetitive}
                                    select>
                                    <MenuItem value={1} {...battleRoyalOn}>Compétitif</MenuItem>
                                    <MenuItem value={0} {...battleRoyalOff}>Non-compétitif</MenuItem>
                                </TextField>
                            </Grid>

                            <Grid item xs>
                                <Typography
                                    aria-owns={open ? 'limitation-popover' : undefined}
                                    aria-haspopup="true"
                                    onMouseEnter={handlePopoverOpen}
                                    onMouseLeave={handlePopoverClose}>
                                    <TextField
                                        id="house_id"
                                        label="Limitation"
                                        required={true}
                                        defaultValue={user.house && user.house.house_id}
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

                            <Grid item xs={3}>
                                <TextField
                                    id="difficulty"
                                    label="Difficulté"
                                    style={{ width: 150 }}
                                    defaultValue={1}
                                    required={true}
                                    {...bindDifficulty}
                                    select>
                                    <MenuItem value={1}>Facile</MenuItem>
                                    <MenuItem value={2}>Moyen</MenuItem>
                                    <MenuItem value={3}>Difficile</MenuItem>
                                    <MenuItem value={4}>Extrême</MenuItem>
                                </TextField>

                            </Grid>
                        </Grid>
                        <br /><br />
                        <Grid container>
                            <Grid item xs>
                                {is_competitive === 1 && <TextField
                                    id="battleroyal"
                                    label="Mode Battle Royal"
                                    helperText="Oui : Tous vs Tous, Non : Équipe vs Équipe"
                                    required={false}
                                    defaultValue={0}
                                    disabled={false}
                                    style={{ width: 150 }}
                                    {...bindBattleRoyal}
                                    select>
                                    <MenuItem value={1}>Oui</MenuItem>
                                    <MenuItem value={0}>Non</MenuItem>

                                </TextField>}

                            </Grid>
                        </Grid>
                        <br /><br />
                        <Grid container >
                            <Grid item xs>
                                <TextField
                                    id="attendees_min"
                                    label="Nb. min participants"
                                    placeholder="Veuillez indiquer le nombre minimum de participants."
                                    variant="outlined"
                                    value={inputMin}
                                    onChange={handleChange}
                                    required={true}
                                    {...bindAttendeesMin}
                                />
                            </Grid>

                            <Grid item xs={4}>
                                <TextField
                                    id="deadline_reservation"
                                    label="Date limite inscription"
                                    type="datetime-local"
                                    defaultValue={new Date()}
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    {...bindDeadlineReservation}
                                />
                            </Grid>
                        </Grid>
                        <br /><br />
                        <Grid container >
                            <Grid item xs>
                                <TextField
                                    id="attendees_max"
                                    label="Nb. max participants"
                                    placeholder="Veuillez indiquer le nombre maximum de participants."
                                    variant="outlined"
                                    defaultValue={0}
                                    required={true}
                                    {...bindAttendeesMax}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    id="date_begin"
                                    label="Date et heure de l'événement"
                                    type="datetime-local"
                                    defaultValue={new Date()}
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    {...bindDateBegin}
                                />
                            </Grid>
                        </Grid> <br /><br />
                        <Grid container>
                            <Grid item xs>
                                <TextField
                                    id="price"
                                    label="Tarif"
                                    placeholder="Veuillez indiquer le tarif éventuel de l'événement."
                                    variant="outlined"
                                    defaultValue={0}
                                    required={false}
                                    {...bindPrice}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    id="date_end"
                                    label="Date et heure de fin"
                                    type="datetime-local"
                                    defaultValue={new Date()}
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    {...bindDateEnd}
                                />
                            </Grid>
                        </Grid><br /><br />

                        {/* ============== ADRESSE EVENEMENT ============== */}
                        <Grid container>
                            <Grid>
                                <TextField
                                    id="location"
                                    label="Lieu"
                                    placeholder="Lieu de l'événement"
                                    variant="outlined"
                                    required={true}
                                    style={{ minWidth: 450 }}
                                    {...bindLocation}
                                />
                            </Grid>
                        </Grid>
                        <br />
                        <Grid container >
                            <Grid item xs>
                                <TextField
                                    id="street"
                                    label="Rue"
                                    placeholder="Lieu de l'événement"
                                    variant="outlined"
                                    required={true}
                                    style={{ minWidth: 450 }}
                                    {...bindStreet}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <TextField
                                    id="no"
                                    label="N° de rue"
                                    placeholder="Lieu de l'événement"
                                    variant="outlined"
                                    required={true}
                                    style={{ minWidth: 100, width: 100 }}
                                    {...bindNo}
                                />
                            </Grid>
                        </Grid>
                        <br />
                        <Grid container >
                            <Grid item xs>
                                <TextField
                                    id="postal_code"
                                    label="Code postal"
                                    placeholder="Lieu de l'événement"
                                    variant="outlined"
                                    required={true}
                                    style={{ minWidth: 80 }}
                                    {...bindPostalCode}
                                />
                            </Grid>
                            <Grid item xs={7}>
                                <TextField
                                    id="city"
                                    label="Ville"
                                    placeholder="Lieu de l'événement"
                                    variant="outlined"
                                    required={true}
                                    style={{ minWidth: 150, width: 350 }}
                                    {...bindCity}
                                />
                            </Grid>
                        </Grid>
                        <br />

                    </FormControl>
                </CardContent>
                <CardActions>
                    <MyButton type="submit"
                        fullWidth
                        variant="contained"
                        className={classes.submit}
                        onClick={buttonCreateEvent}>
                        Créer événement
                    </MyButton>
                </CardActions>
            </Card>
        </main>
    );
}
