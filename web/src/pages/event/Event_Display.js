import React, {useContext} from 'react';
import Typography from '@material-ui/core/Typography';

import {Button, 
    Card, 
    CardActions, 
    CardContent, 
    CardMedia, 
    CssBaseline, 
    Grid, 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableContainer, 
    TableRow, 
    Paper} from '@material-ui/core';

import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    card: { //dans la carte
        height: '90%',
        width: '45%',
        display: 'flex',
        flexDirection: 'column'
    },
    cardMedia: {
        //paddingTop: '75%',
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
            <CssBaseline/>
            <main>
                <Card className={classes.card}>
                            <CardMedia
                                className={classes.cardMedia}
                                //image="https://heig-vd.ch/images/default-source/img-vie-sur-le-campus/heig-vd-site-web-sm-00075562.jpg?sfvrsn=e01580ea_2"
                                title="Image title"
                            />
                            <CardContent className={classes.cardContent}>
                                <Typography gutterBottom variant="h5" component="h2">
                               <title>
                                   blargh
                               </title>
                                </Typography>
                                
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary">
                                    Voir plus...
                                </Button>
                            </CardActions>
                        </Card>
            </main>
        </React.Fragment>
    );
}