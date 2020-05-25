import React, { useContext, useCallback } from 'react';
import { useHistory } from "react-router-dom";
import { EventContext } from '../../context/EventContext';
import MUIDataTable from "mui-datatables";


import moment from 'moment';
import { styled } from '@material-ui/core/styles';

import {
    Button,
    Card,
    CardContent,
    CssBaseline,
    Grid,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    card: { //dans la carte
        height: '90%',
        minWidth: '700px',
        width: '1100px',
        display: 'flex',
        flexDirection: 'column',
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


const columns = [
    { name: 'name', label: 'Nom' , options: {filter: false, sort: true,}},
    { name: 'organisator',  label: 'Organisateur' , options: {filter: false, sort: true,}},
    { name: 'limitation', label: 'Limitation', options: {filter: true, sort: true,} },
    { name: 'nb_attendees',label: 'Nb participants', options: {filter: false, sort: true,} },
    { name: 'deadline_reservation',label: 'Date limite inscription', options: {filter: false, sort: true,} },
    { name: 'date_begin', label: 'Date', options: {filter: false, sort: true,} },
    { name: 'location',label: 'Lieu', options: {filter: false, sort: true,} },
    { name: 'status',  label: 'Statut', options: {filter: true, sort: true,} },
    { name: 'event_id',  label: 'event', options: {viewColumns : false, filter: false,display: false,} }
   ];



export default function Event_List() {

    let history = useHistory();
    const classes = useStyles();

    const { data } = useContext(EventContext);



    Object.size = function (obj) {
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };

    const redirectPage = useCallback((link) => {
        // Will change the URL, behaves like a link
        history.push(link);
    });

    const options = {       
        filterType: 'checkbox',
        print: "",
        selectableRows: 'none',
        
        onRowClick: (rowData, rowState) => {
            let _id = rowData[8]
            console.log(rowData);
            redirectPage("/event_display/" + _id)
        }
      };

    const MyButton = styled(Button)({
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
    });


    var reformatData = function(data) {
        return data.map(function(data) {
          // create a new object to store full name.
          var newObj = {};
          newObj["event_id"] = data.event_id
          newObj["name"] = data.name
          newObj["status"] = data.status
          newObj["deadline_reservation"] = moment(data.deadline_reservation).format('DD/MM/YYYY HH:mm')
          newObj["date_begin"] =  moment(data.date_begin).format('DD/MM/YYYY HH:mm')
          newObj["location"] = data.location
          newObj["limitation"] = data.house == null ? "Global" : data.house.shortname
          newObj["organisator"] = data.organisator.firstname + ' ' + data.organisator.lastname
          newObj["nb_attendees"] = data.nb_attendees + ' / ' + data.attendees_max
          // return our new object.
          return newObj;
        });
      };
    

    return (
        <main>
            <CssBaseline />
            <Grid>
            <br/>
            <br/>
            <br/>
            <br/>
                <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                        <center><h1>Liste des événements</h1></center>
                        <p>
                            <MyButton href="event_create" variant="contained" color="secondary">
                                Créer un événement
                                </MyButton>
                        </p>

                        {
                            data && <MUIDataTable
                            data={reformatData(data)}
                            columns={columns}
                            options={options}
                            />
                        }
                        
                    </CardContent>
                </Card>
            </Grid>
        </main>
    );
}