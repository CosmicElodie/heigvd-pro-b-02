import React  from 'react'
import { MainProvider } from './context/MainContext'
import Signin  from './layout/Signin'
import AppLayout  from './layout/AppLayout'
import ProtectedRoute from './layout/ProtectedRoute'
import Signup from './layout/Signup'
import Dialog from './layout/Dialog'



import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = ( ) => {
    
    return (
      <MainProvider>
        <Router>
          <Switch>
               <Route exact path="/Signin" component={ Signin } />
               <Route exact path="/Signup" component={ Signup } />
               <ProtectedRoute component={ AppLayout } />
          </Switch>
          <Dialog />
        </Router>
       </MainProvider>
    )
}

export default App;
