import React, { useContext } from 'react';
import { MainContext } from '../context/MainContext';
import { useInput } from '../hooks/input';
import { FormControlLabel, TextField, Checkbox, Button, CssBaseline, Link, Paper, Box, Grid, Icon, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';

const Signup = ( props ) => {
    
    // css classes are defined bellow -> scroll down
    const classes = useLoginStyles(); 
    
    // main context state -> main data repository
    const { 
      setUser, 
      setDialog 
    } = useContext(MainContext);

 
    // keep track of the input states 
    // each keystroke (onChange event listener) is saved within the state
    const [email, bindEmail] = React.useState('');
    const [password, bindpassword] = React.useState('');
    const [firstname, bindfirstname] = React.useState('');
    const [lastname, bindlastname] = React.useState('');
    const [username, bindusername] = React.useState('');
    const [house, bindhouse] = React.useState('1');
    const [birth, bindbirth] = React.useState('2020-04-04');

    const [emailError, setEmailError] = React.useState('');
    const [emailEMessage, setEmailEMessage] = React.useState('');
    const [passwordError,setPasswordError] = React.useState('');
    const [passwordEMessage,setPasswordEMessage] = React.useState('');
    const [firstnameError, setFirstnameError] = React.useState('');
    const [firstnameEMessage,setFirstnameEMessage] = React.useState('');
    const [lastnameError, setLastnameError ] = React.useState('');
    const [lastnameEMessage, setLastnameEMessage] = React.useState('');
    const [usernameError, setUsernameError ] = React.useState('');
    const [usernameEMessage, setUsernameEMessage ] = React.useState('');
    const [houseError, setHouseError ] = React.useState('');
    const [houseEMessage, setHouseEMessage ] = React.useState('');
    const [birthError, setBirthError ] = React.useState('');
    const [birthEMessage, setBirthEMessage ] = React.useState('');

    const errorReset = () => {
        setEmailError(false);
        setEmailEMessage('');
        setPasswordError(false);
        setPasswordEMessage('');
        setFirstnameError(false);
        setFirstnameEMessage('');
        setLastnameError(false);
        setLastnameEMessage('');
        setUsernameError(false);
        setUsernameEMessage('');
        setBirthError(false);
        setBirthEMessage('');
    }

    let post_body = 
    "&birth=" + birth + 
    "&email=" + email +
    "&firstname=" + firstname +
    "&lastname=" + lastname +
    "&password=" + password +
    "&username=" + username +
    "&house_id=" + house;
    const buttonSignUP = (e) => {

        e.preventDefault();
        fetch('http://localhost:8080/profile/sign_up', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: post_body
            })
        .then(response => response.json())
        .then(response => {
            errorReset();
            if (response.status === 'errorEmptyField') {
               /*  if (response.error === 'BadRequest') {
                    
                } */
                if (response.dialog_id === 'invalid_email_syntax') {
                    setEmailError(true);
                    setEmailEMessage('must be @heig-vd.ch');
                }
                if (response.empty1 === 'empty_firstname') {
                    setFirstnameError(true);
                    setFirstnameEMessage('field required');
                }
                if (response.empty2 === 'empty_lastname') {
                    setLastnameError(true);
                    setLastnameEMessage('field required');
                }
                if (response.empty3 === 'empty_username') {
                    setUsernameError(true);
                    setUsernameEMessage('field required');
                }
                if (response.empty4 === 'empty_password') {
                    setPasswordError(true);
                    setPasswordEMessage('field required');
                }
            }

            if (response.status === 'error') {
                
                if (response.dialog_id === 'email_already_exist') {
                    emailError = true;
                    emailEMessage = 'email already exist';
                }
                
            }
            if(response.status === 'ok'){
                props.history.push("/signin");
            }
        })
    }

    const setEmail = (event) => {
    bindEmail((event.target.value)+"@heig-vd.ch");
    };
    const setPassword = (event) => {
    bindpassword(event.target.value);
    };
    const setFirstname = (event) => {
    bindfirstname(event.target.value);
    };
    const setLastname = (event) => {
    bindlastname(event.target.value);
    };
    const setUsername = (event) => {
    bindusername(event.target.value);
    };
    const setHouseId = (event) => {
    bindhouse(event.target.value);
    };
    const setBirth = (event,setter) => {
    bindbirth(event.target.value);
    };

    const houses = [
        {
            value: '1',
            label: 'Systèmes informatiques embarqués',
        },
        {
            value: '2',
            label: 'Sécurité informatique',
        },
        {
            value: '3',
            label: 'Réseaux et systèmes',
        },
        {
            value: '4',
            label: 'Informatique logicielle',
        },
        {
            value: '5',
            label: 'Ingénierie des données',
            },
      ];
    return (
        <Grid container={true} component="section" className={ classes.root }>
          <CssBaseline />
          <Grid className={classes.grid_container} item component={Paper} elevation={0} square>
            <div className={classes.paper}>
              
                <Icon className="app-signin" />
              
              <Typography component="h1" variant="h5">
                Sign Up
              </Typography>
              <form className={classes.form} noValidate>

                

                <Grid container >
                    <Grid item xs >
                        <TextField
                            error = {emailError}
                            helperText = {emailEMessage}
                            variant="outlined"                  
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            onChange={setEmail}
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
                    error = {passwordError}
                    helperText = {passwordEMessage}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    id="filled-required"
                    variant="outlined"
                    onChange={setPassword}
                />

                <TextField
                    error = {firstnameError}
                    helperText = {firstnameEMessage}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="filled-required"
                    label="Prenom"
                    defaultValue=""
                    variant="outlined"
                    onChange={setFirstname}
                />
                <TextField
                    error = {lastnameError}
                    helperText = {lastnameEMessage}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="filled-required"
                    label="Nom"
                    defaultValue=""
                    variant="outlined"
                    onChange={ setLastname } 
                />
                <TextField
                    error = {usernameError}
                    helperText = {usernameEMessage}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="filled-required"
                    label="Username"
                    variant="outlined"
                    onChange={setUsername} 
                />
                <div>
                <TextField
                    id="outlined-select-currency-native"
                    margin="normal"
                    select
                    fullWidth
                    label="Orientation"
                    value={houses}
                    onChange={setHouseId}
                    SelectProps={{
                        native: true,
                    }}
                    variant="outlined"
                    >
                    {houses.map((option) => (
                        <option key={option.value} value={option.value}>
                        {option.label}
                        </option>
                    ))}
                </TextField>
                </div>


                <TextField
                    error = {birthError}
                    helperText = {birthEMessage}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="filled-required"
                    label="Anniversaire"
                    type="date"
                    defaultValue="2020-04-04"
                    className={classes.textField}
                    InputLabelProps={{
                    shrink: true,
                    }}
                    onChange={setBirth} 
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
  
  
  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://heig-vd.ch//">
          Heig-VD
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

export default Signup;

