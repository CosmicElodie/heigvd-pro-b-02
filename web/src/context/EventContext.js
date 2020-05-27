import React, { createContext, useState, useEffect  } from 'react';
import {appConfig} from "../config/appConfig"
import { config } from 'react-transition-group';
export const EventContext = createContext();
/*
EventProvider is a data repository intended to contain the states to be shared 
between all Forum the components.
*/
export const EventProvider = ( props ) => {
    const [ data, setData ] =  useState();
    
    useEffect(() => {
        fetch(appConfig.api_url + 'event/all', {
            method: 'GET',
            credentials: 'include' // mandatory for every JSON fetch
        })
        .then(data => data.json())
        .then(data => setData(data))
    }, [setData]); 

    let context = {
        data,
        setData
    }

    return (
        <EventContext.Provider value = { { ...context } }>
            { props.children }
        </EventContext.Provider>
    );

}

/*

Dialog Object example : 
{
    login_success: {
        is_open: true,
        data : { 
            firstname: "Stefan",
            lastname: "Teofanovic"
        }
    }
}

*/