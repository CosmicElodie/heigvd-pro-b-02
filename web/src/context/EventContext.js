import React, { createContext, useState, useEffect  } from 'react';

export const EventContext = createContext();
/*
ForumProvider is a data repository intended to contain the states to be shared 
between all Forum the components.
*/
export const EventProvider = ( props ) => {
    // useState can only handle 1 object
    // it can be a list of objects

    const [ data, setData ] = useState();

    useEffect(() => {
        fetch('http://localhost:8080/event/all', {
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