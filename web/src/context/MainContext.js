import React, { createContext, useState, useEffect  } from 'react';
import {appConfig} from "../config/appConfig"

export const cleanChars = (string) => string.replace(/&/g, "%26").replace(/>/g, "%3E").replace(/</g, "%3C").replace(/"/g, "%22");

export const MainContext = createContext();
/*
MainContext is a global data repository intended to contain the states to be shared 
between all the components.
*/
export const MainProvider = ( props ) => {
    // useState can only handle 1 object
    // it can be a list of objects
    
    const [ user, setUser ]      = useState({ is_authenticated : false });

    /*
        Global contient des données potentiellement necessaires dans toute l'application
        Ex : liste des maisons
    */
    const [ global, setGlobal ]  = useState({ houses : [] });

    const [ dialog, setDialog ]  = useState();

    const [ shownUser, setShownUser ]  = useState();
    
    const [ showProfile, setShowProfile ]  = useState();
   
    
    useEffect(() => { 
        try {
            let userFromStore = JSON.parse(localStorage.getItem('User') ? localStorage.getItem('User') : '{}' );
            if(userFromStore && user.id !== userFromStore.id && userFromStore.is_authenticated)
                setUser(userFromStore);
        } catch (e){
            
        }
    }, [user.id]);

    useEffect(() => { 
        user && fetch(appConfig.api_url + 'global/data', {
            method: 'GET',
            credentials: 'include' // mandatory for every JSON fetch
        })
        .then(response => response.json())
        .then((data) => {
            setGlobal(data);       
        })
    }, [user, setGlobal]);

    const context = {
        global,
        user, 
        setUser, 
        dialog,
        setDialog,
        shownUser,
        setShownUser,
        showProfile,
        setShowProfile, 
    }

    return (
        <MainContext.Provider value = { { ...context } }>
            { props.children }
        </MainContext.Provider>
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