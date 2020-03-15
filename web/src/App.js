import React, { useContext, useEffect }  from 'react'
import { MainContext, MainProvider } from './context/MainContext'
import Signin  from './layout/Signin'
import AppLayout  from './layout/AppLayout'
import ProtectedRoute from './layout/ProtectedRoute'

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = ( ) => {
    
    return (
      <MainProvider>
        <Router>
          <Switch>
               <Route exact path="/signin" component={ Signin } />
               <ProtectedRoute component={ AppLayout } />
          </Switch>
        </Router>
       </MainProvider>
    )
}

export default App;
