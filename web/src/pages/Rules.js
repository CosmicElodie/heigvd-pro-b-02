import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {
    Card, CardContent, CardMedia,
    CssBaseline,
    Grid
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    card: { //dans la carte
        maxWidth: '1300px',
        minWidth: '450px',
        minHeight: '400px',
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10
    },
    cardMedia: {
        paddingTop: '0%',
        flexDirection: 'row',
        justify: 'space-evenly',
        width: 'auto',
        height: 'auto',
    },
    cardContent: {
        flexGrow: 1
    }
}));

export default function Rules() {

    //const {user} = useContext(MainContext);
    const classes = useStyles();

    //const [ data, setData ] = useState(); //mettre json à la place de useState
    const [topUserYearly, setTopUserYearly] = React.useState();
    const [topUserMonthly, setTopUserMonthly] = React.useState();

    return (
        <React.Fragment>
            <CssBaseline />
            <main>
                <Grid container direction="row" justify="space-evenly" alignItems="center">
                    <Card className={classes.card}>
                        <Typography gutterBottom variant="h6" align="center">
                        </Typography>
                        <CardMedia
                            className={classes.cardMedia}
                            image=""
                            title="Image title"
                        />
                        <CardContent className={classes.cardContent}>
                            <h1>Conditions générales d'utilisation</h1>

                            <h2>Comportement</h2>
                            <h2>Événements</h2>
                            <h2>Forum</h2>

                        </CardContent>
                    </Card>
                </Grid>
            </main>
        </React.Fragment>
    );
}