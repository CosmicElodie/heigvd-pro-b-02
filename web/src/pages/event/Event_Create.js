import React, {useContext, useEffect, useState } from 'react';
import {MainContext} from '../../context/MainContext';
import Typography from '@material-ui/core/Typography';

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

import { useInput } from '../../hooks/input';


//TODO : Pour faire l'upload de l'image
//https://www.youtube.com/watch?v=sp9r6hSWH_o

import {withStyles, makeStyles} from '@material-ui/core/styles';

const titre_créerEvent = "Créer un événement"

const useStyles = makeStyles(theme => ({
    card: { //dans la carte
        minHeight: '90%',
        minWidth: '650px',
        alignItems: 'center',
        width: '60%',
        display: 'flex',
        flexDirection: 'column',
        padding : '10px 10px'
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
    CardActions: {
        alignItems: 'right'
    }

}));

export default function Event_Create() {
    //user n'est plus accessible si on accède à ses sous-composants
    //on peut autrement faire user.house ou user.id si on extrait pas les deux données
    const {user} = useContext(MainContext);
    const [startDate, setStartDate] = useState(new Date());
    const classes = useStyles();
    
    var battleRoyalMod = false;

    const values = {
        someDate: new Date()
    };

    const { value:name,  bind:bindName}  = useInput('');
    const { value:description,        bind:bindDescription }      = useInput('');
    const { value:is_competitive,    bind:bindIsCompetitive }  = useInput('');
    const { value:battleroyal,     bind:bindBattleRoyal }   = useInput('');
    const { value:difficulty,     bind:bindDifficulty }   = useInput('');
    const { value:price,        bind:bindPrice}       = useInput('');
    const { value:attendees_min,        bind:bindAttendeesMin}       = useInput('');
    const { value:attendees_max,        bind:bindAttendeesMax}       = useInput('');
    const { value:deadline_reservation,        bind:bindDeadlineReservation}       = useInput('');
    const { value:date_begin,        bind:bindDateBegin}       = useInput('');
    const { value:date_end,        bind:bindDateEnd}       = useInput('');
    const { value:location,        bind:bindLocation}       = useInput('');
    const { value:road,        bind:bindRoad}       = useInput('');
    const { value:road_number,        bind:bindRoadNumber}       = useInput('');
    const { value:postal_code,        bind:bindPostalCode}       = useInput('');
    const { value:town,        bind:bindTown}       = useInput('');
    const { value:limitation,        bind:bindLimitation}       = useInput('');
    
    

    const buttonCreateEvent = (e) => {

        let post_body = 
        "&name=" + name +
        "&description=" + description + 
        "&is_competitive=" + is_competitive +
        "&battleroyal=" + battleroyal +
        "&difficulty=" + difficulty +
        "&price=" + price +
        "&attendees_min=" + attendees_min +
        "&attendees_max=" + attendees_max +
        "&deadline_reservation=" + deadline_reservation +
        "&date_begin=" + date_begin +
        "&date_end=" + date_end +
        "&location=" + location +
        "&address=" + road + road_number + ', ' + postal_code + town +
        "&limitation=" + limitation;

        fetch('http://localhost:8080/event_create', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: post_body
            })
        .then(response => response.json())
    }

  
    return (
        
        <React.Fragment>
            <CssBaseline/>
            <main> 
                <Card className={classes.card}>
                        <CardMedia
                            className={classes.cardMedia}
                            image="https://i.imgur.com/VDRkKqw.png"
                            title="Titre_event_create"
                        />
                        <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="h5" component="h2">
                              { titre_créerEvent /*affiche le nom de la maison */} 
                            </Typography>
                            <FormControl className={classes.formControl}>
                                <TextField
                                    id="name"
                                    label="Nom événement"
                                    placeholder="Veuillez indiquer le nom de votre événement."
                                    variant="outlined"
                                    required = "true" 
                                    { ...bindName }
                                />
                                <br />
                                <TextField
                                    id="description"
                                    label="Description"
                                    placeholder="En quoi consiste votre événement ?"
                                    multiline
                                    variant="outlined"
                                    required = "true" 
                                    style = {{minWidth: 600}}
                                    { ...bindDescription }
                                 />
                                <br />
                                <Grid container >
                                    <Grid item xs> 
                                        <TextField 
                                        id="is_competitive" 
                                        label="Type" 
                                        required = "true" 
                                        defaultValue = "Non-compétitif"
                                        style = {{width: 150}}
                                        { ...bindIsCompetitive }
                                        select>
                                            <MenuItem value="Compétitif">Compétitif</MenuItem>
                                            <MenuItem value="Non-compétitif">Non-compétitif</MenuItem>
                                        </TextField>
                                    </Grid>

                                    <Grid item xs> 
                                        <TextField 
                                        id="limitation" 
                                        label="Limitation" 
                                        required = "true" 
                                        defaultValue = "Global"
                                        style = {{width: 150}}
                                        { ...bindLimitation } 
                                        select>
                                             <MenuItem value= "Maison"> {user.house && user.house.name}</MenuItem>
                                            <MenuItem value="Global">Global</MenuItem>
                                             </TextField>
                                    </Grid>

                                    <Grid item xs = {3}> 
                                        <TextField 
                                        id="difficulty" 
                                        label="Difficulté" 
                                        style = {{width: 150}} 
                                        defaultValue = "Facile"
                                        required = "true" 
                                        { ...bindDifficulty }
                                        select>
                                            <MenuItem value="Facile">Facile</MenuItem>
                                            <MenuItem value="Moyen">Moyen</MenuItem>
                                            <MenuItem value="Difficile">Difficile</MenuItem>
                                            <MenuItem value="Extrême">Extrême</MenuItem>
                                        </TextField>
                                    </Grid>
                                </Grid>
                                <br /><br />
                                <Grid container>
                                    <Grid item xs>
                                        <TextField 
                                            id="battleroyal" 
                                            label="Battle Royal Mode" 
                                            required = "false" 
                                            defaultValue = "Non"
                                            disabled = { false }
                                            helperText = "*chacun pour soi."
                                            style = {{width: 150}} 
                                            { ...bindBattleRoyal }
                                            select>
                                                <MenuItem value="Non">Non</MenuItem>
                                                <MenuItem value="Oui">Oui</MenuItem>
                                        </TextField>
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
                                            defaultValue = "0"
                                            required = "true" 
                                            { ...bindAttendeesMin }
                                        />
                                    </Grid>

                                    <Grid item xs = {4}> 
                                    <TextField
                                            id="deadline_reservation"
                                            label="Date limite inscription"
                                            type="datetime-local"
                                            defaultValue= {values.someDate} //TODO -> mettre une default value qui prend la date/heure actuelle
                                            className={classes.textField}
                                            InputLabelProps={{
                                            shrink: true,
                                            }}
                                            { ...bindDeadlineReservation }
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
                                        defaultValue = "0"
                                        required = "true" 
                                        { ...bindAttendeesMax }
                                        />
                                    </Grid>
                                    <Grid item xs = {4}> 
                                    <TextField
                                            id="date_begin"
                                            label="Date et heure de l'événement"
                                            type="datetime-local"
                                            defaultValue="2020-05-24T10:30"
                                            className={classes.textField}
                                            InputLabelProps={{
                                            shrink: true,
                                            }}
                                            { ...bindDateBegin }
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
                                            defaultValue = "0"
                                            required = "true"
                                            { ...bindPrice }
                                        />
                                    </Grid>
                                    <Grid item xs = {4}> 
                                        <TextField
                                            id="date_end"
                                            label="Date et heure de fin"
                                            type="datetime-local"
                                            defaultValue="2020-05-24T10:30" //TODO -> mettre une default value qui prend la date/heure actuelle
                                            className={classes.textField}
                                            InputLabelProps={{
                                            shrink: true,
                                            }}
                                            { ...bindDateEnd }
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
                                        required = "true" 
                                        style = {{minWidth: 450}}
                                        { ...bindLocation }
                                    /> 
                                    </Grid>
                                </Grid>
                                <br />
                                <Grid container >
                                    <Grid item xs> 
                                    <TextField
                                        id="road"
                                        label="Rue"
                                        placeholder="Lieu de l'événement"
                                        variant="outlined"
                                        required = "true" 
                                        style = {{minWidth: 450}}
                                        { ...bindRoad }
                                    /> 
                                    </Grid>
                                    <Grid item xs = {2}> 
                                        <TextField
                                            id="road_number"
                                            label="N° de rue"
                                            placeholder="Lieu de l'événement"
                                            variant="outlined"
                                            required = "true" 
                                            style = {{minWidth: 100, width:100}}
                                            { ...bindRoadNumber }
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
                                        required = "true" 
                                        style = {{minWidth: 80}}
                                        { ...bindPostalCode }
                                    /> 
                                    </Grid>
                                    <Grid item xs = {7}> 
                                        <TextField
                                            id="town"
                                            label="Ville"
                                            placeholder="Lieu de l'événement"
                                            variant="outlined"
                                            required = "true" 
                                            style = {{minWidth: 150, width:350}}
                                            { ...bindTown }
                                        /> 
                                    </Grid>
                                </Grid>
                                <br />
                                
                            </FormControl>
                        </CardContent>
                        <CardActions>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick= { buttonCreateEvent }
                                >
                                    Créer événement
                            </Button>
                        </CardActions>
                    </Card>
            </main>
        </React.Fragment>
    );
}
