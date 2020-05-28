import React, { useEffect, useState, useContext, useCallback } from 'react';
import { appConfig } from "../config/appConfig"
import { useHistory } from "react-router-dom";
import { MainContext } from '../context/MainContext';
import MUIDataTable from "mui-datatables";
import moment from 'moment';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {
    Grid,
} from '@material-ui/core';

import "../css/home.css";

const columns = [
    { name: 'name', label: 'Nom', options: { filter: false, sort: true, } },
    { name: 'organisator', label: 'Organisateur', options: { filter: false, sort: true, } },
    { name: 'limitation', label: 'Limitation', options: { filter: true, sort: true, } },
    { name: 'nb_attendees', label: 'Nb participants', options: { filter: false, sort: true, } },
    { name: 'deadline_reservation', label: 'Date limite inscription', options: { filter: false, sort: true, } },
    { name: 'date_begin', label: 'Date', options: { filter: false, sort: true, } },
    { name: 'location', label: 'Lieu', options: { filter: false, sort: true, } },
    { name: 'status', label: 'Statut', options: { filter: true, sort: true, } },
    { name: 'event_id', label: 'event', options: { viewColumns: false, filter: false, display: false, } }
];


export default function Home() {

    const { user } = useContext(MainContext);
    let history = useHistory();
    const [topUser, setTopUser] = useState();


    const redirectPage = useCallback((link) => {
        // Will change the URL, behaves like a link
        history.push(link);
    });

    var reformatData = function (data) {
        return data.map(function (data) {
            // create a new object to store full name.
            var newObj = {};
            newObj["event_id"] = data.event_id
            newObj["name"] = data.name
            newObj["status"] = data.status
            newObj["deadline_reservation"] = moment(data.deadline_reservation).format('DD/MM/YYYY HH:mm')
            newObj["date_begin"] = moment(data.date_begin).format('DD/MM/YYYY HH:mm')
            newObj["location"] = data.location
            newObj["limitation"] = data.house == null ? "Global" : data.house.shortname
            newObj["organisator"] = data.organisator.firstname + ' ' + data.organisator.lastname
            newObj["nb_attendees"] = data.nb_attendees + ' / ' + data.attendees_max
            // return our new object.
            return newObj;
        });
    };

    const options = {

        filterType: 'checkbox',
        print: "",
        selectableRows: 'none',
        onRowClick: (rowData, rowState) => {
            let _id = rowData[8]
            console.log(rowData);
            redirectPage("/event_display/" + _id)
        },
    };

    Object.size = function (obj) {
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };

    //const [ data, setData ] = useState(); //mettre json à la place de useState
    const [joinedEvents, setJoinedEvents] = React.useState();
    const [createdEvents, setCreatedEvents] = React.useState();

    useEffect(() => {
        user.user_id && getJoinedEvents();
        user.user_id && getCreatedEvents();
        user.user_id && getTopUser();
    }, [user.user_id]);

    const getCreatedEvents = () => {
        let post_body = "&user_id=" + parseInt(user.user_id);
        console.log("CREATED");
        console.log(post_body);

        fetch(appConfig.api_url + 'event/created_by_user',
            {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: post_body
            })
            .then(response => response.json())
            .then(response => { setCreatedEvents(response) })
    }

    const getJoinedEvents = () => {
        let post_body = "&user_id=" + parseInt(user.user_id);
        console.log("PARTICIPATED");
        console.log(post_body);
        fetch(appConfig.api_url + 'event/participated_by_user', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: post_body
        })
            .then(response => response.json())
            .then(response => { setJoinedEvents(response) })
    }


    const getTopUser = () => {
        let post_body = "&user_id=" + parseInt(user.user_id)
        fetch(appConfig.api_url + 'getuser', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: post_body
        })
            .then(response => response.json())
            .then(response => { setTopUser(response)})
    }

    return (
        <main>

            <h1 className="h1-title">Bienvenue, {user.firstname} !</h1>
            <Grid spacing={2} container direction="row" justify="space-evenly" alignItems="stretch">
                <Grid xs={12}>
                    <center><h2 className="h2-title">Rank</h2></center>
                    {/*<center><h1 className="numberCircle">{topUser && topUser.rank_year_global}</h1> </center>*/}
                    
                </Grid>
                <div class="nav-table">
                    <div class="nav-row">
                        <div class="nav-col">
                            <div class="icon">
                                <center>{topUser && topUser.rank_year_global}</center>
                            </div>
                        </div>
                    </div>
                </div>


                <Grid item xs={12}>
                    {/*displayJoinedEvents('Événements rejoints par ' + user.firstname, joinedEvents)*/}
                    <center><h2 className="h2-title">Événements rejoints </h2></center>
                    {
                        joinedEvents && <MUIDataTable
                            data={reformatData(joinedEvents)}
                            columns={columns}
                            options={options}
                        />
                    }
                </Grid>

                <Grid item xs={12}>
                    {/*displayCreatedEvents('Événements créés par ' + user.firstname, createdEvents)*/}
                    <center><h2 className="h1-title">Événements créés </h2></center>
                    {
                        createdEvents && <MUIDataTable
                            data={reformatData(createdEvents)}
                            columns={columns}
                            options={options}
                        />
                    }
                </Grid>

            </Grid>
        </main>
    );
}