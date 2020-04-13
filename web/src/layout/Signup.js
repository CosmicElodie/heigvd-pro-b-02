import React, { useContext, useEffect } from 'react';
import { MainContext } from '../context/MainContext';
import {  TextField, Button, CssBaseline, Paper, Grid, Icon, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useInput } from '../hooks/input';
 
const Signup = ( props ) => {
    
    // css classes are defined bellow -> scroll down
    const classes = useLoginStyles(); 
    
    // main context state -> main data repository
    const { 
      setDialog,
      global : { houses } 
    } = useContext(MainContext);

    const { value:email,      bind:bindEmail,     setError:setErrorEmail }      = useInput('');
    const { value:birth,      bind:bindBirth }                                  = useInput('');
    const { value:firstname,  bind:bindFirstname }                              = useInput('');
    const { value:lastname,   bind:bindLastname }                               = useInput('');
    const { value:password,   bind:bindPassword }                               = useInput('');
    const { value:house,      bind:bindHouse,     setValue:setHouse }           = useInput('');
    
    useEffect(() => {
      // houses se fetch dans le MainContext -> global car il s'agit des informations
      // potentiellement nécessaires à travere l'application
      // Comme le select choisis la prèmière maison par default, 
      // il faut aussi setHouse la prémière maison avec useEffect 
      houses && houses.length > 0 && setHouse(houses[0].house_id);
    }, [houses, setHouse]);

    const buttonSignUP = (e) => {

        //e.preventDefault();
        // Pour que required fonctionne sur les champs
        // il ne faut pas preventDefault sur le bouton car il doit effectuer un submit. 
        // L'attribut required necessite que le form soit submit 
        // submit est en comportement par default du bouton submit

        let post_body = 
        "&email=" + email + "@heig-vd.ch" +
        "&birth=" + birth + 
        "&firstname=" + firstname +
        "&lastname=" + lastname +
        "&password=" + password +
        "&house_id=" + house;

        fetch('http://localhost:8080/profile/sign_up', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: post_body
            })
        .then(response => response.json())
        .then(response => {
            if (response.status === 'error') {
              response.dialog_id === 'invalid_email_syntax' && setErrorEmail({
                error:true,
                helperText: 'must be prenom.nom@heig-vd.ch'
              }); 
              response.dialog_id === 'email_already_exist' && setErrorEmail({
                error:true,
                helperText: 'email already exist'
              });
            } 
            if(response.status === 'ok') {
              setDialog((latest) => ({
                ...latest,
                [response.dialog_id] : { is_open : true }
              }));
              setTimeout(() => props.history.push("/signin"), 3000);
            }
        })
    }

    return (
        <Grid container={true} component="section" className={ classes.root }>
          <CssBaseline />
          <Grid className={classes.grid_container} item component={Paper} elevation={0} square>
            <div className={classes.paper}>
              
              <Icon className="app-signin" />
              
              <Typography component="h1" variant="h5">
                Sign Up
              </Typography>
              <form className={classes.form}>
                <Grid container >
                    <Grid item xs >
                        <TextField
                            variant="outlined"                  
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            { ...bindEmail }
                        />
                    </Grid>

                    <Grid item xs = {3}>                        
                        <TextField
                            disabled
                            variant="outlined"                  
                            margin="normal"
                            fullWidth
                            id="email"
                            label="@heig-vd.ch"
                            name="email"
                        />
                    </Grid>
                </Grid>

                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    { ...bindPassword }
                />

                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Prenom"
                    { ...bindFirstname }
                />

                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Nom"
                    { ...bindLastname }
                />
               
                <div>
                <TextField
                    margin="normal"
                    select
                    required
                    fullWidth
                    SelectProps={{
                        native: true,
                    }}
                    variant="outlined"
                    { ...bindHouse }
                    >
                    {houses.map(({house_id, name }) => (
                        <option key={house_id} value={house_id}>
                        { name }
                        </option>
                    ))}
                </TextField>
                </div>


                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Anniversaire"
                    type="date"
                    defaultValue="2020-04-04"
                    className={classes.textField}
                    InputLabelProps={{
                    shrink: true
                    }}
                    { ...bindBirth }
                />
                   
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick= { buttonSignUP }
                >
                  Sign Up
                </Button>

              </form>
            </div>
          </Grid>
        </Grid>
      );
}

const useLoginStyles = makeStyles(theme => ({
    root: {
      height: '575px',
      width: '600px',
      position: 'absolute',
      top: '70px',
      right: 'calc(50% - 300px)'
    },
    grid_container : {
      border: '1px solid rgba(0, 0, 0, 0.05)'
    },
    image: {
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    center: {
        justify: 'space-around',
        alignContent: 'center',
    },
    paper: {
      padding:'25px 0px',
      margin: theme.spacing(4, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  
  

export default Signup;

