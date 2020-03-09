import React, { Link } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
    root: {
      flexGrow: 1,
      maxWidth: "100%"
    },
});

const Menu = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    
    let history = useHistory();

    const handleChange = (event, newValue) => {
        setValue(newValue);
     };

     const handleClick = (link) => {
        console.log(link);
        history.push(link);
     }
    
    return (
        <Paper square className={classes.root}>
        <Tabs
            value={value}
            onChange={handleChange}
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