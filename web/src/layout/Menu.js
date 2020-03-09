import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useHistory } from "react-router-dom";

const useTabStyles = makeStyles({
    root: {
      flexGrow: 1,
      maxWidth: "100%"
    },
});

const Menu = () => {
    const classes = useTabStyles();
    const [value, setValue] = useState(0); // Tabs state -> tracking active tab
    
    let history = useHistory(); // hook that allows URL change -> navigation

    const handleTabChange = (event, newValue) => {
        // will handle the state of the main nav menu
        // keep track of the active tab
        setValue(newValue);
     };

     const handleClick = (link) => {
        // Will change the URL, behaves like a link
        history.push(link);
     }
    
    return (
        <Paper square className={classes.root}>
            <Tabs
                value={value}
                onChange= { handleTabChange }
                variant="scrollable"
                textColor="primary"
                aria-label="icon label tabs example"
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
                
            </Tabs>
        </Paper>
        
    )
}

export default  Menu;