import React from 'react';
import { MainProvider } from './context/MainContext';
import Menu from './layout/Menu'
import User from './layout/User'
import Login from './layout/Login'
import Home from './pages/Home'
import About from './pages/About'
import './css/App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = ( ) => {
    return (
      <MainProvider>
        <Router>
          <section className="App">
            <section className="header">
              <Menu /> 
              <User  />
            </section>
            <section className="main">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
              </Switch>
              <Login />
            </section>
          </section>
          </Router>
      </MainProvider>
    )
}

export default App;
