import React, {useContext, useEffect} from 'react';
import {MainContext} from '../../context/MainContext';
import { EventContext } from '../../context/EventContext';
import Typography from '@material-ui/core/Typography';

import {Button, 
    Card, 
    CardActions, 
    CardContent, 
    CardMedia, 
    CssBaseline, 
    Grid, 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableContainer, 
    TableRow, 
    Paper} from '@material-ui/core';

import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    card: { //dans la carte
        height: '90%',
        width: '80%',
        display: 'flex',
        flexDirection: 'column'
        
    },
    cardMedia: {
        //paddingTop: '75%',
        flexDirection: 'row',
        justify: 'space-evenly'
    },
    cardContent: {
        flexGrow: 1,
    }
}));

export default function Event_List() {
    const {user:{event}} = useContext(MainContext);
    //data && dat.len > 0 && ...
    const {data, setData} = useContext(EventContext);
    //si qqchse change de le tableau de dépendances, il l'affiche
    useEffect(() => {console.log('TEST : ' + event);}, [event]);
    const classes = useStyles();
    
    function choosePuce(house)
    {
        switch(house)
        {
            case 'Ingénierie des données' : return "./puce_ID.png";
                break;
            case "Informatique logicielle" : return "./puce_ID.png";
                break;
            case "Systèmes informatiques embarqués" : return "./puce_IE.png";
                break;
            case "Sécurité informatique" : return "./puce_TS.png";
                break;
            case "Réseaux et systèmes" : return "./puce_TR.png";
                break;
            default : return "";
        }
    }

    function createData(name, organizer, limitation, free_spots, limit_date, event_date, location) {
        return { name, organizer, limitation, free_spots, limit_date, event_date, location };
      }
      
      const temp_data = [
        createData('Raclette TIC', "Vincent Peiris", "null", 200, "15/05/2020", "01/06/2020", "HEIG-VD"),
        createData('Workshop - How to make a sandwich', "Salva Dalia", "IL", 12, "11/05/2020", "13/05/2020", "Vevey"),
        createData('Orgie Révisions', "Your Cosmic Queen", "ID", 10, "05/05/2020", "06/05/2020", "HEIG-VD"),
      ];

    return (
        <React.Fragment>
            <CssBaseline/>
            <main>
                <Grid>
                        <Card className={classes.card}>
                            <CardContent className={classes.cardContent}>
    <TableContainer component={Paper}>                        
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Nom</TableCell>
            <TableCell align="right">Organisateur</TableCell>
            <TableCell align="right">Limitation</TableCell>
            <TableCell align="right">Places libres</TableCell>
            <TableCell align="right">Date limite d'inscription</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Lieu</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {temp_data.map((row) => (
            <TableRow key={row.name}>
              <TableCell align="left">{event && event.name}</TableCell>
              <TableCell align="right">
          {/*<img src={require(choosePuce(user.house && user.house.name))}/> */}
                      <img src={require('./puce_IL.png')}/> 

                </TableCell>
              <TableCell align="right">{row.limitation}</TableCell>
              <TableCell align="right">{row.free_spots}</TableCell>
              <TableCell align="right">{row.limit_date}</TableCell>
              <TableCell align="right">{row.event_date}</TableCell>
              <TableCell align="right">{row.location}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

                                
                            </CardContent>
                        </Card>
                    </Grid>
            </main>
        </React.Fragment>
    );
}