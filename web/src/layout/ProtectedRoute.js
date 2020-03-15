import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ( { component: Component }, ...rest ) => {
    let test = localStorage.getItem('User');
    console.log(test);
    console.log( JSON.parse(test));
    let user = JSON.parse(test); // persistant user 
    return (
        <Route 
        {...rest}
        render={props => {
            if(user && user.is_authenticated){
                return <Component {...props} />
            }else{
                return <Redirect to={
                    { 
                        pathname: "/signin",
                        state: {
                            from: props.location
                        }
                    }

                } />
            }
        }} />
    )
}

export default ProtectedRoute;