import React, { useEffect, useContext, useState } from 'react';
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
    
  
    const handleMenuOpen = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };    

    const user_logout = () => {

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

    };    
    const redirectPage = (link) => {
            // Will change the URL, behaves like a link
            history.push(link);         
        setAnchorEl(null);
    }; 

    return (
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
                    <MenuItem onClick={ () => redirectPage("/profile")}>Profile</MenuItem>
                    <MenuItem onClick={ handleMenuClose }>My account</MenuItem>
                    <MenuItem onClick={ user_logout }>Logout</MenuItem>
                </Menu>     
            </section>                                           
        </ClickAwayListener>
        
          
    );
}

export default User
