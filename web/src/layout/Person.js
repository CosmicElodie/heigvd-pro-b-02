import React, {useContext} from 'react';
import { MainContext } from '../context/MainContext';
import { Avatar, Typography } from '@material-ui/core';



const Person = ( { user, variant, collapsed, noExtend , lock}  ) => {
    
   /*  { firstname, lastname, email, initials, variant, collapsed, noExtend  }  */
   const {setShowProfile} = useContext(MainContext);

    let variantClass = variant ? variant : '';
    let collapsedClass = collapsed ? 'collapsed' : '';
    let onHoverClass = noExtend ? noExtend ? 'no-hover' : '' : '';

    const handlePersonClick =(user) =>{
        !lock &&
        setShowProfile(user);
      }
    

    return (           
        <section
            className={"person " + variantClass + ' ' + collapsedClass + ' ' + onHoverClass }
            onClick = { () => handlePersonClick(user) }
            >
                <Avatar className="avatar"> { user.initials } </Avatar> 
                <section className="details">
                    <Typography className="full-name" component="span">
                        { user.firstname + " " + user.lastname } 
                    </Typography>
                    <Typography className="email" component="span">
                        { user.email }
                    </Typography>
                </section>
        </section>
    );
}

export default Person;