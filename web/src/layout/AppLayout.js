import React from 'react'
import Menu from './Menu'
import User from './User'
import Dialog from './Dialog'
import ShowProfile from './ShowProfile'
import Home from '../pages/Home'
import About from '../pages/About'
import Event_Welcome from '../pages/event/Event_Welcome'
import Event_Create from '../pages/event/Event_Create'
import Event_Calendar from '../pages/event/Event_Calendar'
import Profile from '../pages/profile/Profile'
import ModalProfile from '../pages/profile/ModalProfile'
import Forum from '../pages/forum/Forum'
import { ForumProvider } from '../context/ForumContext';
import { Switch, Route } from "react-router-dom"

import '../css/App.css'; 
import '../css/typo.css'; 
import "../css/icons.css";

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
           
            <Route path="/event_welcome" component={Event_Welcome} />
            <Route path="/event_create" component={Event_Create} />
            <Route path="/event_calendar" component={Event_Calendar} />
            <Route path="/profile" component={Profile} />
            <Route path="/test" component={ModalProfile} />
            <ForumProvider>
                <Route path="/forum" component={Forum} />
            </ForumProvider>
            <Route path="*" component={() => "404 NOT FOUND"} />
            </Switch>
        </section>
        
        <ShowProfile/>
        </section> 
    )

}

export default AppLayout;