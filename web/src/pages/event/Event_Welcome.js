import React, {useContext} from 'react';
import Typography from '@material-ui/core/Typography';
import {MainContext} from '../../context/MainContext';
import { styled } from '@material-ui/core/styles';
import {Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Table, TableBody, TableCell, TableHead, TableContainer, TableRow, Paper} from '@material-ui/core';

import {makeStyles} from '@material-ui/core/styles';
import { EventContext } from '../../context/EventContext';

import '../../css/Event.css'; 

const useStyles = makeStyles(theme => ({
    card: { //dans la carte
        height: '750px',
        width: '45%',
        display: 'flex',
        flexDirection: 'column'
    },
    cardMedia: {
        paddingTop: '200px',
        flexDirection: 'row',
        justify: 'space-evenly'
    },
    cardContent: {
        flexGrow: 1,
    },
    button: {
        align: 'center',
        alignItems: 'center'
    }
}));

export default function Event() {
    const {user} = useContext(MainContext);
    const {data, setData} = useContext(EventContext);

    const classes = useStyles();

    var limit_house = 0;
    var limit_global = 0;

    var daHouse = user.house && user.house.house_id;

    //Permet d'afficher une ligne du tableau selon les données passées
    //15 car ça affiche composant d'une ligne par composant d'une ligne.
    //Comme on veut 5 events -> 5 * 3 = 15.
    function printLine(house_id, elementToPrint) {
        if (daHouse == house_id && limit_house < 15) {
            limit_house++;
                return <TableCell component="th" scope="row">
                        {elementToPrint}
                        </TableCell>
        }
        return;
      }

    function printLineGlobal(house_id, elementToPrint) {
        if (house_id == null && limit_global < 15) {
            limit_global++;
              return <TableCell component="th" scope="row">
              {elementToPrint}
          </TableCell>
        }
        return;
      }

      const MyButton = styled(Button)({
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0px 20px',
        margin: '30px 30px',
      });
      
      

    return (

        <React.Fragment>
            <CssBaseline/>
            <main>
                <Grid container direction="row" justify="space-evenly" alignItems="center"> 
                        <Card className={classes.card}>
                            
                            <CardMedia
                                className={classes.cardMedia}
                                image="https://heig-vd.ch/images/default-source/img-vie-sur-le-campus/heig-vd-site-web-sm-00075562.jpg?sfvrsn=e01580ea_2"
                                title="Image title"
                            />
                            <CardContent className={classes.cardContent}>
                                <Typography gutterBottom variant="h5" component="h2">
                                Événements {user.house && user.house.name}
                                </Typography>
                                <Typography>

                                    <TableContainer component={Paper}>
                                        <Table className={classes.table} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Nom événement</TableCell>
                                                    <TableCell align="left">Date</TableCell>
                                                    <TableCell align="left">Nb participants</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                             
                                            {data && data.length > 0 && data.map(({event_id, name, description, is_competitive, difficulty, status, price, deadline_reservation, date_begin, date_end, location, house_id, house_name, nb_attendees}) =>
                                                    <TableRow /* key={name} */>
                                                        {printLine(house_id,name)}
                                                        {printLine(house_id,date_begin)}
                                                        {printLine(house_id,nb_attendees)}
                                                    </TableRow>
                                            )}
                                            
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Typography>
                            </CardContent>
                        </Card>
                    
                        <Card className={classes.card}>
                            
                            <CardMedia
                                className={classes.cardMedia}
                                image="https://heig-vd.ch/images/default-source/img-vie-sur-le-campus/heig-vd-site-web-sm-00075562.jpg?sfvrsn=e01580ea_2"
                                title="Image title"
                            />
                            <CardContent className={classes.cardContent}>
                                <Typography gutterBottom variant="h5" component="h2">
                                Événements Globaux
                                </Typography>
                                <Typography>

                                    <TableContainer component={Paper}>
                                        <Table className={classes.table} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Nom événement</TableCell>
                                                    <TableCell align="left">Date</TableCell>
                                                    <TableCell align="left">Nb participants</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                            {data && data.length > 0 && data.map(({event_id, name, description, is_competitive, difficulty, status, price, deadline_reservation, date_begin, date_end, location, house_id, house_name, nb_attendees}) =>
                                                    
                                                    
                                                    <TableRow /* key={name} */>
                                                        {printLineGlobal(house_id,name)}
                                                        {printLineGlobal(house_id,date_begin)}
                                                        {printLineGlobal(house_id,nb_attendees)}
                                                    </TableRow>
                                                
                                                    
                                                    
                                            )}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Typography>
                            </CardContent>
                        </Card>
                </Grid>
                <center>
                    <MyButton
                        type="submit"
                        variant="contained"
                        className={classes.submit}
                        >
                            <a href="/event_list">Voir plus...</a>
                    </MyButton>
                </center>

            </main>
        </React.Fragment>
    );
    
}

