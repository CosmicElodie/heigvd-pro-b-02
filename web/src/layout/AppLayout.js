import React from 'react';

import Auditoire from '../pages/auditoire/Auditoire';
import NowConnected from './NowConnected';
import Event_Welcome from '../pages/event/Event_Welcome';
import Event_Create from '../pages/event/Event_Create';
import Event_Calendar from '../pages/event/Event_Calendar';
import Event_Display from '../pages/event/Event_Display';
import Event_Modify from '../pages/event/Event_Modify';
import Event_List from '../pages/event/Event_List';


import Forum from '../pages/forum/Forum';
import { ForumProvider } from '../context/ForumContext';
import { EventProvider } from '../context/EventContext';
import { Switch, Route } from "react-router-dom";

import GlobalStats from '../pages/statistics/GlobalStats';
import Home from '../pages/Home';
import Houses from '../pages/Houses/Home';
import HouseKeeping from '../pages/HouseKeeping';
import Menu from './Menu';
import Palmares from '../pages/Palmares';
import Profile from '../pages/profile/Profile';
import Rules from '../pages/Rules';
import ShowProfile from './ShowProfile';
import User from './User';


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
                    <Route exact path="/rules" component={Rules} />
                    <Route path="/auditoire" component={Auditoire} />
                    <Route path="/globalstats" component={GlobalStats} />
                    <Route path="/event_welcome"><EventProvider><Event_Welcome /></EventProvider></Route>
                    <Route path="/event_modify"><EventProvider><Event_Modify /></EventProvider></Route>
                    <Route path="/event_create"><EventProvider><Event_Create /></EventProvider></Route>
                    <Route path="/event_display"><EventProvider><Event_Display /></EventProvider></Route>
                    <Route path="/event_calendar"><EventProvider><Event_Calendar /></EventProvider></Route>
                    <Route path="/event_list"><EventProvider><Event_List /></EventProvider></Route>
                    <Route exact path="/palmares" component={Palmares} />
                    <Route path="/profile" component={Profile} />
                    <Route path="/house_home" component={Houses} />
                    <Route path="/housekeeping" component={HouseKeeping} />
                    <Route path="/forum"><ForumProvider><Forum /></ForumProvider></Route>
                    <Route path="*" component={() => "404 NOT FOUND"} />
                </Switch>
            </section>
            <NowConnected />
            <ShowProfile />
        </section>
    )

}

export default AppLayout;