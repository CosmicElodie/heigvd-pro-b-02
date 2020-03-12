import React, { useEffect, useContext, useState } from 'react';
import { MainContext } from '../context/MainContext';
import { makeStyles } from '@material-ui/core';
import { Button, Avatar } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

/*
    tool to console.log within JSX
    const ConsoleLog = ({ children }) => {
        return false;
    };
*/ 

const User = ( props ) => {
   
    // MainContext => see file ./context/MainContext.js
    const { user, setUser, setLogin, setDialog  } = useContext(MainContext);
    const [ button, setButton ] = useState({ color : 'primary' });
    const [ anchorEl, setAnchorEl ] = React.useState(null);

    useEffect(() => { 
        // useEffect => sort of 'DOM Ready' equivalent 
        fetch('http://localhost:8080/authentication/user_data', {
            method: 'GET',
            credentials: 'include' // mandatory for every JSON fetch
        })
        .then(response => response.json())
        .then((response) => {
                // update user object in the MainContext
                setUser(response.data);
            }
        )
    }, []);   
    
    // Lambda Function called by sign-in click event
    // Opens the login form by updating the login related state
    // within the MainContext
    const toggleSingIn = (e) => {
        setButton({ color: button.color === 'secondary' ?  'primary' : 'secondary' })
        // "latest" is the latest rendered state of the login context state object
        // this example updates a single attribute nested in the login state object in MainContext
        setLogin(latest => ({
            ...latest,
            is_open : !latest.is_open
        }));
    }
    
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
            method: 'GET',
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
        })
    };    

    return (
        <section>
            <section className= { classes.user }>
            { 
                !user.is_authenticated &&  // Conditional Rendering
                <Button
                    size="small"
                    variant="outlined"
                    { ...button }
                    className={ classes.button }
                    onClick = { (event) => toggleSingIn(event) }
                >
                    Sing In
                </Button>
            }
            { 
                user.is_authenticated && // Conditional Rendering
                <section className="person">
                    <Avatar className="avatar">            
                        <Button className="button" aria-haspopup="true" onClick={handleClick}>
                            {user.initials}
                        </Button>
                        <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={ handleMenuClose }
                    >
                        <MenuItem onClick={ handleMenuClose }>Profile</MenuItem>
                        <MenuItem onClick={ handleMenuClose }>My account</MenuItem>
                        <MenuItem onClick={ handleMenuClose, user_logout }>Logout</MenuItem>
                        </Menu>                     
                    </Avatar>
                    <section className="details">
                        <section className="full-name"> { user.firstname + " " + user.lastname } </section>
                    </section>
                </section>  
            }
            </section>


        </section>
        
          
    );
}

export default User
