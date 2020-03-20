import React from 'react';
import { Grid, Avatar, Typography } from '@material-ui/core';

const Person = ( { firstname, lastname, email, initials, variant, collapsed, noExtend  } ) => {
    let variantClass = variant ? variant : '';
    let collapsedClass = collapsed ? 'collapsed' : '';
    let onHoverClass = noExtend ? noExtend ? 'no-hover' : '' : '';
    return (           
        <Grid
            className={"person " + variantClass + ' ' + collapsedClass + ' ' + onHoverClass }
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