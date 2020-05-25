import React, { useEffect, useContext, useState, useMemo, useCallback } from 'react';
import { MainContext } from '../context/MainContext';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useHistory } from "react-router-dom";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Person from './Person';
const User = ( ) => {
   
    // MainContext => see file ./context/MainContext.js
    const { user, setUser, setDialog  } = useContext(MainContext);
    const [ anchorEl, setAnchorEl ] = useState(null);
    let history = useHistory(); // hook that allows URL change -> navigation
    
    useEffect(() => { 
        // useEffect => sort of 'DOM Ready' equivalent 

        fetch('http://localhost:8080/authentication/user_data', {
            method: 'GET',
            credentials: 'include' // mandatory for every JSON fetch
        })
        .then(response => response.json())
        .then(({ data : user }) => {
                // update user object in the MainContext
                setUser(user);
                if(!user.is_authenticated) {
                    localStorage.setItem("User", JSON.stringify(user));
                    history.push("/signin");
                }
            }
        )
    }, [history, setUser]);   
    
  
    const handleMenuOpen = useCallback(event => setAnchorEl(event.currentTarget), [setAnchorEl]);

    const handleMenuClose = useCallback(() => setAnchorEl(null), [setAnchorEl]);

    const user_logout = useCallback(() => {

       fetch('http://localhost:8080/authentication/user_logout', {
            method: 'POST',
            credentials: 'include'
        })
        .then(response => response.json())
        .then(response => {            
            setUser(response.data);
            setDialog({
                [response.dialog_id]: {
                    is_open: true
                }
            });  
            localStorage.setItem("User", JSON.stringify(response.data));
            setTimeout(() => history.push("/signin"), 2000);

        })
        setAnchorEl(null);

    }, [setUser, setDialog, history]);    

    const redirectPage = useCallback((link) => {
        // Will change the URL, behaves like a link
        history.push(link);         
        setAnchorEl(null);
    }, [history, setAnchorEl]);

    function displayHousekeeping()
    {
        if(user.access_level === 75)
        {
            return(
                <MenuItem onClick={ () => redirectPage("/housekeeping")}>Housekeeping</MenuItem>
            );
        }
    }

    return useMemo(() => 
        <ClickAwayListener onClickAway={ handleMenuClose }>
            <section className="user" onClick={ handleMenuOpen } >
                <Person user = {user} lock = {true} collapsed={true}/>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={ handleMenuClose }
                >
                    <MenuItem onClick={ () => redirectPage("/profile")}>Profil</MenuItem>
                    <MenuItem onClick={ () => redirectPage("/house_home")}>Maison</MenuItem>
                    {displayHousekeeping()}
                    <MenuItem onClick={ user_logout }>Logout</MenuItem>
                </Menu>     
            </section>                                           
        </ClickAwayListener>, [user, handleMenuClose, handleMenuOpen, anchorEl, user_logout, redirectPage ]

        
          
    );
}

export default User
