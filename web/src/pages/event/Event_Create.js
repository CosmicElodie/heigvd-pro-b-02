import React, {Component} from 'react';
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

//TODO : Pour faire l'upload de l'image
//https://www.youtube.com/watch?v=sp9r6hSWH_o

import {withStyles, makeStyles} from '@material-ui/core/styles';

const titre_créerEvent = "Créer un événement"

const useStyles = makeStyles(theme => ({
    card: { //dans la carte
        minHeight: '90%',
        minWidth: '650px',
        width: '60%',
        display: 'flex',
        flexDirection: 'column'
    },
    cardMedia: {
        paddingTop: '10%', //height de l'image
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
    const classes = useStyles();
  
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
                                    id="event-title"
                                    label="Nom événement"
                                    placeholder="Veuillez indiquer le nom de votre événement."
                                    variant="outlined"
                                    required = "true" 
                                />
                                <br />
                                <TextField
                                    id="event-description"
                                    label="Description"
                                    placeholder="En quoi consiste votre événement ?"
                                    multiline
                                    variant="outlined"
                                    required = "true" 
                                    style = {{minWidth: 600}}
                                 />
                                <br />
                                <Grid container >
                                    <Grid item xs> 
                                        <TextField 
                                        id="select" 
                                        label="Type" 
                                        required = "true" 
                                        defaultValue = "Non-compétitif"
                                        style = {{width: 150}} 
                                        select>
                                            <MenuItem value="Compétitif">Compétitif</MenuItem>
                                            <MenuItem value="Non-compétitif">Non-compétitif</MenuItem>
                                        </TextField>
                                    </Grid>

                                    <Grid item xs> 
                                        <TextField 
                                        id="select" 
                                        label="Limitation" 
                                        required = "true" 
                                        defaultValue = "Global"
                                        style = {{width: 150}} 
                                        select>
                                            <MenuItem value="Global">Global</MenuItem>
                                            <MenuItem value="Ingénierie des données">Ingénierie des données</MenuItem>
                                            <MenuItem value="Informatique logicielle">Informatique logicielle</MenuItem>
                                            <MenuItem value="Réseaux et systèmes">Réseaux et systèmes</MenuItem>
                                            <MenuItem value="Sécurité informatique">Sécurité informatique</MenuItem>
                                            <MenuItem value="Systèmes informatiques embarqués">Systèmes informatiques embarqués</MenuItem>
                                        </TextField>
                                    </Grid>

                                    <Grid item xs = {3}> 
                                        <TextField 
                                        id="select" 
                                        label="Difficulté" 
                                        style = {{width: 150}} 
                                        defaultValue = "Facile"
                                        required = "true" 
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
                                    <Grid>
                                    <TextField 
                                        id="select" 
                                        label="Battle Royal Mode" 
                                        required = "false" 
                                        defaultValue = "Non"
                                        disabled = "true"
                                        style = {{width: 150}} 
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
                                            id="nb-min-participants"
                                            label="Nb. min participants"
                                            placeholder="Veuillez indiquer le nombre minimum de participants."
                                            variant="outlined"
                                            defaultValue = "0"
                                            required = "true" 
                                        />
                                    </Grid>
                                    <Grid item xs = {4}> 
                                    <TextField
                                            id="event-date"
                                            label="Date et heure de l'événement"
                                            type="datetime-local"
                                            defaultValue="2020-05-24T10:30" //TODO -> mettre une default value qui prend la date/heure actuelle
                                            className={classes.textField}
                                            InputLabelProps={{
                                            shrink: true,
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                                <br /><br />
                                <Grid container >
                                <Grid item xs> 
                                    <TextField
                                        id="nb-max-participants"
                                        label="Nb. max participants"
                                        placeholder="Veuillez indiquer le nombre maximum de participants."
                                        variant="outlined"
                                        defaultValue = "0"
                                        required = "true" 
                                        />
                                    </Grid>
                                    <Grid item xs = {4}> 
                                        <TextField
                                            id="date-limite-participation"
                                            label="Date limite inscription"
                                            type="datetime-local"
                                            defaultValue="2020-05-24T10:30" //TODO -> mettre une default value qui prend la date/heure actuelle
                                            className={classes.textField}
                                            InputLabelProps={{
                                            shrink: true,
                                            }}
                                        />
                                    </Grid>
                                </Grid> <br /><br />
                                <Grid container>
                                    <Grid>
                                    <TextField
                                        id="event-address-location"
                                        label="Lieu"
                                        placeholder="Lieu de l'événement"
                                        variant="outlined"
                                        required = "true" 
                                        style = {{minWidth: 450}}
                                    /> 
                                    </Grid>
                                </Grid>
                                <br />
                                <Grid container >
                                    <Grid item xs> 
                                    <TextField
                                        id="event-address-road"
                                        label="Rue"
                                        placeholder="Lieu de l'événement"
                                        variant="outlined"
                                        required = "true" 
                                        style = {{minWidth: 450}}
                                    /> 
                                    </Grid>
                                    <Grid item xs = {2}> 
                                        <TextField
                                            id="event-address-number"
                                            label="N° de rue"
                                            placeholder="Lieu de l'événement"
                                            variant="outlined"
                                            required = "true" 
                                            style = {{minWidth: 100, width:100}}
                                        /> 
                                    </Grid>
                                </Grid>
                                <br />
                                <Grid container >
                                    <Grid item xs> 
                                    <TextField
                                        id="event-address-postalCode"
                                        label="Code postal"
                                        placeholder="Lieu de l'événement"
                                        variant="outlined"
                                        required = "true" 
                                        style = {{minWidth: 80}}
                                    /> 
                                    </Grid>
                                    <Grid item xs = {7}> 
                                        <TextField
                                            id="event-address-Town"
                                            label="Ville"
                                            placeholder="Lieu de l'événement"
                                            variant="outlined"
                                            required = "true" 
                                            style = {{minWidth: 150, width:350}}
                                        /> 
                                    </Grid>
                                </Grid>
                                <br />
                                
                            </FormControl>
                        </CardContent>
                        <CardActions>
                            {/* disableElevation permet d'enlever l'ombrage du bouton */}
                            <Button variant="contained" disableElevation>Valider</Button>
                        </CardActions>
                    </Card>
            </main>
        </React.Fragment>
    );
}
