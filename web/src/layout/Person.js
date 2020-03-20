import React from 'react';
import { Grid, Avatar, Typography } from '@material-ui/core';

const Person = ( { firstname, lastname, email, initials, variant, collapsed  } ) => {
    let variantClass = variant ? variant : '';
    let collapsedClass = collapsed ? 'collapsed' : '';
    return (           
        <Grid
            className={"person " + variantClass + ' ' + collapsedClass }
            container
            direction="row"
            justify="space-between"
            alignItems="flex-start"
            >
                <Avatar className="avatar"> { initials } </Avatar>
                <section className="details">
                    <Typography className="full-name" component="span">
                        { firstname + " " + lastname } 
                    </Typography>
                    <Typography className="email" component="span">
                        { email }
                    </Typography>
                </section>
        </Grid>
    );
}

export default Person;