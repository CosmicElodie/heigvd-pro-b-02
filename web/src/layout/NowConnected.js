import React, { useEffect, useState, Fragment } from 'react';
import {appConfig} from "../config/appConfig"
import Person from './Person';
const NowConnected = () => {

    const [ connected, setConnected ]  = useState([]);

    useEffect(() => {
        fetch(appConfig.api_url + 'authentication/now_online', {
            method: 'GET',
            credentials: 'include' // mandatory for every JSON fetch
        })
        .then(response => (response ? response.json() : ""))
        .then(response => {
            setConnected(response);
            
        });
           
    }, [setConnected]);

    return (
        <Fragment>
            { connected && connected.length > 0 && 
                <section className="now_online">
                    <section className="users_list">
                        { connected && connected.length > 0 && connected.map(( person, index ) => <Person user = { person } /> )}
                    </section>
                    
                    <section className="display">
                        <section className="connected_users_icon"> </section>
                        { connected.length } personne{ connected.length > 1 ? 's' : '' } connectée{ connected.length > 1 ? 's' : '' }
                        <section className="arrow"></section>
                    </section>
                    
                </section>
            }
        </Fragment>
    )
}

export default NowConnected;