import React, { createContext, useState } from 'react';

export const MainContext = createContext();
/*
MainContext is a global data repository intended to contain the states to be shared 
between all the components.
*/
export const MainProvider = ( props ) => {
    // useState can only handle 1 object
    // it can be a list of objects
    const [ user, setUser ]      = useState({ is_authenticated : false });
    const [ login, setLogin ]    = useState({ is_open : false });
    const [ dialog, setDialog ]  = useState({ });

    let context = {
        user, 
        setUser, 
        login, 
        setLogin,
        dialog,
        setDialog
    }

    return (
        <MainContext.Provider value = { { ...context } }>
            { props.children }
        </MainContext.Provider>
    );

}