import React, { createContext, useState, useEffect  } from 'react';

export const MainContext = createContext();
/*
MainContext is a global data repository intended to contain the states to be shared 
between all the components.
*/
export const MainProvider = ( props ) => {
    // useState can only handle 1 object
    // it can be a list of objects
    const [ user, setUser ]      = useState({ is_authenticated : false });
    const [ dialog, setDialog ]  = useState();

    useEffect(() => { 
        let userFromStore = JSON.parse(localStorage.getItem('User') ? localStorage.getItem('User') : '{}' );
        if(userFromStore && user.id !== userFromStore.id && userFromStore.is_authenticated)
            setUser(userFromStore);
    }, [user.id]);

    let context = {
        user, 
        setUser, 
        dialog,
        setDialog
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