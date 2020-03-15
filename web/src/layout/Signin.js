import React, { useContext, useEffect } from 'react';
import { MainContext } from '../context/MainContext';
import { useInput } from '../hooks/input';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const Signin = ( props ) => {
    
    // css classes are defined bellow -> scroll down
    const classes = useLoginStyles(); 
    
    // main context state -> main data repository
    const { 
      setUser, 
      setLogin,
      setDialog 
    } = useContext(MainContext);

 
    // keep track of the input states 
    // each keystroke (onChange event listener) is saved within the state
    const { value:email,        bind:bindEmail      } = useInput('');
    const { value:password,     bind:bindPassword   } = useInput('');
    
    const buttonSignIn = (e) => {
        e.preventDefault();
        fetch('http://localhost:8080/authentication/user_login', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: "email=" + email + "&password=" + password
            })
        .then(response => response.json())
        .then(response => {
            localStorage.setItem("User", JSON.stringify(response.data));
            setUser(response.data);
            setLogin(latest => ({
                ...latest,
                is_open : !latest.is_open
            }));
            setDialog({
              [response.dialog_id]: {
                  is_open: true,
                  data : { ...response.data }
              }
          });
          
          props.history.push("/");
        })
    }

    return (
        <Grid container={true} component="section" className={ classes.root }>
          <CssBaseline />
          <Grid className={classes.grid_container} item component={Paper} elevation={0} square>
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <form className={classes.form} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  { ...bindEmail } 
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  { ...bindPassword } 
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick= { buttonSignIn }
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
                <Box mt={5}>
                  <Copyright />
                </Box>
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
    paper: {
      padding:'25px 0px',
      margin: theme.spacing(4, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
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

export default Signin;

