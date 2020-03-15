import React, { useEffect, useContext, useState } from 'react';
import { MainContext } from '../context/MainContext';
import { makeStyles } from '@material-ui/core';
import { Avatar } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useHistory } from "react-router-dom";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

/*
    tool to console.log within JSX
    const ConsoleLog = ({ children }) => {
        return false;
    };
*/ 

const User = ( ) => {
   
    // MainContext => see file ./context/MainContext.js
    const { user, setUser, setDialog  } = useContext(MainContext);
    const [ anchorEl, setAnchorEl ] = React.useState(null);
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
    }, []);   
    
  
    const useStyles = makeStyles(theme => ({
        button: {
          margin: theme.spacing(1),
        },
        user: {
            position:'absolute',
            right:'20px'
        }
    }));

    const classes = useStyles();

    const handleClick = event => {
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
        <section>
            <section className= { classes.user }>
            { 
                user.is_authenticated && // Conditional Rendering
                <ClickAwayListener onClickAway={ handleMenuClose }>
                    <section className="person"  onClick={handleClick}>
                        <Avatar className="avatar">            
                        
                                {user.initials}
                        
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
                        </Avatar>
                        <section className="details">
                            <section className="full-name"> { user.firstname + " " + user.lastname } </section>
                        </section>
                    </section>  
                </ClickAwayListener>
            }
            </section>


        </section>
        
          
    );
}

export default User
