import React from 'react';
import { Avatar, Typography } from '@material-ui/core';

const Person = ( { firstname, lastname, email, initials, variant, collapsed, noExtend  } ) => {
    let variantClass = variant ? variant : '';
    let collapsedClass = collapsed ? 'collapsed' : '';
    let onHoverClass = noExtend ? noExtend ? 'no-hover' : '' : '';
    
    return (           
        <section
            className={"person " + variantClass + ' ' + collapsedClass + ' ' + onHoverClass }
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
        </section>
    );
}

export default Person;