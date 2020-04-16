import React, { createContext, useState, useEffect  } from 'react';

export const EventContext = createContext();
/*
EventProvider is a data repository intended to contain the states to be shared 
between all Forum the components.
*/
export const EventProvider = ( props ) => {

    /* Pour l'instant j'utilise des trucs en dur, mais va falloir réutiliser la fonction
    mise en commentaire ci-dessous. -> TODO DADA !!! 
    
    SELECT getEventJSON(); dans console DEV*/
    const [ data, setData ] = 
    useState(
        [
    {"name": "Test event", 
    "price": 8, 
    "status": "Testable", 
    "date_end": "2020-04-05 00:00:00.000000",
     "event_id": 1, 
     "house_id": null, 
     "location": "G05b", 
     "date_begin": "2020-04-05 05:33:00.000000", 
     "difficulty": 1, 
     "house_name": null, 
     "description": "C'est un test", 
     "nb_attendees": 1, 
     "is_competitive": 1, 
     "deadline_reservation": "2020-04-05 00:00:00.000000"
    }, 
    
    {"name": "Grillades TS", 
    "price": 0, 
    "status": "En cours", 
    "date_end": "2020-04-01 00:00:00.000000", 
    "event_id": 2, 
    "house_id": 2, 
    "location": "Chill", 
    "date_begin": "2020-04-01 03:59:00.000000", 
    "difficulty": null, 
    "house_name": "Sécurité informatique", 
    "description": "Une grillade pour tous !", 
    "nb_attendees": 2, 
    "is_competitive": 0, 
    "deadline_reservation": "2020-04-01 00:00:00.000000"}, 
    
    {"name": "Grillades ID", 
    "price": 0, 
    "status": "En cours", 
    "date_end": "2020-04-01 00:00:00.000000", 
    "event_id": 3, 
    "house_id": 5, 
    "location": "Chill", 
    "date_begin": "2020-04-01 04:25:00.000000", 
    "difficulty": null, 
    "house_name": "Ingénierie des données", 
    "description": "Une grillade pour tous !", 
    "nb_attendees": 1, 
    "is_competitive": 0, 
    "deadline_reservation": "2020-04-01 00:00:00.000000"}, 
    
    {"name": "Grillades IL", 
    "price": 0, 
    "status": "En cours", 
    "date_end": "2020-04-01 00:00:00.000000", 
    "event_id": 4, 
    "house_id": 4, 
    "location": "Chill", 
    "date_begin": "2020-04-01 19:30:00.000000", 
    "difficulty": null, 
    "house_name": "Informatique logicielle", 
    "description": "Une grillade pour tous !", 
    "nb_attendees": 0, 
    "is_competitive": 0, 
    "deadline_reservation": "2020-04-01 00:00:00.000000"}, 
    
    {"name": "CTF", "price": 0, "status": null, "date_end": "2020-04-16 00:00:00.000000", "event_id": 5, "house_id": 3, "location": "H01", "date_begin": "2020-04-15 21:20:00.000000", "difficulty": 3, "house_name": "Réseaux et systèmes", "description": "C'est chouette", "nb_attendees": 0, "is_competitive": 1, "deadline_reservation": "2020-04-10 00:00:00.000000"}, {"name": "Baleinev", "price": 0, "status": null, "date_end": "2020-04-16 00:00:00.000000", "event_id": 6, "house_id": null, "location": "En E01", "date_begin": "2020-04-15 10:20:00.000000", "difficulty": 3, "house_name": null, "description": "C'est cool la musique", "nb_attendees": 0, "is_competitive": 1, "deadline_reservation": "2020-04-10 00:00:00.000000"}, {"name": "Baleinev 2021", "price": 0, "status": null, "date_end": "2020-04-16 00:00:00.000000", "event_id": 7, "house_id": null, "location": "En E01", "date_begin": "2020-04-15 12:01:00.000000", "difficulty": 3, "house_name": null, "description": "C'est cool la musique", "nb_attendees": 0, "is_competitive": 1, "deadline_reservation": "2020-04-10 00:00:00.000000"}, {"name": "Un événement pour orientation anonyme", "price": 0, "status": null, "date_end": "2020-04-16 00:00:00.000000", "event_id": 8, "house_id": 1, "location": "En E01", "date_begin": "2020-04-15 13:10:00.000000", "difficulty": 3, "house_name": "Systèmes informatiques embarqués", "description": "Je ne sais pas quel orientation c'est", "nb_attendees": 0, "is_competitive": 1, "deadline_reservation": "2020-04-10 00:00:00.000000"}, {"name": "Marathon sportif HEIG-VD", "price": 5, "status": "<null>", "date_end": "2020-04-15 19:30:00.000000", "event_id": 9, "house_id": null, "location": "Plage HEIG-VD", "date_begin": "2020-04-15 08:25:00.000000", "difficulty": 4, "house_name": null, "description": "Vous allez suer!", "nb_attendees": 0, "is_competitive": 1, "deadline_reservation": "2020-04-13 23:59:59.000000"}, {"name": "[Workshop ID] - How to make a sandwich", "price": 10, "status": "<null>", "date_end": "2020-04-15 19:30:00.000000", "event_id": 10, "house_id": 5, "location": "En H01", "date_begin": "2020-04-15 08:25:00.000000", "difficulty": 1, "house_name": "Ingénierie des données", "description": "Tu veux apprendre à réaliser le meilleur sandwich qui soit ? Alors participe à notre workshop !", "nb_attendees": 0, "is_competitive": 0, "deadline_reservation": "2020-04-13 23:59:59.000000"}
    ]);

    /* useEffect(() => {
        fetch('http://localhost:8080/event/all', {
            method: 'GET',
            credentials: 'include' // mandatory for every JSON fetch
        })
        .then(data => data.json())
        .then(data => setData(data))
    }, [setData]); */

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