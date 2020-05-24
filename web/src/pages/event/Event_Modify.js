import React, { useState, useEffect, useContext, useCallback } from 'react';
import { MainContext } from '../../context/MainContext';
import { EventContext } from '../../context/EventContext';
import { useInput } from '../../hooks/input';
import { useLocation } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';

import { useHistory } from "react-router-dom";

import Button from '@material-ui/core/Button';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';

import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

//TODO : Pour faire l'upload de l'image
//https://www.youtube.com/watch?v=sp9r6hSWH_o

import { makeStyles } from '@material-ui/core/styles';

const titre_créerEvent = "Modifier un événement"

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

export default function Event_Modify() {
    const { user, setDialog } = useContext(MainContext);
    const { data } = useContext(EventContext);
    const classes = useStyles();
    const location_event = useLocation();
    const [current, setCurrent] = useState();
    const [value, setValue] = React.useState('Controlled');

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

    //SERT POUR LA BULLE D'INFO SUR LE CHAMP LIMITATION
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

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
    const { value: address, bind: bindAddress, reset: resetAddress } = useInput('');
    const { value: house_id, bind: bindHouseId } = useInput('');

    const buttonModifyEvent = (e) => {
        console.log(current.event_id);

        let post_body =
            "&event_id=" + parseInt(current.event_id) +
            "&name=" + name +
            "&description=" + description +
            "&is_competitive=" + is_competitive +
            "&battleroyal=" + battleroyal +
            "&difficulty=" + difficulty +
            "&price=" + ((price == null || price == 0) ? 0 : price) +
            "&attendees_min=" + attendees_min +
            "&attendees_max=" + attendees_max +
            "&date_begin=" + date_begin +
            "&date_end=" + date_end +
            "&deadline_reservation=" + deadline_reservation +
            "&location=" + location +
            "&address=" + address +
            "&house_id=" + house_id;

        fetch('http://localhost:8080/event/update_event', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: post_body
        })
            .then(response => response.json())
            .then(({ status, dialog_id }) => {
                if(status === "ok") {
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
                resetAddress();
                }
                
                setDialog({
                    [dialog_id]: {
                        is_open: true
                    }
                });
                { redirectPage("/event_display/" + current.event_id) }
            });
    }

    function MyCreationButton() {
        return (
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={buttonModifyEvent}>
                    Modifier l'événement
                </Button>
        );
    }

    const getEventByID = (event_id, data) => {
        for (const event of data) if (event.event_id === event_id) return event;
    }

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <main>
                {current && <Card className={classes.card}>
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
                                placeholder={current.name}
                                defaultValue={current.name}
                                variant="outlined"
                                required={true}
                                {...bindName}
                            />
                            <br />
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
                            <br />
                            <Grid container >
                                <Grid item xs>
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

                                <Grid item xs={3}>
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
                            </Grid>
                            <br /><br />
                            <Grid container>
                                <Grid item xs>
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
                                </Grid>
                            </Grid>
                            <br /><br />
                            <Grid container >
                                <Grid item xs>
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

                                <Grid item xs={4}>
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
                            </Grid>
                            <br /><br />
                            <Grid container >
                                <Grid item xs>
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
                                <Grid item xs={4}>
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
                            </Grid> <br /><br />
                            <Grid container>
                                <Grid item xs>
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
                                <Grid item xs={4}>
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
                            </Grid><br /><br />

                            {/* ============== ADRESSE EVENEMENT ============== */}
                            <Grid container>
                                <Grid>
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
                            </Grid>
                            <br />
                            <Grid container >
                                <Grid item xs>
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
                            </Grid>
                            <br />

                        </FormControl>
                    </CardContent>
                    <CardActions>
                        <MyCreationButton />
                    </CardActions>
                </Card>
                }
            </main>
        </React.Fragment>
    );
}
