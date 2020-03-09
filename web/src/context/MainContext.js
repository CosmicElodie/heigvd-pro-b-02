import React, { createContext, useState } from 'react';

export const MainContext = createContext();

export const MainProvider = ( props ) => {
    // useState can only handle 1 object
    // it can be a list of objects
    const [ user, setUser ]     = useState({ is_authenticated : false });
    const [ login, setLogin ]   = useState({ is_open : false });
        
    return (
        
        <MainContext.Provider value = { { user, setUser, login, setLogin } }>
            { props.children }
        </MainContext.Provider>
    );

}