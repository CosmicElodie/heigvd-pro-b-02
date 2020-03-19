import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
  const useStyles = makeStyles(theme => ({
    card: { //dans la carte
      height: '90%',
      width: '45%',
      display: 'flex',
      flexDirection: 'column'
    },
    cardMedia: {
      paddingTop: '75%',
      flexDirection: 'row',
      justify: 'space-evenly'
    },
    cardContent: {
      flexGrow: 1,
    }
  }));
  
  export default function Event() {
    const classes = useStyles();
  
    return (
      <React.Fragment>
        <CssBaseline />
        <main>
                  <Grid container direction="row" justify="space-evenly" alignItems="center">
                    
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image="https://heig-vd.ch/images/default-source/img-vie-sur-le-campus/heig-vd-site-web-sm-00075562.jpg?sfvrsn=e01580ea_2"
                      title="Image title"
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        Événements privés
                      </Typography>
                      <Typography>
                        Lorem ipsum maggle ! J'ai la flemme d'aller chercher le texte D:
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary">
                        Voir plus...
                      </Button>
                    </CardActions>
                  </Card>
                  <br /><br />
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image="https://heig-vd.ch/images/default-source/img-global-superpicture/formation-bachelor-filiere-energieettechniquesenvironnementales/energie-et-techniques-environnementales--xs.jpg"
                      title="Image title"
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                      Événements globaux
                      </Typography>
                      <Typography>
                        Bla to the bla, Blabla ! 
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary">
                        Voir plus...
                      </Button>
                    </CardActions>
                  </Card>
                    </Grid>
        </main>
      </React.Fragment>
    );
  }
