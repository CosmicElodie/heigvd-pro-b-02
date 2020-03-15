import React from 'react'
import Menu from './Menu'
import User from './User'
import Dialog from './Dialog'
import Home from '../pages/Home'
import About from '../pages/About'
import Profile from '../pages/Profile'
import { Switch, Route } from "react-router-dom"

import '../css/App.css'; 

const AppLayout = () => {
    
    return (
        <section className="App">
        <section className="header">
            <Menu />
            <User />
        </section>
        <section className="main">
            <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/profile" component={Profile} />
            <Route path="*" component={() => "404 NOT FOUND"} />
            </Switch>
        </section>
        <Dialog />
        </section> 
    )

}

export default AppLayout;