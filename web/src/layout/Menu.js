import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useHistory, useLocation } from "react-router-dom";

const useTabStyles = makeStyles({
    root: {
      flexGrow: 1,
      maxWidth: "100%"
    },
});

const Menu = () => {
    const classes = useTabStyles();
    const [active, setActive] = useState(0); // Tabs state -> tracking active tab
    
    let history = useHistory(); // hook that allows URL change -> navigation
    let location = useLocation();

    const tabs = {
        forum   : 3,
        event   : 2,
        about   : 1,
        home    : 0
    }

    useEffect(() => {
        let activeRoot = location.pathname.split('/')[1];
        if(!activeRoot) activeRoot = "home";
        setActive(tabs[activeRoot]);
    },[]);

    const handleTabChange = (_, newActive) => setActive(newActive);
    const handleClick = (link) => history.push(link);
    
    return (
        <Paper square className={classes.root}>
            <Tabs
                value = { active }
                onChange = { handleTabChange }
                variant = "scrollable"
                textColor = "primary"
                aria-label = "icon label tabs example"
            >
                <Tab 
                    label="Home" 
                    to="/"      
                    onClick={ () => handleClick("/") }    
                />
                <Tab 
                    label="About" 
                    to="/about"      
                    onClick={ () => handleClick("/about") }  
                />

                <Tab 
                    label="Event" 
                    to="/event"      
                    onClick={ () => handleClick("/event") }  
                />

                <Tab 
                    label="Forum" 
                    to="/forum"      
                    onClick={ () => handleClick("/forum") }  
                />
                
            </Tabs>
        </Paper>
        
    )
}

export default  Menu;